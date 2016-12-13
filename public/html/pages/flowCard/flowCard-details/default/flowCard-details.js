/*
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flowCard', { //app首页
            url: "/fd/product",
            templateUrl: "pages/flowCard/flowCard-details/default/flowCard-details.html",
            controller: "fdProController"
        })
        .state('flowCardMifi', { //app首页
            url: "/fd/mifi",
            templateUrl: "pages/flowCard/flowCard-details/default/flowCard-details.html",
            controller: "fdProController"
        });
}]).controller('fdProController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

    $scope.appType = systemName + "_FlowPackage";

    if ($location.path() == "/fd/mifi") {
        $scope.appType = systemName + "_FlowPackage_MiFi";
    }

    $scope.category = $scope.appType;

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);//页面载入
}]);*/
