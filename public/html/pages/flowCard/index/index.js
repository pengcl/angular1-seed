"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flow', { //关于我们
            url: "/flow",
            templateUrl: "pages/flow/index/index.html",
            controller: "flowController"
        });
}]).controller('flowController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

}]);