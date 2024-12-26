// 原始数据
let response = $response.body;

// 最大值限制
const MAX_SRE = 11650;

// 更新 nsmxList 数据
response.data.nsmxList.forEach(item => {
    if (item.sre > MAX_SRE) {
        // 计算倍率
        const multiplier = MAX_SRE / item.sre;
        // 更新 sre 和 ybtse
        item.sre = MAX_SRE;
        item.ybtse = parseFloat((item.ybtse * multiplier).toFixed(2));
    }
});

// 重新统计 sreHj 和 ybtseHj
response.data.sreHj = response.data.nsmxList.reduce((sum, item) => sum + item.sre, 0);
response.data.ybtseHj = parseFloat(
    response.data.nsmxList.reduce((sum, item) => sum + item.ybtse, 0).toFixed(2)
);

// 输出修改后的数据
console.log(response);
