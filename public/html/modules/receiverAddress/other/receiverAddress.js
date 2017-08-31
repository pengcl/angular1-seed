'use strict';

app.directive("receiverOAddress", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/other/receiverAddress.html",
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


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

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

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };
            
            //只有输入信息才记录到闭环
            scope.inputFeedBack = function (feeback) {
            	if (feeback == undefined || feeback == "" || feeback.length <= 3) return;
            	writebdLog(scope.category, "_FeedBack", "渠道号", scope.gh);//卖家留言
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber,e) {
                if($(e.currentTarget).hasClass("not")){
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCodeF/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
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
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3);
                    scope.receiver.city = value1 + value2 + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
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
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
        }
    };
}]);