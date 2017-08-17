<<<<<<< HEAD
'use strict';

//全局统计
var systemName = "yfqapp";

var userTrack = function () {

};

var $container = $("#container");

$container.on('click', '.js-menu', function (e) {
    $("#container").addClass('menu-open');
    $("#menu").click(function () {
        $("#container").removeClass('menu-open');
    });
});

$(".content-overlay").click(function (e) {
    $("#container").removeClass('menu-open');
});

//Document ready事件
$(document).ready(function () {
    $("html").css("font-size", ($container.width() / 375) * parseInt($("html").css("font-size")));
});

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

//手机号处理 开始
function getNumArr(orderNumber, jsonData) {
    var jdata = findJsonData(orderNumber, jsonData);
    var numArr = getPosNum(orderNumber, jdata);
    return numArr;
}

function findJsonData(orderNumber, jsonData) {
    if (orderNumber == null) {
        return jsonData;
    }
    var result = [];
    var len = jsonData.length;
    var t = 0;
    for (var i = 0; i < len; i++) {
        var no = jsonData[i].n;
        if (no.indexOf(orderNumber) != -1) {
            result[t] = no;
            t = t + 1;
        }
    }
    return result;
}

function getPosNum(orderNumber, data) {
    if (orderNumber == null || data == null) {
        return null;
    }

    var pos = orderNumber.length;
    var posdata = new Array();

    var len = data.length;
    for (var i = 0; i < len; i++) {
        var no = data[i];
        var c = no.substring(pos, pos + 1);
        if (posdata != null && posdata.indexOf(c) == -1) {
            posdata.push(c);
        }
    }
    return posdata;
}

//手机号处理 结束

//阻止橡皮筋事件

function isScroller(el) { // 判断元素是否为 scroller
    return el.classList.contains('content-scrollable')
}

//获取对象或数组中选中对象的index
function getIndex(jsonArray, keyName, value) {
    for (var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i][keyName] == value) {
            return i;
        }
    }
};

document.body.addEventListener('touchmove', function (ev) {
    var target = ev.target;
    //alert(target);
// 在 scroller 上滑动，阻止事件冒泡，启用浏览器默认行为。
    if (isScroller(target)) {
        ev.stopPropagation()
    }
}, false);


//map
function Map() {
    var struct = function (key, value) {
        this.key = key;
        this.value = value;
    };
    var put = function (key, value) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                this.arr[i].value = value;
                return;
            }
        }
        this.arr[this.arr.length] = new struct(key, value);
    };

    var get = function (key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                return this.arr[i].value;
            }
        }
        return null;
    };

    var remove = function (key) {
        var v;
        for (var i = 0; i < this.arr.length; i++) {
            v = this.arr.pop();
            if (v.key === key) {
                continue;
            }
            this.arr.unshift(v);
        }
    };
    var size = function () {
        return this.arr.length;
    };

    var isEmpty = function () {
        return this.arr.length <= 0;
    };
    this.arr = new Array();
    this.get = get;
    this.put = put;
    this.remove = remove;
    this.size = size;
    this.isEmpty = isEmpty;
}

//统计
function operation() {
    var pageName = "";
    var productName = "";
    var productId = "";
    var map = null;
    var loc = window.location.href;
    this.init = function (pName, pdName, pdId) {
        pageName = pName;
        productName = pdName;
        productId = pdId;
    };
    this.record = function (type) {
        if (type == null) {
            return false;
        }
        map = new Map();
        map.put('operation', type);
        this.writeOperation();
    };
    this.writeOperation = function () {
        var flag = false;
        var info = "flow=" + loc + "&operation=" + map.get('operation');
        info = info.replace("?", "&");//将链接里的？字符转换为&，可以让后台获取
        var url = cfApi.apiHost + "/record/writeLog.html?" + info + "&s=wap";
        $.ajax({
            type: "get",
            url: url,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "callback",
            success: function (json) {

            },
            error: function () {

            }
        });
        return flag;
    };
    this.writeIntentionMsg = function (operationName, operationValue, dataType, opSeq) {
        var url = cfApi.apiHost + "/record/intentionLog.html";
        $.get(url, {operationName: operationName, operationValue: operationValue, dataType: dataType, opSeq: opSeq},
            function (data) {

            }
        );
    }
}

var op = new operation();

function writebdLog(category, action, opt_label, opt_value) {//category项目，action统计项目，渠道label，渠道号
    _hmt.push(['_trackEvent', category, category + action, opt_label, opt_value]);
    op.record(encodeURI(category + action));
}

