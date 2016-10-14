'use strict';

app.directive("activity", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/activity/activity.html",
        link: function (scope, element, attrs) {
            scope.activity = $location.search().activity;
        }
    };
}]);