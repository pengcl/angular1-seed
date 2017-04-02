'use strict';

app.directive("phoneNPackage", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/n/n.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class=attrs.addClass;
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //console.log(scope.phone.activityproductId);

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

        }
    };
}]);