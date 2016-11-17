'use strict';

app.directive("subColors", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/subColors/colors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.subColorTitle = attrs.title;
            scope.subColorSubTitle = attrs.subTitle;

            scope.subColor = scope.phone.phoneTypes[0].mediaProductList[0];

            //选择手机颜色
            scope.setSubPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.subColor = color;
                    writebdLog(scope.category, "_FuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };
        }
    };
}]);