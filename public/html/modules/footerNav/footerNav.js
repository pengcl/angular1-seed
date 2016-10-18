'use strict';

app.directive("footerNav", ['$http', '$cookieStore', '$location', function ($http, $cookieStore, $location) {
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

            if (scope.payType == 1) {
                scope.payTypeName = "下一步";
            } else if (scope.payType == 2) {
                scope.payTypeName = "货到付款";
            }
            else {
                scope.payTypeName = "立即支付";
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

            function checkPhoneNumber() {
                if (!$lastNumberSpan.hasClass("old")) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    //console.log(scope.currNumberIndex);
                    scope.showPickNumberPanel(scope.currNumberIndex);
                    return false;
                }
                return true;
            }

            scope.submitForm = function (event) {
                //event.preventDefault();
                //console.log(scope.phone.productId, scope.color.colorName, scope.pkg.productId, scope.phoneNumber);
                if (attrs.checkPhone == "true") {
                    //event.preventDefault();
                    if (checkPhoneNumber()) {
                        scope.orderState = {
                            machineId: scope.phone.productId,
                            productId: scope.pkg.productId,
                            color: scope.color.colorName,
                            phoneNumber: scope.phoneNumber,
                            price: scope.mainPrice
                        };
                        $cookieStore.put("orderState", scope.orderState);
                        //writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    } else {
                        event.preventDefault();
                        $scrollTo = $('#chooseNumber');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                        return false;
                    }
                }
                if (attrs.checkAddress == "false") {
                    console.log("1");
                } else {
                    event.preventDefault();
                    if (scope.checkAddress()) {

                        writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                        scope.$root.toast.open();
                        $form.submit();
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