//扩展滚动时间，添加start、stop事件
(function () {
    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);
    //滚动开始
    special.scrollstart = {
        setup: function () {
            var timer,
                handler = function (evt) {
                    var _self = this,
                        _args = arguments;
                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.dispatch.apply(_self, _args);
                    }
                    timer = setTimeout(function () {
                        timer = null;
                    }, special.scrollstop.latency);
                };
            jQuery(this).bind('scroll', handler).data(uid1, handler);
        },
        teardown: function () {
            jQuery(this).unbind('scroll', jQuery(this).data(uid1));
        }
    };

    //滚动结束
    special.scrollstop = {
        latency: 300,
        setup: function () {
            var timer,
                handler = function (evt) {
                    var _self = this,
                        _args = arguments;
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(function () {
                        timer = null;
                        evt.type = 'scrollstop';
                        jQuery.event.dispatch.apply(_self, _args);

                    }, special.scrollstop.latency);
                };
            jQuery(this).bind('scroll', handler).data(uid2, handler);
        },
        teardown: function () {
            jQuery(this).unbind('scroll', jQuery(this).data(uid2));
        }
    };
})();

function androidInputBugFix() {
    // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
    // 解决方法:
    // 0. .container 去掉 overflow 属性, 但会引发别的问题
    // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
    //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
}

