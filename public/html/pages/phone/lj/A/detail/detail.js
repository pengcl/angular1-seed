"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('ljADetail', { //app首页
            url: "/phs/lj/A/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/lj/A/detail/detail.html';
            },
            controller: "ljADetailController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('ljADetailController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', '$timeout', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore, $timeout) {

    /*$scope.cfConvertId = $location.search().cfConvertId;

     if($location.search().cfConvertId){
     $scope.cfConvertId = $location.search().cfConvertId;
     }else {
     $scope.cfConvertId = "";
     }*/

    $scope.pageType = 'A';
    $scope.activeTag = "ljzma";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D/phones';

    $scope.limitNo = 5;

    $scope.setlimitNo = function (num) {
        $scope.limitNo = num;
    };

    $scope.sold = Math.round(Math.random() * 50);

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_ljzm_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $container = $(".content-scrollable");

    $scope.productId = $stateParams.phoneId;

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=ljzma&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.imgUrls = [];

        for (var i = 0; i < data.phoneTypes[0].mediaProductList.length; i++) {
            $scope.imgUrls.push("http://www.yfq.cn:8899/fileserver/medias/" + data.phoneTypes[0].mediaProductList[i].mediaUrl);
        }

        $http.jsonp(cfApi.czHost + "/yfqcz/czInterfaceController.do?messageDetail&productId=" + $stateParams.phoneId + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            $scope.feedbacks = data;
            $scope.feedbackType = 'all';
        }).error(function (data, status, headers, config) {
            console.log(status);
        });

        $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=ljzma&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.singlePhones = data;

            $scope.hotPhones = [];
            $.each($scope.singlePhones, function (i, k) {
                if (Math.abs(k.salePrice - $scope.phone.salePrice) <= 1500) {
                    $scope.hotPhones.push(k);
                }
            });

            if ($scope.hotPhones.length < 6) {
                $.each($scope.singlePhones, function (i, k) {
                    if (i < 6 - $scope.hotPhones.length) {
                        $scope.hotPhones.push(k);
                    }
                    if (Math.abs(k.salePrice - $scope.phone.salePrice) > 1500) {
                        $scope.hotPhones.push(k);
                    }
                });
            }

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/phs/lj/A/' + $stateParams.phoneId + window.location.search,
            shareTitle: '想换' + $scope.phone.productName + '？这里全场降价后再享95折，先抢了再说！',
            shareDisc: 'iPhone、OPPO、华为各大品牌新品现货抢购，最高可享12期0息分期！',
            picUrl: 'http://www.yfq.cn:8899/fileserver/medias/' + $scope.phone.phoneTypes[0].mediaProductList[0].mediaUrl
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
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

    $scope.writebdLogByValue = function (value) {
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);
    };

    if ($location.search().duplicateNum) {
        if (Array.isArray($location.search().duplicateNum)) {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum[0] + "已被购买，请重新选择");
        } else {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
        }
    }

    $scope.setFlashDriver = function (event, flash) {
        var $this = $(event.currentTarget);
        if ($this.hasClass("disabled")) {
            return false;
        }
        $scope.productId = flash.productId;
        writebdLog($scope.category, "_FuselageMemory", "渠道号", $scope.gh);
        //window.location.href = 'http://' + window.location.host + '/phs/dj/A/' + flash.productId + window.location.search;
    };

    $scope.showActionsheet = function (element) {
        showTheActionSheet(element);
        writebdLog($scope.category, "_show" + element.replace("#", ""), "渠道号", $scope.gh);
    };

    $scope.hideActionsheet = function (element) {
        hideTheActionSheet(element);
        writebdLog($scope.category, "_hide" + element.replace("#", ""), "渠道号", $scope.gh);
    };

    $scope.makeSelected = function (event, element) {
        if ($(event.currentTarget).hasClass("disabled")) {
            return false;
        }
        var $scrollTo = $('.pay-container');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        $scope.hideActionsheet(element);
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

    $scope.seeAll = function () {
        $(".half").removeClass("half");
        $(".html-ft").hide();
    };

    $scope.payType = 0;
    $scope.payTypeName = "马上付款";

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
            $(".adr-tab").toggleClass("down");
            $("#receiverAddressPanel").slideDown();
        }
    });

    $scope.submitForm = function (event) {
        if ($(event.currentTarget).hasClass("disabled")) {
            return false;
        }
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
    };

    $scope.setFeedbackType = function (type) {
        $scope.feedbackType = type;
        writebdLog($scope.category, "_" + type, "渠道号", $scope.gh);//点击评价
    };

    $scope.goToDetail = function () {
        $("#scrollAnimate").animate({
            scrollTop: $(".dj-detail").offset().top - $("#scrollAnimate").offset().top + $("#scrollAnimate").scrollTop() - 50
        });
    };

    $("#scrollAnimate").bind('scroll', function (e) {
        var top1 = $(".dj-detail").offset().top - $(this).offset().top + $(this).scrollTop();
        var top2 = $(".dj-bottom").offset().top - $(this).offset().top + $(this).scrollTop() - $(this).height();
        if ($(this).scrollTop() >= top1 && $(this).scrollTop() <= top2) {
            $(".dj-detail").find(".weui-navbar").addClass("fixed-top");
        } else {
            $(".dj-detail").find(".weui-navbar").removeClass("fixed-top");
        }
    });

    $scope.$watch('feedbackType', function (n, o, $scope) {
        $scope.typeFeedbacks = [];
        if (n != undefined && n != o) {
            if ($scope.feedbacks.success) {
                if (n === 'all') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        $scope.typeFeedbacks.push(k);
                    });
                }
                if (n === 'best') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 >= 4) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
                if (n === 'good') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 > 2 && rate / 3 < 4) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
                if (n === 'bad') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 <= 2) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
            }
        }

    });

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&activeTag=ljzma&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                $scope.phone = data;

                var _colors = data.phoneTypes[0].mediaProductList;
                var _colorIndex = getIndex(data.phoneTypes[0].mediaProductList, "name", $scope.$root.mainColor.name);

                if (_colorIndex == undefined || data.phoneTypes[0].mediaProductList[_colorIndex].stock == 0) {
                    $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[getIndex(data.phoneTypes[0].mediaProductList, 'selected', 1)];
                } else {
                    $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[_colorIndex];
                }

                $scope.hotPhones = [];
                $.each($scope.singlePhones, function (i, k) {
                    if (Math.abs(k.salePrice - $scope.phone.salePrice) <= 1500) {
                        $scope.hotPhones.push(k);
                    }
                });

                if ($scope.hotPhones.length < 6) {
                    $.each($scope.singlePhones, function (i, k) {
                        if (i < 6 - $scope.hotPhones.length) {
                            $scope.hotPhones.push(k);
                        }
                        if (Math.abs(k.salePrice - $scope.phone.salePrice) > 1500) {
                            $scope.hotPhones.push(k);
                        }
                    });
                }

                $http.jsonp(cfApi.czHost + "/yfqcz/czInterfaceController.do?messageDetail&productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                    $scope.feedbacks = data;
                    $scope.feedbackType = 'all';
                }).error(function (data, status, headers, config) {
                    console.log(status);
                });

            }).error(function (data, status, headers, config) {
                console.log(status);
            });

            $scope.$root.share = {
                homeLink: 'http://app.yfq.cn/phs/lj/A/' + n + window.location.search,
                shareTitle: '想换' + $scope.phone.productName + '？这里全场降价后再享95折，先抢了再说！',
                shareDisc: 'iPhone、OPPO、华为各大品牌新品现货抢购，最高可享12期0息分期！',
                picUrl: 'http://www.yfq.cn:8899/fileserver/medias/' + $scope.phone.phoneTypes[0].mediaProductList[0].mediaUrl
            };

        }
    });

    androidInputBugFix();
}]);