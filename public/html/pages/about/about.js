"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('about', { //关于我们
            url: "/about",
            templateUrl: "pages/about/about.html",
            controller: "aboutController"
        });
}]).controller('aboutController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
    $http.jsonp(cfApi.apiHost + "/product/getWxParameter.html?s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        //console.log(data[0]);



        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data[0].appId, // 必填，公众号的唯一标识
            timestamp: data[0].timestamp, // 必填，生成签名的时间戳
            nonceStr: data[0].nonceStr, // 必填，生成签名的随机串
            signature: data[0].signature,// 必填，签名，见附录1
            jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }).error(function (data, status, headers, config) {
        console.log(status);
    });
}]);
