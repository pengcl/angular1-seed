var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('FlowPackages', ['$resource', function ($resource) {
    return $resource('http://app.gd189fq.com:3099/api/getFlowPackages/:cardType', null, {
        query: {method: 'GET', params: {cardType: '0'}, isArray: true}
    });
}]);

appServices.factory('Phone', ['$resource', '$q', function ($resource, $q) {
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
        $http.jsonp(cfApi.apiHost + '/product/findProductFlows.ht?mobile=' + mobile + '&type=1&platform=wap&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getFees = function (mobile) {
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + '/product/findProductFlows.ht?mobile=' + mobile + '&type=2&platform=wap&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.pay = function (mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, successUrl, couponNo, referrerId, category) {//获取订单统计 promise对象
        var d = $q.defer();
        //alert(cfApi.apiHost + '/order/submitFlowOrder.ht?mobile=' + mobile + '&productId=' + productId + '&productFlowPriceId=' + productFlowPriceId + '&carrier=' + carrier + '&activityTag=' + activityTag + '&channelCode=' + channelCode + '&successUrl=' + successUrl + '&couponNo=' + couponNo + '&referrerId=' + referrerId + '&category=' + category + '&callback=JSON_CALLBACK');
        $http.jsonp(cfApi.apiHost + '/order/submitFlowOrder.ht?mobile=' + mobile + '&productId=' + productId + '&productFlowPriceId=' + productFlowPriceId + '&carrier=' + carrier + '&activityTag=' + activityTag + '&channelCode=' + channelCode + '&successUrl=' + successUrl + '&couponNo=' + couponNo + '&referrerId=' + referrerId + '&category=' + category + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);

appServices.factory("CouponSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getCouponList = function (mobile) {//获取订单列表 promise对象
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + '/product/getCouponList.ht?recieverMobile=' + mobile + '&callback=JSON_CALLBACK').success(function (data) {
            var isOverdueCount = 0;
            var isUsedCount = 0;
            var length = data[0].couponList.length;
            var couponList = {
                "length": length,
                "couponList": []
            };

            $.each(data[0].couponList, function (i, k) {
                var isOverdue;
                if (k.validEndTime.time - Date.parse(new Date()) >= 0) {//没过期
                    isOverdue = 0;
                } else {//已过期
                    isOverdue = 1;
                    isOverdueCount = isOverdueCount + 1;
                }
                if (k.isUsed == 1) {
                    isUsedCount = isUsedCount + 1
                }
                var obj = {
                    couponNo: k.couponNo,
                    activeUsername: k.activeUsername,
                    couponBatchName: k.couponBatchName,
                    validStartTime: k.validStartTime.time,
                    validEndTime: k.validEndTime.time,
                    isUsed: k.isUsed,
                    callbackUrl: k.callbackUrl,
                    type: k.couponBatchType,
                    isOverdue: isOverdue
                };
                couponList.couponList.push(obj);
            });

            couponList.isOverdueCount = isOverdueCount;
            couponList.isUsedCount = isUsedCount;
            return d.resolve(couponList);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);

appServices.factory("OrderSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getCounts = function (receiverMobile) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp('http://sell.yfq.cn/product/findOrderStatusCounts.ht?receiverMobile=' + receiverMobile + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOrderList = function (receiverMobile, orderStatus) {//获取订单列表 promise对象
        var d = $q.defer();
        $http.jsonp('http://sell.yfq.cn/product/searchOrders.ht?receiverMobile=' + receiverMobile + '&orderStatus=' + orderStatus + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOrder = function (orderNo) {
        var d = $q.defer();
        $http.jsonp('http://sell.yfq.cn/order/getSalesOrder.ht?orderNo=' + orderNo + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getLogistics = function (orderNo) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp('http://sell.yfq.cn/product/findLogistics.ht?orderNo=' + orderNo + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);

"use strict";

appServices.factory('ShareSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    service.config = {
        title: '翼分期商城 - 会员中心',
        desc: '翼分期商城 - 流量话费充值平台',
        summary: '流量话费充值平台',
        site: 'app.yfq.cn',
        pic: '',
        url: 'http://' + window.location.host + '/member/index.ht'
    };

    service.wxShare = function (config) {
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: config.title, // 分享标题
                link: config.link, // 分享链接
                imgUrl: config.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    //$this.show = false;
                }
            });

            wx.onMenuShareAppMessage({
                title: config.title, // 分享标题
                desc: config.desc, // 分享描述
                link: config.link, // 分享链接
                imgUrl: config.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    //$this.show = false;
                }
            });
        });
    };

    service.getShareUrl = function (mobile, pid, gh, category, url, memberId, brandId) {

        var d = $q.defer();
        $http.jsonp("http://sell.yfq.cn/share/doProductShare.ht?mobile=" + mobile + "&pid=" + pid + "&gh=member&category=" + category + "&productUrl=" + url + "&memberId=" + memberId + "&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getShareProduct = function (memberId) {
        var d = $q.defer();
        $http.jsonp("http://sell.yfq.cn/share/findProductShareInfo.ht?memberId=" + memberId + "&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getShares = function (mobile) {
        var d = $q.defer();
        $http.jsonp("http://sell.yfq.cn/product/getShareProduct.ht?Q_isShare_S=0&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);