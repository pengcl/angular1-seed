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

'use strict';

//全局统计
var userTrack = function (appType, actionName) {

};

var $container = $("#container");

$container.on('click','.js-menu',function (e) {
    $("#container").addClass('menu-open');
});

$container.on('click','.js-back',function (e) {
    console.log("back");
});

$(".content-overlay").click(function (e) {
    $("#container").removeClass('menu-open');
});

//Document ready事件
$(document).ready(function () {
    $("html").css("font-size",($container.width() / 320) * parseInt($("html").css("font-size")));
});

'use strict';

app.directive("topNav", function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "html/modules/nav/nav.html",
        link: function (scope, element, attrs) {
            scope.pageTitle = attrs.pageTitle;
            if(attrs.pageBack){
                scope.back = true;
            }else{
                scope.back = false;
            }
        }
    };
});
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
    $scope.pageTitle = "充值成功";
    $scope.$root.title = $scope.pageTitle;


}]);


