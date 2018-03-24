/**
 * Includes.
 */
let expect = require("chai").expect;
let func = require("../index").GetPriceAndMetadataInformation;
let cfg = require("./getprice-config");


/**
 * Utility checking for Authentication API error.
 * @param {Error object} ret 
 * @param {Mocha done function} done 
 */
function checkAuthErr(ret, done)
{
    expect(ret).to.not.be.null;
    expect(ret).to.be.instanceof(Error);
    expect(ret.message).to.not.be.null;
    expect(ret.message).to.include("Authentication API :");
    done();
    console.log("\t" + ret.message);
}


/**
 * Check the answer to be valid response.
 * @param {Response object} ret 
 * @param {Mocha 'done' function} done 
 */
function checkAuthSuccess(ret, done)
{
    expect(ret).to.not.be.null;
    expect(ret).to.not.be.instanceof(Error);
    expect(ret.VirtualMachines).to.not.be.null;
    done();
}


/**
 * Mocha entry point.
 */
describe("GetPriceAndMetadataInformation() - Authentication", function()
{
    it("authentication nominal case", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        func(o, function(ret)
        {
            checkAuthSuccess(ret, done);
        });
    });

    it("aad tenant id is null", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.aad_tenant_id = null;
        func(o, function(ret)
        {
            checkAuthErr(ret, done);
        });
    });

    it("aad tenant id is void", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.aad_tenant_id = "";
        func(o, function(ret)
        {
            checkAuthErr(ret, done);
        });
    });

    it("aad tenant id is wrong", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.aad_tenant_id = "ABC-DEF";
        func(o, function(ret)
        {
            checkAuthErr(ret, done);
        });
    });

    it("application id is null", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.application_id = null;
        func(o, function(ret)
        {
            checkAuthErr(ret, done);
        });
    });

    it("application id is void", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.application_id = "";
        func(o, function(ret)
        {
            checkAuthErr(ret, done);
        });
    });

    it("application id is wrong", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.application_id = "ABC-DEF";
        func(o, function(ret)
        {
            checkAuthErr(ret, done);
        });
    });

    it("application secret is null", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.application_secret = null;
        func(o, function(ret)
        {
            checkAuthErr(ret, done);
        });
    });

    it("application secret is void", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.application_secret = "";
        func(o, function(ret)
        {
            checkAuthErr(ret, done);
        });
    });

    it("application secret is wrong", function(done)
    {
        let o = cfg.CreateConfigurationObject();
        o.application_secret = "ABCDEF";
        func(o, function(ret)
        {
            checkAuthErr(ret, done);
        });
    });
});