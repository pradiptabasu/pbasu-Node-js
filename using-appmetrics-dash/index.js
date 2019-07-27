//run as -----> node --trace_gc --expose_gc --inspect --max-old-space-size=512 .\index.js
//call as ----> http://localhost:8880/leak?size=256
//appmetrics-dash ----> http://localhost:8880/appmetrics-dash/

//npm install express node-report appmetrics-dash

var dash = require('appmetrics-dash').attach()
var express = require('express');
// var router = express.Router();
var serverApp = express();

var theThing = null;

var replaceThing = function (size) {
  var total = process.memoryUsage().heapTotal;
  var used = process.memoryUsage().heapUsed;
  var originalThing = theThing;
  var unused = function () {
    if(originalThing) console.log("Hi");
  };
  theThing = {
      longStr: new Array(size*1024*1024).join('*'),
      someMethod: function () {
        console.log('someMethod`s output');
    }
  };
  // the following line would fix the memory leak, but commented out for leak purposes:
  // theThing = null;
};

serverApp.get('/leak', function (req, res, next) {
  var sizeInMegaBytes = req.query.size;
  replaceThing(sizeInMegaBytes);
  var memLoad = process.uptime() + ' - ' + Math.round(process.memoryUsage().rss/1024/1024*1000)/1000 + 'MB total, used: ' + Math.round(process.memoryUsage().heapUsed/1024/1024*1000)/1000 + 'MB / ' + Math.round(process.memoryUsage().heapTotal/1024/1024*1000)/1000+'MB';
  console.log(memLoad);
  return res.json({message: 'Heap Memory Load: '+memLoad})
});
serverApp.listen(8880, function() {
  console.log('Listening on port 8880...');
  var memLoad = process.uptime() + ' - ' + Math.round(process.memoryUsage().rss/1024/1024*1000)/1000 + 'MB total, used: ' + Math.round(process.memoryUsage().heapUsed/1024/1024*1000)/1000 + 'MB / ' + Math.round(process.memoryUsage().heapTotal/1024/1024*1000)/1000+'MB';
  console.log(memLoad);
});
