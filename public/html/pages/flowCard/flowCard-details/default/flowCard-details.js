
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flowCard', { //app首页
            url: "/fd/product",
            templateUrl: "pages/flowCard/flowCard-details/default/flowCard-details.html",
            controller: "fdProController"
        })
        .state('flowCardMifi', { //app首页
            url: "/fd/mifi",
            templateUrl: "pages/flowCard/flowCard-details/default/flowCard-details.html",
            controller: "fdProController"
        });
}]).controller('fdProController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {


    //window.location.href = cfApi.apiHost + "/yfqcz/#/";
    $scope.appType = systemName + "_FlowPackage";

    $scope.$root.share = {
        homeLink: $location.absUrl(),
        shareTitle: '全国上网卡 5折优惠',
        shareDisc: '无线上网卡/流量卡，3G/4G/6G/8G/10G 全国通用 4G极速网络 包月租 购买当月生效',
        picUrl: 'http://app.yfq.cn/images/flow/flowcard/v8/nativeShare.jpg'
    };

    console.log($location.absUrl());

    if ($location.path() == "/fd/mifi") {
        $scope.appType = systemName + "_FlowPackage_MiFi";
    }

    $scope.category = $scope.appType;

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);//页面载入
}]);
