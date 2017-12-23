"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('actFlow', { //关于我们
            url: "/activity/199",
            templateUrl: "pages/activity/199/index.html",
            controller: "actFlowController"
        });
}]).controller('actFlowController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
    $scope.pageType = "C";
    $scope.appType = systemName + "_199_index_" + $scope.pageType;
    $scope.category = $scope.appType;

    writebdLog($scope.category, "_Load", "渠道号", $location.search().gh);

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/activity/199',
        shareTitle: '剧无霸流量王，流量随便花！',
        shareDisc: '无限流量，上不封顶。3000分钟，打遍全国。4G网速，追求极速。',
        picUrl: 'http://app.yfq.cn/images/phoneCard/C/nativeShare.jpg',
        mobile: '',
        pid: '10000095979791',
        gh: $scope.gh,
        category: $scope.category,
        url: window.location.href
    };

    $scope.go = function () {
        writebdLog($scope.category, "_Buy", "渠道号", $scope.gh);//立即购买
    }
}]);
