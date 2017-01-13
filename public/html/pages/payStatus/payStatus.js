"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('paySuccess', { //app首页
            url: "/pay/:status",
            templateUrl: "pages/payStatus/payStatus.html",
            controller: "payController"
        });
}]).controller('payController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', function ($scope, $rootScope, $location, $stateParams, $http) {
    $scope.payStatus = $stateParams.status;
    $scope.orderNo = $location.search().orderNo;

    $http.get("http://app.yfq.cn:3099/api/getSalesOrder/" + $scope.orderNo).success(function (data) {
        $scope.callbackUrl = data.items[0].salesOrder.callbackUrl;
    })
}]);