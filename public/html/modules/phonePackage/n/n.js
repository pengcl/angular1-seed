'use strict';

app.directive("phoneNPackage", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/n/n.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class=attrs.addClass;
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            //选择号码 对象类型
            scope.setPhonePackage = function (event, pkg) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if($this.hasClass("curr")){
                    return false;
                }
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.pkg = pkg;
                writebdLog(scope.category,"_SelectPackage","渠道号",scope.gh);//选择套餐
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };
        }
    };
}]);