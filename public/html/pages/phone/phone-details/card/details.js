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
    $scope.activeTag = "mysytc";
    
    var activeName = "_mysy_" + $scope.pageType;
    if($scope.pageType == 'pcdB' || $scope.pageType == 'pcdC') activeName = '_yucun_A'
    $scope.category = systemName + activeName + "_FlowPackages";
    
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();

    $scope.stores = Math.round(Math.random() * 100);
    $scope.sold = Math.round(Math.random() * 5000);

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.pkgs = [
        {
            "message": "50",
            "network": "3.5",
            "oldPrice": "204.00",
            "productId": 252,
            "productName": "5折预存102/月（3.5G流量900分钟通话）",
            "salesPrice": "102.00",
            "talkTime": "900",
            "pkgType":"dkyc50"
        },
        {
            "message": "50",
            "network": "4.5",
            "oldPrice": "304.00",
            "productId": 254,
            "productName": "5折预存156/月（4.5G流量 1800分钟通话）",
            "salesPrice": "156.00",
            "talkTime": "1800",
            "pkgType":"dkyc100"
        },
        {
            "message": "50",
            "network": "4.5",
            "oldPrice": "259.00",
            "productId": 351,
            "productName": "155元/月(900分钟通话,4.5G流量,50短信)",
            "salesPrice": "155.00",
            "talkTime": "900",
            "pkgType":"dkyc100"
        },
        {
            "message": "50",
            "network": "2.5",
            "oldPrice": "174.00",
            "productId": 251,
            "productName": "5折预存101/月（2.5G流量 850分钟）",
            "salesPrice": "101.00",
            "talkTime": "850",
            "pkgType":"dkyc50"
        }
    ];


    $http.jsonp(cfApi.apiHost + "/product/getPackageInfo.html?productId=" + $stateParams.cardId + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.card = data;
        $scope.totolPrice = data.salesPrice;
        $scope.showPrice = 50;

        if(data.productId == 254 || data.productId == 351){
            $scope.showPrice = 100;
        }

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
        wirtePayType(id);
    };

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

    function wirtePayType(payType) {
        value = payTypeAry[payType];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    }

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
        $scope.card = pkg;
        $scope.showPrice = 50;

        if(pkg.productId == 254 || pkg.productId == 351){
            $scope.showPrice = 100;
        }
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
            $http.get(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
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