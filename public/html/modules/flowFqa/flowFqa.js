'use strict';

app.directive("flowFqa", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/flowFqa/flowFqa.html",
        link: function (scope, element, attrs) {
        }
    };
}]);