"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('referrerSysLogin', { //app首页
            url: "/referrerSys/login",
            templateUrl: "pages/referrerSys/login/login.html",
            controller: "referrerSysLoginController"
        });
}]).controller('referrerSysLoginController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
    //console.log($scope.referrerForm.referrerNo);
    $scope.homeUrl = "http://app.yfq.cn/phone/A/index";
    $scope.searchOrder = cfApi.apiHost + "/wap/customer/searchIndexA.html";
    $scope.$root.dialogClass = "referrer-dialog";

    $scope.$root.hasMoreBtn = true;

    $scope.login = function (event, referrerNo) {
        if ($scope.referrerForm.referrerNo.$valid) {
            $http.jsonp(cfApi.apiHost + '/product/getQrCode.html?referrerNo=' + referrerNo + '&gh=jktchd&activity=jktchd&url=' + $scope.homeUrl + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                var html = "<div class='img-box'><img src='" + data[0].upCodePath + "'></div><p><a href='" + $scope.homeUrl + "?gh=jktchd&activity=jktchd&referrerNo=" + referrerNo + "'>进入官网</a></p>";
                $http.jsonp(cfApi.apiHost + '/product/getQrCode.html?referrerNo=' + referrerNo + '&gh=jktchd&activity=jktchd&url=' + $scope.searchOrder + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                    html = html + "<div class='img-box'><img src='" + data[0].upCodePath + "'></div><p><a href='" + $scope.searchOrder + "?gh=jktchd&activity=jktchd&referrerNo=" + referrerNo + "'>查询订单</a></p>";
                    $scope.dialog.open("", html);
                }).error(function (data, status, headers, config) {
                    console.log("error");
                    //deferred.reject(status)
                });
            }).error(function (data, status, headers, config) {
                console.log("error");
                //deferred.reject(status)
            });
        } else {

        }
    }
}]);