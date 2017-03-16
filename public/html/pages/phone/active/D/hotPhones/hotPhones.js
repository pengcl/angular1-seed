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

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D/phones';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '我领到1888元购机年终奖！年前换个好手机，开开心心回家过大年！',
        shareDisc: '苹果、OPPO、华为、VIVO等大牌手机直降！用券购再立减！戳我抢→',
        picUrl:'http://app.yfq.cn/images/active/share_active.jpg'
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
    /*$http.jsonp('http://192.168.1.181:8082/product/getProList.html?activeTag=jjk&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {*/
    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jjk&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
        //console.log(data);
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.$root.btNavItem = function (index) {
        writeBtNavItem(index);
    };

    $scope.showFqa = function () {
        $(".fqa-lists").toggleClass("close");
        $(this).toggleClass("close");
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
    }

}]);