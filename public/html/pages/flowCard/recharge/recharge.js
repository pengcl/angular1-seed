"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flowRecharge', { //关于我们
            url: "/flow/recharge",
            templateUrl: "pages/flow/recharge/recharge.html",
            controller: "flowRechargeController"
        });
}]).controller('flowRechargeController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

}]);
