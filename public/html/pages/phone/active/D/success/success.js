"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('DctiveSuccess', { //app首页
            url: "/phone/active/D/success",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/D/success/success.html';
            },
            controller: "pCctiveSController"
        });
}]).controller('pDctiveSController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = 'D';
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;


    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl:'http://app.yfq.cn/images/active/d/share_active.jpg'
    };

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };
    
    $scope.getOrderQuery = function () {
    	writebdLog($scope.category, "_OrderQuery", "渠道号", $scope.gh);//订单查询
    };

}]);