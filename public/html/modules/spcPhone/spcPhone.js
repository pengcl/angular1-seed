'use strict';

app.directive("spcPhone", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhone/spcPhone.html",
        link: function (scope, element, attrs) {
            var $container = $('.content-scrollable');
            scope.filterPhoneName = "iPhone7";

            scope.filterPhone = function (brand) {
                scope.filterPhoneName = brand;
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

            scope.setMachine = function (machine) {
                console.log(machine);
                scope.$root.machineName = machine;
            }
        }
    };
}]);