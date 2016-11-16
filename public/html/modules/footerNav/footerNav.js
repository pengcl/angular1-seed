'use strict';

app.directive("footerNav", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/footerNav.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $lastNumberSpan = $("#number-select span:last-child");
            var $scrollTo;

            var searchType = attrs.searchType;

            scope.priceType = attrs.priceType;

            if (searchType == "phone") {
                scope.orderURL = "http://m.gd189fq.com/wap/customer/searchIndexA.html?s=wap";
            } else {
                scope.orderURL = "http://m.gd189fq.com/yfqcz/#/purchaseOrderList?redirect_uri=http://app.yfq.cn";
            }

            scope.checks = eval(attrs.checks);

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

            scope.submitForm = function (event,type) {
                event.preventDefault();
                if (attrs.checkPhone == "true") {
                    if (scope.checkPhone()) {
                        //writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    } else {
                        $scrollTo = $('#numberPanel');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() -50
                        });
                        return false;
                    }
                }
                if (scope.checkAddress()) {
                    //writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                    if (scope.$root.checkActiveCode()) {
                        writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                        scope.$root.toast.open();
                        if(scope.payType == 2){
                            scope.showHuOverLay("payTipsPanel");
                            return false;
                        }else {
                            $form.submit();
                        }
                    }else {
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
    };
}]);
