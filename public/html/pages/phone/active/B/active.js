"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('BctiveIndex', { //app首页
            url: "/phone/active/B",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/B/index.html';
            },
            controller: "pBctiveController"
        });
}]).controller('pBctiveController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = $stateParams.pageType;
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.activePage = 'index';

    $scope.params = window.location.search;

    $scope.paracont = "获取验证码";
    $scope.paraclass = "but_null";
    var second = 59, timePromise = undefined;

    $scope.checkCouponMobile = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.couponMobile.$valid) {
            //alert("请输入联系电话");
            $(".input-mobile").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.checkCouponName = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.couponName.$valid) {
            //alert("请输入联系电话");
            $(".input-name").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.checkCouponActiveCode = function () {
        if (!$scope.couponForm.couponActiveCode.$valid) {
            $(".input-vcode").addClass("weui-cell_warn");
            return false;
        } else {
            if (!checkMobileCode($scope.coupon.activeCode)) {
                $(".input-vcode").removeClass("weui-cell_success");
                $(".input-vcode").addClass("weui-cell_warn");
                return false;
            }
            return true;
        }
    };

    $scope.getCouponActiveCode = function (event, phoneNumber) {
        if ($(event.currentTarget).hasClass("not")) {
            //scope.toast.close();
            return false;
        }

        $scope.toast.openUnLimit();

        if (!$scope.checkCouponMobile()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;
        }
        $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
            if (data == "") {
                $scope.toast.close();
                timePromise = $interval(function () {
                    if (second <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;

                        second = 59;
                        $scope.paracont = "重发验证码";
                        $scope.paraclass = "but_null";
                    } else {
                        $scope.paracont = second + "秒后可重发";
                        $scope.paraclass = "not but_null";
                        second--;

                    }
                }, 1000, 100);
            }
        });

        writebdLog($scope.category, "_VariIndexCode", "渠道号", $scope.gh); //获取下单页验证码
    };

    $scope.getQuan = function () {
        $scope.toast.open();

        if (!$scope.checkCouponName()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的姓名！");
            return false;
        }

        if (!$scope.checkCouponMobile()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;
        }

        if (!$scope.checkCouponActiveCode()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的验证码！");
            return false;
        }

        var headCategory = $location.search().headCategory;
        var category = $scope.category;
        if (headCategory != undefined && headCategory != null)
            category = headCategory;

        $http.jsonp('http://192.168.1.181:8082/product/doReceiveMultipleCoupon.html?recieverMobile=' + $scope.coupon.mobile + '&couponType=HF-MX-JM&gh=' + $scope.gh + '&category=' + category + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            console.log(data, $scope.coupon.name, $scope.coupon.mobile);
            $http.jsonp('http://192.168.1.181:8082/product/intentionLog.html?activeTag=jktchd&dataType=tchd&operationName=' + $scope.coupon.mobile + '&operationValue=' + encodeURI($scope.coupon.name) + '&s=wap&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                $scope.toast.close();
                var _params;
                if ($scope.params == '') {
                    _params = "?receiverName=" + $scope.coupon.name + "&receiverMobile=" + $scope.coupon.mobile;
                } else {
                    _params = $scope.params + "&receiverName=" + $scope.coupon.name + "&receiverMobile=" + $scope.coupon.mobile;
                }
                if (data.resultCode == 200) {
                    window.location.href = '/phone/active/B/phones' + _params;
                } else {

                }
            }).error(function (data, status, headers, config) {
                console.log(status);
                //deferred.reject(status)
            });
        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        //writebdLog($scope.category, "_ClickCoupons", "渠道号", $scope.gh); //点击领券
    };

}]);