'use strict';

app.directive("pt", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/payType.html",
        link: function (scope, element, attrs) {
            scope.pt = $location.search().pt;
            //console.log(scope.pt);
        }
    };
}]);