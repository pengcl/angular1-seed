'use strict';

app.directive("buyers", ['$interval', function ($interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/buyers/buyers.html",
        link: function (scope, element, attrs) {
            scope.getBuyers = function(){
                var getBuyers = new Array();
                for(var i=0;i<4;i++){
                    var obj = {
                        name:getRandomName (),
                        phone:getRandomPhone(),
                        pkg:getRandomPkg(),
                        time:getRanDomTime()
                    };
                    getBuyers.push(obj);
                }
                return getBuyers;
            };

            scope.buyers = scope.getBuyers();

            $interval(function() {
                scope.buyers = scope.getBuyers();
            }, 1000);
        }
    };
}]);