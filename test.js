getterNumber = function () {
    var baseTimestamp = Date.parse('2017/12/28 00:00:00');
    var timestamp = Date.parse(new Date());
    console.log(1000 + Math.round((timestamp - baseTimestamp)/(15 * 60 *1000)));
};

getterNumber();