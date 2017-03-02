"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('CctiveSuccess', { //app首页
            url: "/phone/active/C/success",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/C/success/success.html';
            },
            controller: "pCctiveSController"
        });
}]).controller('pCctiveSController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = 'C';
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;


    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/B' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

}]);