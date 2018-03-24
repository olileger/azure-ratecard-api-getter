/**
 * Configuration object factory.
 */
function CreateConfigurationObject()
{
    let obj = new Object();
    obj.aad_tenant_id = "AAD_TENANT_ID";
    obj.application_id = "AAD_REGISTERED_APP_ID";
    obj.application_secret = "AAD_REGISTERED_APP_SECRET";
    obj.subscription_id = "AZURE_SUBSCRIPTION_ID";
    obj.offer_id = "MS-AZR-0003P";
    obj.currency = "EUR";
    obj.locale = "en-us";
    obj.region = "FR";

    return obj;
}

/**
 * Exports.
 */
module.exports =
{
    CreateConfigurationObject : CreateConfigurationObject
};