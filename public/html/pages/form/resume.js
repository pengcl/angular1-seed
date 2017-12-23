"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('resume', { //关于我们
            url: "/form/resume",
            templateUrl: "pages/form/resume.html",
            controller: "resumeController"
        });
}]).controller('resumeController', ['$scope', '$cookieStore', '$compile', function ($scope, $cookieStore, $compile) {
    $scope.registerType = '请选择';
    $scope.drivingLicence = '请选择';
    $scope.sex = '请选择';
    $scope.education = '请选择';
    $scope.politicalClimate = '请选择';
    $scope.infections = '请选择';
    $scope.birthplaceType = '请选择';

    /*$scope.$watch('registerType', function (n, o, $scope) {
        console.log($scope.sportsResume.registerType);
    });*/

    //拷贝 $address-panel、$address-overlay 到appBody
    $compile($("#address-panel").clone().appendTo(".page"))($scope);
    $compile($(".address-overlay").clone().appendTo(".page"))($scope);
    $("#address-panel").remove();
    $(".address-overlay").remove();

    var value1, value2, value3, value4;
    var $inputsStoreSelect = $("#inputsStoreSelect");
    var $storeSelector = $("#container");
    var $storeClose = $storeSelector.find(".close");
    var $objTabItem = $("#cfStock .tab").find("li");
    var $dataAreas = $("#cfStock").find(".mc");
    var $areaList = $("#address-panel").find(".area-list");

    //定义送货信息对象


    /*//判断cookie是否存在
    if ($cookieStore.get("receiver")) {
        $scope.receiver = $cookieStore.get("receiver");
    } else {
        $scope.receiver = {
            name: "",
            mobile: "",
            city: "",
            room: ""
        };
    }*/

    /*if ($cookieStore.get("activeCode")) {
        $scope.activeCode = $cookieStore.get("activeCode");
    } else {
        $scope.activeCode = "";
    }*/

    //隐藏地址选择器
    var stockHide = function () {
        $storeSelector.removeClass("hover");
        $storeClose.hide();
    };

    //显示地址选择器
    var stockShow = function () {
        $storeSelector.addClass("hover");
        $storeClose.show();
    };

    //地址选择器顶栏状态
    var tabShow = function (index) {
        $objTabItem.removeClass("curr");
        $objTabItem.eq(index).addClass("curr");
    };

    //显示可选地址区域
    var dataAreaShow = function (index) {
        $dataAreas.hide();
        $dataAreas.eq(index).show();
    };


    //获取地址数据
    var getArea = function (id, index, province, city, district) {
        var url, thisHtml;
        if (index === 0) {
            url = cfApi.apiHost + "/wap/comm/getRegion.ht?need=province&key=" + new Date();
        } else if (index === 1) {
            url = cfApi.apiHost + "/wap/comm/getRegion.ht?need=city&province=" + encodeURI(encodeURI(province)) + "&key=" + new Date();
        } else if (index === 2) {
            url = cfApi.apiHost + "/wap/comm/getRegion.ht?need=district&province=" + encodeURI(encodeURI(province)) + "&city=" + encodeURI(encodeURI(city)) + "&key=" + new Date();
        } else {
            url = cfApi.apiHost + "/wap/comm/getRegion.ht?need=street&province=" + encodeURI(encodeURI(province)) + "&city=" + encodeURI(encodeURI(city)) + "&district=" + encodeURI(encodeURI(district)) + "&key=" + new Date();
        }
        $areaList.eq(index).html("");
        $.ajax({
            dataType: "jsonp",
            type: "get",
            contentType: "application/json; charset=utf-8",
            url: url,
            jsonp: "callback",
            jsonpCallback: "getAreaList",
            success: function (json) {
                $.each(eval(json), function (i, field) {
                    if ((field.name).length > 6) {
                        $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + "has-hash='false'>" + field.name + "</a></li>");
                    } else {
                        $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + "has-hash='false'>" + field.name + "</a></li>");
                    }
                });
            },
            error: function (e) {
                alert("获取地址信息失败，请联系客服");
            }
        });
    };

    //收件区域点击事件
    $inputsStoreSelect.click(function () {
        getArea(0, 0, "", "", "");
        stockShow();
        dataAreaShow(0);
        tabShow(0);
    });

    $scope.showAdrPn = function (target) {
        $scope.pnType = target;
        getArea(0, 0, "", "", "");
        stockShow();
        dataAreaShow(0);
        tabShow(0);
    };

    //址选择器顶栏点击事件
    $objTabItem.click(function (e) {
        var index = $(this).index();
        var textValue = "";
        if (index === 0) {
            stockHide();
        } else {
            tabShow(index - 1);
            dataAreaShow(index - 1);
        }
        return false;
    });

    //地址选定事件
    $areaList.on("click", "li", function (e) {
        var dataVal, dataAreaValue;
        var $this = $(this);
        dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
        dataVal = $this.find("a").data("value");
        if (dataAreaValue === 0) {
            dataAreaShow(1);
            tabShow(1);
            value1 = $this.data("value");
            getArea(dataVal, 1, value1, "", "");
        } else if (dataAreaValue === 1) {
            dataAreaShow(2);
            tabShow(2);
            value2 = $this.data("value");
            getArea(dataVal, 2, value1, value2, "");
        } else if (dataAreaValue === 2) {
            //dataAreaShow(3);
            //tabShow(3);
            value3 = $this.data("value");
            stockHide();
            //$("#store-text").find("div").html(value1 + value2 + value3);
            if($scope.pnType === 'placeOfOrigin'){
                $scope.placeOfOrigin = value1 + value2 + value3;
            }
            if($scope.pnType === 'address'){
                $scope.address = value1 + value2 + value3;
            }
            if($scope.pnType === 'birthplace'){
                $scope.birthplace = value1 + value2 + value3;
            }
            //getArea(dataVal, 3, value1, value2, value3);
        } else if (dataAreaValue === 3) {
            value4 = $this.data("value");
            stockHide();
            //$("#store-text").find("div").html(value1 + value2 + value3 + value4);
            if($scope.pnType === 'placeOfOrigin'){
                $scope.placeOfOrigin = value1 + value2 + value3 + value4;
            }
            if($scope.pnType === 'address'){
                $scope.address = value1 + value2 + value3 + value4;
            }
            if($scope.pnType === 'birthplace'){
                $scope.birthplace = value1 + value2 + value3 + value4;
            }
        }
        $scope.$apply();
        return false;
    });

    $scope.thousand = {
        min: '',
        sec: ''
    };

    $scope.$watch('thousand', function (n, o, $scope) {
        $scope.thousandMDash = n.min + '′' + n.sec + '″';
    }, true);

    $scope.submitForm = function (checked, target, isSubmit) {
        console.log(checked);
        $scope.isSubmit = isSubmit;
        if (checked) {
            $(target).submit();
        }
    }
}]);
