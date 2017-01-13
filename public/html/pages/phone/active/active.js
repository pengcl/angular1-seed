"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeIndex', { //app首页
            url: "/phone/active/:pageType",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/' + $stateParams.pageType + '/index.html';
            },
            controller: "pActiveController"
        });
}]).controller('pActiveController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = $stateParams.pageType;
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    if ($cookieStore.get("couponStore")) {
        $scope.cookieStore = $cookieStore.get("couponStore");
    } else {
        $scope.cookieStore = $cookieStore.put("couponStore", 199);
    }

    $scope.cookieStore = $cookieStore.get("couponStore");

    $scope.params = window.location.search;

    $scope.$root.apiCode = 2;

    $scope.toggleClose = true;

    $scope.fqaToggleClose = function () {
        $scope.toggleClose = !$scope.toggleClose;
        if ($scope.toggleClose)
            writebdLog($scope.category, "_CouExplainStop", "渠道号", $scope.gh);//收起优惠券说明
        else
            writebdLog($scope.category, "_CouExplainShow", "渠道号", $scope.gh);//展示优惠券说明
    };

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $interval(function () {
        $scope.getters = [
            {
                txt: getRandomReceiverPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>"
            },
            {
                txt: getRandomReceiverPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>"
            },
            {
                txt: getRandomReceiverPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>"
            },
            {
                txt: getRandomReceiverPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>"
            },
            {
                txt: getRandomReceiverPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>"
            }
        ];
    }, 2000);

    /*$(".content-scrollable").bind("scroll", function () {
        var $footerNav = $(".footer-nav");
        var $rightNav = $(".right-nav");
        var targetTop = $(".hot-phone").offset().top;
        if ($(this).scrollTop() > 500) {
            $rightNav.show(300);
            $footerNav.show(300);
        } else {
            $rightNav.hide(300);
            $footerNav.hide(300);
        }
    });*/

    $interval(function () {
        $scope.selkillTxt = getRandomName() + "，刚刚购买了 " + getRandomProduct();
    }, 2000);

    //记录用户购买的商品：专区模块英文名称+商品id
    $scope.writeSelectFoods = function (obj, productId, modular) {
        writebdLog($scope.category, "_" + productId + modular, "渠道号", $scope.gh);//选择的商品ID
    };

}]);