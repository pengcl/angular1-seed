"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('productB', { //app首页
            url: "/pd/productB",
            templateUrl: "pages/phoneCard/phoneCard-details/B/phoneCard-details.html",
            controller: "pdProController"
        });
}]);