'use strict';

app.directive("footerNav", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/footerNav.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $scrollTo;

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

            scope.getContent = function () {
                getMeiqia();
                //$("#contactUs").show();
                _MEIQIA('showPanel');
                writebdLog(scope.category, "客服", "渠道号", scope.gh);
            };

            function checkPhoneNumber() {
                console.log(scope.checkoutForm.phoneNumber.$valid);
                if (!scope.checkoutForm.phoneNumber.$valid) {
                    scope.showPickNumberPanel(3);
                    return false;
                }
                return true;
            }

            scope.submitForm = function () {
                if (attrs.checkPhone == "true") {
                    if (checkPhoneNumber()) {
                        writebdLog(scope.category, "选择号码", "渠道号", scope.gh);
                    } else {
                        $scrollTo = $('#chooseNumber');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                        return false;
                    }
                }
                if (scope.checkAddress()) {
                    writebdLog(scope.category, "收货地址", "渠道号", scope.gh);
                    writebdLog(scope.category, "立即支付", "渠道号", scope.gh);
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
