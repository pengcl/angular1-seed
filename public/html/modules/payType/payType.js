'use strict';

app.directive("payType", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTypeTitle = attrs.title;
            scope.payTypeSubTitle = attrs.subTitle;

            //设置本模块的显示隐藏
            scope.visibility = attrs.visibility;
            if(scope.visibility === "false"){
                $(element).addClass("hide");
            }

            //默认赋值
            scope.payType = 1;

            //设置默认payType;
            scope.setDefaultPayType = function (type) {
                scope.payType = type;
            };

            //获取地址栏支付方式的参数
            var _payType = $location.search().payType;

            //判断是否有带支付方式参数，如果有，更改默认支付方式;
            if(_payType){
                scope.setDefaultPayType(_payType);
            }

            //选择支付方式
            scope.setPayType = function (event, type) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.payType = type;
                }
            };
        }
    };
}]);