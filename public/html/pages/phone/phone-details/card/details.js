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
}]).controller('pCardProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', '$timeout', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, $timeout, Phone) {

    window.location.href = "https://kdt.im/fBSu5h";

    $scope.pageType = $stateParams.pageType;
    $scope.activeTag = "mysytc";

    var activeName = "_mysy_" + $scope.pageType;
    if ($scope.pageType == 'pcdB') activeName = '_yucun_A';
    if ($scope.pageType == 'pcdC') activeName = '_yucun_B';
    if ($scope.pageType == 'pcdD') activeName = '_99wxll_A';
    if ($scope.pageType == 'pcdE') activeName = '_9.9indexE';
    if ($scope.pageType == 'pcdF') activeName = '_9.9indexF';
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
            "salesPrice": "99.00",
            "talkTime": "900",
            "pkgType": "dkyc50"
        },
        {
            "message": "50",
            "network": "4.5",
            "oldPrice": "304.00",
            "productId": 254,
            "productName": "5折预存156/月（4.5G流量 1800分钟通话）",
            "salesPrice": "156.00",
            "talkTime": "1800",
            "pkgType": "dkyc100"
        },
        {
            "message": "50",
            "network": "4.5",
            "oldPrice": "259.00",
            "productId": 351,
            "productName": "155元/月(900分钟通话,4.5G流量,50短信)",
            "salesPrice": "155.00",
            "talkTime": "900",
            "pkgType": "dkyc100"
        },
        {
            "message": "50",
            "network": "2.5",
            "oldPrice": "174.00",
            "productId": 251,
            "productName": "5折预存101/月（2.5G流量 850分钟）",
            "salesPrice": "98.00",
            "talkTime": "850",
            "pkgType": "dkyc50"
        }
    ];

    if ($scope.pageType == 'pcd') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/index.html' + window.location.search,
            shareTitle: '翼分期商城——电信新入网套餐5折起',
            shareDisc: '中国电信流量大降价，9.9元办五折优惠套餐，3.5G全国流量，仅102元/月！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/1.jpg'
        };
    }
    if ($scope.pageType == 'pcdB') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/indexB.html' + window.location.search,
            shareTitle: '翼分期商城——电信新入网套餐存100赠840',
            shareDisc: '4G月租优惠套餐，最低仅102元/月，3.5G全国流量！限时限量，手快有！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/B/tx1.png'
        };
    }
    if ($scope.pageType == 'pcdC') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/indexB.html' + window.location.search,
            shareTitle: '翼分期商城——电信新入网套餐存100赠840',
            shareDisc: '4G月租优惠套餐，最低仅102元/月，3.5G全国流量！限时限量，手快有！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/B/tx1.png'
        };
    }
    if ($scope.pageType == 'pcdD') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/indexD.html' + window.location.search,
            shareTitle: '您有一张无限流量卡可以领取，今日办理，仅需99元！',
            shareDisc: '套餐包含：广东省内无限流量，全国3.5GB，全国通话900分钟！今日限100张！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/D/nativeShare.jpg'
        };
        $scope.activeTag = "99wxll";
    }

    if ($scope.pageType == 'pcdE') {
        $timeout(function () {
            if ($scope.gh.indexOf('hytoutiao') != -1) {
                $("body").hide();
            }
        });
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/indexE.html' + window.location.search,
            shareTitle: '您有一张无限流量卡可以领取，今日办理，仅需99元！',
            shareDisc: '套餐包含：广东省内无限流量，全国3.5GB，全国通话900分钟！今日限100张！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/D/nativeShare.jpg'
        };
        $scope.activeTag = "mysytce";
        $scope.pkgs = [
            {
                "message": "50",
                "network": "6",
                "oldPrice": "199.00",
                "productId": 439,
                "productName": "5折预存102/月（3.5G流量900分钟通话）",
                "salesPrice": "99.00",
                "talkTime": "1000",
                "pkgType": "dkyc50"
            },
            {
                "message": "50",
                "network": "7",
                "oldPrice": "299.00",
                "productId": 441,
                "productName": "5折预存156/月（4.5G流量 1800分钟通话）",
                "salesPrice": "156.00",
                "talkTime": "1800",
                "pkgType": "dkyc100"
            },
            {
                "message": "50",
                "network": "7",
                "oldPrice": "259.00",
                "productId": 440,
                "productName": "155元/月(900分钟通话,4.5G流量,50短信)",
                "salesPrice": "155.00",
                "talkTime": "1000",
                "pkgType": "dkyc100"
            },
            {
                "message": "50",
                "network": "2.5",
                "oldPrice": "174.00",
                "productId": 438,
                "productName": "5折预存101/月（2.5G流量 850分钟）",
                "salesPrice": "98.00",
                "talkTime": "850",
                "pkgType": "dkyc50"
            }
        ];
    }

    if ($scope.pageType == 'pcdF') {
        $timeout(function () {
            if ($scope.gh.indexOf('hytoutiao') != -1) {
                $("body").hide();
            }
        });
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/index.html' + window.location.search,
            shareTitle: '您有一张无限流量卡可以领取，今日办理，仅需99元！',
            shareDisc: '套餐包含：广东省内无限流量，全国6GB，全国通话1000分钟！今日限100张！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/D/nativeShare.jpg'
        };
        $scope.activeTag = "mysytce";
        $scope.pkgs = [
            {
                "message": "0",
                "network": "6",
                "oldPrice": "199.00",
                "productId": 439,
                "productName": "5折预存99/月（3.5G流量900分钟通话）",
                "salesPrice": "99.00",
                "talkTime": "1000",
                "pkgType": "dkyc50"
            },
            {
                "message": "50",
                "network": "7.5",
                "oldPrice": "304.00",
                "productId": 441,
                "productName": "5折预存156/月（4.5G流量 1800分钟通话）",
                "salesPrice": "156.00",
                "talkTime": "2100",
                "pkgType": "dkyc100"
            },
            {
                "message": "50",
                "network": "7.5",
                "oldPrice": "259.00",
                "productId": 440,
                "productName": "155元/月(900分钟通话,4.5G流量,50短信)",
                "salesPrice": "136.00",
                "talkTime": "1200",
                "pkgType": "dkyc100"
            },
            {
                "message": "50",
                "network": "2.5",
                "oldPrice": "174.00",
                "productId": 438,
                "productName": "5折预存69/月（2.5G流量 850分钟）",
                "salesPrice": "69.00",
                "talkTime": "850",
                "pkgType": "dkyc50"
            }
        ];
    }

    var pkgUrl;

    if ($stateParams.cardId == "") {
        pkgUrl = cfApi.apiHost + "/product/getPackageInfo.ht?productId=" + $scope.pkgs[0].productId + "&s=wap&callback=JSON_CALLBACK";
    } else {
        pkgUrl = cfApi.apiHost + "/product/getPackageInfo.ht?productId=" + $stateParams.cardId + "&s=wap&callback=JSON_CALLBACK";
    }

    //console.log(pkgUrl);


    $http.jsonp(pkgUrl).success(function (data, status, headers, config) {
        $scope.card = data;
        $scope.totolPrice = data.salesPrice;
        $scope.showPrice = 50;

        if (data.productId == 254 || data.productId == 351) {
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

        if (pkg.productId == 254 || pkg.productId == 351) {
            $scope.showPrice = 100;
        }
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on');
        $this.parent().addClass('on');
        $("#pickPackagePanel").slideUp();
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
        $("#pickPackagePanel").slideToggle();
    };

    $scope.selectedMifis = [];

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [];
            $scope.totalPrice = 200;
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get(cfApi.apiHost + "/product/getProDetial.ht?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                 //选择默认内存
                 $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                 $scope.pkg = phone.packages[0];

                 $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                 $scope.mainPrice = phone.price;*/
            });
        }
    });

    $scope.$watch('card', function (n, o, $scope) {
        if (n !== o, n !== undefined) {
            $http.jsonp(cfApi.apiHost + "/product/getViewProductList.ht?productId=" + n.productId + "&s=wap&callback=JSON_CALLBACK").success(function (data) {
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
    });

    $scope.checkForms = function () {
        if ($scope.$root.checkActiveCode()) {

            //$("#checkoutForm").submit();

            var url = cfApi.apiHost + "/product/checkPhoneState.ht?number=[" + $scope.checkoutForm.mainNumber.$modelValue + "," + $scope.checkoutForm.subNumber.$modelValue + "," + $scope.checkoutForm.thirdNumber.$modelValue + "]&s=wap&callback=JSON_CALLBACK";

            $scope.$root.toast.open();
            $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
                if (data.tempIndexs.length === 0) {//查看号码是否被选
                    $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.ht?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.card.productId + '&category=' + $scope.category + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单
                        if (data.result) {
                            $("#checkoutForm").submit();
                            $scope.$root.toast.close();
                            writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
                        } else {
                            $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
                            $scope.$root.toast.close();
                        }
                    });
                } else {
                    $scope.$root.toast.close();
                    var html = "您选择的";
                    for (var i = 0; i < data.tempIndexs.length; i++) {
                        if (data.tempIndexs[i] === 0) {
                            html = html + "主卡电话号码：" + $scope.checkoutForm.mainNumber.$modelValue + "、";
                            $scope.mainNumberWarn = true;
                            //$scope.selectedData.mainNumber = "";
                        }
                        if (data.tempIndexs[i] === 1) {
                            html = html + "副卡1电话号码：" + $scope.checkoutForm.subNumber.$modelValue + "、";
                            $scope.subNumberWarn = true;
                            //$scope.selectedData.subNumber = "";
                        }
                        if (data.tempIndexs[i] === 2) {
                            html = html + "副卡2电话号码：" + $scope.checkoutForm.thirdNumber.$modelValue + "、";
                            $scope.thirdNumberWarn = true;
                            //$scope.selectedData.thirdNumber = "";
                        }
                    }
                    html = html + "已被选择，请重新选号！";
                    $scope.dialog.open("系统提示", html);
                }
            });

        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.submitMifi = function (e) {
        var $this = $(event.currentTarget);
        if ($this.hasClass("disabled")) {
            return false;
        }
        if (!$scope.checkMainNumber()) {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
            return false;
        }

        if (!$scope.checkSimType()) {
            return false;
        }

        if (!$scope.checkAddress()) {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
            return false;
        }

        $scope.checkForms();

    };

    androidInputBugFix();
}]);