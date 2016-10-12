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
        _version = "V3";
    }
    if(_path == "/phone/indexD"){
        _version = "V4";
    };
    $scope.appType = systemName + "_" + _version + "_index";
    $scope.category = $scope.appType;

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    var getMeiqia = function () {
        (function (m, ei, q, i, a, j, s) {
            m[a] = m[a] || function () {
                    (m[a].a = m[a].a || []).push(arguments)
                };
            j = ei.createElement(q),
                s = ei.getElementsByTagName(q)[0];
            j.async = true;
            j.charset = 'UTF-8';
            j.src = i + '?v=' + new Date().getUTCDate();
            s.parentNode.insertBefore(j, s);
        })(window, document, 'script', '//static.meiqia.com/dist/meiqia.js', '_MEIQIA');
        _MEIQIA('entId', 27864);
        _MEIQIA('withoutBtn');
    };

    $scope.getContent = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

}]);