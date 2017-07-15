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

    $scope.selectedProd = function (product) {
        $scope.product = product;
    };

    $scope.buyProd = function (product) {
        $scope.regionProduct = product;
        MarketSvc.pay($scope.mobile, $scope.product.productId, product.productFlowPriceId, $scope.product.carrier, 'flowBag', $scope.gh, encodeURIComponent('http://mall.yfq.cn/payState/A/flow?returnUrl=' + encodeURIComponent(window.location.href))).then(function success(data) {
            if (data.result) {
                window.location.href = data.payUrl;
            } else {
                console.log(data.msg);
            }
        });
    };

    $scope.showOverlay = function () {
        $scope.$root.Overlay.open($("#flowTips").html());
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
