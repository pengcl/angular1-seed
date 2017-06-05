"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider.state('pcdUpgrade', { //app首页
        url: "/pcdUpgrade/index",
        templateUrl: "pages/phoneCard/upgrade/index.html",
        controller: "pdUpgradeController"
    });
}]).controller('pdUpgradeController', ['$scope', '$rootScope', '$location', '$http', '$timeout', function ($scope, $rootScope, $location, $http, $timeout) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
    //console.log($scope.referrerForm.referrerNo);

    $scope.pageType = "pcdUpgrade";
    $scope.appType = systemName + "_upgrade_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.params = window.location.search;

    $scope.receiver = {};

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/pcdUpgrade/index' + window.location.search,
        shareTitle: '翼分期商城——话费充值优惠',
        shareDisc: '翼分期商城新用户专享，话费充100送100，充200送150，更多充值优惠等你来！',
        picUrl: 'http://app.yfq.cn/images/phoneCard/recharge/share.jpg'
    };

    //统计

    $timeout(function () {
        writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
        //$scope.$root.toast.close();
    });

    $scope.upgradeMobile = function (upgradeMobile) {
        $scope.upgradeStatus = undefined;
        if (!$scope.checkoutForm.iccid.$valid) {
            return false;
        } else {
            $("#iccid").blur();
        }
        $http.jsonp(cfApi.apiHost + '/product/checkNumUpgrade.html?receiverMobile=' + upgradeMobile + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.upgradeStatus = data;

            console.log(data);
            $scope.receiver.name = data.recieverName;
            $scope.receiver.mobile = data.recieverMobile;
            $scope.receiver.city = data.recieverAddress.split(" ")[0];
            $scope.receiver.room = data.recieverAddress.split(" ")[1];

            writebdLog($scope.category, "_InputIndexNumber", "渠道号", $scope.gh);

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });
    };

    /*$http.jsonp(cfApi.apiHost + '/yfqcz/czProdProductsController.do?findRechargeProducts&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.upgradeProducts = data;

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });*/

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

    $scope.$watch('upgradeStatus', function (n, o, $scope) {
        if (n !== o, n !== undefined) {
            $http.jsonp(cfApi.apiHost + "/product/getViewProductList.html?productId=" + n.productId + "&s=wap&callback=JSON_CALLBACK").success(function (data) {
                var mifis = [];
                $.each(data, function (i, k) {
                    mifis.push({
                        productId: k.productId,
                        productName: k.productName,
                        oldPrice: k.oldPrice,
                        salePrice: k.salePrice,
                        selected: false
                    });
                });

                $scope.mifis = mifis;

                console.log(mifis);

            });
        }
    }, $scope);

    $scope.showUpgradeTip = function (e) {
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

    $scope.$watch('receiver', function (n, o, $scope) {
        console.log(n);
    }, true)

}]);