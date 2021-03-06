'use strict';

app.directive("cardPkgN", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'C',
        scope: {
            ssDd: "="
        },
        templateUrl: "modules/cardPackage/n/cardPkg.html",
        link: function (scope, element, attrs) {
            scope.openCardPkg=function(targetId){
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
            }
        }
    };

}]);