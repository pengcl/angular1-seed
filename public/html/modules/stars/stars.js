'use strict';

app.directive("stars", function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: "modules/stars/stars.html",
        link: function (scope, element, attrs) {
            var $i = $(".stars-content").find("i");
            scope.sold = Math.round(Math.random()*999);
            scope.score = (Math.random() + 4).toFixed(1);
            for (var i = 0; i < 4; i++) {
                if (i < scope.score) {
                    $i.eq(i).addClass("on");
                }
            }
        }
    };
});