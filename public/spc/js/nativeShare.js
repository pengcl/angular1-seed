/**
 * Created by Jeffery Wang.
 * Create Time: 2015-06-16 19:52
 * Author Link: http://blog.wangjunfeng.com
 */

var nativeShare = function (elementNode, config) {
    if (!document.getElementById(elementNode)) {
        return false;
    }

    var qApiSrc = {
        lower: "http://3gimg.qq.com/html5/js/qb.js",
        higher: "http://jsapi.qq.com/get?api=app.share"
    };
    var bLevel = {
        qq: {
            forbid: 0,
            lower: 1,
            higher: 2
        },
        uc: {
            forbid: 0,
            allow: 1
        }
    };
    var UA = navigator.appVersion;
    var isqqBrowser = (UA.split("MQQBrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
    var isucBrowser = (UA.split("UCBrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;
    var version = {
        uc: "",
        qq: ""
    };
    var isWeixin = false;

    config = config || {};
    this.elementNode = elementNode;
    this.url = config.url || document.location.href || '';
    this.title = config.title || document.title || '';
    this.desc = config.desc || document.title || '';
    this.img = config.img || document.getElementsByTagName('img').length > 0 && document.getElementsByTagName('img')[0].src || '';
    this.img_title = config.img_title || document.title || '';
    this.from = config.from || window.location.host || '';
    this.ucAppList = {
        sinaWeibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
        weixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
        weixinFriend: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
        QQ: ['kQQ', 'QQ', '4', 'QQ好友'],
        QZone: ['kQZone', 'QZone', '3', 'QQ空间']
    };

    this.share = function (to_app) {
        var title = this.title,
            url = this.url,
            desc = this.desc,
            img = this.img,
            img_title = this.img_title,
            from = this.from;
        if (isucBrowser) {
        	alert("1");
            to_app = to_app == '' ? '' : (platform_os == 'iPhone' ? this.ucAppList[to_app][0] : this.ucAppList[to_app][1]);
            if (to_app == 'QZone') {
                B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url=" + img + "&title=" + title + "&description=" + desc + "&url=" + url + "&app_name=" + from;
                k = document.createElement("div"), k.style.visibility = "hidden", k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function () {
                    k && k.parentNode && k.parentNode.removeChild(k)
                }, 5E3);
            }
            if (typeof (ucweb) != "undefined") {
                ucweb.startRequest("shell.page_share", [title, desc, url, to_app, "", "@" + from, ""])
            } else {
                if (typeof (ucbrowser) != "undefined") {
                    ucbrowser.web_share(title, desc, url, to_app, "", "@" + from, '')
                } else {}
            }
        } else {
            if (isqqBrowser && !isWeixin) {
                to_app = to_app == '' ? '' : this.ucAppList[to_app][2];
                var ah = {
                    url: url,
                    title: title,
                    description: desc,
                    img_url: img,
                    img_title: img_title,
                    to_app: to_app, //微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
                    cus_txt: "请输入此时此刻想要分享的内容"
                };
                ah = to_app == '' ? '' : ah;
                if (typeof (browser) != "undefined") {
                    if (typeof (browser.app) != "undefined" && isqqBrowser == bLevel.qq.higher) {
                        browser.app.share(ah)
                    }
                } else {
                    if (typeof (window.qb) != "undefined" && isqqBrowser == bLevel.qq.lower) {
                        window.qb.share(ah)
                    } else {}
                }
            } else {}
        }
    };

    this.html = function () {
        var position = document.getElementById(this.elementNode);
        var html = '<div id="nativeShareClose" class="close"><i class="icon-cross"></i></div>' +
            '<div class="list pure-g">' +
            '<span data-app="weixin" class="nativeShare weixin pure-u-1-3"><i></i>微信好友</span>' +
            '<span data-app="weixinFriend" class="nativeShare weixin_timeline pure-u-1-3"><i></i>微信朋友圈</span>' +
            '<span data-app="sinaWeibo" class="nativeShare weibo pure-u-1-3"><i></i>新浪微博</span>' +
            '<span data-app="QQ" class="nativeShare qq pure-u-1-3"><i></i>QQ好友</span>' +
            '<span data-app="QZone" class="nativeShare qzone pure-u-1-3"><i></i>QQ空间</span>' +
            '<span data-app="" class="nativeShare more pure-u-1-3"><i></i>更多</span>' +
            '</div>';
        position.innerHTML = html;
    };

    this.noHtml = function () {
        var position = document.getElementById(this.elementNode);
        var wxShare, copyShare;
        if (isWeixin) {
            wxShare = '<a data-app="weixinFriend" class="nativeShare show-img bds weixin pure-u-1-3"><i></i>微信好友</a>' +
                '<a data-app="weixin" class="nativeShare show-img weixin_timeline bds pure-u-1-3"><i></i>微信朋友圈</a>';
            copyShare = '';
        } else {
            wxShare = '';
            copyShare = '<a data-app="copy" class="nativeShare bds_tqq bds show-img copy pure-u-1-3"><i></i>复制</a>';
        }
        var html = '<div id="nativeShareClose" class="close"><i class="icon-cross"></i></div>' +
            '<div class="bdsharebuttonbox list pure-g" data-tag="share_1">' +
            wxShare +
            '<a data-cmd="qzone" class="nativeShare qzone bds bds_qzone pure-u-1-3"><i></i>QQ空间</a>' +
            '<a data-cmd="tsina" class="nativeShare weibo bds bds_tsina pure-u-1-3"><i></i>新浪微博</a>' +
            '<a data-cmd="tqq" class="nativeShare bds_tqq bds qq pure-u-1-3"><i></i>腾讯微博</a>' +
            copyShare +
            '</div>';
        position.innerHTML = html;
    };

    this.isloadqqApi = function () {
        if (isqqBrowser) {
            var b = (version.qq < 5.4) ? qApiSrc.lower : qApiSrc.higher;
            var d = document.createElement("script");
            var a = document.getElementsByTagName("body")[0];
            d.setAttribute("src", b);
            a.appendChild(d)
        }
    };

    this.getPlantform = function () {
        ua = navigator.userAgent;
        if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
            return "iPhone"
        }
        return "Android"
    };

    this.is_weixin = function () {
        var a = UA.toLowerCase();
        if (a.match(/MicroMessenger/i) == "micromessenger") {
            return true
        } else {
            return false
        }
    };

    this.getVersion = function (c) {
        var a = c.split("."),
            b = parseFloat(a[0] + "." + a[1]);
        return b
    };

    this.init = function () {
        platform_os = this.getPlantform();
        version.qq = isqqBrowser ? this.getVersion(UA.split("MQQBrowser/")[1]) : 0;
        version.uc = isucBrowser ? this.getVersion(UA.split("UCBrowser/")[1]) : 0;
        isWeixin = this.is_weixin();
        if ((isqqBrowser && version.qq < 5.4 && platform_os == "iPhone") || (isqqBrowser && version.qq < 10 && platform_os == "Android")) {
            isqqBrowser = bLevel.qq.forbid
        } else {
            if (isqqBrowser && version.qq < 10 && platform_os == "Android") {
                isqqBrowser = bLevel.qq.lower
            } else {
                if (isucBrowser && ((version.uc < 10.2 && platform_os == "iPhone") || (version.uc < 9.7 && platform_os == "Android"))) {
                    isucBrowser = bLevel.uc.forbid
                }
            }
        }
        this.isloadqqApi();
        if (isqqBrowser || isucBrowser) {
            if (isWeixin) {
                this.noHtml();
                with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
            } else {
                this.html();
            }
        } else {
            this.noHtml();
            with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
        }
    };

    this.init();

    var share = this;
    var items = document.getElementsByClassName('nativeShare');
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function () {
            share.share(this.getAttribute('data-app'));
        }
    }

    return this;
};