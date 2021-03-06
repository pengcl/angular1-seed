'use strict';

app.directive("nativeShare", ['$cookieStore', '$http', '$location', function ($cookieStore, $http, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/nativeShare/share.html",
        link: function (scope, element, attrs) {
            var homeLink, picUrl, shareTitle, shareDisc;
            var UA = navigator.appVersion;

            scope.$root.share = {
                homeLink: 'http://app.yfq.cn/phone/active/A' + window.location.search,
                shareTitle: '我领到1888元购机年终奖！年前换个好手机，开开心心回家过大年！',
                shareDisc: '苹果、OPPO、华为、VIVO等大牌手机直降！用券购再立减！戳我抢→',
                picUrl: 'http://app.yfq.cn/images/active/share_active.jpg'
            };

            homeLink = scope.$root.share.homeLink;
            shareTitle = scope.$root.share.shareTitle;
            shareDisc = scope.$root.share.shareDisc;
            picUrl = scope.$root.share.picUrl;

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

            var a = UA.toLowerCase();
            var shareUrl = $location.absUrl().split("#")[0].replace(/&/gi, "AND");
            if (a.match(/MicroMessenger/i) == "micromessenger") {
                $http.jsonp(cfApi.apiHost + "/product/getWxParameter.ht?shareUrl=" + shareUrl + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data[0].appId, // 必填，公众号的唯一标识
                        timestamp: data[0].timestamp, // 必填，生成签名的时间戳
                        nonceStr: data[0].nonceStr, // 必填，生成签名的随机串
                        signature: data[0].signature,// 必填，签名，见附录1
                        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                }).error(function (data, status, headers, config) {
                    console.log(status);
                });
            }

            scope.$root.showShare = function () {
                nativeShareShow();
            };

            scope.$watch('share', function (n, o, scope) {

                window._bd_share_config = {
                    common: {
                        bdText: n.shareTitle,
                        bdDesc: n.shareDisc,
                        bdUrl: n.homeLink,
                        bdPic: n.picUrl
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
                    url: n.homeLink,
                    title: n.shareTitle,
                    desc: n.shareDisc,
                    img: n.picUrl,
                    img_title: n.shareTitle,
                    from: '翼分期商城'
                };

                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        title: scope.$root.share.shareTitle, // 分享标题
                        link: scope.$root.share.homeLink, // 分享链接
                        imgUrl: scope.$root.share.picUrl, // 分享图标
                        success: function () {
                            if (scope.$root.share.mobile) {
                                $http.jsonp(cfApi.apiHost + "/share/doProductShare.html?mobile=" + scope.$root.share.mobile + "&pid=" + scope.$root.share.pid + "&gh=" + scope.$root.share.gh + "&category=" + scope.$root.share.category + "&productUrl=" + scope.$root.share.url + "&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                                    return d.resolve(data);
                                }).error(function (error) {
                                    d.reject(error);
                                });
                            }
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: scope.$root.share.shareTitle, // 分享标题
                        desc: scope.$root.share.shareDisc, // 分享描述
                        link: scope.$root.share.homeLink, // 分享链接
                        imgUrl: scope.$root.share.picUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            if (scope.$root.share.mobile) {
                                $http.jsonp(cfApi.apiHost + "/share/doProductShare.html?mobile=" + scope.$root.share.mobile + "&pid=" + scope.$root.share.pid + "&gh=" + scope.$root.share.gh + "&category=" + scope.$root.share.category + "&productUrl=" + scope.$root.share.url + "&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                                    return d.resolve(data);
                                }).error(function (error) {
                                    d.reject(error);
                                });
                            }
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });

                var share_obj = new nativeShare('nativeShare', config);
            }, true);
        }
    };
}]);