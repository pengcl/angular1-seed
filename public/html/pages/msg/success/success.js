"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('success', { //关于我们
            url: "/msg/success",
            templateUrl: "pages/msg/success/success.html",
            controller: "successController"
        });
}]).controller('successController', ['$scope', '$location', '$cookieStore', 'MarketSvc', 'OrderSvc', 'ShareSvc', function ($scope, $location, $cookieStore, AccountSvc, MarketSvc, OrderSvc, ShareSvc) {

    $scope.mobile = $location.search().mobile;
    $scope.hasMobile = $location.search().hasMobile;
}]);