"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('errorSuccess', { //app首页
            url: "/error/:status",
            templateUrl: "pages/error/error.html",
            controller: "errorController"
        });
}]).controller('errorController', ['$scope', '$rootScope', '$location', '$stateParams', function ($scope, $rootScope, $location, $stateParams) {
    $scope.errorStatus = $stateParams.status;
    $scope.getContent = function () {
        getMeiqia();
        //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
        _MEIQIA('showPanel');
    };
}]);