"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneC', { //app首页
            url: "/phones/C/:phoneId",
            templateUrl: "pages/phone/phone-details/C/phone-details.html",
            controller: "pProController"
        });
}]);