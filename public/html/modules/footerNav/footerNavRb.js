'use strict';

app.directive("footerNavRb", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/footerNavRb.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $scrollTo;

            scope.orderSearchUrl = attrs.orderSearchUrl;

            scope.cod = attrs.cod;
            scope.codName = "货到付款";
            scope.payTypeName = "立即支付";

            scope.getSearch = function () {
                //console.log(scope.appType);
                writebdLog(scope.category, "_OrderQuery", "渠道号", scope.gh);//订单查询
            };

            scope.getContent = function () {
                getMeiqia();
                //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };

            scope.submitForm = function (event, type) {
                event.preventDefault();
                if (attrs.checkPhone == "true") {
                    if (scope.checkPhone()) {
                        //writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    } else {
                        $scrollTo = $("#phoneQuery");
                        //console.log($scrollTo);
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                        return false;
                    }
                }
                if (attrs.checkAddress == "true") {
                    if (scope.checkAddress()) {
                        //writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                        if (scope.$root.checkActiveCode()) {
                            writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                            scope.$root.toast.open();

                            if (type == 1) {
                                //scope.formAction = "http://m.yfq.cn/wap/taokafanghaoNew/uploadCard.html";
                                $form.attr("action","http://m.yfq.cn/wap/taokafanghaoNew/uploadCardB.html");
                            } else if (type == 0) {
                                //scope.formAction = "http://m.yfq.cn/wap/taokafanghaoNew/submitOrder.html";
                                $form.attr("action","http://m.yfq.cn/wap/taokafanghaoNew/submitOrderSingle.html");
                            }

                            //console.log(scope.formAction);

                            $form.submit();

                        } else {
                            $scrollTo = $('#receiverAddress');
                            $container.animate({
                                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                            });
                        }
                    } else {
                        $scrollTo = $('#receiverAddress');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }
                }
            }
        }
    };
}]);
