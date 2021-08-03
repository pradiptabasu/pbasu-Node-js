var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.177d2574-9f57-45c1-b85a-b98fc871f581';
var APP_NAME = 'Demo';
var Q = require('q');

exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', "Welcome to the Sprint SkillSet");
    },

    'Introduction': function () {
        this.emit(':ask', "Hello all, this is a demo developed by Mphasis.");
    },

    'sendSMS': function () {
        var skill = delegateSlotCollection.call(this);
        if  (!skill) { 
            return;
        }
        var destination = this.event.request.intent.slots.destination.value;
        var text = this.event.request.intent.slots.text.value;
        //var dest_phone = '+917710922196';
        var slots = this.event.request.intent.slots;
        var messageSend = text;

        if (slots.destination.value && slots.text.value) {
            if (this.event.request.dialogState === "COMPLETED") {
                console.log("slots.destination.value", slots.destination.value);
                console.log("slots.text.value", slots.text.value);
                var  params  =   {  
                    Message: messageSend,
                      MessageStructure:   'string',
                      PhoneNumber:   '+917710922196'
                };
                console.log("Message Sent : " + messageSend);
                /**test zone */
                var app = require('./app.js');
                app.sendSMS(function (err, resp) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(resp);
                    }
                });
                //var AWS = require('aws-sdk');
                //var message = "Testing frooooooooom a variable"
                //var phone = "+918669195176"
                // AWS.config.update({
                //     accessKeyId: "AKIAINW4KXDGC4T46ECA",
                //     secretAccessKey: "FOoiAtoBVl3x4d/RAjNbwerjCCv21aMRpDtDdBoV",
                //     "region": "us-east-1" 
                // });
                // var sns = new AWS.SNS();
                // var myFunction = require('./myFunction.js');
                // myFunction.params(params, function (err, resp){
                //     if (err){
                //         console.log(err);
                //     } else {
                //         console.log("Message has been sent");
                //         console.log("Response is " +JSON.stringify(resp));
                //         sns.publish(resp, function(err, resp){
                //         if (err){
                //             console.log(err);
                //         } else {
                //             console.log("Message sent successfully : " + resp);
                //         }
                //         });

                //     }
                // });
            }
            ////////////////////////////////////////////////    
                    
        }
        this.emit(':ask', "The message " + text + " has been sent to " + destination);
    },

    'callMe': function () {
        var app = require('./app.js');
        //var ps = require('process-sync');
        //ps.lock();
        // app.callMe(function (err, resp) {

        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log(resp);
        //     }
        // });
        //ps.unlock();
        // var callPromise = Q.denodeify(app.callMe);
        // callPromise().then(function(data)
        // {
        //     console.log(data);

        // }).then(function(){
        //     this.emit(':tell', "I will call you on your number so that you can hear it or locate it");
        // })

        var accountSid = "AC703b98d63535e912710854549719a9b9";
        var authToken = "d294a2160ec62c605cd6408daccfe588";
        var client = require('twilio')(accountSid, authToken);

        function callPhoneAAA(alexaContext) {
            client.calls
                .create({
                    url: 'http://demo.twilio.com/docs/voice.xml',
                    to: '+917710922196',
                    from: '+15703546475',
                })
                .then(function (call) {
                    console.log(call.sid);
                    console.log("ello ...");
                }).then(function () {
                    console.log("HHHHello ...");
                    alexaContext.emit(':tell', "I will call you on your number so that you can hear it or locate it");
                });
        }

        callPhoneAAA(this);
    },

    'Unhandled': function () {
        this.emit(':ask', "I could'nt  get that.");
    },

    'AMAZON.StopIntent': function () {
        this.emit(':tell', "Stopping the skill for now. Please say the invocation word again to start the skill");
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', "Help function will be available soon.");
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':ask', "Cancelling the previous request.");
    },
};


//++++++++++++++++++++++++++++++Helper Functions:+++++++++++++++++++++++++++++++++++++++++++++++++++ //

function delegateSlotCollection() {
    if (this.event.request.dialogState === "STARTED") {
        console.log("in Beginning");
        var updatedIntent = this.event.request.intent;
        this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
        this.emit(":delegate");
    } else {
        return this.event.request.intent;
    }
}

function randomPhrase(array) {
    // To reply user with random message just before the call back api is initiated.
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return (array[i]);
}
