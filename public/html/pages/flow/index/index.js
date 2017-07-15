"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flow', { //关于我们
            url: "/flow",
            templateUrl: "pages/flow/index/index.html",
            controller: "flowController"
        });
}]).controller('flowController', ['$scope', '$location', '$cookieStore', 'MarketSvc', function ($scope, $location, $cookieStore, MarketSvc) {
    if ($cookieStore.get('rechargeMobile')) {
        $scope.mobile = $cookieStore.get('rechargeMobile');
    }

    $scope.pay = function (mobile, productId, productFlowPriceId, carrier, activityTag, channelCode) {
        MarketSvc.pay(mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, encodeURIComponent('http://mall.yfq.cn/payState/A/flow?returnUrl=' + encodeURIComponent(window.location.href))).then(function success(data) {
            if (data.result) {
                window.location.href = data.payUrl;
            } else {
                console.log(data.msg);
            }
        });
    };

    $scope.showOverlay = function () {
        $scope.state.overlay.open(true, $("#flowTips").html());
    };

    $scope.$watch('mobile', function (n, o, $scope) {
        $scope.product = null;
        $scope.regionProducts = null;
        $scope.regionProduct = null;
        $scope.listData = null;
        if (n) {
            $cookieStore.put('rechargeMobile', n);
            MarketSvc.getFlows(n).then(function success(data) {
                $scope.listData = data;
            });
        }
    });
}]);
