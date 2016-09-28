'use strict';

app.directive("aboutUs", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/aboutUs/aboutUs.html",
        link: function (scope, element, attrs) {

        }
    };
}]);