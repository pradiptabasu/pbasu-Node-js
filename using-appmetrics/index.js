//run as -----> node --trace_gc --expose_gc --inspect --max-old-space-size=512 .\index.js
//call as ----> http://localhost:8880/leak?size=256

var appmetrics = require('appmetrics');
var monitoring = appmetrics.monitor();

const http = require('http');
var express = require('express');
// var router = express.Router();
var serverApp = express();

var theThing = null;



// INSTRUMENTATION START HERE

//Below options is used to configure conectivity and data push to InfluxDB
//https://www.influxdata.com/blog/instrumenting-your-node-express-application/
const options = {
    port: 8186,
    path: '/write?precision=ms',
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  };
  monitoring.on('cpu', (cpu) => {
    const postData = `cpu_percentage,host=AmazonBay process=${cpu.process},system=${cpu.system} ${cpu.time}`;
    console.log("cpu data ------>>>>>>>  " + postData);
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
  
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.write(postData);
    req.end();
  });
  
  monitoring.on('eventloop', (eventLoop) => {
    const postData = `event_loop_latency,host=AmazonBay min=${eventLoop.latency.min},max=${eventLoop.latency.max},avg=${eventLoop.latency.avg} ${eventLoop.time}`;
    console.log("eventloop data ------>>>>>>>  " + postData);
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
  
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.write(postData);
    req.end();
  });
  
  monitoring.on('gc', (gc) => {
    const postData = `gc,host=AmazonBay,type=${gc.type} size=${gc.size},used=${gc.used},duration=${gc.duration} ${gc.time}`;
    console.log("gc data ------>>>>>>>  " + postData);
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
  
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.write(postData);
    req.end();
  });
  
  monitoring.on('memory', (memory) => {
    const postData = `memory,host=AmazonBay physical_total=${memory.physical_total},physical_used=${memory.physical_used},physical_free=${memory.physical_free},virtual=${memory.virtual},private=${memory.private},physical=${memory.physical} ${memory.time}`;
    console.log("memory data ------>>>>>>>  " + postData);
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
  
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.write(postData);
    req.end();
  });
  
  monitoring.on('http', (request) => {
    const postData = `HTTP_requests,host=AmazonBay,method=${request.method},url=${request.url} duration=${request.duration}  ${request.time}`;
    console.log("http data ------>>>>>>>  " + postData);
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
  
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.write(postData);
    req.end();
  });
  
  monitoring.on('postgres', (postgres) => {
    const postData = `Postgres_queries,host=AmazonBay duration=${postgres.duration} ${postgres.time}`;
    console.log("postgres data ------>>>>>>>  " + postData);
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
  
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.write(postData);
    req.end();
  });
  
  // INSTRUMENTATION END HERE





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
