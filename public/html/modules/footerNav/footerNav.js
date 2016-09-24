'use strict';

app.directive("footerNav", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/footerNav.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $scrollTo;

            if(scope.payType == 1){
                scope.payTypeName = "立即分期";
            }else {
                scope.payTypeName = "立即支付";
            }

            scope.checks = eval(attrs.checks);

            var getMeiqia = function () {
                (function (m, ei, q, i, a, j, s) {
                    m[a] = m[a] || function () {
                            (m[a].a = m[a].a || []).push(arguments)
                        };
                    j = ei.createElement(q),
                        s = ei.getElementsByTagName(q)[0];
                    j.async = true;
                    j.charset = 'UTF-8';
                    j.src = i + '?v=' + new Date().getUTCDate();
                    s.parentNode.insertBefore(j, s);
                })(window, document, 'script', '//static.meiqia.com/dist/meiqia.js', '_MEIQIA');
                _MEIQIA('entId', 27864);
                _MEIQIA('withoutBtn');
            };

            scope.getSearch = function(){
                writebdLog(scope.category, "_OrderQuery", "渠道号", scope.gh);//订单查询
            };

            scope.getContent = function () {
                getMeiqia();
                //$("#contactUs").show();
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };

            function checkPhoneNumber() {
                if (!scope.checkoutForm.phoneNumber.$valid) {
                    scope.showPickNumberPanel(3);
                    return false;
                }
                return true;
            }

            scope.submitForm = function () {
                if (attrs.checkPhone == "true") {
                    if (checkPhoneNumber()) {
                        //writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    } else {
                        $scrollTo = $('#chooseNumber');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                        return false;
                    }
                }
                if (scope.checkAddress()) {
                    writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                    $form.submit();
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
