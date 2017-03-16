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

    $scope.pageType = 'B';

    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.activePage = 'index';

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/A/phones';

    $scope.params = window.location.search;

    $scope.paracont = "获取验证码";
    $scope.paraclass = "but_null";
    var second = 59, timePromise = undefined;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/B' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    if ($cookieStore.get("rasherStore")) {
        $scope.rasherStore = $cookieStore.get("rasherStore");
    } else {
        $scope.rasherStore = $cookieStore.put("rasherStore", 8437);
    }

    if ($cookieStore.get("couponStore")) {
        $scope.couponStore = $cookieStore.get("couponStore");
    } else {
        $scope.couponStore = $cookieStore.put("couponStore", 35);
    }

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.rasherStore = $cookieStore.get("rasherStore");
    $scope.couponStore = $cookieStore.get("couponStore");

    var homeArgs = ['_InputIndexName', '_InputIndexNumber', '_InputIndexCode'];
    //记录落地页输入的操作
    $scope.$root.inputHomeArgs = function (type) {
        writebdLog($scope.category, homeArgs[type], "渠道号", $scope.gh); //输入操作
    };

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
            if (!checkMobileCode($scope.coupon.mobile, $scope.coupon.activeCode)) {
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
        $http.get("http://m.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
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

        $http.jsonp(cfApi.apiHost + '/product/doReceiveMultipleCoupon.html?recieverMobile=' + $scope.coupon.mobile + '&couponType=HF-MX-JM&gh=' + $scope.gh + '&category=' + category + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $cookieStore.put("couponStore", $cookieStore.get("couponStore") - 1);
            $scope.couponStore = $cookieStore.get("couponStore") - 1;

            $cookieStore.put("rasherStore", $cookieStore.get("rasherStore") + 1);
            $scope.rasherStore = $cookieStore.get("rasherStore") + 1;

            $http.jsonp(cfApi.apiHost + '/product/intentionLog.html?activeTag=jktchd&dataType=tchd&operationName=' + $scope.coupon.mobile + '&operationValue=' + encodeURI($scope.coupon.name) + '&s=wap&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
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

        writebdLog($scope.category, "_NextOrder", "渠道号", $scope.gh); //点击进入下单页
    };

    function getRTime() {

        var timerHtml;

        var d = new Date();
        var _nowTime = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + "23:59:00";

        var EndTime = new Date(_nowTime);
        var NowTime = new Date();


        var t = EndTime.getTime() - NowTime.getTime();

        var d = Math.floor(t / 1000 / 60 / 60 / 24);
        var h = Math.floor(t / 1000 / 60 / 60 % 24);
        if (parseInt(h) < 10) {
            h = "0" + h;
        }
        var m = Math.floor(t / 1000 / 60 % 60);
        if (parseInt(m) < 10) {
            m = "0" + m;
        }
        var s = Math.floor(t / 1000 % 60);
        if (parseInt(s) < 10) {
            s = "0" + s;
        }

        timerHtml = "<em>" + h.toString().slice(0, 1) + "</em><em>" + h.toString().slice(1, 2) + "</em>" + "<span>时</span>" + "<em>" + m.toString().slice(0, 1) + "</em><em>" + m.toString().slice(1, 2) + "</em>" + "<span>分</span>" + "<em>" + s.toString().slice(0, 1) + "</em><em>" + s.toString().slice(1, 2) + "</em><span>秒</span>";
        $(".timer").html(timerHtml);
    };

    setInterval(getRTime, 1000);

}]);