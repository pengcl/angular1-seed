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
            scope.homeUrl = attrs.homeUrl;

            if ($window.history.length == 1) {
                scope.pageBack = "home";
            }

            scope.home = function () {
                $window.location.href = 'http://' + $window.location.host + scope.homeUrl + $window.location.search;
            };

            scope.back = function () {
                history.back();
            };

            scope.done = function () {

            };

            scope.getContact = function () {
                getMeiqia();
                if(attrs.groupToken){
                    _MEIQIA('showPanel', {
                        groupToken: '8ba3446475970c6af51f22c9a7bb4fb4'
                    });
                }else {
                    _MEIQIA('showPanel', {
                        groupToken: '5fcb8fc3c4aae224a01be2eaff210f1c'
                    });
                }
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };
        }
    };
}]);