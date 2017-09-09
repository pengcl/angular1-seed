'use strict';

app.directive("appFooterNav", ['$timeout', '$rootScope', function ($timeout, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: "modules/appFooterNav/appFooterNav.html",
        link: function (scope, element, attrs) {
        	scope.writeClick = function (value) {
                writebdLog(scope.category, "_" + value, "渠道号", scope.gh);//记录点击事件
            };
        }
    };
}]);