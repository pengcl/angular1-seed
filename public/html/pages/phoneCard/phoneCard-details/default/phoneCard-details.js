"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('product', { //app首页
            url: "/pd/:pageType/:productId",
            templateUrl: function ($stateParams){
                return 'pages/phoneCard/phoneCard-details/' + $stateParams.pageType + '/phoneCard-details.html';
            },
            controller: "pdProController"
        });
}]).controller('pdProController', ['$scope', '$rootScope', '$location', '$http', '$stateParams', function ($scope, $rootScope, $location, $http, $stateParams) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    $scope.pageType = $stateParams.pageType;

    $scope.appType = systemName + "_" + $scope.pageType + "phoneCard";
    $scope.category = $scope.appType;

    $scope.phone = [];

    $http.get("/data/phonePackage.json").success(function (data) {
        $scope.phone.packages = data;
        $scope.pkg = data[1];
    });

    $scope.$watch("pkg", function (n, o, scope) {
        if (n !== o) {
            $scope.mainPrice = n.price;
        }
    });
    androidInputBugFix();
}]);