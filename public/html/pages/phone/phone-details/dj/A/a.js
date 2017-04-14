"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('djADetail', { //app首页
            url: "/phs/dj/A/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/dj/A/a.html';
            },
            controller: "djADetailController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('djADetailController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', '$timeout', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore, $timeout) {

    /*$scope.cfConvertId = $location.search().cfConvertId;

     if($location.search().cfConvertId){
     $scope.cfConvertId = $location.search().cfConvertId;
     }else {
     $scope.cfConvertId = "";
     }*/

    $scope.pageType = 'A';
    $scope.activeTag = "dj";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D/phones';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl: 'http://app.yfq.cn/images/active/d/share_active.jpg'
    };

    $scope.sold = Math.round(Math.random() * 50);

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_mysy_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $container = $(".content-scrollable");

    $scope.productId = $stateParams.phoneId;

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=lj&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.imgUrls = [];

        for (var i = 0; i < data.phoneTypes[0].mediaProductList.length; i++) {
            $scope.imgUrls.push("http://www.yfq.cn:8899/fileserver/medias/" + data.phoneTypes[0].mediaProductList[i].mediaUrl);
        }

        $http.jsonp("http://apptest.yfq.cn:8900/yfqcz/czInterfaceController.do?messageDetail&productId=" + $stateParams.phoneId + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            console.log(data);
            if (data.success === true) {
                $scope.feedbacks = data.result;
            } else {
                $scope.feedbacks = "";
            }
        }).error(function (data, status, headers, config) {
            console.log(status);
        });

    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jjk&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

    function wirtePayType(payType) {
        value = payTypeAry[payType];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    }

    if ($location.search().duplicateNum) {
        if (Array.isArray($location.search().duplicateNum)) {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum[0] + "已被购买，请重新选择");
        } else {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
        }
    }

    $scope.setFlashDriver = function (flash) {
        $scope.productId = flash.productId;
        //window.location.href = 'http://' + window.location.host + '/phs/dj/A/' + flash.productId + window.location.search;
    };

    $scope.showActionsheet = function (element) {
        console.log(element);
        showTheActionSheet(element);
    };

    $scope.checkForm = function () {

        var $form = $("#checkoutForm");
        if ($scope.$root.checkActiveCode()) {
            writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//立即支付
            $scope.$root.toast.open();

            $form.submit();
            /*_taq.push({convert_id: $scope.cfConvertId, event_type: "shopping"});*/
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
        //console.log($scope.loadedCheck());
        if (!$scope.loadedCheck()) {
            $("#receiverAddressPanel").slideDown();
        }
    });

    $scope.payType = 0;

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

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&activeTag=lj&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                $scope.phone = data;

                var _colors = data.phoneTypes[0].mediaProductList;
                var _colorIndex = getIndex(data.phoneTypes[0].mediaProductList,"name",$scope.$root.mainColor.name);

                if(_colorIndex == undefined){
                    $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[0];
                }

                $http.jsonp("http://apptest.yfq.cn:8900/yfqcz/czInterfaceController.do?messageDetail&productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                    $scope.feedbacks = data;
                    console.log(data);
                }).error(function (data, status, headers, config) {
                    console.log(status);
                });

            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    });

    androidInputBugFix();
}]);