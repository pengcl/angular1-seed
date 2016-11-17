'use strict';

app.directive("nPayType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/n/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTitle = attrs.title;
            scope.paySubTitle = attrs.subTitle;
            //设置本模块的显示隐藏
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            var $form = $(attrs.submit);

            //默认赋值
            //scope.payType = 1;

            //设置默认payType;
            scope.setDefaultPayType = function (id, typeName) {
                scope.payType = id;
                scope.payTypeName = typeName;
            };

            scope.setDefaultPayType(2,"信用卡分期");

            //选择支付方式

            scope.setPayType = function (event, id, typeName) {
                event.preventDefault();
                scope.payType = id;
                scope.payTypeName = typeName;
                var $this = $(event.currentTarget);
                $this.addClass("on");
                $this.siblings().removeClass("on");
            };
        }
    };
}]);