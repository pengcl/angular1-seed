'use strict';

app.directive("topNav", ['$timeout', '$document', '$window', function ($timeout, $document, $window) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/nav/nav.html",
        link: function (scope, element, attrs) {

            scope.navVisibility = attrs.navVisibility;

            scope.navClass == "black";

            if (attrs.navClass) {//如果 navClass 存在
                scope.navClass = attrs.navClass;
            }

            scope.pageTitle = attrs.pageTitle;
            scope.$root.title = scope.pageTitle;
            scope.pageBack = attrs.pageBack;
            scope.pageDone = attrs.pageDone;

            if ($window.history.length == 1) {
                scope.pageBack = "home";
            }

            scope.home = function () {
                $window.location.href = 'http://' + $window.location.host + '/phone/active/D/phones' + $window.location.search;
            };

            scope.back = function () {
                history.back();
            };

            scope.done = function () {

            };

            scope.getContact = function () {
                getMeiqia();
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };
        }
    };
}]);