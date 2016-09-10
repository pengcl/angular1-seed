app.directive("productHeader", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "html/modules/productHeader/productHeader.html",
        link: function (scope, element, attrs) {

        }
    };
}]);