"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('product', { //app首页
            url: "/pd/product",
            templateUrl: "html/pages/phoneCard/phoneCard-details/default/phoneCard-details.html",
            controller: "pdProController"
        });
}]).controller('pdProController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    $scope.appType = "feeV2";
    $scope.category = $scope.appType;
}]);