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
    $scope.appType = systemName + "_recharge_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.params = window.location.search;
    
    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $("#iccid").focus();

    $scope.rechargeMobile = function (rechargeMobile) {
        $http.jsonp('http://192.168.1.182:8090/yfqcz/czOrdRechargeController.do?checkAllowCharge&rechargeMobile=' + rechargeMobile + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.rechargeStatus = data.resultCode;
            writebdLog($scope.category, "_InputIndexNumber", "渠道号", $scope.gh);

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
        
        var name = "";
        if(product.name.indexOf("送 5 元") != -1) name = "Give5Y";
        if(product.name.indexOf("送 50 元") != -1) name = "Give50Y";
        if(product.name.indexOf("送 100 元") != -1) name = "Give100Y";
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);

        $scope.product = product;
        $timeout(function () {
            $("#checkoutForm").submit();
        });
    }
    
    //记录点击事件
    $scope.writeClickEvent = function (name) {
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);//记录点击事件
    };

}]);