'use strict';

app.directive("toast", [function () {
    return {
        restrict: 'E',
        templateUrl: "modules/common/toast/toast.html",
        link: function (scope, element, attrs) {
            var $loadingToast = $("#loadingToast");
            $loadingToast.hide();
            scope.$root.toast = {
                open: function () {
                    $loadingToast.show();
                },
                close: function () {
                    $loadingToast.hide();
                }
            };
        }
    };
}]);