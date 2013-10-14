
/*
 * GET home page.
 */
var serverHost = 'localhost';
var serverPath = '/postStatusList';
var serverPort = 3000;
var ping = require('ping');
var http = require('http');


var hosts = ['127.0.0.1', 'google.com', 'yahoo.com'];
// http.post = require('http-post');
setInterval(actPing, 3000);
exports.index = function(req, res){


	// for (var i = 0; i < hosts.length; i++) {
	// 	var host = hosts[i];
	//     ping.sys.probe(host, function(result){
	//         var msg = result.isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
	//         console.log(msg);
	//         var status = result.isAlive ? 'ok' : 'failed';
	// 		var pingResultArray = new Array();
	//         pingResultArray[pingResultArray.length] = {ipEnd: result.address, status:status};
	// 		if(pingResultArray.length > 0){
	// 			postData(JSON.stringify(pingResultArray));
	// 		}	        
	//     });		
	// };

	// console.log('index =>');
	// var dataPost = '[{"ipEnd":"ipend3","status":"ok","timeStamp":"time1"}]';
	// console.log(pingResultArray);
	// postData(dataPost);
	// console.log('index => ');


	actPing();
  res.render('index', { title: 'Express' });
};
function actPing(){
	// var hosts = ['127.0.0.1'];

	hosts.forEach(function(host){
	    ping.sys.probe(host, function(result){
	        var msg = result.isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
	        console.log(msg);
	        var status = result.isAlive ? 'ok' : 'failed';
			var pingResultArray = new Array();
	        pingResultArray[pingResultArray.length] = {ipEnd: result.address, status:status};
			if(pingResultArray.length > 0){
				postData(JSON.stringify(pingResultArray));
			}	 
	    });
	});	
}
function postData(data2Post){
	var options = {
	  hostname: serverHost,
	  port: serverPort,
	  path: serverPath,
	  method: 'POST'
	};

	var req = http.request(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    console.log('BODY: ' + chunk);
	  });
	});
	req.on('response', function(e){
		console.log('response coming...')
	});
	req.on('error', function(e) {
	  	console.log('problem with request: ' + e.message);
		// req.abort();
	});

	// write data to request body
	console.log('post data => '+data2Post);
	req.write(data2Post);
	// req.write('data\n');
	req.end();	
	// req.abort();
}