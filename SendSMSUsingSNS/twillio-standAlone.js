//var twilio = require('twilio');
var accountSid = "AC703b98d63535e912710854549719a9b9";
var authToken = "d294a2160ec62c605cd6408daccfe588";
var client = require('twilio')(accountSid, authToken);
function callPhoneAAA(alexaContext)
{
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
    });
}