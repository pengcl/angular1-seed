'use strict';

app.directive("couponList", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/coupon/couponList/couponList.html",
        link: function (scope, element, attrs) {

            var dateNow = Date.parse(new Date());

            scope.selectCoupon = function (e, key) {
                if (scope.$root.coupons[key].available) {
                    scope.$root.coupons[key].checked = !scope.$root.coupons[key].checked;
                }
            };

            scope.$watch('receiver.mobile', function (n, o, scope) {
                if (n != undefined && n != '') {
                    $http.jsonp(cfApi.apiHost + '/product/getCouponList.html?recieverMobile=' + n + '&activity=' + scope.activity + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                        scope.$root.coupons = {};
                        
                        $timeout(function () {
                            var couponType, couponNo, couponName, couponTips, available, checked;
                            if (data.length == 0) {
                                scope.$root.hasCoupon = false;
                                for (var i = 0; i < scope.$root.coupons.length; i++) {
                                    scope.$root.coupons[i].checked = false;
                                }
                            } else {
                                scope.$root.hasCoupon = true;
                            }
                            $.each(data, function (i, k) {//为优惠券赋值
                                if (data[i].couponBatchName == 'JM') {
                                    couponType = 'exemptionCertificate';
                                    couponNo = k.couponNo;
                                    couponName = '￥800满减券';
                                    couponTips = '每满￥100送￥5';
                                    available = true;
                                    checked = true;
                                    if (scope.phone.activityproductId == 366 || scope.phone.activityproductId == 367 || scope.phone.activityproductId == 368 || scope.phone.activityproductId == 369) {
                                        available = false;
                                        checked = false;
                                    }

                                    scope.$root.coupons.jm = {
                                        couponType: couponType,
                                        couponNo: couponNo,
                                        couponName: couponName,
                                        couponTips: couponTips,
                                        available: available,
                                        checked: checked
                                    };
                                }

                                if (data[i].couponBatchName == 'MX') {
                                    couponType = 'interestCoupons';
                                    couponNo = k.couponNo;
                                    couponName = '12期免息券';
                                    couponTips = '19家银行信用卡免息';
                                    available = true;
                                    checked = true;
                                    if (scope.phone.activityproductId == 366 || scope.phone.activityproductId == 367 || scope.phone.activityproductId == 368 || scope.phone.activityproductId == 369) {
                                        available = false;
                                        checked = false;
                                    }

                                    scope.$root.coupons.mx = {
                                        couponType: couponType,
                                        couponNo: couponNo,
                                        couponName: couponName,
                                        couponTips: couponTips,
                                        available: available,
                                        checked: checked
                                    };
                                }

                                if (data[i].couponBatchName == 'HF') {
                                    couponType = 'billVoucher';
                                    couponNo = k.couponNo;
                                    couponName = '￥720话费券';
                                    couponTips = '每月返还￥20话费';
                                    available = true;
                                    checked = true;
                                    if (scope.phone.activityproductId == 366 || scope.phone.activityproductId == 367 || scope.phone.activityproductId == 368 || scope.phone.activityproductId == 369) {
                                        available = false;
                                        checked = false;
                                    }

                                    scope.$root.coupons.hf = {
                                        couponType: couponType,
                                        couponNo: couponNo,
                                        couponName: couponName,
                                        couponTips: couponTips,
                                        available: available,
                                        checked: checked
                                    };
                                }
                            });
                        });

                    }).error(function (data, status, headers, config) {
                        console.log(status);
                        //deferred.reject(status)
                    });
                }
            });

            scope.$watch('gettedCoupon', function (n, o, scope) {
                if (n != undefined && n != '') {
                    $http.jsonp(cfApi.apiHost + '/product/getCouponList.html?recieverMobile=' + scope.receiver.mobile + '&activity=' + scope.activity + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {

                        scope.$root.coupons = {};
                        var couponType, couponNo, couponName, couponTips, available, checked;
                        if (data.length == 0) {
                            scope.$root.hasCoupon = false;
                            for (var i = 0; i < scope.$root.coupons.length; i++) {
                                scope.$root.coupons[i].checked = false;
                            }
                        } else {
                            scope.$root.hasCoupon = true;
                        }
                        $.each(data, function (i, k) {//为优惠券赋值
                            if (data[i].couponBatchName == 'JM') {
                                couponType = 'exemptionCertificate';
                                couponNo = k.couponNo;
                                couponName = '￥800满减券';
                                couponTips = '每满￥100送￥10';
                                available = true;
                                checked = true;

                                scope.$root.coupons.jm = {
                                    couponType: couponType,
                                    couponNo: couponNo,
                                    couponName: couponName,
                                    couponTips: couponTips,
                                    available: available,
                                    checked: checked
                                };
                            }

                            if (data[i].couponBatchName == 'MX') {
                                couponType = 'interestCoupons';
                                couponNo = k.couponNo;
                                couponName = '12期免息券';
                                couponTips = '19家银行信用卡免息';
                                available = true;
                                checked = true;

                                scope.$root.coupons.mx = {
                                    couponType: couponType,
                                    couponNo: couponNo,
                                    couponName: couponName,
                                    couponTips: couponTips,
                                    available: available,
                                    checked: checked
                                };
                            }

                            if (data[i].couponBatchName == 'HF') {
                                couponType = 'billVoucher';
                                couponNo = k.couponNo;
                                couponName = '12期免息券';
                                couponTips = '19家银行信用卡免息';
                                available = true;
                                checked = true;

                                scope.$root.coupons.hf = {
                                    couponType: couponType,
                                    couponNo: couponNo,
                                    couponName: couponName,
                                    couponTips: couponTips,
                                    available: available,
                                    checked: checked
                                };
                            }
                        });

                    }).error(function (data, status, headers, config) {
                        console.log(status);
                        //deferred.reject(status)
                    });
                }
            })
        }
    };
}]);