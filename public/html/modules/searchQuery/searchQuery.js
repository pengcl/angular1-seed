'use strict';

app.directive("searchQuery", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/searchQuery/searchQuery.html",
        link: function (scope, element, attrs) {

        }
    };
}]);