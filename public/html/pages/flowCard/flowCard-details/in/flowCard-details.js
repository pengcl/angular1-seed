"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardIn', { //app首页
            url: "/fd/fds/:appType",
            templateUrl: "pages/flowCard/flowCard-details/in/flowCard-details.html",
            controller: "fdProInController"
        });
}]).controller('fdProInController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    window.location.href = "http://m.yfq.cn/yfqcz/#/";

    $scope.appType = systemName+"_FlowPackage";
    $scope.category = $scope.appType;

    writebdLog($scope.category,"_Load","渠道号",$scope.gh);//页面载入
}]);