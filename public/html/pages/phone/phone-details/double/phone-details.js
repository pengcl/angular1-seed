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

    $scope.activeTag = "mysy";
    
    $scope.appType = systemName + "_mysy_" + $scope.pageType+"_DoublePhones" ;
    $scope.category = $scope.appType;
    $scope.phoneQueryUrl = window.location.href;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.buyType = 1;

    $http.jsonp("http://m.yfq.cn/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=mysy&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.totolPrice = data.salePrice;
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
            $http.get("http://m.yfq.cn/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
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