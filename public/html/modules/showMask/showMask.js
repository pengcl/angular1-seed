'use strict';

app.directive("newYear", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/showMask/showMask.html",
        link: function (scope, element, attrs) {
            $("#happy-new-year .close").click(function () {
                $("#happy-new-year").hide();
            })
        }
    };
}]);
