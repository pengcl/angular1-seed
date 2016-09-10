var express = require('express');
var request = require('request');
var router = express.Router();

/* GET api listing. */
router.get('/', function (req, res, next) {
    res.send("api it's ready");
});

router.get('/getFlowPackages', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross           // Domain Request
    request('http://m.gd189fq.com/yfqcz/czOrdRechargeController.do?proListAll', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
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
