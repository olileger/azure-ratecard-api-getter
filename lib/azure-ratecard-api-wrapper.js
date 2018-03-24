/**
 * Includes.
 */
let r = require("request");


/**
 * Authenticate the application to Azure.
 * @param {Parameters to authenticate to Azure OAuth API} params 
 */
function azureOAuthAPI_Token(params)
{
    // Setup the URL.
    let url = "https://login.microsoftonline.com/AZURE_AD_TENANT_ID/oauth2/token";
    url = url.replace("AZURE_AD_TENANT_ID", params.aad_tenant_id);
    
    // Call the API.
    return new Promise(function(resolve, reject)
    {
        let opt =
        {
            url : url,
            form :
            {
                grant_type : "client_credentials",
                client_id : params.application_id,
                client_secret : params.application_secret,
                resource : "https://management.azure.com/"
            }
        };
        r.post(opt,function (err, res, body)
        {
            if (err || (res.statusCode != 200))
            {
                reject((err || new Error("Authentication API : " + res.statusCode + " -> " + res.statusMessage)));
            }
            else
            {
                let token = JSON.parse(body).access_token;
                resolve({ p : params, t : token });
            }
        });
    });
}


/**
 * Get the price list from the RateCard API.
 * @param {Access token + parameters to call RateCard API} params 
 */
function azureRateCardAPI_GetPriceAndMetadataInformation(params)
{
    // Setup the URL.
    let url = "https://management.azure.com/subscriptions/SUBSCRIPTION_ID/providers/Microsoft.Commerce/RateCard?api-version=2016-08-31-preview&$filter=";
    let filter = "OfferDurableId eq 'OFFER_DURABLE_ID' and Currency eq 'CURRENCY_CODE' and Locale eq 'LOCALE_CODE' and RegionInfo eq 'REGION_CODE'";
    url = url.replace("SUBSCRIPTION_ID", params.p.subscription_id);
    filter = filter.replace("OFFER_DURABLE_ID", params.p.offer_id);
    filter = filter.replace("CURRENCY_CODE", params.p.currency);
    filter = filter.replace("LOCALE_CODE", params.p.locale);
    filter = filter.replace("REGION_CODE", params.p.region);
    url = url + encodeURIComponent(filter);

    // Call the API.
    return new Promise(function(resolve, reject)
    {
        let opt =
        {
            url : url,
            headers :
            {
                "Authorization" : "bearer " + params.t,
                "Content-Type" : "application/json"
            }
        };
        r.get(opt, function(err, res, body)
        {
            if (err || (res.statusCode != 200))
            {
                reject((err || new Error("RateCard API : " + res.statusCode + " -> " + res.statusMessage)));
            }
            else
            {
                resolve(JSON.parse(body));
            }
        });
    });
}


/**
 * Build the JS object holding prices in a more convenient
 * way than the result of the RateCard API.
 * @param {JS object holding the prices} prices 
 */
function buildPricesObject(prices)
{
    return new Promise(function(resolve, reject)
    {
        let p = {};

        try
        {
            for (let i = 0; i < prices.Meters.length; i++)
            {
                let e = prices.Meters[i];

                // Don't take care of deprecated rating.
                if (e.MeterStatus == "Deprecated")
                {
                    continue;
                }

                // Replace non-word character by empty one.
                e.MeterCategory = e.MeterCategory.replace(new RegExp(/\W/, "g"), "");
                e.MeterSubCategory = e.MeterSubCategory.replace(new RegExp(/\W/, "g"), "");
                e.MeterRegion = e.MeterRegion.replace(new RegExp(/\W/, "g"), "");
                e.MeterName = e.MeterName.replace(new RegExp(/\W/, "g"), "");

                // Create properties on the fly.
                let tmp;
                let desc =
                {
                    value : {},
                    writable : true
                }
                if (e.MeterCategory.length != 0)
                {
                    if (p[e.MeterCategory] == undefined)
                    {
                        p[e.MeterCategory] = {};
                    }
                    tmp = p[e.MeterCategory];
                }

                if (e.MeterSubCategory.length != 0)
                {
                    if (tmp[e.MeterSubCategory] == undefined)
                    {
                        tmp[e.MeterSubCategory] = {};
                    }
                    tmp = tmp[e.MeterSubCategory];
                }

                if (e.MeterRegion.length != 0)
                {
                    if (tmp[e.MeterRegion] == undefined)
                    {
                        tmp[e.MeterRegion] = {};
                    }
                    tmp = tmp[e.MeterRegion];
                }

                if (e.MeterName.length != 0)
                {
                    if (tmp[e.MeterName] == undefined)
                    {
                        tmp[e.MeterName] = {};
                    }
                    tmp = tmp[e.MeterName];
                    tmp.Unit = e.Unit;
                    tmp.Value = e.MeterRates["0"];
                }
            }

            resolve(p);
        }
        catch(err)
        {
            reject(err);
        }
    });
}


/**
 * Get the pricing information related to an offer & subscription.
 * @param {Configuration to call the RateCard API} params 
 * @param {Callback run at the end of the task} callback 
 */
function GetPriceAndMetadataInformation(params, callback)
{
    azureOAuthAPI_Token(params)
     .then(azureRateCardAPI_GetPriceAndMetadataInformation)
     .then(buildPricesObject)
     .then((prices) => callback(prices))
     .catch((err) => callback(err));
}


/**
 * Exports.
 */
module.exports =
{
    GetPriceAndMetadataInformation : GetPriceAndMetadataInformation
}