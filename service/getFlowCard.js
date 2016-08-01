var express = require('express');
var router = express.Router();

/* GET api listing. */
router.get('/getFlowCard', function (req, res) {
    res.send("1");
    console.log("1");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross           // Domain Request
    request('http://www.google.com', function (error, response, body) {
        res.send("1");
    });
});

module.exports = router;
