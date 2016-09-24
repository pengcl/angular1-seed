'use strict';

app.directive("phonePackage", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
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


            //获取默认选择套餐
            if (attrs.type == "phone") {
                scope.package = scope.phone.packages[0];
            } else {
                scope.package = scope.phonePackageList[1];
            }

            //选择号码 对象类型
            scope.setPhonePackage = function (event, phonePackageItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.package = phonePackageItem;
                writebdLog(scope.category,"_SelectPackage","渠道号",scope.gh);//选择套餐
            };

            scope.showOverLay = function (targetId) {
                console.log(scope.package);
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };
        }
    };
}]);