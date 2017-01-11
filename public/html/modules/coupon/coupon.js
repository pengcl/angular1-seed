'use strict';

app.directive("ngCoupon", ['$location', '$interval', '$http', '$cookieStore', '$timeout', function ($location, $interval, $http, $cookieStore, $timeout) {
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
                writebdLog(scope.category, "_ShowCouponBar", "渠道号", scope.gh); //展示领券栏
            };

            if ($location.search().gh !== undefined) {//判断是否需要执行showFudai;
                if ($location.search().gh.indexOf("yjtth5") != -1 && $location.path() === "/phone/active/A") {
                    scope.showFudai();
                }
            }

            $timeout(function () {
                if($location.search().fromsearch !== undefined){
                    var $container = $('.content-scrollable');
                    var $scrollTo = $('.hot-phone');
                    if($location.search().fromsearch == 1){
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }
                }
            },500);

            scope.$root.shareQuan = function () {
                scope.showShare();
                writebdLog(scope.category, "_Share", "渠道号", scope.gh); //点击分享
            };

            var homeArgs = ['_InputIndexCode', '_InputIndexNumber'];
            //记录落地页输入的操作
            scope.$root.inputHomeArgs = function (type) {
                writebdLog(scope.category, homeArgs[type], "渠道号", scope.gh); //输入操作
            };

            scope.$root.getQuan = function () {
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

                $http.jsonp('http://m.yfq.cn/product/doReceiveMultipleCoupon.html?recieverMobile=' + scope.coupon.mobile + '&couponType=HF-MX-JM&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                    scope.toast.close();
                    scope.$root.apiCode = 0;
                    if (data[0].resultCode == 0) {
                        $(".quan-result").removeClass("hide");
                        $(".quan-form").addClass("hide");
                        $(".fudai-1").hide();
                        $(".fudai-2").show();

                        $cookieStore.put("couponStore", $cookieStore.get("couponStore") - 1);

                        scope.couponStore = $cookieStore.get("couponStore") - 1;

                        writebdLog(scope.category, "_ReceiveCoupons", "渠道号", scope.gh); //领券成功
                    }else {
                        $(".quan-error").removeClass("hide");
                        $(".quan-form").addClass("hide");
                        $(".fudai-1").hide();
                        $(".fudai-3").show();
                        //scope.dialog.open("系统提示", data[0].resultMsg);
                    }
                }).error(function (data, status, headers, config) {
                    console.log(status);
                    //deferred.reject(status)
                });

                writebdLog(scope.category, "_ClickCoupons", "渠道号", scope.gh); //点击领券
            };

            scope.$root.usingQuan = function () {
                var $container = $('.content-scrollable');

                if($('.hot-phone').length > 0){
                    var $scrollTo = $('.hot-phone');
                }else {
                    var $scrollTo = $('#receiverAddress');
                }
                scope.Overlay.close();
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                });
                writebdLog(scope.category, "_UseCoupons", "渠道号", scope.gh); //使用我的优惠券
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

                writebdLog(scope.category, "_VariIndexCode", "渠道号", scope.gh); //获取下单页验证码
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