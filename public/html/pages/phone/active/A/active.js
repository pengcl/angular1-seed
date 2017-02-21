"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeIndex', { //app首页
            url: "/phone/active/A",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/A/hotPhones/hotPhones.html';
            },
            controller: "pActivePhonesController"
        });
}]).controller('pActiveController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = $stateParams.pageType;
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.activePage = 'index';

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

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomReceiverPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    //记录点击事件
    $scope.writeClickEvent = function (name) {
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);//记录点击事件
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

}]);