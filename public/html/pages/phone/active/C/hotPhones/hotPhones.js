"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeCPhones', { //app首页
            url: "/phone/active/C/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/C/hotPhones/hotPhones.html';
            },
            controller: "pCctivePhonesController"
        });
}]).controller('pCctivePhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', '$compile', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore, $compile) {

    console.log("c");
    $scope.pageType = "C";
    $scope.activeTag = "jktchd";
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.payType = 0;

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.paracont = "获取验证码";
    $scope.paraclass = "but_null";
    var second = 59, timePromise = undefined;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/C' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    var $container = $(".content-scrollable");

    $scope.receiver = {
        name: "",
        mobile: "",
        city: "",
        room: ""
    };

    var $areaList = $(".area-list");

    writebdLog($scope.category, "_Order_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.setPayType = function (type) {
        $scope.payType = type;
        writebdLog($scope.category, "_PayType"+type, "渠道号", $scope.gh);//选择发货方式
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };


    $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.pkgs = data;

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jktchd&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.phones = data;
        $scope.brands = [];
        $scope.brandsArry = [];
        $.each(data, function (i, k) {
            if ($scope.brandsArry.indexOf(k.brandName) == -1 && k.brandName != '') {
                var obj = {
                    brandName: k.brandName,
                    brandSort: k.brandSort

                };
                $scope.brandsArry.push(k.brandName);
                $scope.brands.push(obj);
            }
        });
        $scope.brands = $scope.brands.sort(function (a, b) {
            return a.brandSort - b.brandSort;
        });
        $scope.brand = $scope.brands[0];

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    function writeBrand(name)
    {

    	if(name == '华为') name = 'huawei';
    	if(name == '小米') name = 'mi';
    	if(name == '美图') name = 'meitu';
    	return name;
    }

    $scope.setMainPhoneBrand = function (e, myBrand) {
        $scope.brand = myBrand;
        writebdLog($scope.category, "_" + writeBrand(myBrand.brandName), "渠道号", $scope.gh);//选择的手机品牌
    };

    $scope.setMainPhone = function (e, phoneId) {
        $scope.phoneId = phoneId;
        writebdLog($scope.category, "_" + phoneId, "渠道号", $scope.gh);//选择的机型
    };

    $scope.setMainPhonePkg = function (e, pkg) {
        $scope.package = pkg;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择的套餐
    };

    $scope.setAddress = function (e, province, city, district, street) {
        $scope.receiver.city = province + city + district + street;
        $scope.addressShow = false;
    };

    $scope.checkCouponActiveCode = function () {
        if (!$scope.couponForm.couponActiveCode.$valid) {
            $(".input-vcode").addClass("weui-cell_warn");
            return false;
        } else {
            if (!checkMobileCode($scope.receiver.mobile, $scope.coupon.activeCode)) {
                $(".input-vcode").removeClass("weui-cell_success");
                $(".input-vcode").addClass("weui-cell_warn");
                return false;
            }
            return true;
        }
    };

    $scope.checkCouponName = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.reciverName.$valid) {
            //alert("请输入联系电话");
            $(".input-name").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.checkCouponMobile = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.receiverMobile.$valid) {
            //alert("请输入联系电话");
            $(".input-mobile").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.getCouponActiveCode = function (event, phoneNumber) {
        if ($(event.currentTarget).hasClass("not")) {
            //scope.toast.close();
            return false;
        }

        $scope.$root.toast.openUnLimit();

        if (!$scope.checkCouponMobile()) {
            $scope.$root.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;
        }
        $http.get("http://m.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
            if (data == "") {
                $scope.$root.toast.close();
                timePromise = $interval(function () {
                    if (second <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;

                        second = 59;
                        $scope.paracont = "重发验证码";
                        $scope.paraclass = "but_null";
                    } else {
                        $scope.paracont = second + "秒后可重发";
                        $scope.paraclass = "not but_null";
                        second--;

                    }
                }, 1000, 100);
            }
        });

        writebdLog($scope.category, "_VariIndexCode", "渠道号", $scope.gh); //获取下单页验证码
    };

    $scope.getStreet = function (e, province, city, district) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + province + "&city=" + city + "&district=" + district + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");
            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="setAddress(e,\'' + province + '\',\'' + city + '\',\'' + district + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    $scope.hideAddress = function () {
        $scope.addressShow = false;
    };

    $scope.getDistricts = function (e, province, city) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + province + "&city=" + city + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");

            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="getStreet(e,\'' + province + '\',\'' + city + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    //记录落地页输入的操作
    $scope.$root.writeReceiver = function () {
        writebdLog($scope.category, "_Address", "渠道号", $scope.gh); //输入地址
    };

    $scope.checkAddress = function () {
        $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.reciverName.$valid) {
            $scope.dialog.open("系统提示", "请输入正确的姓名！");
            $(".input-name").addClass("weui-cell_warn");
            return false;
        } else if (!$scope.couponForm.receiverMobile.$valid) {
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            $(".input-mobile").addClass("weui-cell_warn");
            return false;
        } else if (!$scope.couponForm.receiverCity.$valid) {
            $(".input-city").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示","请选择收件区域！");
            return false;
        } else if (!$scope.couponForm.receiverRoom.$valid) {
            $(".input-room").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示","请输入详细地址！");
            return false;
        }

        $cookieStore.put("receiver", $scope.receiver);

        return true;
    };

    $scope.submit = function () {
        $scope.$root.toast.open();
        if ($scope.payType == 3) {

            if (!$scope.checkCouponName()) {
                $scope.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的姓名！");
                return false;
            }

            if (!$scope.checkCouponMobile()) {
                $scope.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的手机号码！");
                return false;
            }

            if (!$scope.checkCouponActiveCode()) {
                $scope.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的验证码！");
                return false;
            }
            $("#couponForm").submit();
        } else {
            if (!$scope.checkAddress()) {
                $scope.$root.toast.close();
                var $scrollTo = $('.quan-form');
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                });
                return false;
            }

            if(!$scope.checkCouponActiveCode()){
                $scope.$root.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的验证码！");
                var $scrollTo = $('.quan-form');
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                });
                return false;
            }
            $("#couponForm").submit();
        }

        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//提交订单
    };

    $scope.$watch('brand', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $scope.brandPhones = [];
            $.each($scope.phones, function (i, k) {
                if (k.brandName != '' && k.brandName === n.brandName) {
                    $scope.brandPhones.push(k);
                }
            });
            $scope.phoneId = $scope.brandPhones[0].activityproductId;
        }
    }, true);

    $scope.$watch('phoneId', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                $scope.phone = data;
                $scope.packages = [];
                $scope.comparePrices = [];
                $scope.packageIndex = 0;
                var distance;
                $.each(eval(data.cardItems.split(";")), function (i, k) {
                    var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                    obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                    $scope.packages.push(obj);
                    $scope.comparePrices.push(data.salePrice - obj.salesPrice);
                });

                for (var i = 1; i < $scope.comparePrices.length; i++) {
                    if(Math.abs($scope.comparePrices[i]) < Math.abs($scope.comparePrices[$scope.packageIndex])){
                        $scope.packageIndex = i;
                    }
                }

                $scope.package = $scope.packages[$scope.packageIndex];
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    }, true);

    var homeArgs = ['_InputIndexName', '_InputIndexNumber','_InputIndexCode'];
    //记录落地页输入的操作
    $scope.$root.inputHomeArgs = function (type) {
        writebdLog($scope.category, homeArgs[type], "渠道号", $scope.gh); //输入操作
    };

}]);