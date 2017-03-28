'use strict';

app.directive("pkgInfo", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'C',
        scope: {
            ssDd: "="
        },
        templateUrl: "modules/cardPackage/d/cardPkg.html",
        link: function (scope, element, attrs) {
            scope.openCardPkg = function (targetId,e) {
                var $this = $(e.currentTarget);
                var targetHtml = $this.siblings(".pcd-infos").html();
                scope.$root.Overlay.open(targetHtml);
            }
        }
    };

}]);