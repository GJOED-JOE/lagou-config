var body = $response.body;
var obj = JSON.parse(body);

// 原始数据
// let body = $response.body;

// 最大值限制
var MAX_SRE = 11650;
// if (body) {
// switch (true) {
// 推荐内容过滤
// case /web\/sb\/yd\/gg\/cxNsmxList/.test($request.url):
// 更新 nsmxList 数据
obj.data.nsmxList.forEach(item => {
    if (item.sre > MAX_SRE) {
		if (item.skssqq > 1728822000000) {
			MAX_SRE = 12650;
		}else{
			MAX_SRE = 11650;
		}
        // 计算倍率
        const multiplier = MAX_SRE / item.sre;
        // 更新 sre 和 ybtse
        item.sre = MAX_SRE;
        item.ybtse = parseFloat((item.ybtse * multiplier).toFixed(2));
    }
});

// 重新统计 sreHj 和 ybtseHj
obj.data.sreHj = obj.data.nsmxList.reduce((sum, item) => sum + item.sre, 0);
obj.data.ybtseHj = parseFloat(
	obj.data.nsmxList.reduce((sum, item) => sum + item.ybtse, 0).toFixed(2)
);

// 输出修改后的数据
// console.log(response);
// break;
// default:
// $done({});
// }
// $done(body);

// }else{
// $done({});
// }

body = JSON.stringify(obj);
$done({body});
