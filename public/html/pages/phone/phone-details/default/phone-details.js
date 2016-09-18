"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phone', { //app首页
            url: "/phones/:phoneId",
            templateUrl: "pages/phone/phone-details/default/phone-details.html",
            controller: "pProController"
        });
}]).controller('pProController', ['$scope', '$rootScope', '$location', '$stateParams','Phone', function ($scope, $rootScope, $location, $stateParams,Phone) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    $scope.appType = "phone";
    $scope.category = $scope.appType;
    $scope.phoneId = $stateParams.phoneId;

    $scope.phone = Phone.get({
        phoneId: $scope.phoneId
    }, function (phone) {
        $scope.phoneItem = phone;
        $scope.mainImage = phone.phoneImg;
        $scope.mainPrice = phone.price;
    });
}]);