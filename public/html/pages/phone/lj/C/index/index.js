"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('ljIndexCPhones', { //app首页
            url: "/phone/lj/C/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/lj/C/index/index.html';
            },
            controller: "ljIndexCPhonesController"
        });
}]).controller('ljIndexCPhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = "C";
    $scope.appType = systemName + "_ljzm_" + $scope.pageType;
    $scope.category = $scope.appType;

    var cardPrices = "358:6012;359:5472;360:4662;361:3672;362:3132";
    var butie = "358:6388;359:5388;360:3880;361:2980;362:2400";

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/lj/C/phones';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/lj/C/phones' + window.location.search,
        shareTitle: '想换手机？这里全场降价后再享95折，先抢了再说！',
        shareDisc: 'iPhone、OPPO、华为各大品牌新品现货抢购，最高可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/lj/share_active.jpg'
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
    $http.jsonp(cfApi.apiHost + '/product/getProList.ht?activeTag=ljzma&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;

        $scope.phoneOne = $scope.singlePhones[getIndex($scope.singlePhones, "activityproductId", '10000095429375')];
        $scope.phoneTwo = $scope.singlePhones[getIndex($scope.singlePhones, "activityproductId", '10000095429619')];

        $scope.phoneThree = $scope.singlePhones[getIndex($scope.singlePhones, "activityproductId", '456')];
        $scope.phoneFour = $scope.singlePhones[getIndex($scope.singlePhones, "activityproductId", '457')];

        $('#brands').owlCarousel({
            items: 5,
            margin: 0,
            nav: false
        });

        $scope.brand = '全部';

        $scope.setBrand = function (value) {
            $scope.brand = value;
        }

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

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $("img.lazy").lazyload({
            effect: "fadeIn",
            skip_invisible: false,
            container: $(".content-scrollable")
        });
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_ClickGoods" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    $scope.$watch('brand', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $scope.brandPhones = [];
            $.each($scope.singlePhones, function (i, k) {
                if (n == "" || n == "全部") {
                    $scope.brandPhones.push(k);
                } else {
                    if (k.brandName === n) {
                        $scope.brandPhones.push(k);
                    }
                }
            });
        }
    }, true);

}]);