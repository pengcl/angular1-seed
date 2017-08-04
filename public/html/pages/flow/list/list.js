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
    $scope.mobile = $stateParams.mobile;

    $scope.category = systemName + "_flowBag_A_list";
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    if ($location.search().referrerId) {
        $scope.referrerId = $location.search().referrerId;
    } else {
        $scope.referrerId = "";
    }

    $scope.selectedProd = function (checked, product, type) {

        if(!checked){
            $scope.$root.appDialog.open('系统提示','请输入您的手机号码');
            return false;
        }

        $scope.coupons = "";
        $scope.product = product;

        $scope.couponLength = 0;

        if (type === 'flow') {
            if ($scope.product.productName.indexOf('M') !== -1) {
                $scope.product.flowRate = ($scope.product.productName).substring(0, ($scope.product.productName).length - 1);
            }

            if ($scope.product.productName.indexOf('G') !== -1) {
                $scope.product.flowRate = ($scope.product.productName).substring(0, ($scope.product.productName).length - 1) + '000';
            }

            if ($scope.product.flowRate >= 100 && $scope.couponList.length >= 1) {
                $scope.coupons = $scope.couponList[0].couponNo;
                $scope.couponLength = 1;
            }

            if ($scope.product.flowRate >= 500 && $scope.couponList.length >= 2) {
                $scope.coupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
                $scope.couponLength = 2;
            }
        }

        if (type === 'fee') {

            if ($scope.product.salesPrice >= 50 && $scope.couponList.length >= 1) {
                $scope.coupons = $scope.couponList[0].couponNo;
                $scope.couponLength = 1;
            }

            if ($scope.product.salesPrice >= 100 && $scope.couponList.length >= 2) {
                $scope.coupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
                $scope.couponLength = 2;
            }
        }

        /*if ($scope.product.flowRate >= 1000 && $scope.couponList.length >= 3) {
            $scope.coupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo + "," + $scope.couponList[2].couponNo;
            $scope.couponLength = 3;
        }*/

        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);
    };

    $scope.$root.share = {
        homeLink: 'http://' + window.location.host + '/flow/list' + window.location.search,
        shareTitle: '移动、电信、联通三网支持，24小时自动充值',
        shareDisc: '当月有效，月底清零，2G/3G/4G网络通用',
        picUrl: 'http://' + window.location.host + '/images/flow/nativeShare.jpg'
    };

    $scope.productType = 'fee';

    $scope.buyProd = function (product, type) {
        /*if (type === 'flow') {*/
        $scope.regionProduct = product;
        MarketSvc.pay($scope.mobile, $scope.product.productId, product.productFlowPriceId, $scope.flowList.area_operator, 'flowBag', $scope.gh, encodeURIComponent('http://sell.yfq.cn/member/pure/pages/success/success.html?mobile=' + $scope.mobile + '&returnUrl=' + encodeURIComponent(window.location.href)), $scope.coupons, $scope.referrerId).then(function success(data) {
            console.log(data);
            if (data.result) {
                window.location.href = data.payUrl;
                writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);
            } else {
                $scope.$root.appDialog.open('系统提示', data.msg);
            }
        });
        /*}*/
        /*if (type === 'fee') {
            MarketSvc.pay($scope.mobile, product.productId, product.productFlowPriceId, $scope.flowList.area_operator, 'flowBag', $scope.gh, encodeURIComponent('http://sell.yfq.cn/member/pure/pages/success/success.html?mobile=' + $scope.mobile + '&returnUrl=' + encodeURIComponent(window.location.href)), $scope.coupons, $scope.referrerId).then(function success(data) {
                if (data.result) {
                    window.location.href = data.payUrl;
                    writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);
                } else {
                    $scope.$root.appDialog.open('系统提示', data.msg);
                }
            });
        }*/
    };

    $scope.showOverlay = function () {
        $scope.$root.Overlay.open($("#flowTips").html());
    };

    //只有输入手机号码才记录到闭环
    $scope.inputMobile = function (mobile) {
        if (mobile == undefined || mobile == "" || mobile.length <= 10) return;
        writebdLog($scope.category, "_InputMobile", "渠道号", $scope.gh);//手机号码
    };

    $scope.setProductType = function (type) {
        $scope.productType = type;
    };

    $scope.$watch('mobile', function (n, o, $scope) {
        $scope.product = null;
        $scope.regionProducts = null;
        $scope.regionProduct = null;
        $scope.flowList = null;
        $scope.feeList = null;
        $scope.couponList = null;
        if (n === undefined || n === '') {
            $scope.flowList = {
                "area": "广东",
                "codeMsg": "查询成功",
                "area_operator": "广东移动",
                "data": [{
                    "productId": 10000091120342,
                    "productName": "10M",
                    "regionProducts": [{
                        "costPrice": 3,
                        "describes": "",
                        "productFlowPriceId": 2527,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 2.94
                    }],
                    "salesPrice": 3,
                    "sortNo": 10
                }, {
                    "productId": 10000091120342,
                    "productName": "30M",
                    "regionProducts": [{
                        "costPrice": 5,
                        "describes": "",
                        "productFlowPriceId": 2528,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 4.9
                    }],
                    "salesPrice": 5,
                    "sortNo": 30
                }, {
                    "productId": 10000091120342,
                    "productName": "70M",
                    "regionProducts": [{
                        "costPrice": 10,
                        "describes": "",
                        "productFlowPriceId": 2529,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 9.8
                    }],
                    "salesPrice": 10,
                    "sortNo": 70
                }, {
                    "productId": 10000091120342,
                    "productName": "100M",
                    "regionProducts": [{
                        "costPrice": 10,
                        "describes": "",
                        "productFlowPriceId": 2530,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 9.8
                    }],
                    "salesPrice": 10,
                    "sortNo": 100
                }, {
                    "productId": 10000091120342,
                    "productName": "150M",
                    "regionProducts": [{
                        "costPrice": 20,
                        "describes": "",
                        "productFlowPriceId": 2531,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 19.6
                    }],
                    "salesPrice": 20,
                    "sortNo": 150
                }, {
                    "productId": 10000091120342,
                    "productName": "300M",
                    "regionProducts": [{
                        "costPrice": 20,
                        "describes": "",
                        "productFlowPriceId": 2532,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 19.6
                    }],
                    "salesPrice": 20,
                    "sortNo": 300
                }, {
                    "productId": 10000091120342,
                    "productName": "500M",
                    "regionProducts": [{
                        "costPrice": 30,
                        "describes": "",
                        "productFlowPriceId": 2533,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 29.4
                    }],
                    "salesPrice": 30,
                    "sortNo": 500
                }, {
                    "productId": 10000091120342,
                    "productName": "1G",
                    "regionProducts": [{
                        "costPrice": 50,
                        "describes": "",
                        "productFlowPriceId": 2534,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 49
                    }],
                    "salesPrice": 50,
                    "sortNo": 1000
                }, {
                    "productId": 10000091120342,
                    "productName": "2G",
                    "regionProducts": [{
                        "costPrice": 70,
                        "describes": "",
                        "productFlowPriceId": 2535,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 68.6
                    }],
                    "salesPrice": 70,
                    "sortNo": 2000
                }, {
                    "productId": 10000091120342,
                    "productName": "3G",
                    "regionProducts": [{
                        "costPrice": 100,
                        "describes": "",
                        "productFlowPriceId": 2536,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 98
                    }],
                    "salesPrice": 100,
                    "sortNo": 3000
                }, {
                    "productId": 10000091120342,
                    "productName": "4G",
                    "regionProducts": [{
                        "costPrice": 130,
                        "describes": "",
                        "productFlowPriceId": 2537,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 127.4
                    }],
                    "salesPrice": 130,
                    "sortNo": 4000
                }, {
                    "productId": 10000091120342,
                    "productName": "6G",
                    "regionProducts": [{
                        "costPrice": 180,
                        "describes": "",
                        "productFlowPriceId": 2538,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 176.4
                    }],
                    "salesPrice": 180,
                    "sortNo": 6000
                }, {
                    "productId": 10000091120342,
                    "productName": "11G",
                    "regionProducts": [{
                        "costPrice": 280,
                        "describes": "",
                        "productFlowPriceId": 2539,
                        "recommend": 0,
                        "regionName": "全国",
                        "salesPrice": 274.4
                    }],
                    "salesPrice": 280,
                    "sortNo": 11000
                }],
                "code": "0",
                "operator": "移动"
            };

            $scope.feeList = {
                "area": "广东",
                "codeMsg": "查询成功",
                "area_operator": "广东移动",
                "data": [{
                    "productId": 10000092870385,
                    "productName": "30元",
                    "regionProducts": [{
                        "costPrice": 30,
                        "describes": "",
                        "productFlowPriceId": 2682,
                        "recommend": 0,
                        "regionName": "省内",
                        "salesPrice": 30
                    }],
                    "salesPrice": 30,
                    "sortNo": 30
                }, {
                    "productId": 10000092870385,
                    "productName": "50元",
                    "regionProducts": [{
                        "costPrice": 50,
                        "describes": "",
                        "productFlowPriceId": 2683,
                        "recommend": 0,
                        "regionName": "省内",
                        "salesPrice": 50
                    }],
                    "salesPrice": 50,
                    "sortNo": 50
                }, {
                    "productId": 10000092870385,
                    "productName": "100元",
                    "regionProducts": [{
                        "costPrice": 100,
                        "describes": "",
                        "productFlowPriceId": 2684,
                        "recommend": 0,
                        "regionName": "省内",
                        "salesPrice": 100
                    }],
                    "salesPrice": 100,
                    "sortNo": 100
                }, {
                    "productId": 10000092870385,
                    "productName": "200元",
                    "regionProducts": [{
                        "costPrice": 200,
                        "describes": "",
                        "productFlowPriceId": 2685,
                        "recommend": 0,
                        "regionName": "省内",
                        "salesPrice": 200
                    }],
                    "salesPrice": 200,
                    "sortNo": 200
                }, {
                    "productId": 10000092870385,
                    "productName": "300元",
                    "regionProducts": [{
                        "costPrice": 300,
                        "describes": "",
                        "productFlowPriceId": 2686,
                        "recommend": 0,
                        "regionName": "省内",
                        "salesPrice": 300
                    }],
                    "salesPrice": 300,
                    "sortNo": 300
                }, {
                    "productId": 10000092870385,
                    "productName": "500元",
                    "regionProducts": [{
                        "costPrice": 500,
                        "describes": "",
                        "productFlowPriceId": 2687,
                        "recommend": 0,
                        "regionName": "省内",
                        "salesPrice": 500
                    }],
                    "salesPrice": 500,
                    "sortNo": 500
                }],
                "code": "0",
                "operator": "移动"
            };
        }
        if (n !== undefined && n !== o) {
            $cookieStore.put('rechargeMobile', n);
            CouponSvc.getCouponList(n).then(function success(data) {
                console.log(data);
                $scope.couponList = $filter('filter')(data.couponList, {isUsed: 0, isOverdue: 0, type: 'DK'});
            });
            MarketSvc.getFlows(n).then(function success(data) {
                console.log(data);
                $scope.flowList = data;
            });
            MarketSvc.getFees(n).then(function success(data) {
                console.log(data);
                $scope.feeList = data;
            });
        }
    });
}]);
