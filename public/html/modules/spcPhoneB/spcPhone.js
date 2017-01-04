'use strict';

app.directive("spcPhoneB", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhoneB/spcPhone.html",
        link: function (scope, element, attrs) {
            var $container = $('.content-scrollable');
            scope.filterPhoneName = "iPhone7";

            scope.filterPhone = function (brand,notes) {
                scope.filterPhoneName = brand;
                writebdLog(scope.category, "_" + notes, "渠道号", scope.gh);//选择的手机品牌
            };

            scope.$root.checkMachineName = function () {
                if (!scope.checkoutForm.machineName.$valid) {
                    //alert("请输入收件人");
                    var $scrollTo = $('.order-content');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMachine = function (machine,productId) {
                scope.$root.machineName = machine;
                writebdLog(scope.category, "_" + productId, "渠道号", scope.gh);//选择的商品ID
            }
        }
    };
}]);