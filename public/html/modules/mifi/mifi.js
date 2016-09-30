'use strict';

app.directive("mifi", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/mifi/mifi.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.mifiTitle = attrs.title;
            scope.mifiSubTitle = attrs.subTitle;

            //获取套餐列表

            $http.get('/data/mifis.json').success(function (data) {
                scope.mifis = data;

            });

            scope.$root.disabledSim = function(index,status){
                var $simItem = $(".sim-type-lists").find(".item-box");
                if(status){
                    $simItem.eq(index).addClass("disabled");
                }else {
                    $simItem.eq(index).removeClass("disabled");
                }
            };

            //选择号码 对象类型
            scope.setMifi = function (event, mifi) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if(!$this.hasClass("curr")){//选择MIFI
                    scope.mifi = mifi;
                    scope.mainPrice = parseInt(mifi.price) + parseInt(scope.flowPackageItem.p);
                    $this.addClass('curr');
                    scope.$root.setSimType(event, 1, scope.simList[1]);
                    scope.$root.disabledSim(0,true);
                    writebdLog(scope.category, "_SelectMifi", "渠道号", scope.gh);
                }else {//取消MIFI
                    scope.mifi = false;
                    scope.$root.disabledSim(0,false);
                    scope.mainPrice = scope.flowPackageItem.p;
                    $this.removeClass('curr');
                    writebdLog(scope.category, "_CancelMifi", "渠道号", scope.gh);
                }
            };
        }
    };
}]);