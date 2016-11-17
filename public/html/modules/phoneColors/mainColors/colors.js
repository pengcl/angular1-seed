'use strict';

app.directive("mainColors", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/mainColors/colors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.mainColorTitle = attrs.title;
            scope.mainColorSubTitle = attrs.subTitle;

            //scope.phone.$promise.then(function (phone) {
            scope.mainColor = scope.phone.phoneTypes[0].mediaProductList[0];
            //});

            //选择手机颜色
            scope.setMainPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.mainColor = color;
                    writebdLog(scope.category, "_FuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };
        }
    };
}]);