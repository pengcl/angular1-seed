"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider.state('pcdRecharge', { //app首页
        url: "/pcdRecharge/index",
        templateUrl: "pages/phoneCard/recharge/index.html",
        controller: "pdRechargeController"
    });
}]).controller('pdRechargeController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
    //console.log($scope.referrerForm.referrerNo);

    $scope.rechargeMobile = function (rechargeMobile) {
        $http.get('http://www.cz.com:3099/api/checkFirstCharge/' + rechargeMobile).success(function (data) {
            /*$scope.rechargeCards = data[0];
             console.log($scope.rechargeCards);*/

        });
    };

    $http.get('http://www.cz.com:3099/api/findRechargeProducts').success(function (data) {
        console.log(data);

        $scope.rechargeProducts = data;
        /*$scope.rechargeCards = data[0];
         console.log($scope.rechargeCards);*/

    });

}]);