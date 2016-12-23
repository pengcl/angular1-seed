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
    $scope.login = function (event, referrerNo) {
        if ($scope.referrerForm.referrerNo.$valid) {
            $http.jsonp('http://192.168.1.181:8082/product/getQrCode.html?referrerNo=' + referrerNo + '&gh=cfps&activity=cfps&url=http://www.cz.com&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                console.log(data[0].upCodePath.replace("m.gd189fq.com", "192.168.1.181:8082"));
                var html = "<div class='img-box'><img src='" + data[0].upCodePath.replace("m.gd189fq.com", "192.168.1.181:8082") + "'></div>";
                $scope.dialog.open("", html);
                $("#js-dialog").find(".weui-dialog__btn").html("直接进入");
                $("#js-dialog").find(".weui-dialog__btn").attr("href", $scope.homeUrl + "?gh=cfps&activity=cfps&referrerNo=" + referrerNo);
            }).error(function (data, status, headers, config) {
                console.log("error");
                //deferred.reject(status)
            });
        } else {

        }
    }
}]);