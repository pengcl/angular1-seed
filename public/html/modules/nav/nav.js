'use strict';

app.directive("topNav", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "html/modules/nav/nav.html",
        link: function (scope, element, attrs) {
            scope.pageTitle = attrs.pageTitle;
            scope.$root.title = scope.pageTitle;
            scope.pageBack = attrs.pageBack;
            scope.back = function () {
                var viewContainer = $(".view-container");
                var container = $("#container");
                var uiView = $("#ui-view");
                viewContainer.addClass("ng-back");
                history.back();
                var timer = $timeout(function(){
                    viewContainer.removeClass("ng-back");
                },5000);
            }
        }
    };
}]);