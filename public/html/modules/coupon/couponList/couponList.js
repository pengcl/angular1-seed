'use strict';

app.directive("couponList", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/coupon/couponList/couponList.html",
        link: function (scope, element, attrs) {
            var dateNow = Date.parse(new Date());
            console.log(dateNow);
            var available;

            //初始化优惠券
            scope.coupons = [{
                couponType: 'jm',
                couponNo: '',
                couponName: '￥400购机券',
                couponTips: '每满￥100送￥5',
                available: false,
                checked:false
            }, {
                couponType: 'mx',
                couponNo: '',
                couponName: '12期免息券',
                couponTips: '19家银行信用卡免息',
                available: false,
                checked:false
            }, {
                couponType: 'hf',
                couponNo: '',
                couponName: '￥720话费券',
                couponTips: '每月返还￥20话费',
                available: false,
                checked:false
            }];

            scope.selectCoupon = function (index) {
                if(!available){
                    scope.coupons[index].checked = !scope.coupons[index].checked;
                }
            };
            scope.$watch('receiver.mobile', function (n, o, scope) {
                if (n != undefined && n != '') {
                    $http.jsonp(cfApi.apiHost + '/product/getCouponList.html?recieverMobile=' + n + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                        //scope.coupons = data;
                        $.each(data, function (i, k) {//为优惠券赋值
                            scope.coupons[i].couponNo = k.couponNo;
                            if (dateNow > k.validStartTime.time && dateNow < k.validEndTime.time) {
                                scope.coupons[i].available = true;
                            }
                        });
                        console.log(scope.coupons);
                    }).error(function (data, status, headers, config) {
                        console.log(status);
                        //deferred.reject(status)
                    });
                }
            })
        }
    };
}]);