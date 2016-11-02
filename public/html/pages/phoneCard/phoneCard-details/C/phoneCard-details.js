"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('productC', { //app首页
            url: "/pd/productC",
            templateUrl: "pages/phoneCard/phoneCard-details/C/phoneCard-details.html",
            controller: "pdProController"
        });
}]);