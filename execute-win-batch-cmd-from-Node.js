var bat = require.resolve('../src/util/buildscripts/build.bat');
var profile = require.resolve('../profiles/app.profile.js');
var spawn = require('child_process').spawn;
var ls = spawn(bat, ['--profile', profile]);

ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

ls.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});