var body = $response.body;
var obj = JSON.parse(body);
var url = $request.url;

// 最大值限制
var MAX_SRE = 11650;


data.jbqkDetail.kjywrMc= $request.url

body = JSON.stringify(obj);
$done({body});
