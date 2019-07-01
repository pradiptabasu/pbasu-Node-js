/* APIX-simulator.js
   "APIX-simulator" nodejs service.
   Usage:  node APIX-simulator.js <port>
   Author: Pradipta Basu
 */


//First checking passed in args to take precedence. We need the port so we will raise an alert if not given.
var args = process.argv.slice(2);
if (!args[0]) {
	// If the port is not passed in, then will check for MOCK_PORT env variable
	if (!process.env.MOCK_PORT) {
		//Cannot resolve the port, so raising the exception
		console.log('Usage: node APIX-simulator.js <port>');
	} else {
		//Port was not passed in, but env variable is set, so taking that.
		args[0] = process.env.MOCK_PORT;
	}
}


var express = require('express');
var os = require('os');
var url = require('url');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var fs = require('fs');
var certificatefilepath = "D:\\Workspace\\EclipseNeon-AWS\\VodafoneGermanyAlexa\\simulators\\";

var app = express();
var port = args[0];


var userinfoResponse = {
		"phone_number": "491723445774"
};


var sendSMSResponse = {};



//function defaultContentTypeMiddleware (req, res, next) {
//req.headers['content-type'] = req.headers['content-type'] || 'application/json';
//next();
//}

//app.use(defaultContentTypeMiddleware);
app.use(bodyParser.json({ type: '*/*' }));

//simulator for fetchMSISDN
app.get('/userinfo', function(req, res) {
	res.statusCode = 200;
	res.json(userinfoResponse);
});



///account api
app.post('/v1/singlesms/smsmessaging/outbound/vf_voice_assist_dev/requests', function(req, res) {
	
	//console.log(req.headers);
	if( (req.headers['accept'] === 'application/json') && (req.headers['authorization']) )
	{
		console.log('inside header check  ...');
		if( (req.body.outboundSMSMessageRequest.senderAddress === "vf_voice_assist_dev") && (req.body.outboundSMSMessageRequest.outboundSMSTextMessage.message) && (req.body.outboundSMSMessageRequest.address[0].indexOf('tel:+') > -1) )
		{
			console.log('inside body check  ...');
			res.statusCode = 200;
			sendSMSResponse.response = 'SMS sent';
			res.json(sendSMSResponse);
		}
		else
		{
			  res.statusCode = 404;
			  res.end('body check failed!');
		}
	}
	else
	{
		  res.statusCode = 404;
		  res.end('header check failed!');
	}
});



var mintStep1Response = {
	    "actionType": "com.uxpsystems.mint.framework.bpm.process.ManualInputStepAction",
	    "processId": "8031023d-1552-4335-96e8-12cad365dbb5",
	    "displayMessage": "Provide MSISDN number",
	    "parameters": {
	        "msisdn": "String"
	    },
	    "stepName": "provide-msisdn",
	    "lastStep": false,
	    "validationRegex": [
	        "^49[0-9]{10,11}"
	    ]
	}


///mint step1 api
app.post('/mint/process/start/com.uxpsystems.mint.vodafone.process.frontend.ValidateMsisdnViaSms', function(req, res) {
	res.statusCode = 200;
	res.json(mintStep1Response);
});



var mintStep2Response = {
	    "actionType": "com.uxpsystems.mint.framework.bpm.process.ManualInputStepAction",
	    "processId": "8031023d-1552-4335-96e8-12cad365dbb5",
	    "displayMessage": "Provide TAN",
	    "parameters": {
	        "tan": "String"
	    },
	    "stepName": "provide-tan",
	    "lastStep": false,
	    "validationRegex": [
	        "[0-9]{6}"
	    ]
	}

var mintStep3Response = {
	    "actionType": "com.uxpsystems.mint.framework.bpm.process.ManualInputStepAction",
	    "processId": "8031023d-1552-4335-96e8-12cad365dbb5",
	    "displayMessage": "Provide TAN",
	    "parameters": {
	        "tan": "String"
	    },
	    "stepName": "provide-tan",
	    "lastStep": false,
	    "validationRegex": [
	        "[0-9]{6}"
	    ]
	}

///mint step2 & step3 api
app.put('/mint/process/step', function(req, res) {
	if( (req.body.processId) && (req.body.stepName) )
	{
		if( req.body.stepName === "provide-msisdn" )
		{
			if((req.body.parameters.msisdn))
			{
				res.statusCode = 200;
				res.json(mintStep2Response);
			}
			else
			{
				res.statusCode = 404;
				res.end('body check failed!  msisdn absent');
			}
		}
		else if( req.body.stepName === "provide-tan" )
		{
			if((req.body.parameters.tan))
			{
				let options = {
					expires : new Date() + 45,
				    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
				    httpOnly: true, // The cookie only accessible by the web server
				    //signed: true // Indicates if the cookie should be signed
				}

				// Set cookie
				res.cookie('mint-sso-token', 'Y3FYc1VKSEo3aXpjRVlHMWI2M1NBQT09Olk5Wi9CZWZmNFJVL3lwVWRQZGdpMkE9PTozNkY5NkJDNjkxOURFMUNCMThBMEVBOERDOUI1RDU5NQ', options) // options is optional
			    res.statusCode = 200;
				res.json(mintStep2Response);
			}
			else
			{
				res.statusCode = 404;
				res.end('body check failed!  tan absent');
			}			
		}
	}
	else
	{
		  res.statusCode = 404;
		  res.end('body check failed!  processid/stepName absent');
	}
});





var sslOptions = {
	key: fs.readFileSync(certificatefilepath + 'key.pem'),
	cert: fs.readFileSync(certificatefilepath + 'cert.pem'),
	passphrase: "password"
};


//Creating the server process
https.createServer(sslOptions, app).listen(port);
console.log('Listening on port ' + port);


