"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider.state('pcdRecharge', { //app首页
        url: "/pcdRecharge/index",
        templateUrl: "pages/phoneCard/recharge/index.html",
        controller: "pdRechargeController"
    });
}]).controller('pdRechargeController', ['$scope', '$rootScope', '$location', '$http', '$timeout', function ($scope, $rootScope, $location, $http, $timeout) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
    //console.log($scope.referrerForm.referrerNo);

    $scope.pageType = "pcdRecharge";
    $scope.appType = systemName + "_pcdRecharge_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.params = window.location.search;

    $("#iccid").focus();

    $scope.rechargeMobile = function (rechargeMobile) {
        $http.jsonp('http://192.168.1.182:8090/yfqcz/czOrdRechargeController.do?checkAllowCharge&rechargeMobile=' + rechargeMobile + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.rechargeStatus = data.resultCode;

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });
    };

    $http.jsonp('http://192.168.1.181:8080/yfqcz/czProdProductsController.do?findRechargeProducts&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.rechargeProducts = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.setProduct = function (event, product) {
        var $this = $(event.currentTarget);

        if ($this.hasClass("disabled")) {
            return false;
        }

        $scope.product = product;
        $timeout(function () {
            $("#checkoutForm").submit();
        });
    }

}]);