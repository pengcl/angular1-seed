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

    var butie = "358:6388;359:5388;360:3880;361:2980;362:2400";

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

                $.each(eval(butie.split(";")), function (jtem, value) {
                    if (value.split(":")[0] == k.slice(0, k.indexOf(':'))) {
                        if ($scope.phone.salePrice > value.split(":")[1]) {
                            obj.comparePrices = obj.oldPrice * 18 + ($scope.phone.salePrice - value.split(":")[1]);
                        } else {
                            obj.comparePrices = obj.oldPrice * 18;
                        }
                    }
                });

                $scope.packages.push(obj);
            });

            for (var i = 1; i < $scope.packages.length; i++) {
                if ($scope.packages[i].comparePrices < $scope.packages[$scope.packageIndex].comparePrices) {
                    $scope.packageIndex = i;
                }
            }

            $scope.package = $scope.packages[$scope.packageIndex];

            if ($scope.phone.activityproductId == 366 || $scope.phone.activityproductId == 367 || $scope.phone.activityproductId == 368 || $scope.phone.activityproductId == 369) {
                $scope.setDefaultPayType(0, "预约购买");
            } else {
                if ($cookieStore.get('receiver')) {
                    if ($cookieStore.get('receiver').city.indexOf('广州市') != -1) {
                        $scope.setDefaultPayType(1, "送货上门");
                    } else {
                        $scope.setDefaultPayType(0, "一次性支付");
                    }
                } else {
                    $scope.setDefaultPayType(0, "一次性支付");
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

            if(n != ""){
                if (n.indexOf('广州市') != -1) {
                    $scope.setDefaultPayType(1, "送货上门");
                } else {
                    if ($scope.payType == 1) {
                        $scope.setDefaultPayType(0, "一次性支付");
                    }
                }
            }else {
                $scope.setDefaultPayType(0, "一次性支付");
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

    $scope.loadedCheck = function () {
        if (!$scope.checkoutForm.reciverName.$valid) {
            //alert("请输入收件人");
            return false;
        } else if (!$scope.checkoutForm.receiverMobile.$valid) {
            //alert("请输入联系电话");
            return false;
        } else if (!$scope.checkoutForm.receiverCity.$valid) {
            //alert("请选择收件区域");
            return false;
        } else if (!$scope.checkoutForm.receiverRoom.$valid) {
            //alert("请输入详细地址");
            return false;
        }
        return true;
    };

    $timeout(function () {
        console.log($scope.loadedCheck());
        if(!$scope.loadedCheck()){
            $("#receiverAddressPanel").slideDown();
        }
    });

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

    //var cardPrices = "358:6012;359:5472;360:4662;361:3672;362:3132";

    $scope.$watch('package', function (n, o, $scope) {
        if (n != o) {
            $.each(eval(butie.split(";")), function (i, k) {
                if (k.split(":")[0] == n.productId) {
                    $scope.btp = k.split(":")[1];
                }
            });

            if ($scope.phone.salePrice > $scope.btp) {
                $scope.totalPrice = $scope.package.oldPrice * 18 + ($scope.phone.salePrice - $scope.btp);
            } else {
                $scope.totalPrice = $scope.package.oldPrice * 18;
            }

            //console.log(cardPrices.indexOf(n.productId));
            //var cp = cardPrices.substr(cardPrices.indexOf(n.productId));
            /*if (n.salesPrice >= $scope.phone.phoneBillPrice) {
             $scope.totalPrice = n.salesPrice;
             } else {
             $scope.totalPrice = $scope.phone.phoneBillPrice;
             }*/
        }
    }, true);

    androidInputBugFix();
}]);