'use strict';

// Declare app level module which depends on views, and components

/* App Module */

var app = angular.module('app', ['ui.router', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise("/fd/fds/in");
}]).run(['$rootScope', function ($rootScope) {
}]);
