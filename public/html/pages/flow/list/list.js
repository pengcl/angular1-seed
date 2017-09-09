"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flowList', { //关于我们
            url: "/flow/list?mobile",
            templateUrl: "pages/flow/list/list.html",
            controller: "flowListController"
        });
}]).controller('flowListController', ['$scope', '$stateParams', '$filter', '$location', '$cookieStore', 'MarketSvc', 'CouponSvc', function ($scope, $stateParams, $filter, $location, $cookieStore, MarketSvc, CouponSvc) {

    $scope.category = systemName + "_flowBag_A_list";
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.feeLimitTo = 5;
    $scope.flowLimitTo = 5;

    if ($cookieStore.get('rechargeMobile')) {
        $scope.mobileView = $cookieStore.get('rechargeMobile');
    }

    if ($stateParams.mobile) {
        $scope.mobile = $stateParams.mobile;
    }

    $scope.productType = 'flow';

    $scope.setProductType = function (type) {
        $scope.productType = type;
        $scope.regionProduct = null;
        writebdLog($scope.category, "_" + $scope.productType, "渠道号", $scope.gh);
    };

    $scope.getFlowMore = function (checked) {

        $scope.flowLimitTo = 100;
        $scope.feeLimitTo = 5;
    };

    $scope.getFeeMore = function (checked) {

        $scope.feeLimitTo = 100;
        $scope.flowLimitTo = 5;
    };

    if ($location.search().referrerId) {
        $scope.referrerId = $location.search().referrerId;
    } else {
        $scope.referrerId = "";
    }

    $scope.selectedFlowProd = function (checked, product, isMore) {
        //$scope.productType = 'flow';
        if (!checked) {
            //$scope.$root.appDialog.open('系统提示', '请输入您的手机号码');
            return false;
        }

        $scope.isMore = isMore;

        $scope.flowMore = false;
        $scope.flowCoupons = "";
        $scope.flowProduct = product;

        $scope.flowCouponLength = 0;

        if (product.productName.indexOf('M') !== -1) {
            product.flowRate = (product.productName).substring(0, (product.productName).length - 1);
        }

        if (product.productName.indexOf('G') !== -1) {
            product.flowRate = (product.productName).substring(0, (product.productName).length - 1) + '000';
        }

        if ($scope.couponList) {
            if (product.flowRate >= 100 && $scope.couponList.length >= 1) {
                $scope.flowCoupons = $scope.couponList[0].couponNo;
                $scope.flowCouponLength = 1;
            }

            if (product.flowRate >= 500 && $scope.couponList.length >= 2) {
                $scope.flowCoupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
                $scope.flowCouponLength = 2;
            }
        } else {
            $scope.flowCoupons = "";
        }

        $scope.regionFlowProduct = product.regionProducts[0];
        writebdLog($scope.category, "_SelectPackage" + $scope.productType + product.sortNo + 'M', "渠道号", $scope.gh);
    };

    $scope.selectedFeeProd = function (checked, product) {
        //$scope.productType = 'fee';
        if (!checked) {
            //$scope.$root.appDialog.open('系统提示', '请输入您的手机号码');
            return false;
        }
        $scope.feeCoupons = "";
        $scope.feeProduct = product;

        $scope.feeCouponLength = 0;

        if ($scope.couponList) {
            if (product.salesPrice >= 50 && $scope.couponList.length >= 1) {
                $scope.feeCoupons = $scope.couponList[0].couponNo;
                $scope.feeCouponLength = 1;
            }

            if (product.salesPrice >= 100 && $scope.couponList.length >= 2) {
                $scope.feeCoupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
                $scope.feeCouponLength = 2;
            }
        } else {
            $scope.feeCoupons = "";
        }

        $scope.regionFeeProduct = product.regionProducts[0];

        writebdLog($scope.category, "_SelectPackage" + $scope.productType + product.sortNo + 'M', "渠道号", $scope.gh);
    };

    $scope.$root.share = {
        homeLink: 'http://' + window.location.host + '/flow/list' + window.location.search,
        shareTitle: '移动、电信、联通三网支持，24小时自动充值',
        shareDisc: '当月有效，月底清零，2G/3G/4G网络通用',
        picUrl: 'http://' + window.location.host + '/images/flow/nativeShare.jpg'
    };

    $scope.flowDialog = function () {
        $scope.$root.appDialog.open('', '充值流量包，即赠送等金额（按实际金额向下取整，最多30元）的流量包/话费充值通用优惠券，可用于下次充值或转赠给朋友使用。');
        
        writebdLog($scope.category, "_FlowDialog", "渠道号", $scope.gh);
    };
    $scope.feeDialog = function () {
        $scope.$root.appDialog.open('', '话费充值面值50元送5元优惠券，面额100元送10元优惠券，多充多送（最多30元），优惠券流量包/话费充值通用，可用于下次流量包充值或转赠给朋友使用。');
        
        writebdLog($scope.category, "_FeeDialog", "渠道号", $scope.gh);
    };

    $scope.buyFlowProd = function (product, event) {
        $scope.regionFlowProduct = product;
    };

    $scope.buyFeeProd = function (product, event) {
        $scope.regionFeeProduct = product;
    };

    $scope.pay = function (mobileValid, product, regionProduct, coupons) {
        $scope.$root.toast.openUnLimit();
        if (!mobileValid) {
            $scope.$root.toast.close();
            $scope.$root.appDialog.open('系统提示', '请输入您的充值手机号码');
            return false;
        }
        if (regionProduct) {

            MarketSvc.pay($scope.mobile, product.productId, regionProduct.productFlowPriceId, $scope.flowList.area_operator, 'recharge', $scope.gh, encodeURIComponent('http://' + window.location.host + ':8904/member/pure/pages/success/success.html?mobile=' + $scope.mobile + '&returnUrl=' + encodeURIComponent(window.location.href)), coupons, $scope.referrerId, $scope.category + $scope.productType).then(function success(data) {
                $scope.$root.toast.close();
                if (data.result) {
                    console.log(data.payUrl);
                    alert(JSON.stringify(data));
                    window.location.href = data.payUrl;
                    writebdLog($scope.category, "_BuyNow" + $scope.productType, "渠道号", $scope.gh);
                } else {
                    $scope.$root.appDialog.open('系统提示', data.msg);
                }
            });

            /*MarketSvc.pay($scope.mobile, product.productId, regionProduct.productFlowPriceId, $scope.flowList.area_operator, 'recharge', $scope.gh, encodeURIComponent(cfApi.webHost + '/payState/A/flow?returnUrl=' + encodeURIComponent(window.location.href)), encodeURIComponent(window.location.href), coupons, $scope.referrerId, $scope.category + $scope.productType).then(function success(data) {
                if (data.result) {
                    window.location.href = data.payUrl;
                    writebdLog($scope.category, "_BuyNow" + $scope.productType, "渠道号", $scope.gh);
                } else {
                    $scope.alert = {
                        title: '系统提示',
                        content: data.msg
                    };
                    $scope.appDialog.open($scope.alert.title, $scope.alert.content);
                    $('#appMsg').modal('show');
                }
            });*/
        } else {
            console.log("请选择套餐");
        }

    };

    /*$scope.buyProd = function (product) {
        /!*if (type === 'flow') {*!/
        $scope.$root.toast.openUnLimit();
        $scope.regionProduct = product;
        MarketSvc.pay($scope.mobile, $scope.product.productId, product.productFlowPriceId, $scope.flowList.area_operator, 'flowBag', $scope.gh, encodeURIComponent('http://sell.yfq.cn/member/pure/pages/success/success.html?mobile=' + $scope.mobile + '&returnUrl=' + encodeURIComponent(window.location.href)), $scope.coupons, $scope.referrerId, $scope.category + $scope.productType).then(function success(data) {
            $scope.$root.toast.close();
            if (data.result) {
                window.location.href = data.payUrl;
                writebdLog($scope.category, "_BuyNow" + $scope.productType, "渠道号", $scope.gh);
            } else {
                $scope.$root.appDialog.open('系统提示', data.msg);
            }
        });
        /!*}*!/
        /!*if (type === 'fee') {
            MarketSvc.pay($scope.mobile, product.productId, product.productFlowPriceId, $scope.flowList.area_operator, 'flowBag', $scope.gh, encodeURIComponent('http://sell.yfq.cn/member/pure/pages/success/success.html?mobile=' + $scope.mobile + '&returnUrl=' + encodeURIComponent(window.location.href)), $scope.coupons, $scope.referrerId).then(function success(data) {
                if (data.result) {
                    window.location.href = data.payUrl;
                    writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);
                } else {
                    $scope.$root.appDialog.open('系统提示', data.msg);
                }
            });
        }*!/
    };*/

    $scope.taggleShow = function (target) {
        $(target).slideToggle(500);
        
        writebdLog($scope.category, "_" + target.replace('#',''), "渠道号", $scope.gh);
    };

    $scope.showOverlay = function (target) {
        $scope.$root.Overlay.open($(target).html());
    };

    //只有输入手机号码才记录到闭环
    $scope.inputMobile = function (mobile) {
        if (mobile == undefined || mobile == "" || mobile.length <= 10) return;
        writebdLog($scope.category, "_InputMobile", "渠道号", $scope.gh);//手机号码
    };

    $scope.setProductType = function (type) {
        $scope.productType = type;
        $scope.regionProduct = null;
    };

    var rebuildData = function (data, compareData) {//data 待对比对象 compareData 对比对象
        if (compareData) {//如果 compareData === true 进行对比
            $.each(data.data, function (i, k) {
                k.stock = false;
                $.each(compareData.data, function (item, key) {
                    if (k.productName === key.productName) {
                        k.regionProducts = key.regionProducts;
                        k.stock = true;
                    }
                });
            });
        } else {//如果 compareData === false 不进行对比
            $.each(data.data, function (i, k) {
                k.stock = true;
            });
        }

        data.area_operator = compareData.area_operator;

        return data;
    };

    var tempFlowList, tempFeeList;

    var getDefault = function (data) {
        var index = 0;
        $.each(data, function (i, k) {
            var prodName = k.productName.substr(0, k.productName.length - 1);
            if (k.stock && prodName >= 100) {
                index = i;
                return false;
            }
        });

        return index;
    };

    MarketSvc.getFlows('').then(function success(data) {
        tempFlowList = data;
    }).then(function success() {
        MarketSvc.getFees('').then(function success(data) {
            tempFeeList = data;
        }).then(function success() {
            $scope.$watch('mobileValid', function (n, o, $scope) {
                //console.log(n);
                if (n) {
                    $("#mobileView").blur();
                    CouponSvc.getCouponList($scope.mobile).then(function success(data) {

                        $scope.couponList = $filter('filter')(data.couponList, {isUsed: 0, isOverdue: 0, type: 'DK'});

                        MarketSvc.getFlows($scope.mobile).then(function success(data) {
                            $scope.flowList = rebuildData(tempFlowList, data);

                            var _flowIndex = getDefault($scope.flowList.data);

                            if (_flowIndex > 6) {
                                $scope.selectedFlowProd(true, $scope.flowList.data[_flowIndex], false);
                            } else {
                                $scope.selectedFlowProd(true, $scope.flowList.data[_flowIndex], true);
                            }
                        });
                        MarketSvc.getFees($scope.mobile).then(function success(data) {
                            $scope.feeList = rebuildData(tempFeeList, data);

                            var _feeIndex = getDefault($scope.feeList.data);

                            if (_feeIndex > 6) {
                                $scope.selectedFeeProd(true, $scope.feeList.data[_feeIndex], false);
                            } else {
                                $scope.selectedFeeProd(true, $scope.feeList.data[_feeIndex], true);
                            }

                        });

                    });
                } else {
                    $scope.flowList = rebuildData(tempFlowList, false);
                    $scope.selectedFlowProd(true, $scope.flowList.data[0], true);
                    $scope.feeList = rebuildData(tempFeeList, false);
                    $scope.selectedFeeProd(true, $scope.feeList.data[0], true);
                }
            });
        });
    });

    $scope.$watch('mobileView', function (n, o, $scope) {
        if (n) {
            var value = n;
            value = value.replace(/\s*/g, "");
            var result = [];
            for (var i = 0; i < value.length; i++) {
                if (i == 3 || i == 7) {
                    result.push(" " + value.charAt(i));
                }
                else {
                    result.push(value.charAt(i));
                }
            }
            $scope.mobileView = result.join("");
            $scope.mobile = value;
            $cookieStore.put('rechargeMobile', $scope.mobileView);
        } else {
            $scope.mobile = "";
        }
    });

    $scope.$watch('mobile', function (n, o, $scope) {

        $scope.couponList = 0;
        $scope.flowCouponLength = 0;
        $scope.feeCouponLength = 0;

        if (n !== undefined && n.length == 11) {
            $scope.mobileValid = $scope.mobile;
        } else {
            $scope.mobileValid = false;
        }
    });
}]);