//美恰在线客服
function getMeiqia() {
    (function (m, ei, q, i, a, j, s) {
        m[a] = m[a] || function () {
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
    _MEIQIA('fallback', 1);
    _MEIQIA('withoutBtn');
};

//加载中事件
function showToast() {
    var $loadingToast = $('#loadingToast');
    if ($loadingToast.css('display') != 'none') {
        return;
    }
    $loadingToast.fadeIn(100);
}

function hideToast() {
    var $loadingToast = $('#loadingToast');
    $loadingToast.fadeOut(100);
};

function checkMobileCode(receiverMobile, code) {
    var flag = false;
    $.ajax({
        url: "http://app.yfq.cn:3099/api/checkActiveCode/" + receiverMobile + '/' + code,
        async: false,
        type: "get",
        success: function (data) {
            if (data == 'true') {
                flag = true;
            }
        }
    });
    return flag;
}

function showTheActionSheet(element) {
    $(element).addClass('weui-actionsheet_toggle');
    $(element).find(".weui-media-box__thumb").show();
    $(element).siblings('.ios-mask').fadeIn(200);
}

function hideTheActionSheet(element) {
    $(element).removeClass('weui-actionsheet_toggle');
    $(element).find(".weui-media-box__thumb").hide();
    $(element).siblings('.ios-mask').fadeOut(200);
}

$(function(){
    var $iosActionsheet = $('#iosActionsheet');
    var $iosMask = $('.weui-mask');

    function hideActionSheet() {
        $iosActionsheet.removeClass('weui-actionsheet_toggle');
        $iosMask.fadeOut(200);
    }

    function showActionSheet() {
        console.log("1");
        $iosActionsheet.addClass('weui-actionsheet_toggle');
        $iosMask.fadeIn(200);
    }

    $(".js-action-sheet-hide").on('click',hideActionSheet);
    $(".js-action-sheet-show").on('click',showActionSheet);

    $iosMask.on('click', hideActionSheet);
    $('#iosActionsheetCancel').on('click', hideActionSheet);
    $("#showIOSActionSheet").on("click", showActionSheet);
});

$(function () {
    $('#container').on('click','.weui-navbar__item', function () {
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        $(this).parent().next().find(".weui-tab__item").removeClass("weui-tab__item_on");
        $(this).parent().next().find(".weui-tab__item").eq($(this).index()).addClass("weui-tab__item_on");
    });
});

$(function () {
    $("#container").on("click", ".list-tabs .tab-item", function () {
        var $phoneList = $(".phone-list");
        var $this = $(this);
        $this.siblings().removeClass("on");
        $phoneList.hide();
        $this.addClass("on");
        $phoneList.eq($this.index()).show();
        //console.log($this.index());
        if ($this.index() == 1) {
            $("#recommend").hide();
            $("#recommendTitle").hide();
        } else {
            $("#recommend").show();
            $("#recommendTitle").show();
        }
    });
});

function getRandomName() {
    var firstNames, lastNames;
    firstNames = ["卢", "钟", "朱", "彭", "梁", "卫", "蒋", "许", "张", "孔", "沈", "郑", "赵", "周", "吕", "韩", "尤", "秦", "楮", "李"];
    lastNames = ["先生", "女士"];
    var fid = Math.round(Math.random() * 19);
    var lid = Math.round(Math.random() * 1);
    return firstNames[fid] + lastNames[lid];
}
var baseTime = 1;
function getRanDomTime() {
    var addTime = Math.round(Math.random() * 1);
    baseTime = baseTime + addTime;
    if (baseTime > 10) {
        baseTime = Math.round(Math.random() * 1) + 1;
    }
    return baseTime;
}

function getRandomPkg() {
    var pkgs, pid;
    pkgs = [101, 102, 155, 156];
    pid = Math.round(Math.random() * 3);
    return pkgs[pid];
}

function getRandomPrePhone() {
    var pkgs, pid;
    pkgs = ['130', '131', '132', '138', '139', '150'];
    pid = Math.round(Math.random() * 5);
    return pkgs[pid];
}

function getRandomPhone() {
    return ((("18122XXX" + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9);
}

function getRandomReceiverPhone() {
    return (((getRandomPrePhone() + Math.round(Math.random() * 9) + Math.round(Math.random() * 9) + "XXX" + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9);
}

function getRandomProduct() {
    var productName;
    productName = ["iPhone 7", "iPhone 7 Plus", "VIVO X7", "OPPO R9", "小米5S", "华为P9"];
    var index = Math.round(Math.random() * 5);
    return productName[index];
}

function checkSameNumber(number1, number2) {
    if (number1 === number2) {
        return false;
    }
    return true;
}

function getJM(price, max) {
    for (var i = 0; i <= max / 5; i++) {
        if (i * 100 == price) {
            return i * 5;
        }
        if (i * 100 > price) {
            return (i - 1) * 5;
        }
        if (i * 100 < price && i * 5 >= max) {
            return max;
        }
    }
    ;
};
function getMX(price, max, rates) {
    var _rates = 0.1;//设置默认利率
    if (rates) {//如果rates存在，使用rates值，如果不存在，tates=0.1;
        _rates = rates;
    }

    if (price > 7680) {
        return 768;
    } else {
        return Math.round(price * _rates);
    }
}
=======
'use strict';

//全局统计
var systemName = "yfqapp";

var userTrack = function () {

};

var $container = $("#container");

$container.on('click', '.js-menu', function (e) {
    $("#container").addClass('menu-open');
    $("#menu").click(function () {
        $("#container").removeClass('menu-open');
    });
});

$(".content-overlay").click(function (e) {
    $("#container").removeClass('menu-open');
});

//Document ready事件
$(document).ready(function () {
    $("html").css("font-size", ($container.width() / 375) * parseInt($("html").css("font-size")));
});

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

//手机号处理 开始
function getNumArr(orderNumber, jsonData) {
    var jdata = findJsonData(orderNumber, jsonData);
    var numArr = getPosNum(orderNumber, jdata);
    return numArr;
}

function findJsonData(orderNumber, jsonData) {
    if (orderNumber == null) {
        return jsonData;
    }
    var result = [];
    var len = jsonData.length;
    var t = 0;
    for (var i = 0; i < len; i++) {
        var no = jsonData[i].n;
        if (no.indexOf(orderNumber) != -1) {
            result[t] = no;
            t = t + 1;
        }
    }
    return result;
}

function getPosNum(orderNumber, data) {
    if (orderNumber == null || data == null) {
        return null;
    }

    var pos = orderNumber.length;
    var posdata = new Array();

    var len = data.length;
    for (var i = 0; i < len; i++) {
        var no = data[i];
        var c = no.substring(pos, pos + 1);
        if (posdata != null && posdata.indexOf(c) == -1) {
            posdata.push(c);
        }
    }
    return posdata;
}

//手机号处理 结束

//阻止橡皮筋事件

function isScroller(el) { // 判断元素是否为 scroller
    return el.classList.contains('content-scrollable')
}

//获取对象或数组中选中对象的index
function getIndex(jsonArray, keyName, value) {
    for (var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i][keyName] == value) {
            return i;
        }
    }
};

document.body.addEventListener('touchmove', function (ev) {
    var target = ev.target;
    //alert(target);
// 在 scroller 上滑动，阻止事件冒泡，启用浏览器默认行为。
    if (isScroller(target)) {
        ev.stopPropagation()
    }
}, false);


//map
function Map() {
    var struct = function (key, value) {
        this.key = key;
        this.value = value;
    };
    var put = function (key, value) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                this.arr[i].value = value;
                return;
            }
        }
        this.arr[this.arr.length] = new struct(key, value);
    };

    var get = function (key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                return this.arr[i].value;
            }
        }
        return null;
    };

    var remove = function (key) {
        var v;
        for (var i = 0; i < this.arr.length; i++) {
            v = this.arr.pop();
            if (v.key === key) {
                continue;
            }
            this.arr.unshift(v);
        }
    };
    var size = function () {
        return this.arr.length;
    };

    var isEmpty = function () {
        return this.arr.length <= 0;
    };
    this.arr = new Array();
    this.get = get;
    this.put = put;
    this.remove = remove;
    this.size = size;
    this.isEmpty = isEmpty;
}

