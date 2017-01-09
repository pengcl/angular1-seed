"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeIndex', { //app首页
            url: "/phone/active/:pageType",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/' + $stateParams.pageType + '/index.html';
            },
            controller: "pActiveController"
        });
}]).controller('pActiveController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', function ($scope, $location, $http, $stateParams, $interval, $timeout) {

    $scope.pageType = $stateParams.pageType;
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.params = window.location.search;

    $scope.$root.apiCode = 2;

    $scope.toggleClose = true;

    $scope.fqaToggleClose = function () {
        $scope.toggleClose = !$scope.toggleClose;
        if($scope.toggleClose)
        	writebdLog($scope.category, "_CouExplainStop", "渠道号", $scope.gh);//收起优惠券说明
        else
        	writebdLog($scope.category, "_CouExplainShow", "渠道号", $scope.gh);//展示优惠券说明
    };

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $interval(function () {
        $scope.getters = getRandomPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>";
    }, 2000);

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        var $scrollTo = $('#indexBanner');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $http.jsonp('http://m.yfq.cn/product/getProList.html?activeTag=lj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.$root.btNavItem = function (index) {
        writeBtNavItem(index);
    };

    var btNavItemName = ['_MyCoupon', '_MyOrder', '_CustConsult'];

    function writeBtNavItem(index) {
        writebdLog($scope.category, btNavItemName[index], "渠道号", $scope.gh);//选择模块
    }

    $interval(function () {
        $scope.selkillTxt = getRandomName() + "，刚刚购买了 " + getRandomProduct();
    }, 2000);

    //记录用户购买的商品：专区模块英文名称+商品id
    $scope.writeSelectFoods = function (obj, productId, modular) {
        writebdLog($scope.category, "_" + productId + modular, "渠道号", $scope.gh);//选择的商品ID
    };

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.gotoOrderContent = function () {
        var $container = $('.content-scrollable');
        var $scrollTo = $('.order-content');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
        });

        writebdLog($scope.category, "_ClickReceive", "渠道号", $scope.gh);//点击领取
    };

    $scope.submitFormCommon = function () {
        //console.log($scope.checkAddress());
        $scope.toast.open();
        //console.log($scope.checkAddress());
        if (!$scope.checkMachineName()) {
            $scope.toast.close();
            return false;
        }

        if (!$scope.checkAddress()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkActiveCode()) {
            $scope.toast.close();
            return false;
        }

        if (!$scope.gh) {
            $scope.gh = "";
        }

        if (!$scope.activity) {
            $scope.activity = "sdhd";
        }

        //console.log($scope.gh,$scope.activity);

        $scope.submitUrl = "http://m.yfq.cn/wap/taokafanghaoNew/submitOrderCommon.html?activeTag=sdhd&brand=" + encodeURI(encodeURI($scope.machineName)) + "&gh=" + $scope.gh + "&activity=" + $scope.activity + "&reciverName=" + encodeURI(encodeURI($scope.receiver.name)) + "&receiverMobile=" + $scope.receiver.mobile + "&receiverCity=" + encodeURI(encodeURI($scope.receiver.city)) + "&receiverRoom=" + encodeURI(encodeURI($scope.receiver.room)) + "&payType=1&category=" + $scope.category + "&callback=JSON_CALLBACK";

        $http.jsonp($scope.submitUrl).success(function (data, status, headers, config) {
            $scope.toast.close();
            if (data[0].resultCode == "0") {
                $scope.orderNo = data[0].resultMsg;
                var timer = $timeout(
                    function () {
                        var targetHtml = $("#wxQrCode").html();
                        $scope.Overlay.open(targetHtml);
                    },
                    100
                );
            } else {
                $scope.dialog.open("系统提示", data[0].resultMsg);
            }
        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh); //免费领卡
    };
    
    $scope.setMachine = function (machine,productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    }

}]);