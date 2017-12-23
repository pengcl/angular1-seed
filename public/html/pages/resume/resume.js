"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('resumeWord', { //app首页
            url: "/resume",
            templateUrl: "pages/resume/resume.html",
            controller: "resumeWordController"
        });
}]).controller('resumeWordController', ['$scope', function ($scope) {
    console.log('resumeWordController');
    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/resume',
        shareTitle: '大牛管家诚聘优才',
        shareDisc: '欢迎广大有志于高端管家助理服务的退伍军人、体育专业毕业生踊跃报名！',
        picUrl: 'http://app.yfq.cn/images/pin.jpg'
    };
}]);