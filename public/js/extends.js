'use strict';

//全局统计
var userTrack = function (appType, actionName) {

};

var $container = $("#container");

$container.on('click','.js-menu',function (e) {
    $("#container").addClass('menu-open');
});

$container.on('click','.js-back',function (e) {
    console.log("back");
});

$(".content-overlay").click(function (e) {
    $("#container").removeClass('menu-open');
});

//Document ready事件
$(document).ready(function () {
    $("html").css("font-size",($container.width() / 320) * parseInt($("html").css("font-size")));
});

//手机号处理 开始
function getNumArr(orderNumber,jsonData) {
    var jdata = findJsonData(orderNumber,jsonData);
    var numArr = getPosNum(orderNumber, jdata);
    return numArr;
}

function findJsonData(orderNumber,jsonData) {
    if (orderNumber == null) {
        return jsonData;
    }
    var result = [];
    var len = jsonData.length;
    var t = 0;
    for (var i = 0; i < len; i++) {
        var no = jsonData[i].n;
        if (no.indexOf(orderNumber) != -1) {
            result[t] = no;
            t = t + 1;
        }
    }
    return result;
}

function getPosNum(orderNumber, data) {
    if (orderNumber == null || data == null) {
        return null;
    }

    var pos = orderNumber.length;
    var posdata = new Array();

    var len = data.length;
    for (var i = 0; i < len; i++) {
        var no = data[i];
        var c = no.substring(pos, pos + 1);
        if (posdata != null && posdata.indexOf(c) == -1) {
            posdata.push(c);
        }
    }
    return posdata;
}

//手机号处理 结束