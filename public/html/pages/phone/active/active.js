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
    if ($scope.pageType != undefined && $scope.pageType == "C")
        $scope.appType = systemName + "_sdhd_" + $scope.pageType + "_index";
    else
        $scope.appType = systemName + "_mysy_" + $scope.pageType + "_index";
    $scope.category = $scope.appType;
    //console.log($scope.category);

    $scope.params = window.location.search;

    $scope.$root.apiCode = 2;

    $scope.toggleClose = true;

    $scope.fqaToggleClose = function () {
        $scope.toggleClose = !$scope.toggleClose;
    };

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.$root.paracont = "获取验证码";
    $scope.$root.paraclass = "but_null";
    var second = 59, timePromise = undefined;

    $scope.$root.getActiveCode = function (phoneNumber) {
        $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
            if (data == "") {
                timePromise = $interval(function () {
                    if (second <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;

                        second = 59;
                        $scope.$root.paracont = "重发验证码";
                        $scope.$root.paraclass = "but_null";
                    } else {
                        $scope.$root.paracont = second + "秒后可重发";
                        $scope.$root.paraclass = "not but_null";
                        second--;

                    }
                }, 1000, 100);
            }
        });

        writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
    };

    $scope.$root.checkAddress = function () {
        $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.checkoutForm.receiverMobile.$valid) {
            //alert("请输入联系电话");
            $(".input-mobile").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.$root.checkActiveCode = function () {
        if (!$scope.checkoutForm.activeCode.$valid) {
            $(".input-vcode").addClass("weui-cell_warn");
            return false;
        } else {
            if (!checkMobileCode($scope.activeCode)) {
                $(".input-vcode").removeClass("weui-cell_success");
                $(".input-vcode").addClass("weui-cell_warn");
                return false;
            }
            return true;
        }
    };

    $interval(function () {
        $scope.getters = getRandomPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>";
    }, 2000);

    $scope.showFudai = function () {
        var targetHtml = $("#wxQrCode").html();
        $scope.Overlay.openCompile(targetHtml);
    };

    $scope.$root.shareQuan = function () {
        $scope.showShare();
    };

    $scope.$root.getQuan = function () {
        if (!$scope.$root.checkAddress()) {
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;

        }

        if (!$scope.$root.checkActiveCode()) {
            $scope.dialog.open("系统提示", "请输入正确的验证码！");
            return false;
        }

        $http.jsonp('http://192.168.1.181:8082/product/doReceiveMultipleCoupon.html?recieverMobile=' + $scope.receiver.mobile + '&couponType=HF-MX-JM&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.$root.apiCode = 0;
            $scope.dialog.open("系统提示", data[0].resultMsg);
            if (data[0].resultCode == 0) {
                $(".quan-result").removeClass("hide");
                $(".quan-form").addClass("hide");
            }
        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });
    };

    $scope.$root.usingQuan = function () {
        var $container = $('.content-scrollable');
        var $scrollTo = $('.hot-phone');
        $scope.Overlay.close();
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

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

}]);