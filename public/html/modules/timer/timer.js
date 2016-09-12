'use strict';

app.directive("timer", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/timer/timer.html",
        link: function (scope, element, attrs) {

            function getRTime() {

                var d = new Date();
                var _nowTime = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + "23:59:00";

                var EndTime = new Date(_nowTime);
                var NowTime = new Date();


                var t = EndTime.getTime() - NowTime.getTime();

                var d = Math.floor(t / 1000 / 60 / 60 / 24);
                var h = Math.floor(t / 1000 / 60 / 60 % 24);
                var m = Math.floor(t / 1000 / 60 % 60);
                var s = Math.floor(t / 1000 % 60);

                scope.timer = "<i>" + h + "</i>" + "<sub>时</sub>" + "<i>" + m + "</i>" + "<sub>分</sub>" + "<i>" + s + "</i>" + "<sub>秒</sub>";
            };

            setInterval(getRTime, 1000);
        }
    };
}]);