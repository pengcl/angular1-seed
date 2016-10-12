"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneIndexD', { //app首页
            url: "/phone/indexD",
            templateUrl: "pages/phone/index/D/index.html",
            controller: "pIndexController"
        });
}]);