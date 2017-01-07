'use strict';

app.directive("ngCoupon", ['$location', '$interval', '$http', function ($location, $interval, $http) {
    return {
        restrict: 'E',
        templateUrl: "modules/coupon/coupon.html",
        link: function (scope, element, attrs) {

            scope.$root.paracont = "获取验证码";
            scope.$root.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.showFudai = function () {
                var targetHtml = $("#wxQrCode").html();
                scope.Overlay.openCompile(targetHtml);
            };

            scope.$root.shareQuan = function () {
                scope.showShare();
            };

            scope.$root.getQuan = function () {
                console.log(scope.coupon.mobile);
                scope.toast.open();
                if (!scope.$root.checkCouponMobile()) {
                    scope.toast.close();
                    scope.dialog.open("系统提示", "请输入正确的手机号码！");
                    return false;
                }

                if (!scope.$root.checkCouponActiveCode()) {
                    scope.toast.close();
                    scope.dialog.open("系统提示", "请输入正确的验证码！");
                    return false;
                }

                $http.jsonp('http://192.168.1.181:8082/product/doReceiveMultipleCoupon.html?recieverMobile=' + scope.coupon.mobile + '&couponType=HF-MX-JM&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                    scope.toast.close();
                    scope.$root.apiCode = 0;
                    scope.dialog.open("系统提示", data[0].resultMsg);
                    if (data[0].resultCode == 0) {
                        $(".quan-result").removeClass("hide");
                        $(".quan-form").addClass("hide");
                    }
                }).error(function (data, status, headers, config) {
                    console.log(status);
                    //deferred.reject(status)
                });
            };

            scope.$root.usingQuan = function () {
                var $container = $('.content-scrollable');
                var $scrollTo = $('.hot-phone');
                scope.Overlay.close();
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                });
            };

            scope.$root.checkCouponMobile = function () {
                $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.couponForm.couponMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                }

                return true;
            };

            scope.$root.getCouponActiveCode = function (event, phoneNumber) {
                scope.toast.open();

                if ($(event.currentTarget).hasClass("not")) {
                    scope.toast.close();
                    return false;
                }

                if (!scope.$root.checkCouponMobile()) {
                    scope.toast.close();
                    scope.dialog.open("系统提示", "请输入正确的手机号码！");
                    return false;
                }
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    if (data == "") {
                        scope.toast.close();
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.$root.paracont = "重发验证码";
                                scope.$root.paraclass = "but_null";
                            } else {
                                scope.$root.paracont = second + "秒后可重发";
                                scope.$root.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkCouponActiveCode = function () {
                if (!scope.couponForm.couponActiveCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.coupon.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    return true;
                }
            };
        }
    };
}]);