/**
 * Includes
 */
let expect = require("chai").expect;
let func = require("../index").GetPriceAndMetadataInformation;
let cfg = require("./getprice-config");


/**
 * Utility checking for RateCard API error.
 * @param {Error object} ret 
 * @param {Mocha 'done' function} done 
 */
function checkRateCardErr(ret, done)
{
    expect(ret).to.not.be.null;
    expect(ret).to.be.instanceof(Error);
    expect(ret.message).to.not.be.null;
    expect(ret.message).to.include("RateCard API :");
    done();
    console.log("\t" + ret.message);
}


/**
 * Check the answer to be valid response.
 * @param {Response object} ret 
 * @param {Mocha 'done' function} done 
 */
function checkRateCardSuccess(ret, done)
{
    expect(ret).to.not.be.null;
    expect(ret).to.not.be.instanceof(Error);
    expect(ret.VirtualMachines).to.not.be.null;
    done();
}


/**
 * Mocha entry point.
 */
describe("GetPriceAndMetadataInformation() - RateCard", function()
{
    it("offer id is null", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.offer_id = null;
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("offer id is void", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.offer_id = "";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("offer id is wrong", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.offer_id = "AB-CDE-0001";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("offer id not matching the subscription offer", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.offer_id = "MS-AZR-DE-0145P";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("currency is null", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.currency = null;
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("currency is void", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.currency = "";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("currency is not existing", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.currency = "AAA";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("currency is not supported", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.offer_id = "XPF";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("locale is null", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.locale = null;
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    // When locale is void the API is returning an error.
    it("locale is void", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.locale = "";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    // When locale doesn't exist the API is returning an error.
    it("locale doesn't exist", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.locale = "XX-ZZ";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("locale is not supported", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.offer_id = "zh-tw";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("region is null", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.region = null;
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("region is void", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.region = "";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("region doesn't exist", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.region = "XX";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("region is not supported", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.region = "WF";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });

    it("region doesn't match the currency", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.region = "US";
        func(o, function(ret)
        {
            checkRateCardErr(ret, done);
        });
    });
});