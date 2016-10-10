'use strict';

app.directive("flowPackage", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/flowPackage/flowPackage.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;

            //获取选择框尺码
            scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            //获取套餐列表


            $http.get(baseApiUri + '/getFlowPackages').success(function (data) {
                scope.flowPackageList = data;

                //设置默认选中项 start
                scope.flowPackageItem = data[3];
                //end
            });

            /*$http.get('/data/flowPackage.json').success(function (data) {
             scope.flowPackageList = data;

             //设置默认选中项 start
             scope.flowPackageItem = data[3];
             //end
             });*/

            //选择号码 对象类型
            scope.setFlowPackage = function (event, flowPackageItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.flowPackageItem = flowPackageItem;
                writebdLog(scope.category, "_SelectPackage", "渠道号", scope.gh);//优惠套餐
            };

            scope.$watch('flowPackageItem', function (nv, ov, scope) {
                if (nv != ov) {
                    if(scope.mifi){
                        scope.mainPrice = parseInt(scope.mifi.price) + parseInt(scope.flowPackageItem.p);
                    }else {
                        scope.mainPrice = nv.p;
                    }
                }
            });
        }
    };
}]);