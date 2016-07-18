'use strict';

app.directive("topNav", function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "html/modules/nav/nav.html",
        link: function (scope, element, attrs) {
            scope.pageTitle = attrs.pageTitle;
            if(attrs.pageBack){
                scope.back = true;
            }else{
                scope.back = false;
            }
        }
    };
});