/**
 * Includes.
 */
let r = require("request");


function azureOAuthAPI_Token(aad_tenant_id, application_id, application_secret)
{
    let url = "https://login.microsoftonline.com/AZURE_AD_TENANT_ID/oauth2/token";
    url = url.replace("AZURE_AD_TENANT_ID", aad_tenant_id);
    r.post({url : url,
            form :
            {
                grant_type : "client_credentials",
                client_id : application_id,
                client_secret : encodeURIComponent(application_secret),
                resource : "https%3A%2F%2Fmanagement.azure.com%2F"
            }},
            function (err, code, body)
            {

            }
        );
}


function azureRateCardAPI_GetPriceAndMetadataInformation()
{
    let url = "https://management.azure.com/subscriptions/{subscription-Id}/providers/Microsoft.Commerce/RateCard?api-version={api-version}&$filter=OfferDurableId eq ’{OfferDurableId}’ and Currency eq ’{Currency}’ and Locale eq ’{Locale}’ and RegionInfo eq ’{RegionInfo}’";
    // replace
    // encodeURIComponent
    // send
}


function moveToDictionnary()
{

}


function GetPriceAndMetadataInformation()
{

}


function ReadPriceAndMetadataInformationFromJsonFile()
{
    MoveToDictionnary();
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