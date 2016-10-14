"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phone', { //app首页
            url: "/phones/:phoneId",
            templateUrl: "pages/phone/phone-details/default/phone-details.html",
            controller: "pProController"
        });
}]).controller('pProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
    $scope.phone = Phone.get({
        phoneId: $stateParams.phoneId
    }, function (phone) {
        $scope.productId = phone.productId;
        
        $scope.appType = systemName+"_V1_"+phone.phoneModel;
        if($location.path().indexOf("/phones/B")!=-1)
    	{
    		$scope.appType = systemName+"_V2_"+phone.phoneModel;
    	}
        if($location.path().indexOf("/phones/C")!=-1)
        {
            $scope.appType = systemName+"_V3_"+phone.phoneModel;
        }
        if($location.path().indexOf("/phones/D")!=-1)
        {
            $scope.appType = systemName+"_V4_"+phone.phoneModel;
        }
        $scope.category = $scope.appType;
        writebdLog($scope.category,"_Load","渠道号",$scope.gh);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect : "fadeIn",
        skip_invisible : false,
        container:$(".content-scrollable")
    });

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get('/data/phones/' + $scope.productId + '.json').success(function (phone) {
                $scope.phone = phone;

                /*console.log($scope.productId);
                if(phone.productId == 256){
                    $scope.colors = [
                        {
                            "colorName": "亮黑色",
                            "colorUrl": "/images/phones/iphone7/iphone7-jetblack.jpg",
                            "selected": "disabled"
                        },
                        {
                            "colorName": "黑色",
                            "colorUrl": "/images/phones/iphone7/iphone7-black.jpg",
                            "selected": ""
                        },
                        {
                            "colorName": "银色",
                            "colorUrl": "/images/phones/iphone7/iphone7-silver.jpg",
                            "selected": ""
                        },
                        {
                            "colorName": "金色",
                            "colorUrl": "/images/phones/iphone7/iphone7-gold.jpg",
                            "selected": ""
                        },
                        {
                            "colorName": "玫瑰金",
                            "colorUrl": "/images/phones/iphone7/iphone7-rosegold.jpg",
                            "selected": "curr"
                        }
                    ]
                }else {
                    $scope.colors = [
                        {
                            "colorName": "亮黑色",
                            "colorUrl": "/images/phones/iphone7/iphone7-jetblack.jpg",
                            "selected": ""
                        },
                        {
                            "colorName": "黑色",
                            "colorUrl": "/images/phones/iphone7/iphone7-black.jpg",
                            "selected": ""
                        },
                        {
                            "colorName": "银色",
                            "colorUrl": "/images/phones/iphone7/iphone7-silver.jpg",
                            "selected": ""
                        },
                        {
                            "colorName": "金色",
                            "colorUrl": "/images/phones/iphone7/iphone7-gold.jpg",
                            "selected": ""
                        },
                        {
                            "colorName": "玫瑰金",
                            "colorUrl": "/images/phones/iphone7/iphone7-rosegold.jpg",
                            "selected": "curr"
                        }
                    ]
                }*/

                //选择默认内存
                $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                $scope.pkg = phone.packages[0];

                $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                $scope.mainPrice = phone.price;
            });
        }
    });
    androidInputBugFix();
}]);