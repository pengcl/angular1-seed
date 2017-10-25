"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('otherAProduct', { //app首页
            url: "/others/A",
            templateUrl: "pages/others/A/a.html",
            controller: "otherAProductController"
        })
}]).controller('otherAProductController', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "csrtc";
    $scope.pageType = 'A';
    $scope.category = systemName + "_csrtc_" + $scope.pageType;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);


    $scope.products = [
        {
            id: 424,
            name: '健维宝1罐 + 神酒1瓶 + 干果1盒 送鲜果蜜1盒',
            price: 398,
            select: true
        },
        {
            id: 425,
            name: '春砂仁干果2盒 送鲜果蜜1盒',
            price: 298,
            select: false
        },
        {
            id: 426,
            name: '春砂仁健维宝2罐',
            price: 298,
            select: false
        },
        {
            id: 427,
            name: '春之神酒2瓶',
            price: 298,
            select: false
        },
        {
            id: 428,
            name: '春砂仁鲜果蜜2盒',
            price: 198,
            select: false
        }
    ];

    $scope.$root.share = {
        homeLink: 'http://' + window.location.host + '/others/A' + window.location.search,
        shareTitle: '春砂仁，您的养胃专家，广东阳春源产地生产，良心品质！',
        shareDisc: '养胃首选春砂仁，多种吃法，老少咸宜，套餐限时特价398元，再送鲜果密一盒！货到付款，先到先得！',
        picUrl: 'http://' + window.location.host + '/images/others/A/nativeShare.jpg'
    };

    $scope.mainProduct = $scope.products[0];

    $scope.selectProduct = function (product) {
        $scope.mainProduct = product;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);
    };


    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomReceiverPhone() + " 购买了春砂仁鲜果蜜2盒 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.checkBuyHistory = function () {

    };

    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");

        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }

        $scope.$root.toast.open();
        $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.mainProduct.id + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

            if (data.result) {
                $form.submit();
                $scope.$root.toast.close();
                writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
            } else {
                $scope.$root.toast.close();
                $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
            }
        });
    };

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if(n){
                var $form = $("#checkoutForm");
                $form.submit();
            }
        }
    });

}]);