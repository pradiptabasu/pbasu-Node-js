var accountSid = "AC703b98d63535e912710854549719a9b9";
var authToken = "d294a2160ec62c605cd6408daccfe588";
var client = require('twilio')(accountSid, authToken);

var Q = require('q');

//var promise = requrie('promise');

// exports.callMe = function (callback) {
//     return client.calls.create({
//         url: "http://demo.twilio.com/docs/voice.xml",
//         to: '+917710922196',
//         from: '+15703546475'
//     }, function (err, resp) {
//         if (err) {
//             console.log(err);
//             callback(err, null);
//         } else {
//             console.log(resp);
//             callback(null, resp);
//         }
//     });
// };


exports.callMe = function () {
    return client.calls.create({
        url: "http://demo.twilio.com/docs/voice.xml",
        to: '+917710922196',
        from: '+15703546475'
    }, function (err, resp) {
        if (err) {
            console.log(err);
            //callback(err, null);
            return false;
        } else {
            console.log(resp);
            //callback(null, resp);
            return true;
        }
    });
};

exports.sendSMS = function (callback) {
    return client.messages
        .create({
            from: '+15703546475',
            body: 'Aman Abhishek Sinha sending it from Alexa',
            to: '+917710922196'
        })
        .then(message => console.log(message.sid))
        .done();
};