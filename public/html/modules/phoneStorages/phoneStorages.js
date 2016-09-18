'use strict';

app.directive("phoneStorages", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneStorages/phoneStorages.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.storageTitle = attrs.title;
            scope.storageSubTitle = attrs.subTitle;

            //console.log(scope.phone);

            $http.get("/data/phones/storages/" + scope.phoneId + ".json").success(function (storages) {
                scope.storages = storages;
                scope.storage = storages[0];
            });
            //scope.size = attrs.size;

            //选择号码 对象类型
            scope.setPhoneStorage = function (event, storage) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if($this.hasClass("disabled")){
                    return false;
                }else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.storage = storage;
                }
            };
        }
    };
}]);