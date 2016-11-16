var systemName = "yfqapp";

(function () {//1.变态功能，如非必要，不推荐使用;2.对所有拥有rewrite-url 类的a标签重写href
    var params, rewriteUrl, $a, i, _href;
    params = window.location.search;
    $a = $("a.rewrite-url");//获取所有拥有rewrite-url 类的a标签
    for (i = 0; i < $a.length; i++) {
        _href = $a.eq(i).attr("href");
        //rewriteUrl = "http://app.yfq.cn" + _href + params;
        if(_href.indexOf("?") != -1 && params.indexOf("?") != -1){
            rewriteUrl = "http://app.yfq.cn" + _href + params.replace(/\?/,"&");
        }else {
            rewriteUrl = "http://app.yfq.cn" + _href + params;
        }
        $a.eq(i).attr("href", rewriteUrl);//重写href
        //console.log(rewriteUrl);
    }
})();

//获取地址栏参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null)
        return unescape(r[2]);
    return null; //返回参数值
}

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
    _MEIQIA('withoutBtn');
};

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
        var url = "http://m.gd189fq.com/record/writeLog.html?" + info + "&s=wap";
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
        var url = "http://m.gd189fq.com/record/intentionLog.html";
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

var category = systemName + "_" + pageType + "_Index";

writebdLog(category, "_Load", "渠道号", getUrlParam("gh"));

var getContact = function () {
    getMeiqia();
    //$("#contactUs").show();
    _MEIQIA('showPanel');
    writebdLog(category, "_CustConsult", "渠道号", getUrlParam("gh"));//客服咨询
};

var indexBuy = function () {
    //$("#contactUs").show();
    writebdLog(category, "_OnlineOrder", "渠道号", getUrlParam("gh"));//客服咨询
};

function checkMobileCode(code) {
    var flag = false;
    $.ajax({
        url: "http://app.yfq.cn:3099/api/checkActiveCode/" + code,
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

var checkReceiverMobile = function () {
    var receiverMobile = $("#receiverMobile").val();
    if (receiverMobile.length != 11) {
        alert("请输入您的手机号");
        return false;
    }
    return true;
};

var checkActiveCode = function () {
    var activeCode = $("#activeCode").val();
    if (activeCode.length != 4) {
        alert("请输入验证码！");
        return false;
    } else {
        if (!checkMobileCode(activeCode)) {
            alert("验证码不正确，请重新输入！");
            return false;
        }
        $.cookie("activeCode", activeCode, {path: '/'});
        return true;
    }
};

var huBuy = function (e) {
    if (checkReceiverMobile()) {
        if (checkActiveCode()) {

        } else {
            e.preventDefault();
        }
    } else {
        e.preventDefault();
    }
};

var paracont = "获取验证码";
var paraclass = "but_null";
var second = 59, timePromise = undefined;

function getActiveCode() {
    if(!checkReceiverMobile()){
        return false;
    }
    var phoneNumber = $("#receiverMobile").val();

    $.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
        if (data == "") {
            timePromise = setInterval(function () {
                if (second <= 0) {
                    clearInterval(timePromise);
                    timePromise = undefined;

                    second = 59;
                    paracont = "重发验证码";
                    paraclass = "but_null";
                } else {
                    paracont = second + "秒后可重发";
                    paraclass = "not but_null";
                    second--;

                }
                $("#activeCodeBtn").html(paracont);
            }, 1000, 100);
        }
    });
};
