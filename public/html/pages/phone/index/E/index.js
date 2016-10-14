"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneIndexN', { //app首页
            url: "/phone/indexE",
            templateUrl: "pages/phone/index/E/index.html",
            controller: "pIndexController"
        });
}]);