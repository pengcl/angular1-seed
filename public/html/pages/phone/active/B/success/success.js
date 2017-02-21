"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('BctiveSuccess', { //app首页
            url: "/phone/active/B/success",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/B/success/success.html';
            },
            controller: "pBctiveSController"
        });
}]).controller('pBctiveSController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = $stateParams.pageType;
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;


    $scope.params = window.location.search;

}]);