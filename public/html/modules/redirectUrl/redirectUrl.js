'use strict';

app.directive("redirectUrl", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/redirectUrl/redirectUrl.html",
        link: function (scope, element, attrs) {
            scope.redirectUrl = "http://" + $location.host() + $location.url();
        }
    };
}]);