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

    $timeout(function () {
        writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
        //$scope.$root.toast.close();
    });

    $scope.rechargeMobile = function (rechargeMobile) {
        $scope.rechargeStatus = undefined;
        if (!$scope.checkoutForm.iccid.$valid) {
            return false;
        } else {
            $("#iccid").blur();
        }
        $http.jsonp(cfApi.apiHost + '/yfqcz/czOrdRechargeController.do?checkAllowCharge&rechargeMobile=' + rechargeMobile + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.rechargeStatus = data.resultCode;

            writebdLog($scope.category, "_InputIndexNumber", "渠道号", $scope.gh);

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });
    };

    $http.jsonp(cfApi.apiHost + '/yfqcz/czProdProductsController.do?findRechargeProducts&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
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

        $scope.$root.toast.open();

        var name = "";
        if (product.name.indexOf("送 5 元") != -1) name = "Give5Y";
        if (product.name.indexOf("送 50 元") != -1) name = "Give50Y";
        if (product.name.indexOf("送 100 元") != -1) name = "Give100Y";
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);

        $scope.product = product;
        $timeout(function () {
            $("#checkoutForm").submit();
            //$scope.$root.toast.close();
        });
    };

    $scope.showRechargeTip = function (e) {
        var targetHtml = $("#rechargeTipsPanel").html();
        $scope.$root.Overlay.open(targetHtml);
    };

    $scope.getContact = function (e) {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog(scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    //记录点击事件
    $scope.writeClickEvent = function (event, name) {
        var $this = $(event.currentTarget);
        if ($this.hasClass("disabled")) {
            event.preventDefault();
            return false;
        }
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);//记录点击事件
    };

}]);