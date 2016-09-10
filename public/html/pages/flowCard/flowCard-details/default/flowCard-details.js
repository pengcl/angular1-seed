"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flowCard', { //app首页
            url: "/fd/product",
            templateUrl: "html/pages/flowCard/flowCard-details/default/flowCard-details.html",
            controller: "fdProController"
        });
}]).controller('fdProController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
    $scope.appType = "flowV2";
    $scope.category = $scope.appType;

    //writebdLog($scope.category,"页面载入","渠道号",$scope.gh);
}]);