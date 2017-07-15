"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flowList', { //关于我们
            url: "/flow/list?mobile",
            templateUrl: "pages/flow/list/list.html",
            controller: "flowListController"
        });
}]).controller('flowListController', ['$scope', '$stateParams', '$location', '$cookieStore', 'MarketSvc', function ($scope, $stateParams, $location, $cookieStore, MarketSvc) {
    $scope.mobile = $stateParams.mobile;

    $scope.category = systemName + "_flowBag_A_list";
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
    
    $scope.selectedProd = function (product) {
        $scope.product = product;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);
    };

    $scope.buyProd = function (product) {
        $scope.regionProduct = product;
        MarketSvc.pay($scope.mobile, $scope.product.productId, product.productFlowPriceId, $scope.product.carrier, 'flowBag', $scope.gh, encodeURIComponent('http://mall.yfq.cn/payState/A/flow?returnUrl=' + encodeURIComponent(window.location.href))).then(function success(data) {
            if (data.result) {
                window.location.href = data.payUrl;
                writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);
            } else {
                console.log(data.msg);
            }
        });
    };

    $scope.showOverlay = function () {
        $scope.$root.Overlay.open($("#flowTips").html());
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
