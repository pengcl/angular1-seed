'use strict';

app.directive("overlay", ['$http','$compile', function ($http,$compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/overlay/overlay.html",
        link: function (scope, element, attrs) {
            var $overlayHook = $("#overlay-hook");
            var $container = $("#container");
            scope.$root.Overlay = {
                open: function(template) {
                    //console.log(scope.simList);
                    $overlayHook.html(template);
                    $container.addClass("overlay-open");
                },
                openCompile: function(template) {
                    //console.log(scope.simList);
                    $compile($overlayHook.html(template))(scope);
                    $container.addClass("overlay-open");
                },
                close: function() {
                    $container.removeClass("overlay-open");
                    $overlayHook.html("");
                }
            };
            $(document).on('click','.js-close-overlay',function () {
                scope.$root.Overlay.close();
            })
        }
    };
}]);