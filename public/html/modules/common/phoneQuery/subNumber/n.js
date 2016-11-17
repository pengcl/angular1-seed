'use strict';

app.directive("subNumber", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/subNumber/n.html",
        controller: "numberController",
        link: function (scope, element, attrs) {

            scope.checkPhone = function () {
                if (!scope.checkoutForm.phoneNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    return false;
                }
                return true;
            };

            scope.setSubNumber = function (event, numberItem) {
                event.preventDefault();
                scope.subNumber = numberItem.n;

                var $this = $(event.currentTarget);

                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');

                writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
            };

            scope.showSNumberPn = function (e) {
                $("#pickSubNumberPanel").slideToggle();
            };
        }
    };
}]);