/**
 * Includes.
 */
let r = require("request");


function azureOAuthAPI_Token(params)
{
    let url = "https://login.microsoftonline.com/AZURE_AD_TENANT_ID/oauth2/token";
    url = url.replace("AZURE_AD_TENANT_ID", params.aad_tenant_id);
    
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
        r.post(opt,
               function (err, res, body)
               {
                   if (err || (res.statusCode != 200))
                   {
                        reject((err || new Error(res.statusCode + " : " + res.statusMessage)));
                   }
                   else
                   {
                        let token = JSON.parse(body).access_token;
                        resolve({ params : params, token : token });
                   }
               }
        );
    });
}


function azureRateCardAPI_GetPriceAndMetadataInformation(params)
{
    let url = "https://management.azure.com/subscriptions/SUBSCRIPTION_ID/providers/Microsoft.Commerce/RateCard?api-version=2016-08-31-preview&$filter=";
    let filter = "OfferDurableId eq 'OFFER_DURABLE_ID' and Currency eq 'CURRENCY_CODE' and Locale eq 'LOCALE_CODE' and RegionInfo eq 'REGION_CODE'";
    url = url.replace("SUBSCRIPTION_ID", params.params.subscription_id);
    filter = filter.replace("OFFER_DURABLE_ID", params.params.offer_id);
    filter = filter.replace("CURRENCY_CODE", params.params.currency);
    filter = filter.replace("LOCALE_CODE", params.params.locale);
    filter = filter.replace("REGION_CODE", params.params.region);
    filter = encodeURIComponent(filter);
    url = url + filter;

    return new Promise(function(resolve, reject)
    {
        let opt =
        {
            url : url,
            headers :
            {
                "authorization" : "bearer " + params.token,
                "content-type" : "application/json"
            }
        };
        r.get(opt,
              function(err, res, body)
              {
                if (err || (res.statusCode != 200))
                {
                     reject((err || new Error(res.statusCode + " : " + res.statusMessage)));
                }
                else
                {
                     resolve(body);
                }
              });
    });
}


function moveToDictionnary(body, next)
{
    return new Promise(function(resolve, reject)
    {

    });
}


function GetPriceAndMetadataInformation(params, callback)
{
    azureOAuthAPI_Token(params)
     .then(azureRateCardAPI_GetPriceAndMetadataInformation)
     .then(moveToDictionnary)
     .catch(function(err)
     {
        console.log(err.message);
     });
}


function ReadPriceAndMetadataInformationFromJsonFile()
{

}


function WritePriceAndMetadataInformationToJsonFile()
{

}


/**
 * Exports.
 */
module.exports =
{
    GetPriceAndMetadataInformation : GetPriceAndMetadataInformation,
    ReadPriceAndMetadataInformationFromJsonFile : ReadPriceAndMetadataInformationFromJsonFile,
    WritePriceAndMetadataInformationToJsonFile : WritePriceAndMetadataInformationToJsonFile
}