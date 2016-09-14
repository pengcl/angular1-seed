var express = require('express');
var request = require('request');
var router = express.Router();

/* GET api listing. */
router.get('/', function (req, res, next) {
    res.send("api it's ready");
});

function each(objArray, funName) {
//功能: 用函数 funName 对数组 objArray 中的每个值进行处理一次，
    for (var i = 0; i < objArray.length; i++) {
        funName(objArray[i], i);
    }
}

router.get('/getFlowPackages', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross           // Domain Request
    request('http://m.gd189fq.com/yfqcz/czOrdRechargeController.do?proListAll&cardType=0', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(eval(body)[0]);
            var jsonData = new Array();
            var data = new Array();
            each(eval(body), function (o, i) {
                data = {"id": o.id, "n": o.name, "op": o.monthRent, "p": o.salesPrice,'fs':o.flowSize};
                jsonData.push(data);
            });
            res.send(jsonData);
        }
    });
});

router.get('/getNumber', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross           // Domain Request
    request('http://m.gd189fq.com/wap/taokafanghaoNew/fetchNumber.html', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    });
});

module.exports = router;
