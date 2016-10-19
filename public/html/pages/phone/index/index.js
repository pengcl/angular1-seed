"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneIndexC', { //app首页
            url: "/phone/indexC",
            templateUrl: "pages/phone/index/index.html",
            controller: "pIndexController"
        });
}]).controller('pIndexController', ['$scope', '$location', function ($scope, $location) {


    var _path,_version;
    _path = $location.path();
    if(_path == "/phone/indexC"){
        _version = "C";
    }
    if(_path == "/phone/indexD"){
        _version = "D";
    }
    if(_path == "/phone/indexD"){
        _version = "E";
    }
    $scope.appType = systemName + "_" + _version + "_index";
    $scope.category = $scope.appType;

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

}]);