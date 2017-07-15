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
    
    $scope.category = systemName + "_flowBag_A_index";
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.pay = function (mobile, productId, productFlowPriceId, carrier, activityTag, channelCode) {
        MarketSvc.pay(mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, encodeURIComponent('http://mall.yfq.cn/payState/A/flow?returnUrl=' + encodeURIComponent(window.location.href))).then(function success(data) {
            if (data.result) {
                window.location.href = data.payUrl;
                writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);
            } else {
                console.log(data.msg);
            }
        });
    };

    $scope.showOverlay = function () {
        $scope.state.overlay.open(true, $("#flowTips").html());
    };
    
    //只有输入手机号码才记录到闭环
    $scope.inputMobile = function (mobile) {
        if (mobile == undefined || mobile == "" || mobile.length <= 10) return;
        writebdLog($scope.category, "_InputMobile", "渠道号", $scope.gh);//手机号码
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
