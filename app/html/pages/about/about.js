"use strict";

app.config(['$stateProvider', function ($stateProvider) {

    // 设定路由
    $stateProvider
        .state('about', { //关于我们
            url: "/about",
            templateUrl: "html/pages/about/about.html",
            controller: "aboutController"
        });
}]).controller('aboutController',['$scope','$rootScope','$location', function ($scope, $rootScope, $location) {


}]);
