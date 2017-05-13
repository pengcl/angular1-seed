"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardV3', { //app首页
            url: "/fd/v3",
            templateUrl: "pages/flowCard/flowCard-details/v3/v3.html",
            controller: "flowCardV3Controller"
        })
}]).controller('flowCardV3Controller', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    $scope.product = {
        "activityproductId": 420,
        "brandName": "",
        "brandSort": 0,
        "cardItems": "",
        "commentNum": 0,
        "deductibleMoney": "mifi",
        "fanhuan": "",
        "flash": 0,
        "ifHot": 0,
        "ifRecommend": 0,
        "ifSellOut": 1,
        "mainImageUrl": "product/images/nofound.png",
        "memoryProducts": [],
        "monthlyPrice": 0,
        "packageProductList": [
            {
                "message": "50",
                "network": "50",
                "oldPrice": "169.00",
                "productId": 421,
                "productName": "169无限流量套餐卡",
                "salesPrice": "169.00",
                "talkTime": "1000"
            },
            {
                "message": "50",
                "network": "50",
                "oldPrice": "269.00",
                "productId": 423,
                "productName": "269无限流量套餐卡",
                "salesPrice": "269.00",
                "talkTime": "1000"
            }
        ],
        "phoneBillPrice": 0,
        "phonePrice": 0,
        "phoneTypes": [
            {
                "activityPrice": 0,
                "activityProductId": 0,
                "comboDescription": "",
                "comboParam": "",
                "endDateTime": "",
                "fullDescription": "<p>\n\tmifi + 11111<\/p>\n",
                "ifSupportSigle": 0,
                "mainImageUrl": "",
                "mediaProductList": [],
                "productId": 423,
                "productMemory": "",
                "productName": "mifi + 11111",
                "quantity": 0,
                "salePrice": 100,
                "seckillImage": "",
                "specificationValues": "",
                "startDateTime": "",
                "status": 1
            },
            {
                "activityPrice": 0,
                "activityProductId": 0,
                "comboDescription": "",
                "comboParam": "",
                "endDateTime": "",
                "fullDescription": "<p>\n\tmifi+充电宝<\/p>\n",
                "ifSupportSigle": 0,
                "mainImageUrl": "",
                "mediaProductList": [],
                "productId": 422,
                "productMemory": "",
                "productName": "mifi+充电宝",
                "quantity": 0,
                "salePrice": 50,
                "seckillImage": "",
                "specificationValues": "",
                "startDateTime": "",
                "status": 1
            },
            {
                "activityPrice": 0,
                "activityProductId": 0,
                "comboDescription": "",
                "comboParam": "",
                "endDateTime": "",
                "fullDescription": "<p>\n\tmifi<\/p>\n",
                "ifSupportSigle": 0,
                "mainImageUrl": "",
                "mediaProductList": [],
                "productId": 420,
                "productMemory": "421,",
                "productName": "mifi",
                "quantity": 0,
                "salePrice": 0,
                "seckillImage": "",
                "specificationValues": "",
                "startDateTime": "",
                "status": 1
            }
        ],
        "productName": "mifi",
        "productSubName": "mifi",
        "productTag": "",
        "salePrice": 0,
        "seckillImage": "",
        "shortDescription": "",
        "sortOrder": 0
    };

    console.log($scope.product);

    $scope.appType = systemName + "_FlowPackage";
    $scope.category = $scope.appType;

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);//页面载入
}]);