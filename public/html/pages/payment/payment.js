"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('payment', { //app首页
            url: "/payment",
            templateUrl: "pages/payment/payment.html",
            controller: "paymentController"
        });
}]).controller('paymentController', ['$scope', '$rootScope', '$location', '$stateParams', '$cookieStore', function ($scope, $rootScope, $location, $stateParams, $cookieStore) {
    $scope.orderState = $cookieStore.get("orderState");



    $scope.category = $scope.orderState.category;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
}]);