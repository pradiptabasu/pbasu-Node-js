var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';
AWS.config.update({
      accessKeyId: "AKIAIQPHZD3EW2VDYSMQ",
      secretAccessKey: "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",
});

var sns = new AWS.SNS();
var params = {
    Message: "hello from pradipta SNS via lambda",
    MessageStructure: 'string',
    PhoneNumber: '+917710922196'
};

sns.publish(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});