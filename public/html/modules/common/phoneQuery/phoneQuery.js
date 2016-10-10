'use strict';

app.directive("phoneQuery", [function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/phoneQuery.html",
        link: function (scope, element, attrs) {
        }
    };
}]);