"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('payment', { //app首页
            url: "/payment",
            templateUrl: "pages/payment/payment.html",
            controller: "paymentController"
        });
}]).controller('paymentController', ['$scope', '$rootScope', '$location', '$stateParams', '$cookieStore', '$http', function ($scope, $rootScope, $location, $stateParams, $cookieStore, $http) {

    $scope.orderNo = $location.search().orderNo;

    //$scope.appType = systemName + "_" + $stateParams.pageType + "_" + phone.phoneModel;
    //$scope.category = $scope.appType;

    if($cookieStore.get("phoneQueryUrl")){
        $scope.phoneQueryUrl = $cookieStore.get("phoneQueryUrl");
    };

    if ($scope.orderNo) {
        $scope.category = "_IndexSearch";
        $http.get("http://app.yfq.cn:3099/api/getSalesOrder/" + $scope.orderNo).success(function (data) {
            var machineId,productId,color,phoneNumber,price;

            $.each(data.items,function (i,o) {
                if(o.productName.indexOf("月") == -1){
                    machineId = o.productId;
                    color = o.salesOrder.color;
                    phoneNumber = o.salesOrder.buyMobile;
                    price = o.salesOrder.totalAmount;

                }else {
                    productId = o.productId;
                }
            });

            $scope.orderState = {
                machineId: machineId,
                productId: productId,
                color: color,
                phoneNumber: phoneNumber,
                price: price,
                category: $scope.category
            };

            $scope.receiver = {
                name: data.salesOrder.recieverName,
                mobile: data.salesOrder.recieverMobile,
                city: data.salesOrder.receiverCity,
                room: data.salesOrder.receiverRoom
            };
        });
    } else {
        $scope.orderState = $cookieStore.get("orderState");
        $scope.category = $scope.orderState.category;
    }

    //writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
}]);