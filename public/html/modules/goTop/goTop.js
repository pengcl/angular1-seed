'use strict';

app.directive("goTop", ['$cookieStore', '$timeout', function ($cookieStore, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/goTop/goTop.html",
        link: function (scope, element, attrs) {
            var $scrollContainer = $(".content-scrollable");
            scope.goTop = function () {
                $scrollContainer.animate({
                    scrollTop: 0
                });
            }
        }
    };
}]);