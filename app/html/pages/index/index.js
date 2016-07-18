"use strict";

app.config(['$stateProvider', function ($stateProvider) {

    // 设定路由
    $stateProvider
        .state('index', { //app首页
            url: "/",
            templateUrl: "html/pages/index/index.html",
            controller: "indexController"
        });
}]).controller('indexController',['$scope','$rootScope','$location', function ($scope, $rootScope, $location) {


}]);