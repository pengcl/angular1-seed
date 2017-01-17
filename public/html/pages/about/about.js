"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('about', { //关于我们
            url: "/about",
            templateUrl: "pages/about/about.html",
            controller: "aboutController"
        });
}]).controller('aboutController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {

}]);
