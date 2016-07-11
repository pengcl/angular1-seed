'use strict';

// Declare app level module which depends on views, and components

/* App Module */

var app = angular.module('app', ['ui.router', 'ngAnimate', 'ngCookies', 'appControllers', 'appFilters', 'appDirectives']);
//var appDirectives = angular.module('appDirectives', []);
//var appFilters = angular.module('appFilters', []);

app.config(['$stateProvider','$urlRouterProvider','$locationProvider',function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.hashPrefix('!');

  $urlRouterProvider.otherwise("/");
  //
  // 设定路由
  $stateProvider
      .state('index', { //首页,单卡
        url: "/",
        templateUrl: "partials/index/index.html",
        controller: "indexController"
      })
      .state('productLists', { //首页,多卡,无预存月租
        url: "/productLists",
        templateUrl: "partials/product/product-lists/product-lists.html",
        controller: "productListsController"
      })
      .state('productDetails', { //首页,多卡,无预存月租
          url: "/productDetails",
          templateUrl: "partials/product/product-details/product-details.html",
          controller: "productDetailsController"
      })
}]);
