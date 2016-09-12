app.directive("productHeader", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/productHeader/productHeader.html",
        link: function (scope, element, attrs) {

        }
    };
}]);