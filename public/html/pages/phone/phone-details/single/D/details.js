"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneDSingle', { //app首页
            url: "/phs/sg/D/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/single/D/details.html';
            },
            controller: "pDSingleProController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pDSingleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', '$timeout', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore, $timeout) {

    $scope.pageType = 'D';
    $scope.activeTag = "jktchdd";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D/phones';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl: 'http://app.yfq.cn/images/active/d/share_active.jpg'
    };

    $scope.sold = Math.round(Math.random() * 1000);

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_mysy_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $container = $(".content-scrollable");

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.imgUrls = [];

        if ($scope.phone.activityproductId == 366) {
            $scope.phoneFlash = [
                {
                    "phoneId": 366,
                    "flash": 128
                },
                {
                    "phoneId": 367,
                    "flash": 256
                }
            ]
        }

        if ($scope.phone.activityproductId == 367) {
            $scope.phoneFlash = [
                {
                    "phoneId": 366,
                    "flash": 128
                },
                {
                    "phoneId": 367,
                    "flash": 256
                }
            ]
        }

        if ($scope.phone.activityproductId == 368) {
            $scope.phoneFlash = [
                {
                    "phoneId": 368,
                    "flash": 128
                },
                {
                    "phoneId": 369,
                    "flash": 256
                }
            ]
        }

        if ($scope.phone.activityproductId == 369) {
            $scope.phoneFlash = [
                {
                    "phoneId": 368,
                    "flash": 128
                },
                {
                    "phoneId": 369,
                    "flash": 256
                }
            ]
        }

        for (var i = 0; i < data.phoneTypes[0].mediaProductList.length; i++) {
            $scope.imgUrls.push("http://www.yfq.cn:8899/fileserver/medias/" + data.phoneTypes[0].mediaProductList[i].mediaUrl);
        }

        $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.pkgs = data;

            $scope.packageIndex = 0;

            var cardItems = $scope.phone.cardItems.split(";").sort(function (a, b) {
                return a.slice(a.indexOf(":") + 1, a.length) - b.slice(b.indexOf(":") + 1, b.length);
            });


            $scope.packages = [];

            $.each(eval(cardItems), function (i, k) {
                var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                obj.comparePrices = $scope.phone.phoneBillPrice - obj.salesPrice;
                $scope.packages.push(obj);
            });

            for (var i = 1; i < $scope.packages.length; i++) {
                if (Math.abs($scope.packages[i].comparePrices) < Math.abs($scope.packages[$scope.packageIndex].comparePrices)) {
                    if ($scope.packages[i].comparePrices <= 0) {
                        $scope.packageIndex = i;
                    }
                }
            }

            $scope.packages = $scope.packages.sort(function (a, b) {
                return a.oldPrice - b.oldPrice;
            });

            $scope.package = $scope.packages[0];

            if ($scope.phone.activityproductId == 366 || $scope.phone.activityproductId == 367 || $scope.phone.activityproductId == 368 || $scope.phone.activityproductId == 369) {
                $scope.setDefaultPayType(0, "预约购买");
            }else {
                if ($cookieStore.get('receiver')) {
                    if ($cookieStore.get('receiver').city.indexOf('广州市') != -1) {
                        $scope.setDefaultPayType(0, "送货上门");
                    } else {
                        $scope.setDefaultPayType(2, "信用卡分期");
                    }
                } else {
                    $scope.setDefaultPayType(2, "信用卡分期");
                }
            }

            $(".phone-pkgs-item").eq(1).find(".pick-panel").addClass("show");

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        $scope.$watch('receiver.city', function (n, o, $scope) {
            if ($scope.phone.activityproductId == 366 || $scope.phone.activityproductId == 367 || $scope.phone.activityproductId == 368 || $scope.phone.activityproductId == 369) {
                $scope.setDefaultPayType(0, "预约购买");
                return false;
            }

            if (n.indexOf('广州市') != -1) {
                $scope.setDefaultPayType(0, "送货上门");
            } else {
                if ($scope.payType == 0) {
                    $scope.setDefaultPayType(0, "一次性支付");
                }
            }
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

    $scope.showNgFudai = function (state) {
        if (!state) {
            $scope.showFudai('JM-MX');
        }
    };

    if ($location.search().duplicateNum) {
        if (Array.isArray($location.search().duplicateNum)) {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum[0] + "已被购买，请重新选择");
        } else {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
        }
    }

    $scope.setFlashDriver = function (flash) {
        window.location.href = 'http://' + window.location.host + '/phs/sg/D/' + flash.phoneId + window.location.search;
    };

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
        if (!$scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
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

    $scope.$watch('payType', function (n, o, $scope) {
        console.log(n, o);
    });

    $scope.$watch('package', function (n, o, $scope) {
        if (n != o) {
            if (n.salesPrice >= $scope.phone.phoneBillPrice) {
                $scope.totalPrice = n.salesPrice;
            } else {
                $scope.totalPrice = $scope.phone.phoneBillPrice;
            }
        }
    }, true);

    androidInputBugFix();
}]);