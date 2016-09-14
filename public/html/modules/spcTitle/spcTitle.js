'use strict';

app.directive("spcTitle", function () {
    return {
        restrict: 'E',
        replace: true,
        scope:{},
        templateUrl: "modules/spcTitle/spcTitle.html",
        link: function (scope, element, attrs) {
            scope.mainTitle = attrs.mainTitle;
            scope.subTitle = attrs.subTitle;
            scope.arrow = attrs.arrow;
        }
    };
});