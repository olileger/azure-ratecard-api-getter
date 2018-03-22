let expect = require("chai").expect;
let func = require("../index").GetPriceAndMetadataInformation;

describe("GetPriceAndMetadataInformation()", function()
{
    let config =
    {
        aad_tenant_id : process.env.aad_tenant_id,
        application_id : process.env.application_id,
        application_secret : process.env.application_secret,
        subscription_id : process.env.subscription_id,
        offer_id : "MS-AZR-0003P",
        currency : "EUR",
        locale : "en-us",
        region : "FR"
    };

    it("Nominal case", function(done)
    {
        func(config, done);
        //expect()...
    });

});