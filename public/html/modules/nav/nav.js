'use strict';

app.directive("topNav", function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "html/modules/nav/nav.html",
        link: function (scope, element, attrs) {
            scope.pageTitle = attrs.pageTitle;
            scope.$root.title = scope.pageTitle;
            scope.pageBack = attrs.pageBack;
            scope.back = function () {
                $window.history.back();
            }
        }
    };
});