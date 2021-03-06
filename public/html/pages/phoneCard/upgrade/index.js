"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider.state('pcdUpgrade', { //app首页
        url: "/pcdUpgrade/index",
        templateUrl: "pages/phoneCard/upgrade/index.html",
        controller: "pdUpgradeController"
    });
}]).controller('pdUpgradeController', ['$scope', '$rootScope', '$location', '$http', '$timeout', '$cookieStore', function ($scope, $rootScope, $location, $http, $timeout, $cookieStore) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
    //console.log($scope.referrerForm.referrerNo);

    $scope.pageType = "A";
    $scope.appType = systemName + "_lyhtcsj_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.params = window.location.search;

    $scope.receiver = {};

    $scope.totalPrice = 210;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/pcdUpgrade/index' + window.location.search,
        shareTitle: '翼分期商城——话费充值优惠',
        shareDisc: '翼分期商城新用户专享，话费充100送100，充200送150，更多充值优惠等你来！',
        picUrl: 'http://app.yfq.cn/images/phoneCard/recharge/share.jpg'
    };

    //统计

    $timeout(function () {
        writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
        //$scope.$root.toast.close();
    });

    $scope.upgradeMobile = function (upgradeMobile) {
        $scope.upgradeStatus = undefined;
        if (!$scope.checkoutForm.iccid.$valid) {
            return false;
        } else {
            $("#iccid").blur();
        }
        $http.jsonp(cfApi.apiHost + '/product/checkNumUpgrade.html?receiverMobile=' + upgradeMobile + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.upgradeStatus = data;

            if (data.result) {
                $scope.receiver.name = data.recieverName;
                $scope.receiver.mobile = data.recieverMobile;
                $scope.receiver.city = data.recieverAddress.split(" ")[0];
                $scope.receiver.room = data.recieverAddress.split(" ")[1];

                $scope._mainNumber = data.recieverMobile;
            }

            writebdLog($scope.category, "_InputIndexNumber", "渠道号", $scope.gh);

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });
    };

    $scope.adrHistory = true;

    $scope.tipsMore = false;

    $scope.iPromise = false;
    $scope.setPromise = function () {
        $scope.iPromise = !$scope.iPromise;
    };

    $scope.setTipsShow = function (type) {
        $scope.tipsMore = type;
    };

    $scope.setAdrType = function (e, type) {
        $scope.adrHistory = type;
        if (type) {
            $scope.adrOk();
        }
        if (!type) {
            $scope.showReceiverPn(e);
        }
    };

    /*$http.jsonp(cfApi.apiHost + '/yfqcz/czProdProductsController.do?findRechargeProducts&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.upgradeProducts = data;

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });*/

    $scope.upgradeProducts = [{
        id: 437,
        name: '预存￥200升级无限流量套餐'
    }];

    $scope.setProduct = function (event, product) {
        var $this = $(event.currentTarget);

        if ($this.hasClass("disabled")) {
            return false;
        }

        writebdLog($scope.category, "_UpgradePackages", "渠道号", $scope.gh);

        $scope.product = product;
    };

    $scope.mifis = [{
        productId: 432,
        productName: '4G车载随身WiFi(点烟器款)',
        oldPrice: 168,
        salePrice: 168,
        selected: false
    }, {
        productId: 433,
        productName: '4G随身WiFi(带充电宝款)',
        oldPrice: 268,
        salePrice: 268,
        selected: false
    }];

    /*$http.jsonp(cfApi.apiHost + "/product/getViewProductList.html?productId=" + 437 + "&s=wap&callback=JSON_CALLBACK").success(function (data) {
        console.log(data);
        var mifis = [];
        $.each(data, function (i, k) {
            mifis.push({
                productId: k.productId,
                productName: k.productName,
                oldPrice: k.oldPrice,
                salePrice: k.salePrice,
                selected: false
            });
        });

        $scope.mifis = mifis;

    });*/

    /*$scope.$watch('upgradeStatus', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n.result) {
                $http.jsonp(cfApi.apiHost + "/product/getViewProductList.html?productId=" + 437 + "&s=wap&callback=JSON_CALLBACK").success(function (data) {
                    var mifis = [];
                    $.each(data, function (i, k) {
                        mifis.push({
                            productId: k.productId,
                            productName: k.productName,
                            oldPrice: k.oldPrice,
                            salePrice: k.salePrice,
                            selected: false
                        });
                    });

                    $scope.mifis = mifis;

                });
            }
        }
    }, $scope);*/

    $scope.showUpgradeTip = function (e) {
        var targetHtml = $("#rechargeTipsPanel").html();
        $scope.$root.Overlay.open(targetHtml);
    };

    $scope.getContact = function (e) {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog(scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    //记录点击事件
    $scope.writeClickEvent = function (event, name) {
        var $this = $(event.currentTarget);
        if ($this.hasClass("disabled")) {
            event.preventDefault();
            return false;
        }
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);//记录点击事件
    };

    $scope.goTo = function (target) {
        var $container = $(".content-scrollable");
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.isNewAdr = false;
    $scope.newAdr = function (event) {
        $scope.isNewAdr = true;
        $scope.receiver = {};
        $("#receiverAddressPanel").show();
    };
    $scope.oldAdr = function (event) {
        $scope.isNewAdr = false;
        $scope.receiver = $cookieStore.get('receiver');
        $("#receiverAddressPanel").hide();
    };

    $scope.submitForm = function (e) {
        if ($(e.currentTarget).hasClass('disabled')) {
            return false;
        }
        var $form = $("#checkoutForm");

        if (!$scope.checkoutForm.iccid.$valid) {
            return false;
        }

        if ($scope.isNewAdr) {
            if (!$scope.checkAddress()) {
                $("#receiverAddressPanel").show();
                $scope.goTo('#receiverAddress');
                return false;
            }
            if (!$scope.$root.checkActiveCode()) {
                $("#receiverAddressPanel").show();
                $scope.goTo('#receiverAddress');
                return false;
            }
        }


        $scope.$root.toast.open();

        var subUrl = cfApi.apiHost + "/product/upgradeMobile.html?additionalId=" + $scope.selectedMifis + "&upgradeNum=" + $scope.iccid + "&recieverName=" + $scope.receiver.name + "&recieverMobile=" + $scope.receiver.mobile + "&recieverAddress=" + encodeURI($scope.receiver.city + $scope.receiver.room) + "&productId=437&s=wap&callback=JSON_CALLBACK";

        $http.jsonp(subUrl).success(function (data) {
            if (data.result) {
                $scope.$root.toast.close();
                window.location.href = data.payUrl;
                writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//立即支付
            } else {
                $scope.$root.toast.close();
                $scope.$root.dialog.open('系统提示', data.msg);
            }
        });

    };

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [];
            $scope.totalPrice = 210;
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('receiver', function (n, o, $scope) {
        //console.log(n);
    }, true)

}]);