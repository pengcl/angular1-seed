'use strict';

appDirectives.directive("topNav", function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/nav/nav.html",
        link: function (scope, element, attrs) {

        },
    };
});