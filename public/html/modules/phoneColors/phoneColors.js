'use strict';

app.directive("phoneColors", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/phoneColors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.colorTitle = attrs.title;
            scope.colorSubTitle = attrs.subTitle;

            $http.get("/data/phones/colors/" + scope.phoneId + ".json").success(function (colors) {
                scope.colors = colors;
                scope.color = colors[0];
            });
            //scope.size = attrs.size;

            //选择号码 对象类型
            scope.setPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if($this.hasClass("disabled")){
                    return false;
                }else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.color = color;
                    scope.mainImage = color.colorUrl;
                }
            };
        }
    };
}]);