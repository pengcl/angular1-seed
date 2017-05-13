'use strict';

app.directive("star", [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ratting: "="
        },
        templateUrl: "modules/star/star.html",
        link: function (scope, element, attrs) {

            scope.$watch('ratting', function (n, o, scope) {//临时解决方案
                var rate = (parseInt(scope.ratting[0]) + parseInt(scope.ratting[1]) + parseInt(scope.ratting[2]))/3;
                var $i = $(element).find(".stars-content").find("i");
                for (var i = 0; i < 5; i++) {
                    if (i < rate) {
                        $i.eq(i).addClass("on");
                    }
                }
            });

        }
    };
}]);