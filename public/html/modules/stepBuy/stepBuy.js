'use strict';

app.directive("stepBuy", function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/stepBuy/stepBuy.html",
        link: function (scope, element, attrs) {
            var $container = $(".content-scrollable");

            element.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                element.removeClass("shake animated");
            });

            (function () {
                $container.bind('scrollstart', function () {
                    element.addClass("active");
                });

                $container.bind('scrollstop', function (e) {
                    element.removeClass("active");
                });
            })();
        }
    };
});