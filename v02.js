var body = $response.body;
var obj = JSON.parse(body);
var url = $request.url;

// 最大值限制
var MAX_SRE = 11650;

if(url.includes('cxNsmxList')){
	obj.data.nsmxList.forEach(item => {
		if (item.sre > MAX_SRE) {
			if (item.skssqq > 1728822000000) {
				MAX_SRE = 14150;
			}else{
				MAX_SRE = 13150;
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
}else if(url.includes('cxNsmxXq')){
	if (obj.data.jbqkDetail.skssqq > 1728822000000) {
		MAX_SRE = 14150;
	} else {
		MAX_SRE = 13150;
	}

	// 更新 sbjlSre 和 nj.sre
	if (obj.data.jbqkDetail.sbjlSre > MAX_SRE) {
		const multiplier = MAX_SRE / obj.data.jbqkDetail.sbjlSre;

		obj.data.jbqkDetail.sbjlSre = MAX_SRE; // 更新 sbjlSre
		obj.data.nj = parseFloat((obj.data.nj * multiplier).toFixed(2)); // 更新 nj.sre

		// 更新 sbjlYbtse
		obj.data.jbqkDetail.sbjlYbtse = parseFloat(
			(obj.data.jbqkDetail.sbjlYbtse * multiplier).toFixed(2)
		);

		// 更新 skjsDetail.ssxdjmse.ybtse
		if (obj.data.skjsDetail && obj.data.skjsDetail.ybtse) {
			obj.data.skjsDetail.ybtse = parseFloat(
				(obj.data.skjsDetail.ybtse * multiplier).toFixed(2)
			);
		}
	}

	// 重新统计 sreHj 和 ybtseHj，如果存在 nsmxList
	if (obj.data.nsmxList) {
		obj.data.sreHj = obj.data.nsmxList.reduce((sum, item) => sum + item.sre, 0);
		obj.data.ybtseHj = parseFloat(
			obj.data.nsmxList.reduce((sum, item) => sum + item.ybtse, 0).toFixed(2)
		);
	}
}
body = JSON.stringify(obj);
$done({body});
