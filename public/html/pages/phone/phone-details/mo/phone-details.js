"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneMo', { //app首页
            url: "/moPhones/:pageType/:phoneId",
            templateUrl: "pages/phone/phone-details/mo/phone-details.html",
            controller: "pProController"
        });
}]);