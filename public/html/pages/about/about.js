"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('about', { //关于我们
            url: "/about",
            templateUrl: "html/pages/about/about.html",
            controller: "aboutController"
        });
    $locationProvider.html5Mode(true);
}]).controller('aboutController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    $scope.pageTitle = "关于我们";
    $scope.$root.title = $scope.pageTitle;
}]);
