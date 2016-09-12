'use strict';

app.directive("gh", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/gh/gh.html",
        link: function (scope, element, attrs) {
            scope.gh = $location.search().gh;
        }
    };
}]);