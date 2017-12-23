"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('actPhone', { //关于我们
            url: "/activity/1212",
            templateUrl: "pages/activity/1212/index.html",
            controller: "actPhoneController"
        });
}]).controller('actPhoneController', ['$scope', '$rootScope', '$location', '$http', '$cookieStore', function ($scope, $rootScope, $location, $http, $cookieStore) {
    $http.jsonp(cfApi.apiHost + '/product/getProList.ht?activeTag=ljzma&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;

        $scope.phoneOne = $scope.singlePhones[getIndex($scope.singlePhones, "activityproductId", '383')];
        $scope.phoneTwo = $scope.singlePhones[getIndex($scope.singlePhones, "activityproductId", '456')];

        $scope.phoneThree = $scope.singlePhones[getIndex($scope.singlePhones, "activityproductId", '10000094272132')];
        $scope.phoneFour = $scope.singlePhones[getIndex($scope.singlePhones, "activityproductId", '10000095136428')];

        $scope.phoneFive = $scope.singlePhones[getIndex($scope.singlePhones, "activityproductId", '10000095429375')];
        $scope.phoneSix = $scope.singlePhones[getIndex($scope.singlePhones, "activityproductId", '10000095621120')];

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    function writeBrand(name) {

        if (name == '华为') name = 'huawei';
        if (name == '小米') name = 'mi';
        if (name == '美图') name = 'meitu';
        if (name == '全部') name = 'all';
        if (name == '热门机型') name = 'hot';
        if (name == '其它机型') name = 'other';
        return name;
    }

    $scope.setMainPhoneBrand = function (e, index, myBrand) {
        $scope.brandIndex = index;
        $scope.brand = myBrand;
        $scope.spcNavOpen = false;
        $cookieStore.put("brand", myBrand);
        //writebdLog($scope.category, "_ClickBrand" + writeBrand(myBrand.brandName), "渠道号", $scope.gh);//选择的手机品牌
    };
}]);
