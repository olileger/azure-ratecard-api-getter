/**
 * Includes.
 */
let r = require("request");


function azureOAuthAPI_Token(params, next)
{
    let url = "https://login.microsoftonline.com/AZURE_AD_TENANT_ID/oauth2/token";
    url = url.replace("AZURE_AD_TENANT_ID", params.p.aad_tenant_id);
    r.post({url : url,
            form :
            {
                grant_type : "client_credentials",
                client_id : params.p.application_id,
                client_secret : params.p.application_secret,
                resource : "https://management.azure.com/"
            }},
            function (err, code, body)
            {
                params.access_token = JSON.parse(body).access_token;
                next(params, moveToDictionnary);
            }
        );
}


function azureRateCardAPI_GetPriceAndMetadataInformation(params, next)
{
    let url = "https://management.azure.com/subscriptions/SUBSCRIPTION_ID/providers/Microsoft.Commerce/RateCard?api-version=2016-08-31-preview&$filter=";
    let filter = "OfferDurableId eq ’{OFFER_DURABLE_ID}’ and Currency eq ’{CURRENCY_CODE}’ and Locale eq ’{LOCALE_CODE}’ and RegionInfo eq ’{REGION_CODE}’";
    url = url.replace("SUBSCRIPTION_ID", params.p.subscription_id);
    filter = filter.replace("OFFER_DURABLE_ID", params.p.offer_id);
    filter = filter.replace("CURRENCY_CODE", params.p.currency);
    filter = filter.replace("LOCALE_CODE", params.p.locale);
    filter = filter.replace("REGION_CODE", params.p.region);
    url = url + encodeURIComponent(filter);

    r.get({ url : url,
            auth : { bearer : params.access_token }
          },
          function(err, code, body)
         {
             next(body, params.c);
         });
}


function moveToDictionnary(body, next)
{

}


function GetPriceAndMetadataInformation(params, callback)
{
    azureOAuthAPI_Token({ p : params, c : callback }, azureRateCardAPI_GetPriceAndMetadataInformation);
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