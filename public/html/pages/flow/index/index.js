"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flow', { //关于我们
            url: "/flow",
            templateUrl: "pages/flow/index/index.html",
            controller: "flowController"
        });
}]).controller('flowController', ['$scope', '$stateParams', '$filter', '$location', '$cookieStore', 'MarketSvc', 'CouponSvc', function ($scope, $stateParams, $filter, $location, $cookieStore, MarketSvc, CouponSvc) {
    $scope.mobile = $stateParams.mobile;

    $scope.category = systemName + "_flowBag_A_list";
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    if ($location.search().referrerId) {
        $scope.referrerId = $location.search().referrerId;
    } else {
        $scope.referrerId = "";
    }

    $scope.selectedProd = function (product) {
        $scope.coupons = "";
        $scope.product = product;

        $scope.couponLength = 0;

        if ($scope.product.productName.indexOf('M') !== -1) {
            $scope.product.flowRate = ($scope.product.productName).substring(0, ($scope.product.productName).length - 1);
        }

        if ($scope.product.productName.indexOf('G') !== -1) {
            $scope.product.flowRate = ($scope.product.productName).substring(0, ($scope.product.productName).length - 1) + '000';
        }

        if ($scope.product.flowRate >= 100 && $scope.couponList.length >= 1) {
            $scope.coupons = $scope.couponList[0].couponNo;
            $scope.couponLength = 1;
        }

        if ($scope.product.flowRate >= 500 && $scope.couponList.length >= 2) {
            $scope.coupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
            $scope.couponLength = 2;
        }

        /*if ($scope.product.flowRate >= 1000 && $scope.couponList.length >= 3) {
            $scope.coupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo + "," + $scope.couponList[2].couponNo;
            $scope.couponLength = 3;
        }*/

        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);
    };

    $scope.$root.share = {
        homeLink: 'http://' + window.location.host + '/flow/list' + window.location.search,
        shareTitle: '移动、电信、联通三网支持，24小时自动充值',
        shareDisc: '当月有效，月底清零，2G/3G/4G网络通用',
        picUrl: 'http://' + window.location.host + '/images/flow/nativeShare.jpg'
    };

    $scope.buyProd = function (product) {
        $scope.regionProduct = product;
        MarketSvc.pay($scope.mobile, $scope.product.productId, product.productFlowPriceId, $scope.product.carrier, 'flowBag', $scope.gh, encodeURIComponent('http://sell.yfq.cn/member/index.ht#/msg/success?returnUrl=' + encodeURIComponent(window.location.href)), $scope.coupons, $scope.referrerId).then(function success(data) {
            console.log(data.payUrl);
            if (data.result) {
                window.location.href = data.payUrl;
                writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);
            } else {
                $scope.$root.appDialog.open('系统提示', data.msg);
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
        $scope.couponList = null;
        if (n) {
            $cookieStore.put('rechargeMobile', n);
            CouponSvc.getCouponList(n).then(function success(data) {
                $scope.couponList = $filter('filter')(data.couponList, {isUsed: 0, isOverdue: 0, type: 'DK'});
            });
            MarketSvc.getFlows(n).then(function success(data) {
                $scope.listData = data;
            });
        }
    });
}]);
