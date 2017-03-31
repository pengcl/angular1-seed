'use strict';

app.directive("spcPhoneD", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhoneD/spcPhone.html",
        link: function (scope, element, attrs) {
            var $container = $('.content-scrollable');

            scope.spcNavOpen = false;

            scope.filterPhoneName = "";

            scope.filterPhone = function (brand, notes) {
                scope.filterPhoneName = brand;
                writebdLog(scope.category, "_" + notes, "渠道号", scope.gh);//选择的手机品牌
            };

            function writeBrand(name) {

                if (name == '华为') name = 'huawei';
                if (name == '小米') name = 'mi';
                if (name == '美图') name = 'meitu';
                return name;
            }

            scope.setMainPhoneBrand = function (e, index, myBrand) {
                scope.brandIndex = index;
                scope.brand = myBrand;
                scope.spcNavOpen = false;
                writebdLog(scope.category, "_" + writeBrand(myBrand.brandName), "渠道号", scope.gh);//选择的手机品牌
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

            scope.setMachine = function (machine, productId) {
                scope.$root.machineName = machine;
                writebdLog(scope.category, "_" + productId, "渠道号", scope.gh);//选择的商品ID
            }
        }
    };
}]);