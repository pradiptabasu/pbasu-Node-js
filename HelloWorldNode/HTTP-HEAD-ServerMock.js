var http = require("http");

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}


http.createServer(function (request, response) {

	var cookies = parseCookies(request);
	console.log(cookies);
	if (request.method = 'HEAD')
		response.writeHead(200, {
			'set-cookie': 'vfct=dsl; path=/; domain=vodafone.de; expires=Fri, 11-Dec-2017 16:43:23 GMT,mint-session-id=213123vhgh; Path=/; HttpOnly; secure,mint=.decdec; path=/;',
		});
	response.end();
}).listen(9081);

// Console will print the message
console.log('Server running at http://127.0.0.1:9081/');