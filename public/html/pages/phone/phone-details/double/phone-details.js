"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneDouble', { //app首页
            url: "/phs/db/:pageType/:phoneId",
            templateUrl: function ($stateParams){
                return 'pages/phone/phone-details/double/' + $stateParams.pageType + '/details.html';
            },
            controller: "pDoubleProController"
        });
}]).controller('pDoubleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = $stateParams.pageType;

    $http.jsonp("http://192.168.1.181:8082/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=mysy&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        console.log($scope.phone);
        //$scope.productId = phone.productId;
        //$scope.appType = systemName + "_" + $scope.pageType + "_" + phone.phoneModel;
        //$scope.category = $scope.appType;
        //writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });


    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get("http://192.168.1.181:8082/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                //选择默认内存
                $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                $scope.pkg = phone.packages[0];

                $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                $scope.mainPrice = phone.price;*/
            });
        }
    });
    androidInputBugFix();
}]);