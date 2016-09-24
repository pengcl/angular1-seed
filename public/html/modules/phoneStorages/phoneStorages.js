'use strict';

app.directive("phoneStorages", ['$http', 'Phone', function ($http, Phone) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneStorages/phoneStorages.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.storageTitle = attrs.title;
            scope.storageSubTitle = attrs.subTitle;

            //scope.size = attrs.size;

            //选择号码 对象类型
            scope.setPhoneStorage = function (event, storage) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.productId = storage.productId;
                    writebdLog(scope.category,"_FuselageMemory","渠道号",scope.gh);//选择机身内存
                }
            };
        }
    };
}]);