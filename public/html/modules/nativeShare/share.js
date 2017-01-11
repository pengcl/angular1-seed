'use strict';

app.directive("nativeShare", ['$cookieStore', function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/nativeShare/share.html",
        link: function (scope, element, attrs) {
            var homeLink, picUrl, shareTitle, shareDisc;

            homeLink = 'http://app.yfq.cn/phone/active/A';
            shareTitle = '1888元年终奖大派送！翼分期商城，购机最高立减400元!送720元话费！';
            shareDisc = '苹果、OPPO、华为、VIVO等大牌手机直降！领券再立减！支持0息信用卡分期，点击直入>>';
            picUrl = 'http://m.yfq.cn/images/active/1.jpg';

            var $nativeShare = $("#nativeShare");
            var $nativeShareClose = $("#nativeShareClose");
            var $showMask = $("#showMask");
            var $nativeShareDataApp = $nativeShare.find(".show-img");

            function nativeShareShow() {
                $showMask.show();
                $nativeShare.show();
            };

            function nativeShareHide() {
                $showMask.hide();
                $nativeShare.hide();
            };

            $("#container").on('click', '#nativeShareClose', function () {
                nativeShareHide();
            });

            $("#container").on('click', '#showMask', function () {
                nativeShareHide();
            });

            $("#container").on('click', '.copy-cancel', function () {
                $(".share-copy").hide();
            });

            window._bd_share_config = {
                common: {
                    bdText: shareTitle,
                    bdDesc: shareDisc,
                    bdUrl: homeLink,
                    bdPic: picUrl
                },
                share: [{
                    "bdSize": 32
                }],
                selectShare: [
                    {
                        "bdselectMiniList": ['qzone', 'tqq', 'kaixin001', 'bdxc', 'tqf']
                    }
                ]
            };
            var config = {
                url: homeLink,
                title: shareTitle,
                desc: shareDisc,
                img: picUrl,
                img_title: shareTitle,
                from: '翼分期商城'
            };

            $("#container").on('click', '.show-img', function () {
                var elDataApp = $(this).data("app");
                var targetTxt, targetTips;
                if (elDataApp === "weixin") {
                    targetTxt = "分享到朋友圈";
                    targetTips = "让更多的朋友来关注我们";
                } else if (elDataApp === "weixinFriend") {
                    targetTxt = "发送给朋友";
                    targetTips = "来分享给好友吧";
                } else {
                    targetTxt = homeLink;
                    targetTips = "";
                    var _html = '<div class="share-copy"><div class="share-link"><em>' + homeLink + '</em></div><div class="copy-cancel">关闭</div></div>';
                    $(_html).appendTo("#nativeShare");
                    return false;

                }
                $("#targetTxt").html(targetTxt);
                $("#targetTips").html(targetTips);
                $(".weixinShareImg").show();
            });

            var share_obj = new nativeShare('nativeShare', config);

            scope.$root.showShare = function () {
                nativeShareShow();
            }
        }
    };
}]);