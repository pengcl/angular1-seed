'use strict';

app.directive("subNumber", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/subNumber/n.html",
        controller: "numberController",
        link: function (scope, element, attrs) {

            var $container = $('.content-scrollable');

            scope.checkSubNumber = function () {
                //alert("sub");
                if (!scope.checkoutForm.subNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickSubNumber');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    $("#pickSubNumberPanel").slideDown();
                    return false;
                }
                return true;
            };

            scope.setSubNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(scope.mainNumber,numberItem.n)) {
                    scope.subNumber = numberItem.n;
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    writebdLog(scope.category, "_subSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }
            };

            scope.showSNumberPn = function (e) {
                $("#pickSubNumberPanel").slideToggle();
                $(event.currentTarget).toggleClass("down");
                writebdLog(scope.category, "_subCuteNumber", "渠道号", scope.gh);//选择副卡靓号
            };
        }
    };
}]);