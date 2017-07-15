var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('FlowPackages', ['$resource', function ($resource) {
    return $resource('http://app.gd189fq.com:3099/api/getFlowPackages/:cardType', null, {
        query: {method: 'GET', params: {cardType: '0'}, isArray: true}
    });
}]);

appServices.factory('Phone', ['$resource','$q', function ($resource,$q) {
    return $resource('/data/phones/:phoneId.json', {}, {
        query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
    });
}]);

appServices.factory("UserAgentSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    var av = navigator.appVersion;//window.navigator 对象包含有关访问者浏览器的信息。
    var ua = navigator.userAgent;

    var getPlatform = function () {//获取手机平台
        if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
            return "iPhone"
        }
        return "Android"
    };

    var checkWx = function () {//检查是否微信
        var a = av.toLowerCase();
        if (a.match(/MicroMessenger/i) == "micromessenger") {
            return true
        } else {
            return false
        }
    };

    service.isWx = checkWx();
    service.platform_os = getPlatform();

    return service;
}]);

appServices.factory("MarketSvc", ['$http', '$q', function ($http, $q) {
    var service = {};
    service.getFlows = function (mobile) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp('http://sell.yfq.cn/product/findProductFlows.ht?mobile=' + mobile + "&callback=JSON_CALLBACK").success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.pay = function (mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, successUrl) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp('http://sell.yfq.cn/order/submitFlowOrder.ht?mobile=' + mobile + '&productId=' + productId + '&productFlowPriceId=' + productFlowPriceId + '&carrier=' + carrier + '&activityTag=' + activityTag + '&channelCode=' + channelCode + '&successUrl=' + successUrl + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);