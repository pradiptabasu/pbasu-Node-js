var http = require( "http" );
var https = require( "https" );
var url = require( "url" );

const getMintShortToken = function(mintLongTermToken)
{
	return new Promise((resolve, reject) => {
		var urlstring = "https://www.vodafone.de/mint/session/start";		
		var parsedurl = url.parse( urlstring );
		var CookieValue = 'mint-sso-token=' + mintLongTermToken;
		var options = {
		  protocol: parsedurl.protocol,
		  hostname: parsedurl.hostname,
		  port: (parsedurl.port || 443),
		  method: 'HEAD',
		  path: parsedurl.path,
		  headers: {'Cookie': CookieValue },
		};

		var mintSessionId;
		
		var request = https.request(options, (response) =>{
			var setcookie = [ 'mint-session-id=BE0417955E8D0CEFDCB6A504F4C720EB; Path=/; HttpOnly; secure','mint=.demcp1hr; path=/; Domain=www.vodafone.de;secure;HttpOnly' ];
			if (setcookie) {
		    	setcookie.forEach(function ( cookiestr ) {
		    		if(cookiestr.indexOf('mint-session-id') > -1)
		    		{
		    			cookiestr && cookiestr.split(';').forEach(function(cookie ) {
		    		    	if( (cookie.indexOf('mint-session-id') > -1) )  {
		    		    		cookie && cookie.split('mint-session-id=').forEach(function( subCookie ) {
		    		    	    	if(subCookie)  {
		    		    	    		mintSessionId = subCookie;
		    						}
		    					});
		    				}
		    			});
		    		}
		    	});
		    }
			response.on('end', () => resolve(mintSessionId));
			request.end(); // let request know it is finished sending
		});
		request.on('error', (err) => reject(err))
	})
};

getMintShortToken('BE0417955E8D0CEFDCB6A504F4C720EB')
.then((html) => console.log(html))
.catch((err) => console.error(err));
