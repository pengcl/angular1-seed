"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phone', { //app首页
            url: "/phones/:phoneId",
            templateUrl: "pages/phone/phone-details/default/phone-details.html",
            controller: "pProController"
        });
}]).controller('pProController', ['$scope', '$rootScope', '$location', '$stateParams', 'Phone', function ($scope, $rootScope, $location, $stateParams, Phone) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    $scope.appType = "phone";
    $scope.category = $scope.appType;

    $scope.getI = function (jsonArray) {
        for (var i = 0; i < jsonArray.length; i++) {
            if (jsonArray[i].selected == "curr") {
                return i;
            }
        }
    };

    $scope.phone = Phone.get({
        phoneId: $stateParams.phoneId
    }, function (phone) {
        $scope.mainImage = phone.phoneImg;
        //$scope.mainPrice = phone.price;

        //选择默认颜色
        $scope.color = phone.colors[$scope.getI(phone.colors)];
        //选择默认内存
        $scope.storage = phone.storages[$scope.getI(phone.storages)];
        $scope.mainPrice = $scope.storage.price;
    });
}]);