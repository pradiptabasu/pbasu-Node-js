var Q = require('q')
var https = require('https')
var url = require('url')
var unirest = require('unirest')
var chai = require("chai")
var assert = chai.assert
var expect = chai.expect;
var should = chai.should()

function getCall() {
    var Request = unirest.get("https://www.google.com/");
    Request.strictSSL(false);
    Request.end(function (response) {
        console.log("in get response");
        if (response.statusCode === 200) {
            console.log("in success");
        } else {
            console.log("in not success")
        }
        console.log("end get response");
    }).on('error', function (e) {
        console.log("REST get Call error: " + e.message)
    })
}

function postCall() {
    var RequestPost = unirest.post("http://httpbin.org/post")
        .set('Content-Type', "")
        .send("");
    RequestPost.strictSSL(false);
    RequestPost.end(function (response) {
        console.log("in post response");
        if (response.statusCode === 200) {
            console.log("in success");
        } else {
            console.log("in not success")
        }
        console.log("end post response");
    }).on('error', function (e) {
        console.log("REST post Call error: " + e.message)
    })
}

getCall();
postCall();


this._get = function (getUrl, done) {
    var Request = unirest.get(getUrl);
    Request.strictSSL(false)
    Request.end(function (response) {
        if (response.statusCode === 200) {
            done(null, {
                result: response.body,
                statusCode: response.statusCode
            })
        } else {
            done(null, {
                result: response.body,
                statusCode: response.statusCode,
                "errorName": "SIGMA_CS_Error",
                "errorMessage": response.statusMessage
            })
        }
    }).on('error', function (e) {
        done(new Error("REST Call error: " + e.message))
    })
}


var fn = Q.denodeify(this._get)
var testGetUrl = "https://www.google.com/"
fn(testGetUrl).then(function (data) {
    var response = data.result;
    console.log("Result: " + response)
    console.log("StatusCode: " + data.statusCode)

    if (data.statusCode === 200) {
        //    process.exit(0);
    } else {
        process.exit(data.statusCode);
    }
})