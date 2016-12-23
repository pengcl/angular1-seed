'use strict';

app.directive("referrerNo", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/referrerNo/referrerNo.html",
        link: function (scope, element, attrs) {
            scope.referrerNo = $location.search().referrerNo;
        }
    };
}]);