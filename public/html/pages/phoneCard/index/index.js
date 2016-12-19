"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneCardIndex', { //app首页
            url: "/pcd/:pageType/index",
            templateUrl: function ($stateParams) {
                return 'pages/phoneCard/index/' + $stateParams.pageType + '/index.html';
            },
            controller: "phoneCardIndexController"
        });
}]).controller('phoneCardIndexController', ['$scope', '$rootScope', '$location', '$http', '$stateParams', '$timeout', function ($scope, $rootScope, $location, $http, $stateParams, $timeout) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    var $container = $('.content-scrollable');

    $scope.pageType = $stateParams.pageType;

    $scope.activeTag = "mysytcb";
    $scope.appType = systemName + "_" + $scope.pageType + "phoneCard";
    $scope.category = $scope.appType;

    $scope.setPkg = function (event, pkgId) {
        $scope.pkgId = pkgId;
    };

    $scope.checkMainPkg = function () {
        if (!$scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('#pickMainPkg');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            return false;
        }
        return true;
    };

    $scope.submitForm = function () {
        $scope.toast.open();
        if (!$scope.checkMainPkg()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkSimType()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkMainNumber()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkAddress()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkActiveCode()) {
            $scope.toast.close();
            return false;
        }
        $scope.submitUrl = "http://192.168.1.181:8082/wap/taokafanghaoNew/submitOrderCommon.html?mainNumber=" + $scope.mainNumber + "&activeTag=" + $scope.activeTag + "&category=" + $scope.category + "&gh=" + $scope.gh + "&activity=" + $scope.activity + "&productId=" + $scope.pkgId + "&reciverName=" + $scope.receiver.name + "&receiverMobile=" + $scope.receiver.mobile + "&recieverAddress=" + $scope.receiver.city + $scope.receiver.room + "&callback=JSON_CALLBACK";
        $scope.toast.close();
        $http.jsonp($scope.submitUrl).success(function (data, status, headers, config) {
            console.log(data[0].resultCode);
            if (data[0].resultCode == "0") {
                $scope.orderNo = data[0].resultMsg;
                var timer = $timeout(
                    function () {
                        var targetHtml = $("#wxQrCode").html();
                        $scope.Overlay.open(targetHtml);
                    },
                    100
                );
            } else {
                $scope.dialog.open("系统提示", data[0].resultMsg);
            }
        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });
    };

    androidInputBugFix();
}]);