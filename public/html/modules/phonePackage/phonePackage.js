'use strict';

app.directive("phonePackage", ['$http', '$stateParams', function ($http, $stateParams) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/phonePackage.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;


            //获取套餐列表
            if (attrs.type == "phone") {
                var apiUrl = "/data/phones/packages/" + $stateParams.phoneId + ".json";
            } else {
                var apiUrl = "/data/phonePackage.json";
            }
            $http.get(apiUrl).success(function (data) {
                scope.phonePackageList = data;
                scope.phonePackageItem = data[1];
                if (attrs.type == "phone") {
                    scope.phonePackageItem = data[0];
                } else {
                    scope.phonePackageItem = data[1];
                }
            });

            //选择号码 对象类型
            scope.setPhonePackage = function (event, phonePackageItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.phonePackageItem = phonePackageItem;
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml,scope.simList);
                writebdLog(scope.category,"合约套餐介绍","渠道号",scope.gh);
            };

            scope.$watch('phonePackageItem', function (nv, ov, scope) {
                if (nv != ov) {
                    if (attrs.type == "phone") {

                    } else {
                        scope.mainPrice = nv.price;
                    }
                }
            });
        }
    };
}]);