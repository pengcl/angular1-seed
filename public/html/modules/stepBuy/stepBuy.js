'use strict';

app.directive("stepBuy", function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/stepBuy/stepBuy.html",
        link: function (scope, element, attrs) {
            var $container = $(".content-scrollable");
            var $stepBuy = $("#stepBuy");
            var $progressbarText = $stepBuy.find(".progressbar-text");

            element.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                element.removeClass("bounceIn animated");
            });

            (function () {
                $container.bind('scrollstart', function () {
                    element.addClass("active");
                });

                $container.bind('scrollstop', function (e) {
                    element.removeClass("active");
                });
                $stepBuy.mouseover(function () {
                    element.addClass("active");
                });
                $stepBuy.mouseout(function () {
                    element.removeClass("active");
                });
            })();

            scope.stepClick = function (event) {
                var $scrollTo;
                if($progressbarText.html() == "查看<br>详情"){
                    $progressbarText.html("立即<br>购买");
                    $scrollTo = $('#imgStart');
                }else {
                    $progressbarText.html("查看<br>详情");
                    $scrollTo = $('#phoneTypes');
                }
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                });
            }


        }
    };
});