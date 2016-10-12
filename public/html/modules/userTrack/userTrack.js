'use strict';

app.directive("userTrack", function () {
    return {
        restrict: 'E',
        replace: false,
        link: function (scope, element, attrs) {
            scope.userTrack = function (TrackName) {
                writebdLog(scope.category, TrackName, "渠道号", scope.gh);
            }
        }
    };
});