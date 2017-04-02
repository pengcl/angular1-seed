'use strict';

app.directive("nFooterNav", ['$http', '$location', function ($http, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/n/footerNav.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $scrollTo;

            //console.log($location.search().duplicateNum);
            if ($location.search().duplicateNum) {
                if(Array.isArray($location.search().duplicateNum)){
                    scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum[0] + "已被购买，请重新选择");
                }else {
                    scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
                }
            }

            scope.checks = eval(attrs.checks);

            scope.getContent = function () {
                getMeiqia();
                //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
                _MEIQIA('showPanel', {
                    groupToken: '93b053a08494a8319cba2ce52b3d1e58'
                });
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };

            scope.checkForm = function () {
                if (scope.$root.checkActiveCode()) {
                    // if ($("#payType").val() == 2) {
                    //      scope.showOverLay("payTipsPanel");
                    // } else {
                        writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                        scope.$root.toast.open();
                        
                        $form.submit();
                    // }
                } else {
                    $scrollTo = $('#receiverAddress');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                    $("#receiverAddressPanel").slideDown();
                    $(".adr-tab").addClass("down");
                }
            };

            scope.submitForm = function (event, type) {
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                }
                if (scope.buyType == 1) {
                    if (attrs.checkMainNumber) {
                        if (attrs.checkSubNumber) {
                            if (scope.checkMainNumber()) {
                                if (scope.checkSubNumber()) {
                                    if (scope.checkAddress()) {
                                        scope.checkForm();
                                    } else {
                                        var $scrollTo = $('#receiverAddress');
                                        $container.animate({
                                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                                        });
                                        $("#receiverAddressPanel").slideDown();
                                        $(".adr-tab").addClass("down");
                                    }
                                }
                            }
                        } else {
                            if (attrs.checkSimType) {
                                if (scope.checkMainNumber()) {
                                    if (scope.checkSimType()) {
                                        if (scope.checkAddress()) {
                                            scope.checkForm();
                                        } else {
                                            var $scrollTo = $('#receiverAddress');
                                            $container.animate({
                                                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                                            });
                                            $("#receiverAddressPanel").slideDown();
                                            $(".adr-tab").addClass("down");
                                        }
                                    }
                                }
                            } else {
                                if (scope.checkMainNumber()) {
                                    if (scope.checkAddress()) {
                                        scope.checkForm();
                                    } else {
                                        var $scrollTo = $('#receiverAddress');
                                        $container.animate({
                                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                                        });
                                        $("#receiverAddressPanel").slideDown();
                                        $(".adr-tab").addClass("down");
                                    }
                                }
                            }
                        }
                    } else {
                        if (scope.checkAddress()) {
                            scope.checkForm();
                        } else {
                            var $scrollTo = $('#receiverAddress');
                            $container.animate({
                                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                            });
                            $("#receiverAddressPanel").slideDown();
                            $(".adr-tab").addClass("down");
                        }
                    }
                } else {
                    if (scope.checkAddress()) {
                        scope.checkForm();
                    } else {
                        var $scrollTo = $('#receiverAddress');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                        });
                        $("#receiverAddressPanel").slideDown();
                        $(".adr-tab").addClass("down");
                    }
                }
            };

            function getRTime() {

                var timerHtml;

                var d = new Date();
                var _nowTime = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + "23:59:00";

                var EndTime = new Date(_nowTime);
                var NowTime = new Date();


                var t = EndTime.getTime() - NowTime.getTime();

                var d = Math.floor(t / 1000 / 60 / 60 / 24);
                var h = Math.floor(t / 1000 / 60 / 60 % 24);
                if (parseInt(h) < 10) {
                    h = "0" + h;
                }
                var m = Math.floor(t / 1000 / 60 % 60);
                if (parseInt(m) < 10) {
                    m = "0" + m;
                }
                var s = Math.floor(t / 1000 % 60);
                if (parseInt(s) < 10) {
                    s = "0" + s;
                }

                timerHtml = "<em>" + h + "</em>" + "<em>：</em>" + "<em>" + m + "</em>" + "<em>：</em>" + "<em>" + s + "</em>";
                //scope.timer = "1";
                //console.log(scope.timer);
                $(".stimer").html(timerHtml);
            };
            setInterval(getRTime, 1000);

            // scope.showOverLay = function (targetId) {
            //     var targetHtml = $("#" + targetId).html();
            //     scope.$root.Overlay.openCompile(targetHtml);
            //     writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);
            // };
            // scope.$root.tipsSubmit = function () {
            //     scope.$root.toast.open();
            //      scope.$root.Overlay.close();
            //      writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);
            //     $form.submit()
            //  };
        }
    };
}]);
