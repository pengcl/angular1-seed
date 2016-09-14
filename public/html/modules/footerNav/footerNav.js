'use strict';

app.directive("footerNav", ['$http', function ($http) {
    return {
        restrict: 'E',
        scope : {
            footerPrice : '=price'
        },
        templateUrl: "modules/footerNav/footerNav.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $scrollTo = $('#receiverAddress');

            //scope.footerPrice = attrs.price;
            console.log(scope.footerPrice);

            scope.checks = eval(attrs.checks);

            var getMeiqia = function (){
                (function(m, ei, q, i, a, j, s) {
                    m[a] = m[a] || function() {
                            (m[a].a = m[a].a || []).push(arguments)
                        };
                    j = ei.createElement(q),
                        s = ei.getElementsByTagName(q)[0];
                    j.async = true;
                    j.charset = 'UTF-8';
                    j.src = i + '?v=' + new Date().getUTCDate();
                    s.parentNode.insertBefore(j, s);
                })(window, document, 'script', '//static.meiqia.com/dist/meiqia.js', '_MEIQIA');
                _MEIQIA('entId', 27864);
                _MEIQIA('withoutBtn');
            };

            scope.getContent = function () {
                //getMeiqia();
                $("#contactUs").show();
                //_MEIQIA('showPanel');
                writebdLog(scope.category,"客服","渠道号",scope.gh);
            };

            function checkAddress() {
                $("#receiverAddress").find(".weui_cell").removeClass("weui_cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui_cell_warn");
                    return false;
                }  else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui_cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui_cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui_cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }
                return true;
            }
            scope.submitForm = function () {
                if(checkAddress()){
                    writebdLog(scope.category,"收货地址","渠道号",scope.gh);
                    writebdLog(scope.category,"立即支付","渠道号",scope.gh);
                    $form.submit();
                }else {
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                }
            }
        }
    };
}]);