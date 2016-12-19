"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneCardIndex', { //app首页
            url: "/pcd/:pageType/index",
            templateUrl: function ($stateParams){
                return 'pages/phoneCard/index/' + $stateParams.pageType + '/index.html';
            },
            controller: "phoneCardIndexController"
        });
}]).controller('phoneCardIndexController', ['$scope', '$rootScope', '$location', '$http', '$stateParams', function ($scope, $rootScope, $location, $http, $stateParams) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    var $container = $('.content-scrollable');

    $scope.pageType = $stateParams.pageType;

    $scope.appType = systemName + "_" + $scope.pageType + "phoneCard";
    $scope.category = $scope.appType;
    
    $scope.setPkg = function (event,pkgId) {
        $scope.pkgId = pkgId;
    };

    $scope.checkMainPkg = function () {
        if (!$scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('#pickMainPkg');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            return false;
        }
        return true;
    };

    $scope.submitForm = function () {
        var targetHtml = $("#wxQrCode").html();
        $scope.Overlay.open(targetHtml);
        if(!$scope.checkMainPkg()){
            return false;
        }
        if(!$scope.checkMainNumber()){
            return false;
        }
        if(!$scope.checkSimType()){
            return false;
        }
        if(!$scope.checkAddress()){
            return false;
        }
        if(!$scope.checkActiveCode()){
            return false;
        }
        $("#checkoutForm").submit();
    };

    androidInputBugFix();
}]);