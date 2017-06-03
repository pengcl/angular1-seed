"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardV7', { //app首页
            url: "/fd/v7/:productId",
            templateUrl: "pages/flowCard/flowCard-details/v7/v7.html",
            controller: "flowCardV7Controller"
        })
}]).controller('flowCardV7Controller', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "129wxll";
    $scope.pageType = 'A';
    $scope.category = systemName + "_129wxll_" + $scope.pageType;
    $scope.fqaMore = false;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.productId + "&activeTag=mifitc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.product = data;
        $scope.selectedMifis = [$scope.product.activityproductId];
        $scope.packageItem = data.packageProductList[0];

        var mifis = [];
        $.each(data.phoneTypes, function (i, k) {
            mifis.push({
                productId: k.productId,
                productName: k.productName,
                salePrice: k.salePrice,
                selected: false
            });
        });

        $scope.mifis = mifis;
        $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/fd/v7/' + $stateParams.productId + window.location.search,
            shareTitle: '您有一张无限流量卡可以领取，今日办理，仅需129元！',
            shareDisc: '套餐包含：广东省内无限流量，全国3.5GB，全国通话900分钟！今日限100张！',
            picUrl: 'http://app.yfq.cn/images/flow/flowcard/v7/nativeShare.jpg'
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];
    $scope.payType = 1;
    $scope.setPayType = function (e, type) {
        $scope.payType = type;
        writebdLog($scope.category, "_" + payTypeAry[type], "渠道号", $scope.gh);//选择支付方式
    };

    if ($location.search().duplicateNum) {
        $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
    }

    $scope.autoSelect = true;

    $scope.setAutoSelect = function () {
        $scope.autoSelect = !$scope.autoSelect;
        writebdLog($scope.category, "_SystemNumber" + !$scope.autoSelect, "渠道号", $scope.gh); //是否系统分配号码
    };

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomName() + "(" + getRandomReceiverPhone() + ")" + " 领取无限流量套餐 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        var inputData = [];
        var inputData1 = [];

        $.each(data, function (i, k) {
            if (k.s > 0) {
                inputData.push(k);
            }
        });

        $.each(data, function (i, k) {
            if (k.s == 0) {
                inputData1.push(k);
            }
        });

        $scope.inputData = inputData;

        if(inputData.length < 6){
            $scope.inputData = inputData1;
        }

        $scope.inputData1 = inputData1;

    });

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.mainPanel = false;
    $scope.showMainPanel = function () {
        $scope.mainPanel = !$scope.mainPanel;
        writebdLog($scope.category, "_PanelMain" + $scope.mainPanel, "渠道号", $scope.gh);
    };

    $scope.subPanel = false;
    $scope.showSubPanel = function () {
        $scope.subPanel = !$scope.subPanel;
        writebdLog($scope.category, "_PanelSub" + $scope.subPanel, "渠道号", $scope.gh);
    };

    $scope.thirdPanel = false;
    $scope.showThirdPanel = function () {
        $scope.thirdPanel = !$scope.thirdPanel;
        writebdLog($scope.category, "_PanelThrid" + $scope.thirdPanel, "渠道号", $scope.gh);
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.selectedData = {};

    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");
        if (!$scope.checkoutForm.mainNumber.$valid) {
            $scope.mainNumberWarn = true;
            $scope.goTo('#mainNumberArea');
            return false;
        }
        if (!$scope.autoSelect) {
            if (!$scope.checkoutForm.subNumber.$valid) {
                $scope.subNumberWarn = true;
                $scope.goTo('#subNumberArea');
                return false;
            }
            if (!$scope.checkoutForm.thirdNumber.$valid) {
                $scope.thirdNumberWarn = true;
                $scope.goTo('#thirdNumberArea');
                return false;
            }
        }
        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        var url = cfApi.apiHost + "/product/checkPhoneState.html?number=[" + $scope.selectedData.mainNumber.n + "," + $scope.selectedData.subNumber.n + "," + $scope.selectedData.thirdNumber.n + "]&s=wap&callback=JSON_CALLBACK";

        $scope.$root.toast.open();
        $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
            if (data.tempIndexs.length === 0) {//查看号码是否被选
                $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.packageItem.productId + '&category=' + $scope.category + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

                    if (data.result) {
                        $form.submit();
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
                        html = html + "主卡电话号码：" + $scope.selectedData.mainNumber.n + "、";
                        $scope.mainNumberWarn = true;
                        $scope.selectedData.mainNumber = "";
                    }
                    if (data.tempIndexs[i] === 1) {
                        html = html + "副卡1电话号码：" + $scope.selectedData.subNumber.n + "、";
                        $scope.subNumberWarn = true;
                        $scope.selectedData.subNumber = "";
                    }
                    if (data.tempIndexs[i] === 2) {
                        html = html + "副卡2电话号码：" + $scope.selectedData.thirdNumber.n + "、";
                        $scope.thirdNumberWarn = true;
                        $scope.selectedData.thirdNumber = "";
                    }
                }
                html = html + "已被选择，请重新选号！";
                $scope.dialog.open("系统提示", html);
            }
        });
    };
    $scope.setFqaMore = function () {
        $scope.fqaMore = !$scope.fqaMore;
    };
    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [$scope.product.activityproductId];
            $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n) {
                var $form = $("#checkoutForm");
                $form.submit();
                writebdLog($scope.category, "_" + "BuyNowThree", "渠道号", $scope.gh);//立即支付
            }
        }
    });

    $scope.$watch('selectedData', function (n, o, $scope) {
        if (n != o && n.thirdNumber) {
            if (n.subNumber.n === n.thirdNumber.n) {
                $scope.autoSelect = !$scope.autoSelect;
                $scope.autoSelect = !$scope.autoSelect;
            }
        }

    }, true);

    $scope.$watch('outputData', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n.numberType === 'mainNumber') {
                $scope.selectedData.mainNumber = n.number;
                $scope.mainPanel = false;
                $scope.mainNumberWarn = false;

                if ($scope.inputData1.indexOf(n.number) != -1) {
                    $scope.inputData1 = $scope.inputData1.slice(0, $scope.inputData1.indexOf(n.number)).concat($scope.inputData1.slice($scope.inputData1.indexOf(n.number) + 1));
                }
            }
            if (n.numberType === 'subNumber') {
                $scope.selectedData.subNumber = n.number;
                if (n.number) {
                    $scope.subPanel = false;
                    $scope.subNumberWarn = false;
                } else {
                    $scope.subPanel = true;
                }
            }
            if (n.numberType === 'thirdNumber') {
                $scope.selectedData.thirdNumber = n.number;
                if (n.number) {
                    $scope.thirdPanel = false;
                    $scope.thirdNumberWarn = false;
                } else {
                    $scope.thirdPanel = true;
                }
            }
        }
    }, true);

}]);