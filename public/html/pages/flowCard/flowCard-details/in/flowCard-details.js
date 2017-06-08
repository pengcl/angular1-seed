
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardIn', { //app首页
            url: "/fd/fds/:appType",
            templateUrl: "pages/flowCard/flowCard-details/in/flowCard-details.html",
            controller: "fdProInController"
        });
}]).controller('fdProInController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    //window.location.href = cfApi.apiHost + "/yfqcz/#/";

    $scope.$root.share = {
        homeLink: $location.absUrl(),
        shareTitle: '全国上网卡 5折优惠',
        shareDisc: '无线上网卡/流量卡，3G/4G/6G/8G/10G 全国通用 4G极速网络 包月租 购买当月生效',
        picUrl: 'http://app.yfq.cn/images/flow/flowcard/v8/nativeShare.jpg'
    };

    $scope.appType = systemName+"_FlowPackage";
    $scope.category = $scope.appType;

    writebdLog($scope.category,"_Load","渠道号",$scope.gh);//页面载入
}]);