//统计
function operation() {
    var pageName = "";
    var productName = "";
    var productId = "";
    var map = null;
    var loc = window.location.href;
    this.init = function (pName, pdName, pdId) {
        pageName = pName;
        productName = pdName;
        productId = pdId;
    };
    this.record = function (type) {
        if (type == null) {
            return false;
        }
        map = new Map();
        map.put('operation', type);
        this.writeOperation();
    };
    this.writeOperation = function () {
        var flag = false;
        var info = "flow=" + loc + "&operation=" + map.get('operation');
        info = info.replace("?", "&");//将链接里的？字符转换为&，可以让后台获取
        var url = cfApi.apiHost + "/record/writeLog.html?" + info + "&s=wap";
        $.ajax({
            type: "get",
            url: url,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "callback",
            success: function (json) {

            },
            error: function () {

            }
        });
        return flag;
    };
    this.writeIntentionMsg = function (operationName, operationValue, dataType, opSeq) {
        var url = cfApi.apiHost + "/record/intentionLog.html";
        $.get(url, {operationName: operationName, operationValue: operationValue, dataType: dataType, opSeq: opSeq},
            function (data) {

            }
        );
    }
}

var op = new operation();

function writebdLog(category, action, opt_label, opt_value) {//category项目，action统计项目，渠道label，渠道号
    _hmt.push(['_trackEvent', category, category + action, opt_label, opt_value]);
    op.record(encodeURI(category + action));
}

//扩展滚动时间，添加start、stop事件
(function () {
    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);
    //滚动开始
    special.scrollstart = {
        setup: function () {
            var timer,
                handler = function (evt) {
                    var _self = this,
                        _args = arguments;
                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.dispatch.apply(_self, _args);
                    }
                    timer = setTimeout(function () {
                        timer = null;
                    }, special.scrollstop.latency);
                };
            jQuery(this).bind('scroll', handler).data(uid1, handler);
        },
        teardown: function () {
            jQuery(this).unbind('scroll', jQuery(this).data(uid1));
        }
    };

    //滚动结束
    special.scrollstop = {
        latency: 300,
        setup: function () {
            var timer,
                handler = function (evt) {
                    var _self = this,
                        _args = arguments;
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(function () {
                        timer = null;
                        evt.type = 'scrollstop';
                        jQuery.event.dispatch.apply(_self, _args);

                    }, special.scrollstop.latency);
                };
            jQuery(this).bind('scroll', handler).data(uid2, handler);
        },
        teardown: function () {
            jQuery(this).unbind('scroll', jQuery(this).data(uid2));
        }
    };
})();

function androidInputBugFix() {
    // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
    // 解决方法:
    // 0. .container 去掉 overflow 属性, 但会引发别的问题
    // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
    //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
}

