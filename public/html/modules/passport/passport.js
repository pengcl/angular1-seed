'use strict';

app.directive("passport", function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/passport/passport.html",
        controller: "passportController",
        link: function (scope, element) {
        }
    }
}).controller('passportController',['$scope', '$cookieStore', function($scope,$cookieStore) {
    var receiverWatch = $scope.$watch('passport', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $cookieStore.put('passport',newVal);
        }
    },true);
}]);