"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneCSingle', { //app首页
            url: "/phs/sg/C/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/single/C/details.html';
            },
            controller: "pCSingleProController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pCSingleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', '$timeout', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore, $timeout) {

    $scope.pageType = 'C';
    $scope.activeTag = "jktchdd";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/C/phones';

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_coupon_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $container = $(".content-scrollable");

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.imgUrls = [];
        for (var i = 0; i < data.phoneTypes[0].mediaProductList.length; i++) {
            $scope.imgUrls.push("http://www.yfq.cn:8899/fileserver/medias/" + data.phoneTypes[0].mediaProductList[i].mediaUrl);
        }

        $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.pkgs = data;

            var cardItems = $scope.phone.cardItems.split(";").sort(function (a, b) {
                return a.slice(a.indexOf(":") + 1, a.length) - b.slice(b.indexOf(":") + 1, b.length);
            });


            $scope.packages = [];

            $.each(eval(cardItems), function (i, k) {
                var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                $scope.packages.push(obj);
                //$scope.comparePrices.push(data.salePrice - obj.salesPrice);
            });

            $scope.package = $scope.packages[0];

            if ($cookieStore.get('receiver')) {
                if ($cookieStore.get('receiver').city.indexOf('广州市') != -1) {
                    $scope.setDefaultPayType(0, "送货上门");
                } else {
                    $scope.setDefaultPayType(2, "信用卡分期");
                }
            } else {
                $scope.setDefaultPayType(2, "信用卡分期");
            }

            $(".phone-pkgs-item").eq(1).find(".pick-panel").addClass("show");

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

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
    $scope.activeTagName = "裸机";

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        wirtePayType(id);
    };

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

    function wirtePayType(payType) {
        value = payTypeAry[payType];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.setBuyType = function (event, type, typeName) {
        event.preventDefault();
        $scope.buyType = type;
        if (type == 0) {
            $scope.activeTag = "lj";
            //$scope.totolPrice = $scope.phone.phonePrice;
            $scope.activeTagName = typeName;

            //if ($scope.totolPrice < 1500) {
            if ($scope.payType == 2) {
                $scope.setSbPayType(0, '一次性支付');
            } else {
                //$scope.setSbPayType(0, '一次性支付');
            }

            //}
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
        $(".card-details").slideToggle();
        writebdLog($scope.category, "_SelectBillPackage", "渠道号", $scope.gh);//选择话费套餐
    };

    //$scope.pkgAndNumber = $cookieStore.get('pkgAndNumber');
    if ($cookieStore.get('pkgAndNumber')) {
        $scope.pkgAndNumber = $cookieStore.get('pkgAndNumber');
    } else {
        $scope.pkgAndNumber = false;
    }

    $scope.checkForm = function () {

        var $form = $("#checkoutForm");
        if ($scope.$root.checkActiveCode()) {
            writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//立即支付
            $scope.$root.toast.open();

            $form.submit();
        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.submitForm = function (event) {
        if ($scope.checkMainNumber()) {
            if ($scope.checkAddress()) {
                $scope.checkForm();
            } else {
                var $scrollTo = $('#receiverAddress');
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                });
                $("#receiverAddressPanel").slideDown();
                $(".adr-tab").addClass("down");
            }
        }
    };

    $scope.$watch('package', function (n, o, $scope) {
        if (n != o) {
            if (n.salesPrice >= $scope.phone.phoneBillPrice) {
                $scope.totalPrice = n.salesPrice;
            } else {
                $scope.totalPrice = $scope.phone.phoneBillPrice;
            }
        }
    }, true);

    $scope.$watch('receiver.city', function (n, o, $scope) {
        if (n.indexOf('广州市') != -1) {
            $scope.setDefaultPayType(0, "送货上门");
        }else {
            if($scope.payType == 0){
                $scope.setDefaultPayType(0, "一次性支付");
            }
        }
    });

    androidInputBugFix();
}]);