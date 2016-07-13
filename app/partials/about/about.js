"use strict";

appControllers.controller('aboutController',['$scope','$rootScope','$location', function ($scope, $rootScope, $location) {
    $scope.pageTitle = "充值成功";
    $scope.$root.title = $scope.pageTitle;


}]);
