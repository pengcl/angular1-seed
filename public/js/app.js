'use strict';

// Declare app level module which depends on views, and components

/* App Module */

var app = angular.module('app', ['ui.router', 'appServices', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters']);

var baseApiUri = "http://app.gd189fq.com:3099/api";

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise("/phones/256");
}]).run(['$rootScope', function ($rootScope) {

    /*$rootScope.$on('$locationChangeStart',function(){

    });

    $rootScope.$on('$locationChangeSuccess',function(){

    });*/
}]);
