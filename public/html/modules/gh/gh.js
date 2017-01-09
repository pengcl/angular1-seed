'use strict';

app.directive("gh", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/gh/gh.html",
        link: function (scope, element, attrs) {
            if ($location.search().gh == undefined) {
                scope.gh = "";
            } else {
                scope.gh = $location.search().gh;
            }
        }
    };
}]);