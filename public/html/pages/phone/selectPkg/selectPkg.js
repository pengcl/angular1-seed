"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('selectPkg', { //app首页
            url: "/phs/sg/C/:phoneId/selectPkg",
            templateUrl: function ($stateParams) {
                return 'pages/phone/selectPkg/selectPkg.html';
            },
            controller: "selectPkgController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('selectPkgController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = 'C';
    $scope.activeTag = "lj";

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_mysy_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);


    //选择号码 对象类型
    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

}]);