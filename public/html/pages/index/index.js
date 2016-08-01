"use strict";

app.config(['$stateProvider','$locationProvider', function ($stateProvider,$locationProvider) {

    // 设定路由
    $stateProvider
        .state('index', { //app首页
            url: "/",
            templateUrl: "html/pages/index/index.html",
            controller: "indexController",
            resolve: {
                data: ['$q', function ($q) {
                    var defer = $q.defer();
                    defer.resolve('page1');
                    return defer.promise;
                }]
            }
        });
    $locationProvider.html5Mode(true);
}]).controller('indexController',['$scope','$rootScope','$location', function ($scope, $rootScope, $location) {
    $scope.pageTitle = "首页";
    $scope.$root.title = $scope.pageTitle;
}]);