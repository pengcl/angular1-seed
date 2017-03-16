'use strict';

app.directive("ngCoupon", ['$location', '$interval', '$http', '$cookieStore', '$timeout', function ($location, $interval, $http, $cookieStore, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/coupon/coupon.html",
        link: function (scope, element, attrs) {
            scope.showPhones = false;
            scope.$root.paracont = "获取验证码";
            scope.$root.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.showFudai = function (couponType) {
                scope.couponType = couponType;
                console.log(scope.couponType);
                var targetHtml = $("#wxQrCode").html();
                scope.Overlay.openCompile(targetHtml);
                writebdLog(scope.category, "_ShowCouponBar", "渠道号", scope.gh); //展示领券栏
            };

            if ($location.search().gh !== undefined) {//判断是否需要执行showFudai;
                if ($location.search().gh.indexOf("yjtth5") != -1 && $location.path() === "/phone/active/A") {
                    scope.showFudai('JM-MX-HF');
                }
                if ($location.search().gh.indexOf("wxword") != -1 && $location.path() === "/phone/active/A") {
                    scope.showFudai('JM-MX-HF');
                }
            }


            if ($location.search().fromsearch !== undefined) {
                if ($location.search().fromsearch == 1) {
                    scope.showPhones = true;
                    $timeout(function () {
                        var $container = $('.content-scrollable');
                        var $scrollTo = $('.hot-phone');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }, 500);
                }
            }

            scope.$root.shareQuan = function () {
                scope.showShare();
                writebdLog(scope.category, "_Share", "渠道号", scope.gh); //点击分享
            };

            var homeArgs = ['_InputIndexCode', '_InputIndexNumber'];
            //记录落地页输入的操作
            scope.$root.inputHomeArgs = function (type) {
                writebdLog(scope.category, homeArgs[type], "渠道号", scope.gh); //输入操作
            };

            scope.$root.getQuan = function (couponType) {
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

                var headCategory = $location.search().headCategory;
                var category = scope.category;
                if (headCategory != undefined && headCategory != null)
                    category = headCategory;

                $http.jsonp('http://192.168.1.181:8082/product/doReceiveMultipleCoupon.html?recieverMobile=' + scope.coupon.mobile + '&couponType=' + scope.couponType + '&gh=' + scope.gh + '&activity=' + scope.activity + '&category=' + category + '&callbackUrl=' + encodeURI(scope.homeUrl + '?gh=' + scope.gh + '&activity=' + scope.activity) + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                /*$http.jsonp(cfApi.apiHost + '/product/doReceiveMultipleCoupon.html?recieverMobile=' + scope.coupon.mobile + '&couponType=' + couponType + '&gh=' + scope.gh + '&activity=' + scope.activity + '&category=' + category + '&callbackUrl=' + encodeURI(scope.homeUrl + '?gh=' + scope.gh + '&activity=' + scope.activity) + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {*/
                    scope.toast.close();
                    scope.$root.apiCode = 0;
                    if (data[0].resultCode == 0) {
                        $(".quan-result").removeClass("hide");
                        $(".quan-form").addClass("hide");
                        $(".fudai-1").hide();
                        $(".fudai-2").show();

                        scope.$root.gettedCoupon = true;
                        //scope.showPhones=true;
                        $cookieStore.put("couponStore", $cookieStore.get("couponStore") - 1);

                        scope.couponStore = $cookieStore.get("couponStore") - 1;

                        writebdLog(scope.category, "_ReceiveCoupons", "渠道号", scope.gh); //领券成功
                    } else {
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
                scope.showPhones = true;
                scope.Overlay.close();

                writebdLog(scope.category, "_UseCoupons", "渠道号", scope.gh); //使用我的优惠券

                if (scope.activePage == 'index') {
                    $location.path('/phone/active/A/phones');
                } else if (scope.activePage == 'hotPhones') {
                    var $container = $('.content-scrollable');
                    var $scrollTo = $('#hotPhone');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                } else {
                    var $container = $('.content-scrollable');
                    var $scrollTo = $('#receiverAddress');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                }
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
                if ($(event.currentTarget).hasClass("not")) {
                    //scope.toast.close();
                    return false;
                }

                scope.toast.openUnLimit();

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
                    if (!checkMobileCode(scope.coupon.mobile, scope.coupon.activeCode)) {
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