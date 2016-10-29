'use strict';

app.directive("txtList", [function () {
    return {
        restrict: 'E',
        replace: true,
        scope:{
            data:"@txtData"
        },
        templateUrl: "modules/txtList/txtList.html",
        link: function (scope, element, attrs) {
            console.log(scope.data.listItems);
        }
    };
}]);