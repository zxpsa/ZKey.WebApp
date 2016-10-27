module.exports = function(req, res, next) {
    if (req.method=="GET") {//Get请求
       res.write(JSON.stringify(req.query));
       res.write(JSON.stringify(req.params));
    }else{//POST请求处理
    	res.write(JSON.stringify(req.body));
    }
//输出json格式数据Demo
//  res.writeHead(200,{"Content-Type":"text/json"});
//  var json={
//		"Data": {
//			"UserName": "星辰",
//			"UserAccount": "15123085382",
//			"Token": "D0AF8D52D22275654ED93C4BB02E76155A028C3831CAF087899CFAEC8B7EEC4D"
//		},
//		"Desc": "成功",
//		"Code": 100,
//		"IsSuccess": true
//	};
//	res.write(JSON.stringify(json));
//	res.end();

  	// set custom header.
  	// res.setHeader('xxxx', 'xxx');
	res.end('The time is ' + Date.now());
};