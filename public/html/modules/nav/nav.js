'use strict';

app.directive("topNav", ['$timeout', function ($timeout) {
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
            scope.back = function () {
                var $viewContainer = $(".view-container");
                //var $viewFrame = $(".view-frame");
                $viewContainer.addClass("ng-back");
                history.back();
                var timer = $timeout(function () {
                    $viewContainer.removeClass("ng-back");
                }, 600);
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