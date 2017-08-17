'use strict';

app.directive("activity", ['$location', '$cookies', function ($location, $cookies) {
    return {
        restrict: 'E',
        templateUrl: "modules/activity/activity.html",
        link: function (scope, element, attrs) {

            var dt = new Date();
            dt.setDate(dt.getDate() + 30);

            scope.activity = "";

            if ($location.search().activity == undefined) {
                if ($cookies.get('app_activity')) {
                    scope.activity = $cookies.get('app_activity');
                }
            } else {
                scope.activity = $location.search().activity;
                $cookies.put('app_activity', scope.activity, {expires: dt});
            }

        }
    };
}]);