//美恰在线客服
function getMeiqia() {
    (function (m, ei, q, i, a, j, s) {
        m[a] = m[a] || function () {
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
    _MEIQIA('fallback', 1);
    _MEIQIA('withoutBtn');
};

//加载中事件
function showToast() {
    var $loadingToast = $('#loadingToast');
    if ($loadingToast.css('display') != 'none') {
        return;
    }
    $loadingToast.fadeIn(100);
}

function hideToast() {
    var $loadingToast = $('#loadingToast');
    $loadingToast.fadeOut(100);
};

function checkMobileCode(receiverMobile, code) {
    var flag = false;
    $.ajax({
        url: "http://app.yfq.cn:3099/api/checkActiveCode/" + receiverMobile + '/' + code,
        async: false,
        type: "get",
        success: function (data) {
            if (data == 'true') {
                flag = true;
            }
        }
    });
    return flag;
}

function showTheActionSheet(element) {
    $(element).addClass('weui-actionsheet_toggle');
    $(element).find(".weui-media-box__thumb").show();
    $(element).siblings('.ios-mask').fadeIn(200);
}

function hideTheActionSheet(element) {
    $(element).removeClass('weui-actionsheet_toggle');
    $(element).find(".weui-media-box__thumb").hide();
    $(element).siblings('.ios-mask').fadeOut(200);
}

$(function(){
    var $iosActionsheet = $('#iosActionsheet');
    var $iosMask = $('.weui-mask');

    function hideActionSheet() {
        $iosActionsheet.removeClass('weui-actionsheet_toggle');
        $iosMask.fadeOut(200);
    }

    function showActionSheet() {
        console.log("1");
        $iosActionsheet.addClass('weui-actionsheet_toggle');
        $iosMask.fadeIn(200);
    }

    $(".js-action-sheet-hide").on('click',hideActionSheet);
    $(".js-action-sheet-show").on('click',showActionSheet);

    $iosMask.on('click', hideActionSheet);
    $('#iosActionsheetCancel').on('click', hideActionSheet);
    $("#showIOSActionSheet").on("click", showActionSheet);
});

$(function () {
    $('#container').on('click','.weui-navbar__item', function () {
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        $(this).parent().next().find(".weui-tab__item").removeClass("weui-tab__item_on");
        $(this).parent().next().find(".weui-tab__item").eq($(this).index()).addClass("weui-tab__item_on");
    });
});

$(function () {
    $("#container").on("click", ".list-tabs .tab-item", function () {
        var $phoneList = $(".phone-list");
        var $this = $(this);
        $this.siblings().removeClass("on");
        $phoneList.hide();
        $this.addClass("on");
        $phoneList.eq($this.index()).show();
        //console.log($this.index());
        if ($this.index() == 1) {
            $("#recommend").hide();
            $("#recommendTitle").hide();
        } else {
            $("#recommend").show();
            $("#recommendTitle").show();
        }
    });
});

function getRandomName() {
    var firstNames, lastNames;
    firstNames = ["卢", "钟", "朱", "彭", "梁", "卫", "蒋", "许", "张", "孔", "沈", "郑", "赵", "周", "吕", "韩", "尤", "秦", "楮", "李"];
    lastNames = ["先生", "女士"];
    var fid = Math.round(Math.random() * 19);
    var lid = Math.round(Math.random() * 1);
    return firstNames[fid] + lastNames[lid];
}
var baseTime = 1;
function getRanDomTime() {
    var addTime = Math.round(Math.random() * 1);
    baseTime = baseTime + addTime;
    if (baseTime > 10) {
        baseTime = Math.round(Math.random() * 1) + 1;
    }
    return baseTime;
}

function getRandomPkg() {
    var pkgs, pid;
    pkgs = [101, 102, 155, 156];
    pid = Math.round(Math.random() * 3);
    return pkgs[pid];
}

function getRandomPrePhone() {
    var pkgs, pid;
    pkgs = ['130', '131', '132', '138', '139', '150'];
    pid = Math.round(Math.random() * 5);
    return pkgs[pid];
}

function getRandomPhone() {
    return ((("18122XXX" + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9);
}

function getRandomReceiverPhone() {
    return (((getRandomPrePhone() + Math.round(Math.random() * 9) + Math.round(Math.random() * 9) + "XXX" + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9);
}

function getRandomProduct() {
    var productName;
    productName = ["iPhone 7", "iPhone 7 Plus", "VIVO X7", "OPPO R9", "小米5S", "华为P9"];
    var index = Math.round(Math.random() * 5);
    return productName[index];
}

function checkSameNumber(number1, number2) {
    if (number1 === number2) {
        return false;
    }
    return true;
}

function getJM(price, max) {
    for (var i = 0; i <= max / 5; i++) {
        if (i * 100 == price) {
            return i * 5;
        }
        if (i * 100 > price) {
            return (i - 1) * 5;
        }
        if (i * 100 < price && i * 5 >= max) {
            return max;
        }
    }
    ;
};
function getMX(price, max, rates) {
    var _rates = 0.1;//设置默认利率
    if (rates) {//如果rates存在，使用rates值，如果不存在，tates=0.1;
        _rates = rates;
    }

    if (price > 7680) {
        return 768;
    } else {
        return Math.round(price * _rates);
    }
}
>>>>>>> branch 'master' of https://github.com/pengcl/angular1-seed
