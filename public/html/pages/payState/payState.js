"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('payState', { //app首页
            url: "/payState/:status",
            templateUrl: "pages/payState/payState.html",
            controller: "payStateController"
        });
}]).controller('payStateController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', function ($scope, $rootScope, $location, $stateParams, $http) {
    $scope.payStatus = $stateParams.status;

    $scope.params = window.location.search;

    if($location.search().orderNo != undefined){
        $scope.orderNo = $location.search().orderNo;
        $http.get("http://app.yfq.cn:3099/api/getSalesOrder/" + $scope.orderNo).success(function (data) {
            $scope.callbackUrl = data.items[0].salesOrder.callbackUrl;
        });
    }else {
        $scope.callbackUrl = "#";
    }

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jjk&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);