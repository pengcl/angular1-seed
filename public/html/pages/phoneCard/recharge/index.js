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
    $location.path("/phone/active/D/phones");

    $scope.pageType = "pcdRecharge";
    $scope.appType = systemName + "_recharge_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/pcdRecharge/index' + window.location.search,
        shareTitle: '翼分期商城——话费充值优惠',
        shareDisc: '翼分期商城新用户专享，话费充100送100，充200送150，更多充值优惠等你来！',
        picUrl:'http://app.yfq.cn/images/phoneCard/recharge/share.jpg'
    };

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
        if (product.name == "充 100 元送 5 元") name = "Give5Y";
        if (product.name == "充 50 元送 30 元") name = "Give30Y";
        if (product.name == "充 50 元送 50 元") name = "Give50Y";
        if (product.name == "充 100 元送 100 元") name = "Give100Y";
        if (product.name == "充 100 元") name = "Charge100Y";
        if (product.name == "充 200 元送 150 元") name = "Give150Y";
        if (product.name == "充 500 元送 300 元") name = "Give300Y";
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