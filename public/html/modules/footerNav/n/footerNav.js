'use strict';

app.directive("nFooterNav", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/n/footerNav.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $scrollTo;

            scope.checks = eval(attrs.checks);

            scope.getContent = function () {
                getMeiqia();
                //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };

            scope.submitForm = function (event, type) {
                if(scope.checkMainNumber()){
                    if(scope.checkSubNumber()){
                        if(scope.checkAddress()){
                            $form.submit();
                        }else {
                            var $scrollTo = $('#receiverAddress');
                            $container.animate({
                                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() -50
                            });
                            $("#receiverAddressPanel").slideDown();
                        }
                    }
                }
            }
        }
    };
}]);
