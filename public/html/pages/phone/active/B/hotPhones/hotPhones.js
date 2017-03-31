"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeBPhones', { //app首页
            url: "/phone/active/B/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/B/hotPhones/hotPhones.html';
            },
            controller: "pBctivePhonesController"
        });
}]).controller('pBctivePhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', '$compile', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore, $compile) {
    $scope.pageType = "B";
    $scope.activeTag = "jktchd";
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;

    var butie = "358:6388;359:5388;360:3880;361:2980;362:2400";

    $scope.payType = 0;

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/B' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    var $container = $(".content-scrollable");

    $scope.receiver = {
        name: $location.search().receiverName,
        mobile: $location.search().receiverMobile,
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


    /*$http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.pkgs = data;

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });*/

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
            $(".input-name").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请输入正确的姓名！");
            return false;
        } else if (!$scope.couponForm.receiverMobile.$valid) {
            $(".input-mobile").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
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
            $scope.$root.toast.close();
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

                }).error(function (data, status, headers, config) {
                    console.log(status);
                    //deferred.reject(status)
                });

                /*$scope.phone = data;
                $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[0];
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

                $scope.package = $scope.packages[$scope.packageIndex];*/
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    }, true);

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

}]);