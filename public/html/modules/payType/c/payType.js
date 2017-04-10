'use strict';

app.directive("cPayType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/c/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTitle = attrs.title;
            scope.paySubTitle = attrs.subTitle;
            scope.details = "预付首月月租";
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

            if (scope.cardPay) {
                scope.setDefaultPayType(0, "在线支付");
            }
            if (scope.totolPrice < 1500) {
                scope.setDefaultPayType(0, "马上付款");
            }
            if (scope.pageType == "pcd") {
                scope.details = "￥9.9元掏靓号";
            }

            //选择支付方式

            scope.setPayType = function (event, id) {
                event.preventDefault();
                scope.payType = id;
                //scope.payTypeName = typeName;
                var $this = $(event.currentTarget);
                //console.log($this.find(".title").html());
                scope.payTypeName = $this.data("title");
                wirtePayType(id);
            };

            var value;
            var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

            function wirtePayType(payType) {
                value = payTypeAry[payType];
                writebdLog(scope.category, "_" + value, "渠道号", scope.gh);//选择支付方式
            }
        }
    };
}]);