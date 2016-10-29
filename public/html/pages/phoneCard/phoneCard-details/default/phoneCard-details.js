"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('product', { //app首页
            url: "/pd/product",
            templateUrl: "pages/phoneCard/phoneCard-details/default/phoneCard-details.html",
            controller: "pdProController"
        });
}]).controller('pdProController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    $scope.appType = "feeV2";
    $scope.category = $scope.appType;

    $scope.phone = [];
    $scope.phone.packages = [
        {
            "id": "0",
            "productId": "217",
            "oProductId": "247",
            "price": "96",
            "oldPrice": "174",
            "network": "2.5",
            "talkTime": "850",
            "title": "[翼分期] 2.5G全国流量，850分钟全国通话，限时优惠，全国包邮"
        },
        {
            "id": "1",
            "productId": "216",
            "oProductId": "246",
            "price": "102",
            "oldPrice": "204",
            "network": "3.5",
            "talkTime": "900",
            "title": "[翼分期] 3.5G全国流量，900分钟全国通话，限时优惠，全国包邮"
        },
        {
            "id": "2",
            "productId": "215",
            "oProductId": "245",
            "price": "143",
            "oldPrice": "259",
            "network": "4.5",
            "talkTime": "900",
            "title": "[翼分期] 4.5G全国流量，900分钟全国通话，限时优惠，全国包邮"
        },
        {
            "id": "3",
            "productId": "214",
            "oProductId": "244",
            "price": "168",
            "oldPrice": "304",
            "network": "4.5",
            "talkTime": "1800",
            "title": "[翼分期] 4.5G全国流量，1800分钟全国通话，限时优惠，全国包邮"
        }
    ];

    $http.get("/data/txtList/pdFqa.json").success(function (data) {
        //console.log(data);
        $scope.pdFqa = data;
    });
}]);