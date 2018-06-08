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