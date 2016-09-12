'use strict';

app.directive("phonePackage", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/phonePackage.html",
        link: function (scope, element, attrs) {

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取套餐列表
            $http.get('/data/phonePackage.json').success(function (data) {
                scope.phonePackageList = data;
            });

            //选择号码 对象类型
            scope.setPhonePackage = function (event, phonePackageItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.phonePackageItem = phonePackageItem;
            };
        }
    };
}]);