var express = require('express');
var request = require('request');
var router = express.Router();

/* GET api listing. */
router.get('/', function (req, res, next) {
    res.send("接口准备好了");
});

function each(objArray, funName) {
//功能: 用函数 funName 对数组 objArray 中的每个值进行处理一次，
    for (var i = 0; i < objArray.length; i++) {
        funName(objArray[i], i);
    }
}

//获取流量卡
router.get('/getFlowPackages', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    //以上两行设置跨域请求
    request('http://m.gd189fq.com/yfqcz/czOrdRechargeController.do?proListAll&cardType=0', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(eval(body)[0]);
            var jsonData = new Array();
            var data = new Array();
            each(eval(body), function (o, i) {
                data = {
                    "id": o.id,
                    "n": o.name,
                    "op": o.monthRent,
                    "p": o.salesPrice,
                    'fs': o.flowSize
                };
                jsonData.push(data);
            });
            res.send(jsonData);
        }
    });
});

//获取流量卡充值卡
router.get('/getFlowRechargeCard', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    //以上两行设置跨域请求
    request('http://m.gd189fq.com/yfqcz/czOrdRechargeController.do?proList', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(eval(body)[0]);
            var jsonData = new Array();
            var data = new Array();
            each(eval(body), function (o, i) {
                data = {
                    "id": o.id,
                    "n": o.name,
                    "p": o.salesPrice,
                    'w': o.weight
                };
                jsonData.push(data);
            });
            res.send(jsonData);
        }
    });
});

//获取用户持有流量卡
router.get('/getUserFlowCards/:contractMobiNum', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    //以上两行设置跨域请求
    request('http://m.gd189fq.com/yfqcz/czOrdRechargeController.do?userItems&mobileNo=' + req.params.contractMobiNum, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(eval(body)[0]);
            var jsonData = new Array();
            var data = new Array();
            each(eval(body), function (o, i) {

                //判断卡状态 开始
                var cardStatus;
                if (o.cardStatus == 0 && o.activeStatus == 1) {
                    if (o.balance - o.overdue >= 0) {
                        cardStatus = "停机";
                    } else {
                        cardStatus = "欠费停机";
                    }
                }
                if (o.activeStatus == 2) {
                    cardStatus = "待使用";
                }
                if (o.activeStatus == 0) {
                    if (o.balance > 0) {
                        cardStatus = "未激活";
                    } else {
                        cardStatus = "未充值";
                    }
                }
                if (o.activeStatus == 3) {
                    if (o.balance > 0) {

                    } else {
                        cardStatus = "未充值";
                    }
                }
                if (o.cardStatus == 1 && o.activeStatus == 1 || o.cardStatus == null && o.activeStatus == 1) {
                    if (o.balance - o.overdue < 0) {
                        cardStatus = "欠费";
                    } else {
                        cardStatus = "正常";
                    }
                }
                //判断卡状态 结束

                //重新封装数据
                data = {
                    "iccid": o.iccid,
                    "pkg": o.monthRent,
                    "fs": o.cardflowsize,
                    "b": (o.balance - o.overdue),
                    "s": cardStatus
                };
                jsonData.push(data);
            });
            res.send(jsonData);
        }
    });
});

//获取充值记录
router.get('/getUserFlowRecords/:iccid', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    //以上两行设置跨域请求
    request('http://m.gd189fq.com/yfqcz/czOrdRechargeController.do?userRecharge&iccid=' + req.params.iccid, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(eval(body)[0]);
            var _body = new Array();
            var obj = new Array();
            each(eval(body), function (o, i) {

                //重新封装数据
                data = {
                    "iccid": o.iccid,
                    "on": o.rechargeOrdNum,
                    "pn": o.payMoney,
                    "pm": o.paymethod,
                    "ct": o.createTime
                };
                jsonData.push(obj);
            });
            res.send(_body);
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
