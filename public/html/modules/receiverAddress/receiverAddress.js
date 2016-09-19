'use strict';

app.directive("receiverAddress", ["$compile", "$cookieStore", function ($compile, $cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/receiverAddress.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象
            scope.receiver = {
                name: "",
                mobile: "",
                city: "",
                room: ""
            };

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
                    url = "http://m.gd189fq.com/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = "http://m.gd189fq.com/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = "http://m.gd189fq.com/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = "http://m.gd189fq.com/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
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
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + ">" + field.name + "</a></li>");
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
                    dataAreaShow(3);
                    tabShow(3);
                    value3 = $this.data("value");
                    getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui_cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui_cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui_cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui_cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui_cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }
                return true;
            }
        }
    };
}]);