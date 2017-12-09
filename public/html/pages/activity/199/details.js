"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('actFlowD', { //关于我们
            url: "/activity/199/d",
            templateUrl: "pages/activity/199/details.html",
            controller: "actFlowDController"
        });
}]).controller('actFlowDController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {

}]);
