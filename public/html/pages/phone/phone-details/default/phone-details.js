/*
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phone', { //app首页
            url: "/:ghType/:pageType/:phoneId",
            //templateUrl: "pages/phone/phone-details/default/phone-details.html",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/' + $stateParams.ghType + '/details.html';
            },
            controller: "pProController"
        });
}]).controller('pProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore) {

    $scope.pageType = $stateParams.pageType;

    $scope.phone = Phone.get({
        phoneId: $stateParams.phoneId
    }, function (phone) {
        $scope.productId = phone.productId;

        $scope.appType = systemName + "_" + $scope.pageType + "_" + phone.phoneModel;
        //console.log($scope.appType);
        $scope.category = $scope.appType;
        writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
    });

    $cookieStore.put("phoneQueryUrl",window.location.href);
    if($cookieStore.get("phoneQueryUrl")){
        $scope.phoneQueryUrl = $cookieStore.get("phoneQueryUrl");
    };

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get('/data/phones/' + $scope.productId + '.json').success(function (phone) {
                $scope.phone = phone;

                //选择默认内存
                $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                $scope.pkg = phone.packages[0];

                $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                $scope.mainPrice = phone.price;
            });
        }
    });
    androidInputBugFix();
}]);*/
