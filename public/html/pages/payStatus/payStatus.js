"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('paySuccess', { //app首页
            url: "/pay/:status",
            templateUrl: "pages/payStatus/payStatus.html",
            controller: "payController"
        });
}]).controller('payController', ['$scope', '$rootScope', '$location', '$stateParams', function ($scope, $rootScope, $location, $stateParams) {
    $scope.payStatus = $stateParams.status;
    $scope.orderNo = $location.search().orderNo;
}]);