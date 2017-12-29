"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('number', { //关于我们
            url: "/utils/number",
            templateUrl: "pages/utils/number/number.html",
            controller: "utilsNumberController"
        });
}]).controller('utilsNumberController', ['$scope', '$http', '$location', 'OrderSvc', function ($scope, $http, $location, OrderSvc) {
    var $container = $('.content-scrollable');

    $scope.pageType = 'A';

    $scope.activeTag = "number";
    $scope.appType = systemName + "_199_chooseNumber_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.orderNo = $location.search().orderNo;

    OrderSvc.getOrder($scope.orderNo).then(function (data) {
        if (data[0].salesOrder.buymobile) {
            window.location.href = '/msg/success?mobile=' + data[0].salesOrder.buymobile + '&hasMobile=true';
        }
    });


    $scope.showDialog = function () {
        if (!$scope.checkMainNumber()) {
            $scope.toast.close();
            $scope.modal.open({
                show: true,
                title: "系统提示",
                body: "<p style='text-align: center'>您还没有选择号码</p>",
                buttons: [{show: true, txt: '我知道了', eventId: 'ok'}]
            });
            return false;
        }
        $scope.modal.open({
            show: true,
            title: "确定使用该号码？",
            body: "<p style='text-align: center;font-size: 0.18rem'>" + $scope.mainNumber + "</p><p>号码确定后不能变更，请注意！</p>",
            buttons: [{show: true, txt: '确定', eventId: 'sure'}, {show: true, txt: '我再想想', eventId: 'think'}]
        });
    };

    $scope.$on('appModal', function (event, data) {
        if (data === 'sure') {
            $scope.submit();
        }
    });

    $scope.submit = function () {
        $scope.toast.open();
        if (!$scope.checkMainNumber()) {
            $scope.toast.close();
            return false;
        }
        //cfApi.apiHost = 'http://192.168.0.108:8880';
        $http.jsonp(cfApi.apiHost + '/order/chooseNumber.ht?orderNo=' + $scope.orderNo + '&phoneNumber=' + $scope.mainNumber + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
            $scope.toast.close();
            $scope.dialog.open("系统提示", data.msg);
            writebdLog($scope.category, "_Submit", "渠道号", $scope.gh);
            if (data.code === '200') {
                window.location.href = '/msg/success?mobile=' + $scope.mainNumber;
            } else {
            }
        });
    };

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
}]);