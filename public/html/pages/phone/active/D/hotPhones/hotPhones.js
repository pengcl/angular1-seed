"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeDPhones', { //app首页
            url: "/phone/active/D/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/D/hotPhones/hotPhones.html';
            },
            controller: "pDctivePhonesController"
        });
}]).controller('pDctivePhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = "D";
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    var cardPrices = "358:6012;359:5472;360:4662;361:3672;362:3132";
    var butie = "358:6388;359:5388;360:3880;361:2980;362:2400";

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D/phones';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl: 'http://app.yfq.cn/images/active/d/share_active.jpg'
    };

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };
    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jjk&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;

        $scope.brands = [
            {
                "brandName": "全部",
                "brandSort": 0,
                "tag": false
            },
            {
                "brandName": "0元购机",
                "brandSort": 1,
                "tag": true
            },
            {
                "brandName": "iPhone",
                "brandSort": 2,
                "tag": false
            },
            {
                "brandName": "华为",
                "brandSort": 3,
                "tag": false
            },
            {
                "brandName": "OPPO",
                "brandSort": 4,
                "tag": false
            },
            {
                "brandName": "VIVO",
                "brandSort": 5,
                "tag": false
            },
            {
                "brandName": "小米",
                "brandSort": 6,
                "tag": false
            },
            {
                "brandName": "其它机型",
                "brandSort": 999,
                "tag": false
            }
        ];
        $scope.brand = $scope.brands[0];

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.$root.btNavItem = function (index) {
        writeBtNavItem(index);
    };

    $scope.showFqa = function () {
        $(".fqa-lists").toggleClass("close");
        $(".fqa-more").toggleClass("close");
    };

    var btNavItemName = ['_MyCoupon', '_MyOrder', '_CustConsult'];

    function writeBtNavItem(index) {
        writebdLog($scope.category, btNavItemName[index], "渠道号", $scope.gh);//选择模块
    }

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    $scope.$watch('brand', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $scope.brandPhones = [];
            if (n.brandName == "全部") {
                $scope.brandNavName = "选择类别";
            } else {
                $scope.brandNavName = n.brandName;
            }
            $.each($scope.singlePhones, function (i, k) {
                if (n.brandName == "" || n.brandName == "全部") {
                    $scope.brandPhones.push(k);
                } else if (n.brandName == "其它机型") {
                    if (k.brandName != "iPhone" && k.brandName != "华为" && k.brandName != "OPPO" && k.brandName != "VIVO" && k.brandName != "小米") {
                        $scope.brandPhones.push(k);
                    }
                } else if (n.brandName == "0元购机") {
                    if (k.cardItems == k.fanhuan) {
                        $scope.brandPhones.push(k);
                    }
                } else {
                    if (k.brandName === n.brandName) {
                        $scope.brandPhones.push(k);
                    }
                }
            });

            if(n.brandName == "0元购机"){
                $scope.brandPhones = ($scope.brandPhones).sort(function (a, b) {
                    return parseInt(a.cardItems) - parseInt(b.cardItems);
                })
            }
        }
    }, true);

}]);