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