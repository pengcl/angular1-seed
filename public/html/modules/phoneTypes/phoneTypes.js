'use strict';

app.directive("phoneTypes", ['$http', 'Phone', function ($http, Phone) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneTypes/phoneTypes.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.phoneTypeTitle = attrs.title;
            scope.phoneTypeSubTitle = attrs.subTitle;

            //scope.size = attrs.size;

            //选择号码 对象类型
            scope.setPhoneType = function (event, phoneType) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.productId = phoneType.productId;
                    writebdLog(scope.category,"_SelectVersion","渠道号",scope.gh);//选择版本
                }
            };
        }
    };
}]);