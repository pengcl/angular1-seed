app.directive("productDetails", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/productDetails/productDetails.html",
        link: function (scope, element, attrs) {

        }
    };
}]);