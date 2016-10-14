'use strict';

app.directive("phoneColors", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/phoneColors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.colorTitle = attrs.title;
            scope.colorSubTitle = attrs.subTitle;

            /*var $li = $(".phone-colors-lists").find("li");

            scope.phone.$promise.then(function (phone) {
                if (scope.color === undefined) {

                    //判断是否第一次载入页面，如果是，给color赋值
                    scope.color = phone.colors[getIndex(phone.colors, "curr")];
                } else {

                }
                scope.colorInit = function (colorName) {
                    if (scope.color.colorName === colorName) {
                        $.each(phone.colors, function (index, item) {
                            if (item.colorName === scope.color.colorName) {
                                for (var i=1; i < 5; i++) {
                                    $li.eq(i).find(".item-box").removeClass("curr");
                                }
                                $li.eq(index).find(".item-box").addClass("curr");
                            }
                        });
                    }
                };
            });*/

            scope.phone.$promise.then(function (phone) {
                $http.get('/data/phones/colors/' + scope.phone.phoneModel + '.json').success(function (colors) {
                    scope.colors = colors;
                    scope.color = colors[getIndex(colors, "curr")];
                });
            });

            //选择手机颜色
            scope.setPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.color = color;
                    writebdLog(scope.category,"_FuselageColor","渠道号",scope.gh);//选择机身颜色
                }
            };

            scope.$watch('productId', function (n, o, scope) {
                console.log("1");
            });
        }
    };
}]);