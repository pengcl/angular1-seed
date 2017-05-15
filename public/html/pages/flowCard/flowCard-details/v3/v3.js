"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardV3', { //app首页
            url: "/fd/v3/:productId",
            templateUrl: "pages/flowCard/flowCard-details/v3/v3.html",
            controller: "flowCardV3Controller"
        })
}]).controller('flowCardV3Controller', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "mifitc";

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

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.autoSelect = true;

    $scope.setAutoSelect = function (type) {
        $scope.autoSelect = type;
    };

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomName() + "(" + getRandomReceiverPhone() + ")" + " 领取了168套餐 <span>" + getRanDomTime() + "分钟前</span>"
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
        var _data = [];
        var inputData1 = [];
        var inputData2 = [];
        var inputData3 = [];
        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                if (k.t == 0) {
                    _data.push(k);
                }
            }
        });

        $.each(_data, function (i, k) {
            if (i < _data.length / 3 - 1) {
                inputData1.push(k);
            } else if (i > _data.length * 2 / 3 + 1) {
                inputData2.push(k);
            } else {
                inputData3.push(k);
            }
        });


        $scope.inputData = inputData1;
        $scope.inputData1 = inputData2;
        $scope.inputData2 = inputData3;
    });

    $scope.appType = systemName + "_FlowPackage";
    $scope.category = $scope.appType;

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);//页面载入

    $scope.totalPrice = 400;

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
    };

    $scope.mainPanel = false;
    $scope.showMainPanel = function () {
        $scope.mainPanel = !$scope.mainPanel;
    };

    $scope.subPanel = false;
    $scope.showSubPanel = function () {
        $scope.subPanel = !$scope.subPanel;
    };

    $scope.thirdPanel = false;
    $scope.showThirdPanel = function () {
        $scope.thirdPanel = !$scope.thirdPanel;
    };

    $scope.selectedData = {};

    $scope.submitForm = function (e) {
        var $form = $("#checkoutForm");
        if (!$scope.checkoutForm.mainNumber.$valid) {
            $scope.goTo('#mainNumberArea');
            return false;
        }
        if (!$scope.autoSelect) {
            if (!$scope.checkoutForm.subNumber.$valid) {
                $scope.goTo('#subNumberArea');
                return false;
            }
            if (!$scope.checkoutForm.thirdNumber.$valid) {
                $scope.goTo('#thirdNumberArea');
                return false;
            }
        }
        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        $form.submit();
    };
    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [$scope.product.activityproductId];
            $scope.totalPrice = 400;
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);
    $scope.$watch('outputData', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n.numberType === 'mainNumber') {
                $scope.selectedData.mainNumber = n.number;
                $scope.mainPanel = false;
            }
            if (n.numberType === 'subNumber') {
                $scope.selectedData.subNumber = n.number;
                if (n.number) {
                    $scope.subPanel = false;
                } else {
                    $scope.subPanel = true;
                }
            }
            if (n.numberType === 'thirdNumber') {
                $scope.selectedData.thirdNumber = n.number;
                if (n.number) {
                    $scope.thirdPanel = false;
                } else {
                    $scope.thirdPanel = true;
                }
            }
        }
    }, true);

}]);