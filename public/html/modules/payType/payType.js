'use strict';

app.directive("payType", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTypeTitle = attrs.title;
            scope.payTypeSubTitle = attrs.subTitle;
            scope.visibility = attrs.visibility;

            if(scope.visibility === "false"){
                $(element).addClass("hide");
            }

            scope.payType = 1;

            //选择手机颜色
            scope.setPayType = function (event, type) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.payType = type;
                }
            };
        }
    };
}]);