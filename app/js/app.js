'use strict';

// Declare app level module which depends on views, and components

/* App Module */

var app = angular.module('app', ['ui.router', 'ngAnimate', 'ngCookies']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $urlRouterProvider.otherwise("/about");
    //
    // 设定路由
    $stateProvider
        .state('phone', { //首页,单卡
            url: "/phone",
            templateUrl: "html/pages/phone/index/index.html",
            controller: "phoneIndexController"
        })
}]);
