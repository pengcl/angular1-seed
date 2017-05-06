'use strict';

app.directive("spcPhoneLjA", ['$http', '$compile', '$cookieStore', function ($http, $compile, $cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhoneLjA/spcPhone.html",
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
                if (name == '全部') name = 'all';
                if (name == '热门机型') name = 'hot';
                if (name == '其它机型') name = 'other';
                return name;
            }

            scope.setMainPhoneBrand = function (e, index, myBrand) {
                scope.brandIndex = index;
                scope.brand = myBrand;
                scope.spcNavOpen = false;
                $cookieStore.put("brand",myBrand);
                writebdLog(scope.category, "_ClickBrand" + writeBrand(myBrand.brandName), "渠道号", scope.gh);//选择的手机品牌
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

        }
    };
}]);