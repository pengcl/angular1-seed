"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneIndex', { //app首页
            url: "/phone/:pageType/index",
            templateUrl: function ($stateParams) {
                return 'pages/phone/index/' + $stateParams.pageType + '/index.html';
            },
            controller: "pIndexController"
        });
}]).controller('pIndexController', ['$scope', '$location', '$http', '$stateParams', '$interval', function ($scope, $location, $http, $stateParams, $interval) {


    $scope.pageType = $stateParams.pageType;
    $scope.appType = systemName + "_mysy_" + $scope.pageType + "_index";
    $scope.category = $scope.appType;

    $scope.params = window.location.search;

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $http.jsonp('http://m.yfq.cn/product/getPackageList.html?activeTag=bdtc&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.pkgs = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp('http://m.yfq.cn/product/getProList.html?activeTag=lj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp('http://m.yfq.cn/product/getProList.html?activeTag=mysy&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.doublePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.st = function (target) {
        var $container = $('.content-scrollable');
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.btNavItem = function (event, index, target) {
        var $this = $(event.currentTarget);
        if (index == 0 || index == 1) {
            $this.siblings().removeClass("curr");
            $this.addClass("curr");
            $(".tab-item").eq(index).trigger("click");
            $scope.st(target);
        } else if (index == 2) {
            $this.siblings().removeClass("curr");
            $this.addClass("curr");
            $scope.st(target);
        }
        else if (index == 3) {
            getMeiqia();
            _MEIQIA('showPanel');
        }
    };

    $interval(function () {
        $scope.selkillTxt = getRandomName() + "，刚刚购买了 " + getRandomProduct();
    }, 2000);
}]);