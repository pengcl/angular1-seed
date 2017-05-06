'use strict';

app.directive("mainColorsLj", ['$http', '$q', '$timeout', '$location', function ($http, $q, $timeout, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/mainColorsLj/colors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.mainColorTitle = attrs.title;
            scope.mainColorSubTitle = attrs.subTitle;

            if ($location.search().colorTag == 'red') {

                scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'name', '红色');

                if (scope.mainColorIndex == undefined || scope.phone.phoneTypes[0].mediaProductList[scope.mainColorIndex].stock == 0) {//如果没有红色，或者红色无货
                    scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'selected', 1);
                }


            } else {
                scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'selected', 1);
            }

            scope.$root.mainColor = scope.phone.phoneTypes[0].mediaProductList[scope.mainColorIndex];


            //选择手机颜色
            scope.setMainPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    //scope.mainColor = color;
                    scope.$root.mainColor = color;
                    writebdLog(scope.category, "_mainFuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };
        }
    };
}]);