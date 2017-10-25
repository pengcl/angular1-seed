'use strict';

app.directive("gh", ['$location', '$cookies', function ($location, $cookies) {
    return {
        restrict: 'E',
        templateUrl: "modules/gh/gh.html",
        link: function (scope, element, attrs) {

            var dt = new Date();
            dt.setDate(dt.getDate() + 30);

            scope.gh = "";

            if ($location.search().gh == undefined) {
                if ($cookies.get('app_gh')) {
                    scope.gh = $cookies.get('app_gh');
                }
            } else {
                scope.gh = $location.search().gh;
                $cookies.put('app_gh', scope.gh, {expires: dt});
            }

            if ($location.search().referrerNo == undefined) {
                scope.referrerNo = "";
            } else {
                scope.referrerNo = $location.search().referrerNo;
            }
        }
    };
}]);