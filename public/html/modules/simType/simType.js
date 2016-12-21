'use strict';

app.directive("simType", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/simType/simType.html",
        link: function (scope, element, attrs) {
            scope.simTitle = attrs.title;
            scope.class = attrs.addClass;
            scope.cardName="未选择";
            var $container = $('.content-scrollable');
            //console.log(attrs.addClass);
            scope.cardGroup=["小卡(Namo卡)","大/中卡(二合一)"]
            //获取选择框尺码
            scope.size = attrs.size;

            //获取sim卡类型
            $http.get('/data/simType.json').success(function (data) {
                scope.simList = data;

                //设置默认值


            });
            scope.checkSimType=function(){
                //console.log(scope.checkoutForm.mainCardTypeId.$valid);
                if (!scope.checkoutForm.mainCardTypeId.$valid) {
                    var $scrollTo = $('.card-type-list');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    $(".card-type-list").slideDown();
                    return false;
                }
                return true;
            };
            scope.showCardList= function () {
            	if($(".card-type-list").is(":hidden"))
                    writebdLog(scope.category,"_ShowCardTypeBar","渠道号",scope.gh);//展示选卡类型
                else
                	writebdLog(scope.category,"_StopCardTypeBar","渠道号",scope.gh);//收缩选卡类型
            	
                if(!(attrs.noAnimate == "true")){
                    $(".card-type-list").slideToggle();
                    $(event.currentTarget).toggleClass("down");
                }
            };
            //设置流量卡类型
            scope.$root.setSimType = function (event, index, simItem) {
                //console.log("1");
                event.preventDefault();
                var $item = $(".sim-type-lists").find(".item-box");
                if($item.hasClass("disabled")){
                    return false;
                }
                $item.removeClass('curr');
                $item.eq(index).addClass('curr');
                scope.simItem = simItem;
                scope.$root.Overlay.close();
                writebdLog(scope.category,"_SelectCardType"+index,"渠道号",scope.gh);//选择卡类型
            };
            scope.$root.setNewSimType=function(event,index){
                var $this = $(event.currentTarget);
                $this.addClass("on-curr");
                $this.siblings().removeClass("on-curr");
                var $item=$(".card-type-list").find(".list");
                scope.simItem=scope.simList[index];
                if(!(attrs.noAnimate == "true")){
                    $(".card-type-list").slideUp();
                }
                scope.cardName=scope.cardGroup[index];
                writebdLog(scope.category,"_SelectCardType"+index,"渠道号",scope.gh);//选择卡类型
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml,scope.simList);
                writebdLog(scope.category,"_CardTypeIntro","渠道号",scope.gh);//卡类型介绍
            };
        }
    };
}]);