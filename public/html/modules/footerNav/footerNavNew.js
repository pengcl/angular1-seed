'use strict';

app.directive("footerNavNew", ['$http', '$cookieStore', function ($http, $cookieStore) {
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

            scope.payTypeName = "下一步";

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
                if (!scope.checkoutForm.phoneNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    //console.log(scope.currNumberIndex);
                    //scope.npShow();
                    return false;
                }
                return true;
            }

            scope.submitForm = function (event) {
                if (checkPhoneNumber()) {
                    scope.orderState = {
                        machineId: scope.phone.productId,
                        productId: scope.pkg.productId,
                        color: scope.color.colorName,
                        phoneNumber: scope.phoneNumber,
                        price: scope.mainPrice,
                        category: scope.category
                    };
                    $cookieStore.put("orderState", scope.orderState);
                    writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//下一步
                    scope.$root.toast.open();
                    //$form.submit();
                } else {
                    event.preventDefault();
                    scope.npShow(1);
                }
            }
        }
    };
}]);
