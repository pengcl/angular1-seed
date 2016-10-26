'use strict';

app.directive("tempCart", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/tempCart/tempCart.html",
        link: function (scope, element, attrs) {
        }
    };
}]);