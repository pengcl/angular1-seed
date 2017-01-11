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
}]).controller('pIndexController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', function ($scope, $location, $http, $stateParams, $interval, $timeout) {


    $scope.pageType = $stateParams.pageType;
    if($scope.pageType !=undefined && $scope.pageType == "C")
    	$scope.appType = systemName + "_sdhd_" + $scope.pageType + "_index";
    else
    	$scope.appType = systemName + "_mysy_" + $scope.pageType + "_index";
    $scope.category = $scope.appType;
    //console.log($scope.category);

    $scope.params = window.location.search;

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=bdtc&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.pkgs = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=lj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=mysy&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {

        $scope.doublePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.st = function (target) {//单双机切换回滚
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
        writeBtNavItem(index);
    };

    var btNavItemName = ['_MYSYBt', '_BKDJBt', '_CZTCBt', '_CustConsult'];

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

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $("img.lazy").lazyload({
            effect: "fadeIn",
            skip_invisible: false,
            container: $(".content-scrollable")
        });
    });

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.openCardPkg = function (targetId) {
        var targetHtml = $("#" + targetId).html();
        $scope.$root.Overlay.open(targetHtml);
    };

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

        if(!$scope.gh){
            $scope.gh = "";
        }

        if(!$scope.activity){
            $scope.activity ="sdhd";
        }

        //console.log($scope.gh,$scope.activity);

        $scope.submitUrl = cfApi.apiHost + "/wap/taokafanghaoNew/submitOrderCommon.html?activeTag=sdhd&brand=" + encodeURI(encodeURI($scope.machineName)) + "&gh=" + $scope.gh + "&activity=" + $scope.activity + "&reciverName=" + encodeURI(encodeURI($scope.receiver.name)) + "&receiverMobile=" + $scope.receiver.mobile + "&receiverCity=" + encodeURI(encodeURI($scope.receiver.city)) + "&receiverRoom=" + encodeURI(encodeURI($scope.receiver.room)) + "&payType=1&category=" + $scope.category + "&callback=JSON_CALLBACK";

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

}]);