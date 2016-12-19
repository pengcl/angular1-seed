"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneSingle', { //app首页
            url: "/phs/sg/:pageType/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/single/A/details.html';
            },
            controller: "pSingleProController",
            onExit: function(){
                console.log("a");
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pSingleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = $stateParams.pageType;
    $scope.activeTag = "jjk";
    $scope.category = systemName + "_mysy_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp("http://m.yfq.cn/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.package=$scope.phone.packageProductList[0];
        $scope.totolPrice = data.salePrice;
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });
    $scope.buyType = 1;
    $scope.activeTagName = "裸机+4G优惠套餐购";

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        $(".pay-item").removeClass("on");
        $("#payType" + id).addClass("on");
        wirtePayType(id);
    };
    
    var value;
    var payTypeAry=['payAll','payCOD','payMonthly'];
    function wirtePayType(payType)
    {
    	value=payTypeAry[payType];
    	writebdLog($scope.category, "_"+value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.setBuyType = function (event, type, typeName) {
        event.preventDefault();
        $scope.buyType = type;
        var $this = $(event.currentTarget);
        $this.parent().siblings().children().removeClass('curr');
        $this.addClass('curr');
        if (type == 0) {
            $scope.activeTag = "lj";
            //$scope.totolPrice = $scope.phone.phonePrice;
            $scope.activeTagName = typeName;
            if ($scope.totolPrice < 1500) {
                $scope.setSbPayType(0, '一次性支付');
            }
        } else {
            $scope.activeTag = "jjk";
            $scope.activeTagName = typeName;
        }
        writebdLog($scope.category, "_SelectBuyType", "渠道号", $scope.gh);//选择购买方式
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on-cardetails');
        $this.parent().addClass('on-cardetails');
        $("#pickPackagePanel").slideUp();
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
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
        writebdLog($scope.category, "_SelectBillPackage", "渠道号", $scope.gh);//选择话费套餐
    };

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get("http://m.yfq.cn/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                 //选择默认内存
                 $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                 $scope.pkg = phone.packages[0];

                 $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                 $scope.mainPrice = phone.price;*/
            });
        }
    });
    $scope.$watch('activeTag', function (n, o, $scope) {
        if (n != o) {
            $http.jsonp("http://m.yfq.cn/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                //$scope.phone = data;
                //$scope.package=$scope.phone.packageProductList[0];
                $scope.totolPrice = data.salePrice;
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    });
    androidInputBugFix();
}]);