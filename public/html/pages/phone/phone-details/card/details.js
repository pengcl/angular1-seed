"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneCardDetails', { //app首页
            url: "/phs/cd/:pageType/:cardId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/card/' + $stateParams.pageType + '/details.html';
            },
            controller: "pCardProController"
        });
}]).controller('pCardProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = $stateParams.pageType;
    $scope.activeTag = "jjk";

    $http.jsonp("http://192.168.1.181:8082/product/getPackageInfo.html?productId=" + $stateParams.cardId + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.card = data;
        $scope.totolPrice = data.salesPrice;
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.cardPay = true;

    $scope.buyType = 1;

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        $(".pay-item").removeClass("on");
        $("#payType" + id).addClass("on");
    };

    $scope.setBuyType = function (event, type) {
        event.preventDefault();
        $scope.buyType = type;
        var $this = $(event.currentTarget);
        $this.parent().siblings().children().removeClass('curr');
        $this.addClass('curr');
        if (type == 0) {
            $scope.activeTag = "lj";
            $scope.totolPrice = $scope.phone.phonePrice;
            if ($scope.totolPrice < 1500) {
                $scope.setSbPayType(0, '一次性支付');
            }
        } else {
            $scope.totolPrice = $scope.phone.phoneBillPrice + $scope.phone.phonePrice;
            $scope.activeTag = "jjk";
        }
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on');
        $this.parent().addClass('on');
        $("#pickPackagePanel").slideUp();
    };

    $scope.checkPackage = function () {
        if (!scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('.card-details');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#pickPackagePanel").slideDown();
            return false;
        }
        return true;
    };

    $scope.showPkgPn = function () {
        $("#pickPackagePanel").slideToggle();
    };

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get("http://192.168.1.181:8082/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                 //选择默认内存
                 $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                 $scope.pkg = phone.packages[0];

                 $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                 $scope.mainPrice = phone.price;*/
            });
        }
    });
    androidInputBugFix();
}]);