'use strict';

app.directive("timer", ['$interval',function ($interval) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/timer/timer.html",
        link: function (scope, element, attrs) {

            //scope.timer = "1";

            function getRTime() {

                var d = new Date();
                var _nowTime = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + "23:59:00";

                var EndTime = new Date(_nowTime);
                var NowTime = new Date();


                var t = EndTime.getTime() - NowTime.getTime();

                var d = Math.floor(t / 1000 / 60 / 60 / 24);
                var h = Math.floor(t / 1000 / 60 / 60 % 24);
                if(h < 10){
                    h = "0" + h;
                }
                var m = Math.floor(t / 1000 / 60 % 60);
                if(m < 10){
                    m = "0" + m;
                }
                var s = Math.floor(t / 1000 % 60);
                if(s < 10){
                    s = "0" + s;
                }
                scope.timer = "<i>" + h + "</i>" + "<sub>时</sub>" + "<i>" + m + "</i>" + "<sub>分</sub>" + "<i>" + s + "</i>" + "<sub>秒</sub>";
                //scope.timer = "1";
                //console.log(scope.timer);
            };

            $interval(getRTime, 1000);
        }
    };
}]);