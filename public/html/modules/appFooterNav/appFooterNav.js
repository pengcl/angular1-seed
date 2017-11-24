'use strict';

app.directive("appFooterNav", ['$timeout', '$rootScope', '$location', function ($timeout, $rootScope, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/appFooterNav/appFooterNav.html",
        link: function (scope, element, attrs) {
            if ($location.search().appType) {
                scope.appType = $location.search().appType;
            }
            scope.pageActive = attrs.pageActive;
            scope.writeClick = function (value) {
                writebdLog(scope.category, "_" + value, "渠道号", scope.gh);//记录点击事件
            };
        }
    };
}]);