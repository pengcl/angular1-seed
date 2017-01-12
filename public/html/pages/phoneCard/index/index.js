"use strict";

app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneCardIndex', { //app首页
            url: "/pcd/:pageType/index",
            templateUrl: function($stateParams) {
                return 'pages/phoneCard/index/' + $stateParams.pageType + '/index.html';
            },
            controller: "phoneCardIndexController"
        });
}]).controller('phoneCardIndexController', ['$scope', '$rootScope', '$location', '$http', '$stateParams', '$timeout', '$interval', function($scope, $rootScope, $location, $http, $stateParams, $timeout, $interval) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    var $container = $('.content-scrollable');

    $scope.pageType = $stateParams.pageType;

    $scope.activeTag = "mysytcb";
    $scope.appType = systemName + "_" + $scope.pageType + "_0ylk";
    $scope.category = $scope.appType;
    $scope.second = 5;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.setPkg = function(event, pkgId) {
        $scope.pkgId = pkgId;
        //var $scrollTo = $('#pickMainPkg');
        var $scrollTo = $('.go-here');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_SelectPackage" + pkgId, "渠道号", $scope.gh);
    };

    $scope.checkMainPkg = function() {
        if (!$scope.checkoutForm.productId.$valid) { //原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('#pickMainPkg');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            return false;
        }
        return true;
    };



    $scope.submitForm = function() {
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
        $scope.submitUrl = cfApi.apiHost + "/wap/taokafanghaoNew/submitOrderCommon.html?mainNumber=" + $scope.mainNumber + "&activeTag=" + $scope.activeTag + "&category=" + $scope.category + "&gh=" + $scope.gh + "&activity=" + $scope.activity + "&productId=" + $scope.pkgId + "&reciverName=" + encodeURI(encodeURI($scope.receiver.name)) + "&receiverMobile=" + $scope.receiver.mobile + "&receiverCity=" + encodeURI(encodeURI($scope.receiver.city)) + "&receiverRoom=" + encodeURI(encodeURI($scope.receiver.room)) + "&mainCardTypeId=" + $scope.simItem.id + "&payType=1&category=" + $scope.category + "&callback=JSON_CALLBACK";
        $http.jsonp($scope.submitUrl).success(function(data, status, headers, config) {
            $scope.toast.close();
            if (data[0].resultCode == "0") {
                $scope.orderNo = data[0].resultMsg;
                var timer = $timeout(
                    function() {
                        var targetHtml = $("#wxQrCode").html();
                        $scope.Overlay.open(targetHtml);
                    },
                    100
                );

                $interval(function() {
                    $scope.second--;
                    if ($scope.second <0) {
                        window.location.href = "http://m.yfq.cn/wap/taokafanghaoNew/uploadCardA.html?orderNo=" + $scope.orderNo + "&category=" + $scope.category + "&s=wap";
                        return false;
                    }
                        $("#time-new").html($scope.second);
                }, 1000);
                
            } else {
                $scope.dialog.open("系统提示", data[0].resultMsg);
            }
        }).error(function(data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh); //免费领卡
    };

    $(".fqa-more").click(function() {
        $(".fqa-lists").toggleClass("close");
        $(this).toggleClass("close");
    });


    androidInputBugFix();
}]);
