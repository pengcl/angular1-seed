"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneHu', { //app首页
            url: "/huPhones/:pageType/:phoneId",
            templateUrl: "pages/phone/phone-details/hu/phone-details.html",
            controller: "pProController"
        });
}]);