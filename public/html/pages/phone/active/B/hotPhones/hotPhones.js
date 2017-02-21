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
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.payType = 0;

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    var $container = $(".content-scrollable");

    $scope.receiver = {
        name: $location.search().receiverName,
        mobile: $location.search().receiverMobile,
        city: "",
        room: ""
    };

    var $areaList = $(".area-list");

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.setPayType = function (type) {
        $scope.payType = type;
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };


    $http.jsonp('http://192.168.1.181:8082/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.pkgs = data;

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp('http://192.168.1.181:8082' + '/product/getProList.html?activeTag=jjk&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
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

    function writeBtNavItem(index) {
        writebdLog($scope.category, btNavItemName[index], "渠道号", $scope.gh);//选择模块
    }

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    $scope.setMainPhoneBrand = function (e, myBrand) {
        $scope.brand = myBrand;
    };

    $scope.setMainPhone = function (e, phoneId) {
        $scope.phoneId = phoneId;
    };

    $scope.setMainPhonePkg = function (e, pkg) {
        $scope.package = pkg;
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

    $scope.checkAddress = function () {
        console.log($scope.couponForm);
        $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.reciverName.$valid) {
            //alert("请输入收件人");
            $(".input-name").addClass("weui-cell_warn");
            return false;
        } else if (!$scope.couponForm.receiverMobile.$valid) {
            //alert("请输入联系电话");
            $(".input-mobile").addClass("weui-cell_warn");
            return false;
        } else if (!$scope.couponForm.receiverCity.$valid) {
            $(".input-city").addClass("weui-cell_warn");
            //alert("请选择收件区域");
            return false;
        } else if (!$scope.couponForm.receiverRoom.$valid) {
            $(".input-room").addClass("weui-cell_warn");
            //alert("请输入详细地址");
            return false;
        }

        $cookieStore.put("receiver", scope.receiver);

        return true;
    };

    $scope.submit = function () {
        if (!$scope.checkAddress()) {
            var $scrollTo = $('.quan-form');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            return false;
        }
        $("#couponForm").submit();
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
            $http.jsonp("http://192.168.1.181:8082/product/getProDetial.html?productId=" + n + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                $scope.phone = data;
                $scope.packages = [];
                $.each(eval(data.cardItems.split(";")), function (i, k) {
                    getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')));
                    console.log(getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':'))));
                    $scope.packages.push($scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))]);
                });
                $scope.package = $scope.packages[0];
                console.log($scope.packages);
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    }, true);

}]);