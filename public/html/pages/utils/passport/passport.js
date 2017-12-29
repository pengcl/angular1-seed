"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('passport', { //关于我们
            url: "/utils/passport",
            templateUrl: "pages/utils/passport/passport.html",
            controller: "utilsPassportController"
        });
}]).controller('utilsPassportController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var $container = $('.content-scrollable');

    $scope.pageType = 'A';

    $scope.activeTag = "passport";
    $scope.appType = systemName + "_199_detail_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.orderNo = $location.search().orderNo;
    console.log($scope.orderNo);

    $scope.submit = function () {
        $scope.toast.open();
        if (!$scope.checkMainNumber()) {
            $scope.toast.close();
            return false;
        }
        //cfApi.apiHost = 'http://192.168.0.108:8880';
        $http.jsonp(cfApi.apiHost + '/order/chooseNumber.ht?orderNo=' + $scope.orderNo + '&phoneNumber=' + $scope.mainNumber + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
            console.log(data);
        });
    };

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
}
]);