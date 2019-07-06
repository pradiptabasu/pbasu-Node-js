// http server for IIS
// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('Hello, world! [helloworld sample; iisnode version is ' 
//           + process.env.IISNODE_VERSION + ', node version is ' + process.version + ']');
// }).listen(process.env.PORT);  


//express server for IIS
//    http://localhost:<portNumber>/ 
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('Express is working on IISNode!');
});
app.listen(process.env.PORT);