'use strict';

app.directive("txtList", ["$http", function ($http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: "modules/txtList/txtList.html",
        link: function (scope, element, attrs) {
            $http.get(attrs.apiUrl).success(function (data) {
                scope.txtData = data;
            });
        }
    };
}]);