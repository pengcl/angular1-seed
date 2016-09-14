'use strict';

app.directive("simType", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/simType/simType.html",
        link: function (scope, element, attrs) {
            scope.simTitle = attrs.title;
            scope.class = attrs.addClass;
            //console.log(attrs.addClass);

            //获取选择框尺码
            scope.size = attrs.size;

            //获取sim卡类型
            $http.get('/data/simType.json').success(function (data) {
                scope.simList = data;

                //设置默认值
                scope.simItem = data[0];
            });

            //设置流量卡类型
            scope.$root.setSimType = function (event, index, simItem) {
                //console.log("1");
                event.preventDefault();
                var $item = $(".sim-type-lists").find(".item-box");
                $item.removeClass('curr');
                $item.eq(index).addClass('curr');
                scope.simItem = simItem;
                scope.$root.Overlay.close();
                writebdLog(scope.category,"流量卡类型","渠道号",scope.gh);
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml,scope.simList);
                writebdLog(scope.category,"卡类型介绍","渠道号",scope.gh);
            };
        }
    };
}]);