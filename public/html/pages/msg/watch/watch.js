"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('watch', { //关于我们
            url: "/watch",
            templateUrl: "pages/msg/watch/watch.html",
            controller: "watchController"
        });
}]).controller('watchController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {

}]);
