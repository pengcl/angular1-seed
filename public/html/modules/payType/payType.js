'use strict';

app.directive("payType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTypeTitle = attrs.title;
            scope.payTypeSubTitle = attrs.subTitle;
            scope.class = attrs.addClass;
            //设置本模块的显示隐藏
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            var $form = $(attrs.submit);

            //默认赋值
            //scope.payType = 1;

            //设置默认payType;
            scope.setDefaultPayType = function (type) {
                scope.payType = type;
            };

            //获取地址栏支付方式的参数
            var _payType = $location.search().payType;

            //判断是否有带支付方式参数，如果有，更改默认支付方式;
            if (_payType) {
                scope.payType = _payType;
            }

            //选择支付方式

            scope.setPayType = function (event, type) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    if (scope.checkAddress()) {
                        if (scope.$root.checkActiveCode()) {
                            $("#payType").val(type);
                            if (type == 2) {
                                scope.showOverLay("payTipsPanel");
                            } else {
                                scope.$root.toast.open();
                                scope.$root.toast.open();
                                //$form.submit();
                                scope.$root.submitForm();
                            }
                        }
                    } else {
                        var $scrollTo = $('#receiverAddress');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }
                }
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.openCompile(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };

            scope.showHuOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.openCompile(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };

            scope.$root.tipsSubmit = function () {
                if (scope.$root.checkActiveCode()) {
                    scope.$root.toast.open();
                    //$form.submit();
                    scope.$root.submitForm();
                } else {
                    scope.$root.Overlay.close();
                }
            };

            scope.$root.submitForm = function () {
                var type = $("#payType").val();
                var value;
                if (type == 0) {
                    value = "_payAll";
                }
                if (type == 2) {
                    value = "_payMonthly";
                }
                if (type == 1) {
                    value = "_payCOD";
                }
                writebdLog(scope.category, value, "渠道号", scope.gh);//支付方式
                $form.submit();
            };


            /*$("#container").on("click",".btn-twitter",function () {
             scope.$root.Overlay.close;
             $form.submit();
             });*/
            /*scope.setPayType = function (event, type) {
             event.preventDefault();
             var $this = $(event.currentTarget);
             if ($this.hasClass("disabled")) {
             return false;
             } else {
             $this.parent().siblings().children().removeClass('curr');
             $this.addClass('curr');
             scope.payType = type;
             }
             };*/
        }
    };
}]);