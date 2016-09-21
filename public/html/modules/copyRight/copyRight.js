'use strict';

app.directive("copyRight", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        replace:true,
        scope:{},
        templateUrl: "modules/copyRight/copyRight.html",
        link: function (scope, element, attrs) {
            scope.content = attrs.content;
        }
    };
}]);