"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('success', { //关于我们
            url: "/msg/success",
            templateUrl: "pages/msg/success/success.html",
            controller: "successController"
        });
}]).controller('successController', ['$scope', '$location', '$cookieStore', 'MarketSvc', 'OrderSvc', 'ShareSvc', function ($scope, $location, $cookieStore, AccountSvc, MarketSvc, OrderSvc, ShareSvc) {
    $scope.order = {
        "no": $location.search().orderNo,
        "product": $location.search().orderProduct,
        "price": $location.search().orderPrice
    };

    OrderSvc.getOrder($scope.order.no).then(function success(data) {
        $scope.order = data[0];
        console.log(data[0]);

    });

    $scope.showShare = function (config) {
        $scope.state.share.open(true, config);
    };
}]);