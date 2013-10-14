
/*
 * GET home page.
 */

var statusList = new Array();

Date.prototype.format = function(format)  
{  
	/* 
	* format="yyyy-MM-dd hh:mm:ss"; 
	*/  
	var o = {  
	"M+" : this.getMonth() + 1,  
	"d+" : this.getDate(),  
	"h+" : this.getHours(),  
	"m+" : this.getMinutes(),  
	"s+" : this.getSeconds(),  
	"q+" : Math.floor((this.getMonth() + 3) / 3),  
	"S" : this.getMilliseconds()  
	}  
	if (/(y+)/.test(format))  
	{  
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4  
	- RegExp.$1.length));  
	}  
	  
	for (var k in o)  
	{  
		if (new RegExp("(" + k + ")").test(format))  
	{  
		format = format.replace(RegExp.$1, RegExp.$1.length == 1  
		? o[k]  
		: ("00" + o[k]).substr(("" + o[k]).length));  
	}  
	}  
	return format;  
}  

exports.index = function(req, res){
  res.render('index', { title: 'Ping Service' });
};
exports.ipEndStatusList = function(req, res){
	// var time = new Date();  
	// var pingResults = new Array();
	// for (var i = 0; i < 4; i++) {
 //  		pingResults[pingResults.length] = {ipEnd:'ipend'+(i+1), status:'ok', timeStamp: time.format('yyyy-MM-dd hh:mm:ss"')};

	// };
	var str = JSON.stringify({status:'success', data:statusList});
	res.send(str);
  // var jsonStr = '[{"ipEnd":"ipend1","status":"ok","timeStamp":"time1"},{"ipEnd":"ipend2","status":"ok","timeStamp":"time2"},{"ipEnd":"ipend3","status":"ok","timeStamp":"time3"}]';

};
exports.postStatusList = function(req, res){
	var time = new Date();  
	var rawBody = req.rawBody;
	console.log('rawBody =>'+rawBody);
	// console.log('body => '+req.body);
	var list = JSON.parse(rawBody);
	for (var i = 0; i < list.length; i++) {
		var newStatus = list[i];
		newStatus.timeStamp = time.format('yyyy-MM-dd hh:mm:ss');
		updateStatus(newStatus);
	};
	res.end();
};

function updateStatus(status){
	var temp = getStatusByIP(status.ipEnd);
	if(temp == null){
		statusList[statusList.length] = status;
	}else{
		temp.status = status.status;
		temp.timeStamp = status.timeStamp;
		console.log(temp.timeStamp);
	}
}
function getStatusByIP(ip){
	var len = statusList.length;
	for(var i =0; i< len; i++){
		if(statusList[i].ipEnd == ip){
			return statusList[i];
		}
	}
	return null;
}

// ContentType: application/text;charset=utf-8
// Content-Length: 56