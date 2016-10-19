'use strict';

app.directive("toast", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/toast/toast.html",
        link: function (scope, element, attrs) {
            var $loadingToast = $("#loadingToast");
            scope.$root.toast = {
                open: function () {
                    $loadingToast.show();
                    $timeout(function () {
                        $loadingToast.hide();
                    }, 2000);
                },
                close: function () {
                    $loadingToast.hide();
                }
            };
            scope.$root.toast.close();
        }
    };
}]);