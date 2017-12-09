"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('actFlow', { //关于我们
            url: "/activity/199",
            templateUrl: "pages/activity/199/index.html",
            controller: "actFlowController"
        });
}]).controller('actFlowController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {

}]);
