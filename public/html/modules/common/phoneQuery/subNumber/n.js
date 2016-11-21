'use strict';

app.directive("subNumber", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/subNumber/n.html",
        controller: "numberController",
        link: function (scope, element, attrs) {

            scope.checkSubNumber = function () {
                //alert("sub");
                if (!scope.checkoutForm.subNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickSubNumber');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() -50
                    });
                    $("#pickSubNumberPanel").slideDown();
                    return false;
                }
                return true;
            };

            scope.setSubNumber = function (event, numberItem) {
                event.preventDefault();
                scope.subNumber = numberItem.n;

                //$("#pickSubNumberPanel").slideToggle();

                var $this = $(event.currentTarget);

                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');

                writebdLog(scope.category, "_subSelectNumber", "渠道号", scope.gh);//选择号码
            };

            scope.showSNumberPn = function (e) {
                $("#pickSubNumberPanel").slideToggle();
                writebdLog(scope.category, "_subCuteNumber", "渠道号", scope.gh);//选择副卡靓号
            };
        }
    };
}]);