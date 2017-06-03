<<<<<<< HEAD

'use strict';

// Declare app level module which depends on views, and components

/* App Module */

var app = angular.module('app', ['ui.router', 'appServices', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters']);

var baseApiUri = "http://app.gd189fq.com:3099/api";

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise(function () {
        return "/phone/active/D/phones" + window.location.search;
    });
}]).run(['$rootScope', function ($rootScope) {

    /*$rootScope.$on('$locationChangeStart',function(){

     });

     $rootScope.$on('$locationChangeSuccess',function(){

     });*/
}]);

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

'use strict';

/* Filters */
var appFilters = angular.module('appFilters', []);

appFilters.filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

appFilters.filter('MB', function () {
    return function (kb) {
        var m = 1024,
            //sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(kb) / Math.log(m));
        return (kb / m);
    };
});

appFilters.filter('GB', function () {
    return function (kb) {
        var m = 1024,
            g = 1024;
        //sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        //i = Math.floor(Math.log(kb) / Math.log(m));
        return ((kb / m) / g);
    };
});

appFilters.filter('replaceS', function () {
    return function (input, key) {
        if (key != undefined || key != null || key != "") {
            return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
        } else {

        }
    };
});

appFilters.filter('replaceInput', function () {
    return function (input, key) {
        if (key != undefined && key != "") {
            return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
        } else {
            return input;
        }
    };
});

appFilters.filter('onlyNumber', function () {
    return function (input) {
        return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
    };
});

appFilters.filter('formatMoney', function () {
    return function (input, lastindex) {
        if (input != undefined) {
            return input.slice(0, lastindex) + "<sub style='font-size:75%'>" + input.substr(lastindex) + "</sub>";
        }
    };
});

appFilters.filter('formatPhone', function () {
    return function (input) {
        var lastVar = input.slice(0, -4) + " " + input.substr(-4);
        return lastVar.slice(0, 3) + " " + lastVar.substr(3);
        //return lastVar;
    };
});

appFilters.filter('doubleName', function () {
    return function (input, key) {
        input = input.split(" + ");
        if (key == 1) {
            return input[1];
        } else {
            return input[0];
        }
    };
});

/*appFilters.filter('replaceImgSrc', ['$sce', function ($sce) {
    return function (input) {
        console.log(String(input).replace(/src=/g, 'class="lazy" data-original='));
        return $sce.trustAsHtml(String(input).replace(/src=/g, 'class="lazy" data-original='));
    };
}]);*/

appFilters.filter('range', function () {
    return function (data, start, end) {
        if (angular.isArray(data) && angular.isNumber(start) && angular.isNumber(end)) {
            if (data.length < start) {
                return data;
            }
            else {
                return data.slice(start, end);
            }
        }
    }
});

appFilters.filter('jm', function () {
    return function (price, max) {
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
    }
});

appFilters.filter('mx', function () {
    return function (price) {

        if (price > 7680) {
            return 768;
        } else {
            return Math.round(price * 0.1);
        }
    }
});

appFilters.filter('numberUp', function () {
    return function (price) {

        return Math.ceil(price);
    }
});

appFilters.filter('numberDown', function () {
    return function (price) {

        return Math.floor(price);
    }
});

appFilters.filter('mp', function () {
    return function (price) {

        if (price == 0) {
            return "&mp=0"
        } else {
            return ""
        }
    }
});

appFilters.filter('phoneFilter', function () {
    return function (price) {

        return price.substr(0, 4) + "****" + price.substr(8, 11);
    }
});
var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('FlowPackages', ['$resource', function ($resource) {
    return $resource('http://app.gd189fq.com:3099/api/getFlowPackages/:cardType', null, {
        query: {method: 'GET', params: {cardType: '0'}, isArray: true}
    });
}]);

appServices.factory('Phone', ['$resource','$q', function ($resource,$q) {
    return $resource('/data/phones/:phoneId.json', {}, {
        query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
    });
}]);
(function(){var a,b,c,d,e,f,g,h,i=[].slice,j={}.hasOwnProperty,k=function(a,b){function c(){this.constructor=a}for(var d in b)j.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};g=function(){},b=function(){function a(){}return a.prototype.addEventListener=a.prototype.on,a.prototype.on=function(a,b){return this._callbacks=this._callbacks||{},this._callbacks[a]||(this._callbacks[a]=[]),this._callbacks[a].push(b),this},a.prototype.emit=function(){var a,b,c,d,e,f;if(d=arguments[0],a=2<=arguments.length?i.call(arguments,1):[],this._callbacks=this._callbacks||{},c=this._callbacks[d])for(e=0,f=c.length;f>e;e++)b=c[e],b.apply(this,a);return this},a.prototype.removeListener=a.prototype.off,a.prototype.removeAllListeners=a.prototype.off,a.prototype.removeEventListener=a.prototype.off,a.prototype.off=function(a,b){var c,d,e,f,g;if(!this._callbacks||0===arguments.length)return this._callbacks={},this;if(d=this._callbacks[a],!d)return this;if(1===arguments.length)return delete this._callbacks[a],this;for(e=f=0,g=d.length;g>f;e=++f)if(c=d[e],c===b){d.splice(e,1);break}return this},a}(),a=function(a){function c(a,b){var e,f,g;if(this.element=a,this.version=c.version,this.defaultOptions.previewTemplate=this.defaultOptions.previewTemplate.replace(/\n*/g,""),this.clickableElements=[],this.listeners=[],this.files=[],"string"==typeof this.element&&(this.element=document.querySelector(this.element)),!this.element||null==this.element.nodeType)throw new Error("Invalid dropzone element.");if(this.element.dropzone)throw new Error("Dropzone already attached.");if(c.instances.push(this),this.element.dropzone=this,e=null!=(g=c.optionsForElement(this.element))?g:{},this.options=d({},this.defaultOptions,e,null!=b?b:{}),this.options.forceFallback||!c.isBrowserSupported())return this.options.fallback.call(this);if(null==this.options.url&&(this.options.url=this.element.getAttribute("action")),!this.options.url)throw new Error("No URL provided.");if(this.options.acceptedFiles&&this.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");this.options.acceptedMimeTypes&&(this.options.acceptedFiles=this.options.acceptedMimeTypes,delete this.options.acceptedMimeTypes),this.options.method=this.options.method.toUpperCase(),(f=this.getExistingFallback())&&f.parentNode&&f.parentNode.removeChild(f),this.options.previewsContainer!==!1&&(this.previewsContainer=this.options.previewsContainer?c.getElement(this.options.previewsContainer,"previewsContainer"):this.element),this.options.clickable&&(this.clickableElements=this.options.clickable===!0?[this.element]:c.getElements(this.options.clickable,"clickable")),this.init()}var d,e;return k(c,a),c.prototype.Emitter=b,c.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","addedfiles","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached","queuecomplete"],c.prototype.defaultOptions={url:null,method:"post",withCredentials:!1,parallelUploads:2,uploadMultiple:!1,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:10,thumbnailWidth:120,thumbnailHeight:120,filesizeBase:1e3,maxFiles:null,params:{},clickable:!0,ignoreHiddenFiles:!0,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:!0,autoQueue:!0,addRemoveLinks:!1,previewsContainer:null,hiddenInputContainer:"body",capture:null,renameFilename:null,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",dictCancelUpload:"Cancel upload",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",accept:function(a,b){return b()},init:function(){return g},forceFallback:!1,fallback:function(){var a,b,d,e,f,g;for(this.element.className=""+this.element.className+" dz-browser-not-supported",g=this.element.getElementsByTagName("div"),e=0,f=g.length;f>e;e++)a=g[e],/(^| )dz-message($| )/.test(a.className)&&(b=a,a.className="dz-message");return b||(b=c.createElement('<div class="dz-message"><span></span></div>'),this.element.appendChild(b)),d=b.getElementsByTagName("span")[0],d&&(null!=d.textContent?d.textContent=this.options.dictFallbackMessage:null!=d.innerText&&(d.innerText=this.options.dictFallbackMessage)),this.element.appendChild(this.getFallbackForm())},resize:function(a){var b,c,d;return b={srcX:0,srcY:0,srcWidth:a.width,srcHeight:a.height},c=a.width/a.height,b.optWidth=this.options.thumbnailWidth,b.optHeight=this.options.thumbnailHeight,null==b.optWidth&&null==b.optHeight?(b.optWidth=b.srcWidth,b.optHeight=b.srcHeight):null==b.optWidth?b.optWidth=c*b.optHeight:null==b.optHeight&&(b.optHeight=1/c*b.optWidth),d=b.optWidth/b.optHeight,a.height<b.optHeight||a.width<b.optWidth?(b.trgHeight=b.srcHeight,b.trgWidth=b.srcWidth):c>d?(b.srcHeight=a.height,b.srcWidth=b.srcHeight*d):(b.srcWidth=a.width,b.srcHeight=b.srcWidth/d),b.srcX=(a.width-b.srcWidth)/2,b.srcY=(a.height-b.srcHeight)/2,b},drop:function(){return this.element.classList.remove("dz-drag-hover")},dragstart:g,dragend:function(){return this.element.classList.remove("dz-drag-hover")},dragenter:function(){return this.element.classList.add("dz-drag-hover")},dragover:function(){return this.element.classList.add("dz-drag-hover")},dragleave:function(){return this.element.classList.remove("dz-drag-hover")},paste:g,reset:function(){return this.element.classList.remove("dz-started")},addedfile:function(a){var b,d,e,f,g,h,i,j,k,l,m,n,o;if(this.element===this.previewsContainer&&this.element.classList.add("dz-started"),this.previewsContainer){for(a.previewElement=c.createElement(this.options.previewTemplate.trim()),a.previewTemplate=a.previewElement,this.previewsContainer.appendChild(a.previewElement),l=a.previewElement.querySelectorAll("[data-dz-name]"),f=0,i=l.length;i>f;f++)b=l[f],b.textContent=this._renameFilename(a.name);for(m=a.previewElement.querySelectorAll("[data-dz-size]"),g=0,j=m.length;j>g;g++)b=m[g],b.innerHTML=this.filesize(a.size);for(this.options.addRemoveLinks&&(a._removeLink=c.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'+this.options.dictRemoveFile+"</a>"),a.previewElement.appendChild(a._removeLink)),d=function(b){return function(d){return d.preventDefault(),d.stopPropagation(),a.status===c.UPLOADING?c.confirm(b.options.dictCancelUploadConfirmation,function(){return b.removeFile(a)}):b.options.dictRemoveFileConfirmation?c.confirm(b.options.dictRemoveFileConfirmation,function(){return b.removeFile(a)}):b.removeFile(a)}}(this),n=a.previewElement.querySelectorAll("[data-dz-remove]"),o=[],h=0,k=n.length;k>h;h++)e=n[h],o.push(e.addEventListener("click",d));return o}},removedfile:function(a){var b;return a.previewElement&&null!=(b=a.previewElement)&&b.parentNode.removeChild(a.previewElement),this._updateMaxFilesReachedClass()},thumbnail:function(a,b){var c,d,e,f;if(a.previewElement){for(a.previewElement.classList.remove("dz-file-preview"),f=a.previewElement.querySelectorAll("[data-dz-thumbnail]"),d=0,e=f.length;e>d;d++)c=f[d],c.alt=a.name,c.src=b;return setTimeout(function(){return function(){return a.previewElement.classList.add("dz-image-preview")}}(this),1)}},error:function(a,b){var c,d,e,f,g;if(a.previewElement){for(a.previewElement.classList.add("dz-error"),"String"!=typeof b&&b.error&&(b=b.error),f=a.previewElement.querySelectorAll("[data-dz-errormessage]"),g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.textContent=b);return g}},errormultiple:g,processing:function(a){return a.previewElement&&(a.previewElement.classList.add("dz-processing"),a._removeLink)?a._removeLink.textContent=this.options.dictCancelUpload:void 0},processingmultiple:g,uploadprogress:function(a,b){var c,d,e,f,g;if(a.previewElement){for(f=a.previewElement.querySelectorAll("[data-dz-uploadprogress]"),g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push("PROGRESS"===c.nodeName?c.value=b:c.style.width=""+b+"%");return g}},totaluploadprogress:g,sending:g,sendingmultiple:g,success:function(a){return a.previewElement?a.previewElement.classList.add("dz-success"):void 0},successmultiple:g,canceled:function(a){return this.emit("error",a,"Upload canceled.")},canceledmultiple:g,complete:function(a){return a._removeLink&&(a._removeLink.textContent=this.options.dictRemoveFile),a.previewElement?a.previewElement.classList.add("dz-complete"):void 0},completemultiple:g,maxfilesexceeded:g,maxfilesreached:g,queuecomplete:g,addedfiles:g,previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>'},d=function(){var a,b,c,d,e,f,g;for(d=arguments[0],c=2<=arguments.length?i.call(arguments,1):[],f=0,g=c.length;g>f;f++){b=c[f];for(a in b)e=b[a],d[a]=e}return d},c.prototype.getAcceptedFiles=function(){var a,b,c,d,e;for(d=this.files,e=[],b=0,c=d.length;c>b;b++)a=d[b],a.accepted&&e.push(a);return e},c.prototype.getRejectedFiles=function(){var a,b,c,d,e;for(d=this.files,e=[],b=0,c=d.length;c>b;b++)a=d[b],a.accepted||e.push(a);return e},c.prototype.getFilesWithStatus=function(a){var b,c,d,e,f;for(e=this.files,f=[],c=0,d=e.length;d>c;c++)b=e[c],b.status===a&&f.push(b);return f},c.prototype.getQueuedFiles=function(){return this.getFilesWithStatus(c.QUEUED)},c.prototype.getUploadingFiles=function(){return this.getFilesWithStatus(c.UPLOADING)},c.prototype.getAddedFiles=function(){return this.getFilesWithStatus(c.ADDED)},c.prototype.getActiveFiles=function(){var a,b,d,e,f;for(e=this.files,f=[],b=0,d=e.length;d>b;b++)a=e[b],(a.status===c.UPLOADING||a.status===c.QUEUED)&&f.push(a);return f},c.prototype.init=function(){var a,b,d,e,f,g,h;for("form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")&&this.element.appendChild(c.createElement('<div class="dz-default dz-message"><span>'+this.options.dictDefaultMessage+"</span></div>")),this.clickableElements.length&&(d=function(a){return function(){return a.hiddenFileInput&&a.hiddenFileInput.parentNode.removeChild(a.hiddenFileInput),a.hiddenFileInput=document.createElement("input"),a.hiddenFileInput.setAttribute("type","file"),(null==a.options.maxFiles||a.options.maxFiles>1)&&a.hiddenFileInput.setAttribute("multiple","multiple"),a.hiddenFileInput.className="dz-hidden-input",null!=a.options.acceptedFiles&&a.hiddenFileInput.setAttribute("accept",a.options.acceptedFiles),null!=a.options.capture&&a.hiddenFileInput.setAttribute("capture",a.options.capture),a.hiddenFileInput.style.visibility="hidden",a.hiddenFileInput.style.position="absolute",a.hiddenFileInput.style.top="0",a.hiddenFileInput.style.left="0",a.hiddenFileInput.style.height="0",a.hiddenFileInput.style.width="0",document.querySelector(a.options.hiddenInputContainer).appendChild(a.hiddenFileInput),a.hiddenFileInput.addEventListener("change",function(){var b,c,e,f;if(c=a.hiddenFileInput.files,c.length)for(e=0,f=c.length;f>e;e++)b=c[e],a.addFile(b);return a.emit("addedfiles",c),d()})}}(this))(),this.URL=null!=(g=window.URL)?g:window.webkitURL,h=this.events,e=0,f=h.length;f>e;e++)a=h[e],this.on(a,this.options[a]);return this.on("uploadprogress",function(a){return function(){return a.updateTotalUploadProgress()}}(this)),this.on("removedfile",function(a){return function(){return a.updateTotalUploadProgress()}}(this)),this.on("canceled",function(a){return function(b){return a.emit("complete",b)}}(this)),this.on("complete",function(a){return function(){return 0===a.getAddedFiles().length&&0===a.getUploadingFiles().length&&0===a.getQueuedFiles().length?setTimeout(function(){return a.emit("queuecomplete")},0):void 0}}(this)),b=function(a){return a.stopPropagation(),a.preventDefault?a.preventDefault():a.returnValue=!1},this.listeners=[{element:this.element,events:{dragstart:function(a){return function(b){return a.emit("dragstart",b)}}(this),dragenter:function(a){return function(c){return b(c),a.emit("dragenter",c)}}(this),dragover:function(a){return function(c){var d;try{d=c.dataTransfer.effectAllowed}catch(e){}return c.dataTransfer.dropEffect="move"===d||"linkMove"===d?"move":"copy",b(c),a.emit("dragover",c)}}(this),dragleave:function(a){return function(b){return a.emit("dragleave",b)}}(this),drop:function(a){return function(c){return b(c),a.drop(c)}}(this),dragend:function(a){return function(b){return a.emit("dragend",b)}}(this)}}],this.clickableElements.forEach(function(a){return function(b){return a.listeners.push({element:b,events:{click:function(d){return(b!==a.element||d.target===a.element||c.elementInside(d.target,a.element.querySelector(".dz-message")))&&a.hiddenFileInput.click(),!0}}})}}(this)),this.enable(),this.options.init.call(this)},c.prototype.destroy=function(){var a;return this.disable(),this.removeAllFiles(!0),(null!=(a=this.hiddenFileInput)?a.parentNode:void 0)&&(this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),this.hiddenFileInput=null),delete this.element.dropzone,c.instances.splice(c.instances.indexOf(this),1)},c.prototype.updateTotalUploadProgress=function(){var a,b,c,d,e,f,g,h;if(d=0,c=0,a=this.getActiveFiles(),a.length){for(h=this.getActiveFiles(),f=0,g=h.length;g>f;f++)b=h[f],d+=b.upload.bytesSent,c+=b.upload.total;e=100*d/c}else e=100;return this.emit("totaluploadprogress",e,c,d)},c.prototype._getParamName=function(a){return"function"==typeof this.options.paramName?this.options.paramName(a):""+this.options.paramName+(this.options.uploadMultiple?"["+a+"]":"")},c.prototype._renameFilename=function(a){return"function"!=typeof this.options.renameFilename?a:this.options.renameFilename(a)},c.prototype.getFallbackForm=function(){var a,b,d,e;return(a=this.getExistingFallback())?a:(d='<div class="dz-fallback">',this.options.dictFallbackText&&(d+="<p>"+this.options.dictFallbackText+"</p>"),d+='<input type="file" name="'+this._getParamName(0)+'" '+(this.options.uploadMultiple?'multiple="multiple"':void 0)+' /><input type="submit" value="Upload!"></div>',b=c.createElement(d),"FORM"!==this.element.tagName?(e=c.createElement('<form action="'+this.options.url+'" enctype="multipart/form-data" method="'+this.options.method+'"></form>'),e.appendChild(b)):(this.element.setAttribute("enctype","multipart/form-data"),this.element.setAttribute("method",this.options.method)),null!=e?e:b)},c.prototype.getExistingFallback=function(){var a,b,c,d,e,f;for(b=function(a){var b,c,d;for(c=0,d=a.length;d>c;c++)if(b=a[c],/(^| )fallback($| )/.test(b.className))return b},f=["div","form"],d=0,e=f.length;e>d;d++)if(c=f[d],a=b(this.element.getElementsByTagName(c)))return a},c.prototype.setupEventListeners=function(){var a,b,c,d,e,f,g;for(f=this.listeners,g=[],d=0,e=f.length;e>d;d++)a=f[d],g.push(function(){var d,e;d=a.events,e=[];for(b in d)c=d[b],e.push(a.element.addEventListener(b,c,!1));return e}());return g},c.prototype.removeEventListeners=function(){var a,b,c,d,e,f,g;for(f=this.listeners,g=[],d=0,e=f.length;e>d;d++)a=f[d],g.push(function(){var d,e;d=a.events,e=[];for(b in d)c=d[b],e.push(a.element.removeEventListener(b,c,!1));return e}());return g},c.prototype.disable=function(){var a,b,c,d,e;for(this.clickableElements.forEach(function(a){return a.classList.remove("dz-clickable")}),this.removeEventListeners(),d=this.files,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(this.cancelUpload(a));return e},c.prototype.enable=function(){return this.clickableElements.forEach(function(a){return a.classList.add("dz-clickable")}),this.setupEventListeners()},c.prototype.filesize=function(a){var b,c,d,e,f,g,h,i;if(d=0,e="b",a>0){for(g=["TB","GB","MB","KB","b"],c=h=0,i=g.length;i>h;c=++h)if(f=g[c],b=Math.pow(this.options.filesizeBase,4-c)/10,a>=b){d=a/Math.pow(this.options.filesizeBase,4-c),e=f;break}d=Math.round(10*d)/10}return"<strong>"+d+"</strong> "+e},c.prototype._updateMaxFilesReachedClass=function(){return null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(this.getAcceptedFiles().length===this.options.maxFiles&&this.emit("maxfilesreached",this.files),this.element.classList.add("dz-max-files-reached")):this.element.classList.remove("dz-max-files-reached")},c.prototype.drop=function(a){var b,c;a.dataTransfer&&(this.emit("drop",a),b=a.dataTransfer.files,this.emit("addedfiles",b),b.length&&(c=a.dataTransfer.items,c&&c.length&&null!=c[0].webkitGetAsEntry?this._addFilesFromItems(c):this.handleFiles(b)))},c.prototype.paste=function(a){var b,c;if(null!=(null!=a&&null!=(c=a.clipboardData)?c.items:void 0))return this.emit("paste",a),b=a.clipboardData.items,b.length?this._addFilesFromItems(b):void 0},c.prototype.handleFiles=function(a){var b,c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this.addFile(b));return e},c.prototype._addFilesFromItems=function(a){var b,c,d,e,f;for(f=[],d=0,e=a.length;e>d;d++)c=a[d],f.push(null!=c.webkitGetAsEntry&&(b=c.webkitGetAsEntry())?b.isFile?this.addFile(c.getAsFile()):b.isDirectory?this._addFilesFromDirectory(b,b.name):void 0:null!=c.getAsFile?null==c.kind||"file"===c.kind?this.addFile(c.getAsFile()):void 0:void 0);return f},c.prototype._addFilesFromDirectory=function(a,b){var c,d,e;return c=a.createReader(),d=function(a){return"undefined"!=typeof console&&null!==console&&"function"==typeof console.log?console.log(a):void 0},(e=function(a){return function(){return c.readEntries(function(c){var d,f,g;if(c.length>0){for(f=0,g=c.length;g>f;f++)d=c[f],d.isFile?d.file(function(c){return a.options.ignoreHiddenFiles&&"."===c.name.substring(0,1)?void 0:(c.fullPath=""+b+"/"+c.name,a.addFile(c))}):d.isDirectory&&a._addFilesFromDirectory(d,""+b+"/"+d.name);e()}return null},d)}}(this))()},c.prototype.accept=function(a,b){return a.size>1024*this.options.maxFilesize*1024?b(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(a.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize)):c.isValidFile(a,this.options.acceptedFiles)?null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(b(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles)),this.emit("maxfilesexceeded",a)):this.options.accept.call(this,a,b):b(this.options.dictInvalidFileType)},c.prototype.addFile=function(a){return a.upload={progress:0,total:a.size,bytesSent:0},this.files.push(a),a.status=c.ADDED,this.emit("addedfile",a),this._enqueueThumbnail(a),this.accept(a,function(b){return function(c){return c?(a.accepted=!1,b._errorProcessing([a],c)):(a.accepted=!0,b.options.autoQueue&&b.enqueueFile(a)),b._updateMaxFilesReachedClass()}}(this))},c.prototype.enqueueFiles=function(a){var b,c,d;for(c=0,d=a.length;d>c;c++)b=a[c],this.enqueueFile(b);return null},c.prototype.enqueueFile=function(a){if(a.status!==c.ADDED||a.accepted!==!0)throw new Error("This file can't be queued because it has already been processed or was rejected.");return a.status=c.QUEUED,this.options.autoProcessQueue?setTimeout(function(a){return function(){return a.processQueue()}}(this),0):void 0},c.prototype._thumbnailQueue=[],c.prototype._processingThumbnail=!1,c.prototype._enqueueThumbnail=function(a){return this.options.createImageThumbnails&&a.type.match(/image.*/)&&a.size<=1024*this.options.maxThumbnailFilesize*1024?(this._thumbnailQueue.push(a),setTimeout(function(a){return function(){return a._processThumbnailQueue()}}(this),0)):void 0},c.prototype._processThumbnailQueue=function(){return this._processingThumbnail||0===this._thumbnailQueue.length?void 0:(this._processingThumbnail=!0,this.createThumbnail(this._thumbnailQueue.shift(),function(a){return function(){return a._processingThumbnail=!1,a._processThumbnailQueue()}}(this)))},c.prototype.removeFile=function(a){return a.status===c.UPLOADING&&this.cancelUpload(a),this.files=h(this.files,a),this.emit("removedfile",a),0===this.files.length?this.emit("reset"):void 0},c.prototype.removeAllFiles=function(a){var b,d,e,f;for(null==a&&(a=!1),f=this.files.slice(),d=0,e=f.length;e>d;d++)b=f[d],(b.status!==c.UPLOADING||a)&&this.removeFile(b);return null},c.prototype.createThumbnail=function(a,b){var c;return c=new FileReader,c.onload=function(d){return function(){return"image/svg+xml"===a.type?(d.emit("thumbnail",a,c.result),void(null!=b&&b())):d.createThumbnailFromUrl(a,c.result,b)}}(this),c.readAsDataURL(a)},c.prototype.createThumbnailFromUrl=function(a,b,c,d){var e;return e=document.createElement("img"),d&&(e.crossOrigin=d),e.onload=function(b){return function(){var d,g,h,i,j,k,l,m;return a.width=e.width,a.height=e.height,h=b.options.resize.call(b,a),null==h.trgWidth&&(h.trgWidth=h.optWidth),null==h.trgHeight&&(h.trgHeight=h.optHeight),d=document.createElement("canvas"),g=d.getContext("2d"),d.width=h.trgWidth,d.height=h.trgHeight,f(g,e,null!=(j=h.srcX)?j:0,null!=(k=h.srcY)?k:0,h.srcWidth,h.srcHeight,null!=(l=h.trgX)?l:0,null!=(m=h.trgY)?m:0,h.trgWidth,h.trgHeight),i=d.toDataURL("image/png"),b.emit("thumbnail",a,i),null!=c?c():void 0}}(this),null!=c&&(e.onerror=c),e.src=b},c.prototype.processQueue=function(){var a,b,c,d;if(b=this.options.parallelUploads,c=this.getUploadingFiles().length,a=c,!(c>=b)&&(d=this.getQueuedFiles(),d.length>0)){if(this.options.uploadMultiple)return this.processFiles(d.slice(0,b-c));for(;b>a;){if(!d.length)return;this.processFile(d.shift()),a++}}},c.prototype.processFile=function(a){return this.processFiles([a])},c.prototype.processFiles=function(a){var b,d,e;for(d=0,e=a.length;e>d;d++)b=a[d],b.processing=!0,b.status=c.UPLOADING,this.emit("processing",b);return this.options.uploadMultiple&&this.emit("processingmultiple",a),this.uploadFiles(a)},c.prototype._getFilesWithXhr=function(a){var b,c;return c=function(){var c,d,e,f;for(e=this.files,f=[],c=0,d=e.length;d>c;c++)b=e[c],b.xhr===a&&f.push(b);return f}.call(this)},c.prototype.cancelUpload=function(a){var b,d,e,f,g,h,i;if(a.status===c.UPLOADING){for(d=this._getFilesWithXhr(a.xhr),e=0,g=d.length;g>e;e++)b=d[e],b.status=c.CANCELED;for(a.xhr.abort(),f=0,h=d.length;h>f;f++)b=d[f],this.emit("canceled",b);this.options.uploadMultiple&&this.emit("canceledmultiple",d)}else((i=a.status)===c.ADDED||i===c.QUEUED)&&(a.status=c.CANCELED,this.emit("canceled",a),this.options.uploadMultiple&&this.emit("canceledmultiple",[a]));return this.options.autoProcessQueue?this.processQueue():void 0},e=function(){var a,b;return b=arguments[0],a=2<=arguments.length?i.call(arguments,1):[],"function"==typeof b?b.apply(this,a):b},c.prototype.uploadFile=function(a){return this.uploadFiles([a])},c.prototype.uploadFiles=function(a){var b,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L;for(w=new XMLHttpRequest,x=0,B=a.length;B>x;x++)b=a[x],b.xhr=w;p=e(this.options.method,a),u=e(this.options.url,a),w.open(p,u,!0),w.withCredentials=!!this.options.withCredentials,s=null,g=function(c){return function(){var d,e,f;for(f=[],d=0,e=a.length;e>d;d++)b=a[d],f.push(c._errorProcessing(a,s||c.options.dictResponseError.replace("{{statusCode}}",w.status),w));return f}}(this),t=function(c){return function(d){var e,f,g,h,i,j,k,l,m;if(null!=d)for(f=100*d.loaded/d.total,g=0,j=a.length;j>g;g++)b=a[g],b.upload={progress:f,total:d.total,bytesSent:d.loaded};else{for(e=!0,f=100,h=0,k=a.length;k>h;h++)b=a[h],(100!==b.upload.progress||b.upload.bytesSent!==b.upload.total)&&(e=!1),b.upload.progress=f,b.upload.bytesSent=b.upload.total;if(e)return}for(m=[],i=0,l=a.length;l>i;i++)b=a[i],m.push(c.emit("uploadprogress",b,f,b.upload.bytesSent));return m}}(this),w.onload=function(b){return function(d){var e;if(a[0].status!==c.CANCELED&&4===w.readyState){if(s=w.responseText,w.getResponseHeader("content-type")&&~w.getResponseHeader("content-type").indexOf("application/json"))try{s=JSON.parse(s)}catch(f){d=f,s="Invalid JSON response from server."}return t(),200<=(e=w.status)&&300>e?b._finished(a,s,d):g()}}}(this),w.onerror=function(){return function(){return a[0].status!==c.CANCELED?g():void 0}}(this),r=null!=(G=w.upload)?G:w,r.onprogress=t,j={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"},this.options.headers&&d(j,this.options.headers);for(h in j)i=j[h],i&&w.setRequestHeader(h,i);if(f=new FormData,this.options.params){H=this.options.params;for(o in H)v=H[o],f.append(o,v)}for(y=0,C=a.length;C>y;y++)b=a[y],this.emit("sending",b,w,f);if(this.options.uploadMultiple&&this.emit("sendingmultiple",a,w,f),"FORM"===this.element.tagName)for(I=this.element.querySelectorAll("input, textarea, select, button"),z=0,D=I.length;D>z;z++)if(l=I[z],m=l.getAttribute("name"),n=l.getAttribute("type"),"SELECT"===l.tagName&&l.hasAttribute("multiple"))for(J=l.options,A=0,E=J.length;E>A;A++)q=J[A],q.selected&&f.append(m,q.value);else(!n||"checkbox"!==(K=n.toLowerCase())&&"radio"!==K||l.checked)&&f.append(m,l.value);for(k=F=0,L=a.length-1;L>=0?L>=F:F>=L;k=L>=0?++F:--F)f.append(this._getParamName(k),a[k],this._renameFilename(a[k].name));return this.submitRequest(w,f,a)},c.prototype.submitRequest=function(a,b){return a.send(b)},c.prototype._finished=function(a,b,d){var e,f,g;for(f=0,g=a.length;g>f;f++)e=a[f],e.status=c.SUCCESS,this.emit("success",e,b,d),this.emit("complete",e);return this.options.uploadMultiple&&(this.emit("successmultiple",a,b,d),this.emit("completemultiple",a)),this.options.autoProcessQueue?this.processQueue():void 0},c.prototype._errorProcessing=function(a,b,d){var e,f,g;for(f=0,g=a.length;g>f;f++)e=a[f],e.status=c.ERROR,this.emit("error",e,b,d),this.emit("complete",e);return this.options.uploadMultiple&&(this.emit("errormultiple",a,b,d),this.emit("completemultiple",a)),this.options.autoProcessQueue?this.processQueue():void 0},c}(b),a.version="4.3.0",a.options={},a.optionsForElement=function(b){return b.getAttribute("id")?a.options[c(b.getAttribute("id"))]:void 0},a.instances=[],a.forElement=function(a){if("string"==typeof a&&(a=document.querySelector(a)),null==(null!=a?a.dropzone:void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");return a.dropzone},a.autoDiscover=!0,a.discover=function(){var b,c,d,e,f,g;for(document.querySelectorAll?d=document.querySelectorAll(".dropzone"):(d=[],b=function(a){var b,c,e,f;for(f=[],c=0,e=a.length;e>c;c++)b=a[c],f.push(/(^| )dropzone($| )/.test(b.className)?d.push(b):void 0);return f},b(document.getElementsByTagName("div")),b(document.getElementsByTagName("form"))),g=[],e=0,f=d.length;f>e;e++)c=d[e],g.push(a.optionsForElement(c)!==!1?new a(c):void 0);return g},a.blacklistedBrowsers=[/opera.*Macintosh.*version\/12/i],a.isBrowserSupported=function(){var b,c,d,e,f;if(b=!0,window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector)if("classList"in document.createElement("a"))for(f=a.blacklistedBrowsers,d=0,e=f.length;e>d;d++)c=f[d],c.test(navigator.userAgent)&&(b=!1);else b=!1;else b=!1;return b},h=function(a,b){var c,d,e,f;for(f=[],d=0,e=a.length;e>d;d++)c=a[d],c!==b&&f.push(c);return f},c=function(a){return a.replace(/[\-_](\w)/g,function(a){return a.charAt(1).toUpperCase()})},a.createElement=function(a){var b;return b=document.createElement("div"),b.innerHTML=a,b.childNodes[0]},a.elementInside=function(a,b){if(a===b)return!0;for(;a=a.parentNode;)if(a===b)return!0;return!1},a.getElement=function(a,b){var c;if("string"==typeof a?c=document.querySelector(a):null!=a.nodeType&&(c=a),null==c)throw new Error("Invalid `"+b+"` option provided. Please provide a CSS selector or a plain HTML element.");return c},a.getElements=function(a,b){var c,d,e,f,g,h,i,j;if(a instanceof Array){e=[];try{for(f=0,h=a.length;h>f;f++)d=a[f],e.push(this.getElement(d,b))}catch(k){c=k,e=null}}else if("string"==typeof a)for(e=[],j=document.querySelectorAll(a),g=0,i=j.length;i>g;g++)d=j[g],e.push(d);else null!=a.nodeType&&(e=[a]);if(null==e||!e.length)throw new Error("Invalid `"+b+"` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");return e},a.confirm=function(a,b,c){return window.confirm(a)?b():null!=c?c():void 0},a.isValidFile=function(a,b){var c,d,e,f,g;if(!b)return!0;for(b=b.split(","),d=a.type,c=d.replace(/\/.*$/,""),f=0,g=b.length;g>f;f++)if(e=b[f],e=e.trim(),"."===e.charAt(0)){if(-1!==a.name.toLowerCase().indexOf(e.toLowerCase(),a.name.length-e.length))return!0}else if(/\/\*$/.test(e)){if(c===e.replace(/\/.*$/,""))return!0
}else if(d===e)return!0;return!1},"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.fn.dropzone=function(b){return this.each(function(){return new a(this,b)})}),"undefined"!=typeof module&&null!==module?module.exports=a:window.Dropzone=a,a.ADDED="added",a.QUEUED="queued",a.ACCEPTED=a.QUEUED,a.UPLOADING="uploading",a.PROCESSING=a.UPLOADING,a.CANCELED="canceled",a.ERROR="error",a.SUCCESS="success",e=function(a){var b,c,d,e,f,g,h,i,j,k;for(h=a.naturalWidth,g=a.naturalHeight,c=document.createElement("canvas"),c.width=1,c.height=g,d=c.getContext("2d"),d.drawImage(a,0,0),e=d.getImageData(0,0,1,g).data,k=0,f=g,i=g;i>k;)b=e[4*(i-1)+3],0===b?f=i:k=i,i=f+k>>1;return j=i/g,0===j?1:j},f=function(a,b,c,d,f,g,h,i,j,k){var l;return l=e(b),a.drawImage(b,c,d,f,g,h,i,j,k/l)},d=function(a,b){var c,d,e,f,g,h,i,j,k;if(e=!1,k=!0,d=a.document,j=d.documentElement,c=d.addEventListener?"addEventListener":"attachEvent",i=d.addEventListener?"removeEventListener":"detachEvent",h=d.addEventListener?"":"on",f=function(c){return"readystatechange"!==c.type||"complete"===d.readyState?(("load"===c.type?a:d)[i](h+c.type,f,!1),!e&&(e=!0)?b.call(a,c.type||c):void 0):void 0},g=function(){var a;try{j.doScroll("left")}catch(b){return a=b,void setTimeout(g,50)}return f("poll")},"complete"!==d.readyState){if(d.createEventObject&&j.doScroll){try{k=!a.frameElement}catch(l){}k&&g()}return d[c](h+"DOMContentLoaded",f,!1),d[c](h+"readystatechange",f,!1),a[c](h+"load",f,!1)}},a._autoDiscoverFunction=function(){return a.autoDiscover?a.discover():void 0},d(window,a._autoDiscoverFunction)}).call(this);
'use strict';

app.directive("aboutUs", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/aboutUs/aboutUs.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
'use strict';

app.directive("appDialog", [function () {
    return {
        restrict: 'E',
        scope: {
            btnType: '='
        },
        templateUrl: "modules/appDialog/dialog.html",
        link: function (scope, element, attrs) {
            scope.$root.appDialog = {
                open: function (title, content) {
                    scope.dialogTitle = title;
                    scope.dialogContent = content;
                    //console.log($("#js-dialog").html());
                    $(element).find(".js_dialog").show();
                }
            };

            scope.close = function (type) {
                $(element).find(".js_dialog").hide();
                scope.btnType = type;
            }
        }
    };
}]);
'use strict';

app.directive("activity", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/activity/activity.html",
        link: function (scope, element, attrs) {
            if($location.search().activity == undefined){
                scope.activity = "";
            }else {
                scope.activity = $location.search().activity;
            }
        }
    };
}]);
'use strict';

app.directive("autoNumber", ["$cookieStore", '$http', function ($cookieStore, $http) {
    return {
        restrict: 'E',
        templateUrl: "modules/autoNumber/autoNumber.html",
        link: function (scope, element, attrs) {

            scope.rechs = function (index, len) {
                var randIndex = parseInt(Math.random() * len);
                if (randIndex !== index) {
                    return randIndex;
                } else {
                    console.log(index, len);
                    return rechs(index, len);
                }
            };

            $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
                var _data = [];
                var inputData1 = [];
                $.each(eval(data), function (i, k) {
                    if (k.s <= 800) {
                        if (k.t == 0) {
                            _data.push(k);
                        }
                    }
                });

                $.each(_data, function (i, k) {
                    if (k.fee == 0) {
                        inputData1.push(k);
                    }
                });

                scope.$watch('_mainNumber', function (n, o, scope) {
                    if (n !== o && n !== undefined) {
                        var index1 = scope.rechs(getIndex(inputData1, 'n', n), inputData1.length - 2);
                        var index2 = index1 + 1;
                        scope.subNumber = inputData1[index1].n;
                        scope.thirdNumber = inputData1[index2].n;
                    }
                })
            });
        }
    };
}]);
'use strict';

app.directive("cardPkg", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'C',
        scope:{
            ssDd:"="
        },
        templateUrl: "modules/cardPackage/cardPkg.html",
        link: function (scope, element, attrs) {
                scope.openCardPkg=function(targetId){
                    var targetHtml = $("#" + targetId).html();
                    scope.$root.Overlay.open(targetHtml);
            }
        }
    };

}]);
'use strict';

app.directive("buyers", ['$interval', function ($interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/buyers/buyers.html",
        link: function (scope, element, attrs) {
            scope.productType = attrs.type;
            scope.getBuyers = function () {
                var getBuyers = new Array();
                for (var i = 0; i < 4; i++) {
                    var obj = {
                        name: getRandomName(),
                        phone: getRandomPhone(),
                        pkg: getRandomPkg(),
                        time: getRanDomTime(),
                        product: getRandomProduct()
                    };
                    getBuyers.push(obj);
                }
                return getBuyers;
            };

            scope.buyers = scope.getBuyers();

            $interval(function () {
                scope.buyers = scope.getBuyers();
            }, 1000);
        }
    };
}]);
'use strict';

app.directive("chooseNumber", ["$compile", function ($compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/chooseNumber/chooseNumber.html",
        controller: "chooseNumberController",
        link: function (scope, element) {
            //scope.pageClass = "hide-checkbox";
            $compile($(".number-list").clone().appendTo(".page"))(scope);
            $(".choose-number .number-list").remove();

            var $span = $("#number-select span");
            var $numberList = $(".number-list");
            var $table = $numberList.find("table");
            var $lastNumberSpan = $("#number-select span:last-child");

            scope.currNumberIndex = 3;

            scope.closeNumberList = function () {
                $numberList.slideUp();
            };

            scope.selectNumber = function (k, e) {
                if ($(e.target).hasClass("active")) {
                    var j, numLast, number;
                    $span.eq(scope.currNumberIndex).attr("date-value", k);
                    $span.eq(scope.currNumberIndex).html(k);
                    $span.eq(scope.currNumberIndex).attr("class", "old");
                    $span.eq(scope.currNumberIndex + 1).attr("class", "curr");
                    if (scope.currNumberIndex < 10) {
                        scope.showPickNumberPanel(scope.currNumberIndex + 1, 'selectNumber');
                        $("#num-sure").removeClass("active");
                        $("#num-reset").removeClass("active");
                        return true;
                    }
                    if (scope.currNumberIndex == 10) {
                        numLast = "";
                        for (j = 0; j < 11; j++) {
                            numLast = numLast + $span.eq(j).attr("date-value");
                        }
                        number = numLast;
                        scope.phoneNumber = number;

                        $("#num-sure").addClass("active");
                        $("#num-reset").addClass("active");
                        $numberList.slideUp();
                    }
                } else {
                    return false;
                }

            };

            scope.showPickNumberPanel = function (pos, isWrite) {
                var i, numNow;
                numNow = "";
                scope.currNumberIndex = pos;

                $span.eq(pos).nextAll("span").attr("class", "future");
                $span.eq(pos - 1).nextAll("span").html("?");
                $span.eq(pos - 1).nextAll("span").attr("date-value", "");
                $table.find("td").find("a").attr("class", "");
                for (i = 0; i < pos; i++) {
                    numNow = numNow + $span.eq(i).attr("date-value");
                }
                var jsonDs = getNumArr(numNow, scope.phoneData);
                $table.find("td").find("a").removeClass("active");
                if ($span.eq(i - 1).attr("date-value") == "") {
                    return false;
                } else {
                    $span.eq(pos).attr("class", "curr");
                    $.each(eval(jsonDs), function (v, k) {
                        if (k == 0) {
                            $table.find("td").eq(10).find("a").attr("class", "active");
                        } else {
                            $table.find("td").eq(k - 1).find("a").attr("class", "active");
                        }
                    });
                    $numberList.slideDown();
                    //如果是输入号码，不需要记录行为 
                    if (isWrite != 'selectNumber') {
                        writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    }
                }
            };

            scope.checkPhone = function () {
                if (!$lastNumberSpan.hasClass("old")) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    //console.log(scope.currNumberIndex);
                    scope.showPickNumberPanel(scope.currNumberIndex);
                    return false;
                }
                return true;
            };

            scope.reChooseNumber = function () {
                scope.showPickNumberPanel(3, 'selectNumber');
                writebdLog(scope.category, "_AgainNumber", "渠道号", scope.gh);//重新选号
            };

            scope.$watch('phoneData', function (newVal, oldVal, scope) {
                if (newVal !== oldVal) {
                    //scope.showPickNumberPanel(3);
                }
            }, true);
        }
    };
}]).controller('chooseNumberController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $.each(eval(data), function (i, k) {
            if (!k.t) {
                $scope.phoneData.push(k);
            }
        });
        //$scope.showPickNumberPanel(3);
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("copyRight", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        replace:true,
        scope:{},
        templateUrl: "modules/copyRight/copyRight.html",
        link: function (scope, element, attrs) {
            scope.content = attrs.content;
        }
    };
}]);
'use strict';

app.directive("ngCoupon", ['$location', '$interval', '$http', '$cookieStore', '$timeout', function ($location, $interval, $http, $cookieStore, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/coupon/coupon.html",
        link: function (scope, element, attrs) {
            scope.showPhones = false;
            scope.$root.paracont = "获取手机验证码";
            scope.$root.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.showFudai = function (couponType) {
                scope.couponType = couponType;
                var targetHtml = $("#wxQrCode").html();
                scope.Overlay.openCompile(targetHtml);
                writebdLog(scope.category, "_ShowCouponBar", "渠道号", scope.gh); //展示领券栏
            };

            if ($location.search().gh !== undefined) {//判断是否需要执行showFudai;
                if ($location.search().gh.indexOf("yjtth5") != -1 && $location.path() === "/phone/active/A") {
                    scope.showFudai('JM-MX');
                }
                if ($location.search().gh.indexOf("wxword") != -1 && $location.path() === "/phone/active/A") {
                    scope.showFudai('JM-MX');
                }
            }


            if ($location.search().fromsearch !== undefined) {
                if ($location.search().fromsearch == 1) {
                    scope.showPhones = true;
                    $timeout(function () {
                        var $container = $('.content-scrollable');
                        var $scrollTo = $('.hot-phone');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }, 500);
                }
            }

            scope.$root.shareQuan = function () {
                scope.showShare();
                writebdLog(scope.category, "_Share", "渠道号", scope.gh); //点击分享
            };

            var homeArgs = ['_InputIndexCode', '_InputIndexNumber'];
            //记录落地页输入的操作
            scope.$root.inputHomeArgs = function (type) {
                writebdLog(scope.category, homeArgs[type], "渠道号", scope.gh); //输入操作
            };

            scope.$root.getQuan = function (couponType) {
                scope.toast.open();
                if (!scope.$root.checkCouponMobile()) {
                    scope.toast.close();
                    scope.dialog.open("系统提示", "请输入正确的手机号码！");
                    return false;
                }

                if (!scope.$root.checkCouponActiveCode()) {
                    scope.toast.close();
                    scope.dialog.open("系统提示", "请输入正确的验证码！");
                    return false;
                }

                var headCategory = $location.search().headCategory;
                var category = scope.category;
                if (headCategory != undefined && headCategory != null)
                    category = headCategory;


                $http.jsonp(cfApi.apiHost + '/product/doReceiveMultipleCoupon.html?recieverMobile=' + scope.coupon.mobile + '&couponType=' + scope.couponType + '&gh=' + scope.gh + '&activity=' + scope.activity + '&category=' + category + '&callbackUrl=' + encodeURI(scope.homeUrl + '?gh=' + scope.gh + '&activity=' + scope.activity) + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                    if (!(scope.activePage == 'hotPhones')) {
                        scope.receiver.mobile = scope.coupon.mobile;
                        scope.activeCode = scope.coupon.activeCode;
                    } else {
                        $cookieStore.put('receiver', {
                            name: '',
                            mobile: scope.coupon.mobile,
                            city: '',
                            room: ''
                        });
                        $cookieStore.put('activeCode',scope.coupon.activeCode);
                    }
                    scope.toast.close();
                    scope.$root.apiCode = 0;
                    if (data[0].resultCode == 0) {
                        $(".quan-result").removeClass("hide");
                        $(".quan-form").addClass("hide");
                        $(".fudai-1").hide();
                        $(".fudai-2").show();

                        scope.$root.gettedCoupon = true;
                        //scope.showPhones=true;
                        $cookieStore.put("couponStore", $cookieStore.get("couponStore") - 1);

                        scope.couponStore = $cookieStore.get("couponStore") - 1;

                        writebdLog(scope.category, "_ReceiveCoupons", "渠道号", scope.gh); //领券成功
                    } else {
                        $(".quan-error").removeClass("hide");
                        $(".quan-form").addClass("hide");
                        $(".fudai-1").hide();
                        $(".fudai-3").show();
                        //scope.dialog.open("系统提示", data[0].resultMsg);
                    }
                }).error(function (data, status, headers, config) {
                    console.log(status);
                    //deferred.reject(status)
                });

                writebdLog(scope.category, "_ClickCoupons", "渠道号", scope.gh); //点击领券
            };

            scope.$root.usingQuan = function () {
                scope.showPhones = true;
                scope.Overlay.close();

                writebdLog(scope.category, "_UseCoupons", "渠道号", scope.gh); //使用我的优惠券

                if (scope.activePage == 'index') {
                    $location.path('/phone/active/A/phones');
                } else if (scope.activePage == 'hotPhones') {
                    var $container = $('.content-scrollable');
                    var $scrollTo = $('#hotPhone');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                } else {
                    var $container = $('.content-scrollable');
                    var $scrollTo = $('#receiverAddress');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                }
            };

            scope.$root.checkCouponMobile = function () {
                $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.couponForm.couponMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                }

                return true;
            };

            scope.$root.getCouponActiveCode = function (event, phoneNumber) {
                if ($(event.currentTarget).hasClass("not")) {
                    //scope.toast.close();
                    return false;
                }

                scope.toast.openUnLimit();

                if (!scope.$root.checkCouponMobile()) {
                    scope.toast.close();
                    scope.dialog.open("系统提示", "请输入正确的手机号码！");
                    return false;
                }
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    if (data == "") {
                        scope.toast.close();
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.$root.paracont = "重新获取验证码";
                                scope.$root.paraclass = "but_null";
                            } else {
                                scope.$root.paracont = second + "秒后可重发";
                                scope.$root.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariIndexCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkCouponActiveCode = function () {
                if (!scope.couponForm.couponActiveCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.coupon.mobile, scope.coupon.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    return true;
                }
            };


        }
    };
}]);
'use strict';

app.directive("jsDialog", [function () {
    return {
        restrict: 'E',
        templateUrl: "modules/dialog/dialog.html",
        link: function (scope, element, attrs) {
            scope.$root.dialog = {
                open: function (title, content) {
                    scope.dialogTitle = title;
                    scope.dialogContent = content;
                    //console.log($("#js-dialog").html());
                    $(element).find(".js_dialog").show();
                },
                close: function (url) {
                    $(element).find(".js_dialog").hide();
                }
            };
        }
    };
}]);
'use strict';

app.directive("flowFqa", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/flowFqa/flowFqa.html",
        link: function (scope, element, attrs) {
        }
    };
}]);
'use strict';

app.directive("flowPackage", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/flowPackage/flowPackage.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;

            //获取选择框尺码
            scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            //获取套餐列表


            $http.get(baseApiUri + '/getFlowPackages').success(function (data) {
                scope.flowPackageList = data;

                //设置默认选中项 start
                scope.flowPackageItem = data[3];
                //end
            });

            /*$http.get('/data/flowPackage.json').success(function (data) {
             scope.flowPackageList = data;

             //设置默认选中项 start
             scope.flowPackageItem = data[3];
             //end
             });*/

            //选择号码 对象类型
            scope.setFlowPackage = function (event, flowPackageItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.flowPackageItem = flowPackageItem;
                writebdLog(scope.category, "_SelectPackage", "渠道号", scope.gh);//优惠套餐
            };

            scope.$watch('flowPackageItem', function (nv, ov, scope) {
                if (nv != ov) {
                    if(scope.mifi){
                        scope.mainPrice = parseInt(scope.mifi.price) + parseInt(scope.flowPackageItem.p);
                    }else {
                        scope.mainPrice = nv.p;
                    }
                }
            });
        }
    };
}]);
'use strict';

app.directive("footerNav", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/footerNav.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $lastNumberSpan = $("#number-select span:last-child");
            var $scrollTo;

            var searchType = attrs.searchType;

            scope.priceType = attrs.priceType;

            if (searchType == "phone") {
                scope.orderURL = "http://m.gd189fq.com/wap/customer/searchIndexA.html?s=wap";
            } else {
                scope.orderURL = "http://m.gd189fq.com/yfqcz/#/purchaseOrderList?redirect_uri=http://app.yfq.cn";
            }

            scope.checks = eval(attrs.checks);

            scope.getSearch = function () {
                //console.log(scope.appType);
                writebdLog(scope.category, "_OrderQuery", "渠道号", scope.gh);//订单查询
            };

            scope.getContent = function () {
                getMeiqia();
                //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };

            scope.submitForm = function (event,type) {
                event.preventDefault();
                if (attrs.checkPhone == "true") {
                    if (scope.checkPhone()) {
                        //writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    } else {
                        $scrollTo = $('#numberPanel');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() -50
                        });
                        return false;
                    }
                }
                if (scope.checkAddress()) {
                    //writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                    if (scope.$root.checkActiveCode()) {
                        writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                        scope.$root.toast.open();
                        if(scope.payType == 2){
                            scope.showHuOverLay("payTipsPanel");
                            return false;
                        }else {
                            $form.submit();
                        }
                    }else {
                        $scrollTo = $('#receiverAddress');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }
                } else {
                    $scrollTo = $('#receiverAddress');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                }
            }
        }
    };
}]);

'use strict';

app.directive("footerNavNew", ['$http', '$cookieStore', function ($http, $cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/footerNav.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $lastNumberSpan = $("#number-select span:last-child");
            var $scrollTo;

            var searchType = attrs.searchType;

            scope.priceType = attrs.priceType;

            if (searchType == "phone") {
                scope.orderURL = "http://m.gd189fq.com/wap/customer/searchIndexA.html?s=wap";
            } else {
                scope.orderURL = "http://m.gd189fq.com/yfqcz/#/purchaseOrderList?redirect_uri=http://app.yfq.cn";
            }

            scope.payTypeName = "下一步";

            if (attrs.payTypeName) {
                scope.payTypeName = attrs.payTypeName;
            }

            scope.checks = eval(attrs.checks);

            scope.getSearch = function () {
                //console.log(scope.appType);
                writebdLog(scope.category, "_OrderQuery", "渠道号", scope.gh);//订单查询
            };

            scope.getContent = function () {
                getMeiqia();
                //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };

            function checkPhoneNumber() {
                if (!scope.checkoutForm.phoneNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    //console.log(scope.currNumberIndex);
                    //scope.npShow();
                    return false;
                }
                return true;
            }

            scope.submitForm = function (event) {
                if (scope.checkPhone()) {
                    scope.orderState = {
                        machineId: scope.phone.productId,
                        productId: scope.pkg.productId,
                        color: scope.color.colorName,
                        phoneNumber: scope.phoneNumber,
                        price: scope.mainPrice,
                        category: scope.category
                    };
                    $cookieStore.put("orderState", scope.orderState);
                    writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//下一步
                    scope.$root.toast.open();
                    //$form.submit();
                } else {
                    event.preventDefault();
                    scope.npShow(1);
                }
            }
        }
    };
}]);

'use strict';

app.directive("footerNavRb", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/footerNavRb.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $scrollTo;

            scope.orderSearchUrl = attrs.orderSearchUrl;

            scope.cod = attrs.cod;
            scope.codName = "货到付款";
            scope.payTypeName = "立即支付";

            scope.getSearch = function () {
                //console.log(scope.appType);
                writebdLog(scope.category, "_OrderQuery", "渠道号", scope.gh);//订单查询
            };

            scope.getContent = function () {
                getMeiqia();
                //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };

            scope.submitForm = function (event, type) {
                event.preventDefault();
                if (attrs.checkPhone == "true") {
                    if (scope.checkPhone()) {
                        //writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    } else {
                        $scrollTo = $("#phoneQuery");
                        //console.log($scrollTo);
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                        return false;
                    }
                }
                if (attrs.checkAddress == "true") {
                    if (scope.checkAddress()) {
                        //writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                        if (scope.$root.checkActiveCode()) {
                            writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                            scope.$root.toast.open();

                            if (type == 1) {
                                //scope.formAction = "http://m.yfq.cn/wap/taokafanghaoNew/uploadCard.html";
                                $form.attr("action",cfApi.apiHost + "/wap/taokafanghaoNew/uploadCardB.html");
                            } else if (type == 0) {
                                //scope.formAction = "http://m.yfq.cn/wap/taokafanghaoNew/submitOrder.html";
                                $form.attr("action",cfApi.apiHost + "/wap/taokafanghaoNew/submitOrderSingle.html");
                            }

                            //console.log(scope.formAction);

                            $form.submit();

                        } else {
                            $scrollTo = $('#receiverAddress');
                            $container.animate({
                                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                            });
                        }
                    } else {
                        $scrollTo = $('#receiverAddress');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }
                }
            }
        }
    };
}]);

/*
'use strict';

app.directive("getContact", ['$location', function ($location) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {

            scope.getContact = function () {
                getMeiqia();
                //$("#contactUs").show();
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
            };
        }
    };
}]);*/

'use strict';

app.directive("gh", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/gh/gh.html",
        link: function (scope, element, attrs) {
            if ($location.search().gh == undefined) {
                scope.gh = "";
            } else {
                scope.gh = $location.search().gh;
            }
        }
    };
}]);
'use strict';

app.directive("goTop", ['$cookieStore', '$timeout', function ($cookieStore, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/goTop/goTop.html",
        link: function (scope, element, attrs) {
            var $scrollContainer = $(".content-scrollable");
            scope.goTop = function () {
                $scrollContainer.animate({
                    scrollTop: 0
                });
            }
        }
    };
}]);
'use strict';

app.directive("a", ['$location', function ($location) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var _params = $location.search();
            var _href = attrs.href;
            var _hash;
            var i = 0;

            if (_href) {
                //console.log(_href);
                $.each(_params, function (name, key) {
                    if (i == 0) {
                        //console.log(_href);
                        _hash = "?" + name + "=" + key;
                        if (_href.indexOf("?") != -1) {
                            _hash = "&" + name + "=" + key;
                        }
                    } else {
                        _hash = _hash + "&" + name + "=" + key;
                    }
                    i++;
                });
                scope.hash = _hash;
                if (_href != "javascript:;" && scope.hash != undefined && attrs.hasHash != "false") {
                    element.attr("href", _href + scope.hash);
                }
            }
        }
    };
}]);
'use strict';

app.directive("historyScrollTop", ['$cookieStore', '$timeout', function ($cookieStore, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var $scrollContainer = $(".content-scrollable");
            $scrollContainer.on('scroll', function () {
                $cookieStore.put('historyScrollTop', $(element).scrollTop());
            });
            if ($cookieStore.get('historyScrollTop')) {
                $timeout(function () {
                    $scrollContainer.animate({
                        scrollTop: $cookieStore.get('historyScrollTop')
                    });
                }, 700);
            } else {
            }
        }
    };
}]);
'use strict';

app.directive("inputQuery", function () {
    return {
        restrict: 'E',
        templateUrl: "modules/inputQuery/inputQuery.html",
        controller: "inputQueryController",
        link: function (scope, element, attrs) {

            //选择号码 对象类型
            scope.setNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.numberItem = numberItem;
            };

            //监视号码数据变动
            scope.$watch('phoneData', function (newVal, oldVal, scope) {
                if (newVal !== oldVal) {
                    //console.log(newVal);
                }
            }, true);
        }
    };
}).controller('inputQueryController', ['$scope', '$cookieStore', '$http', function ($scope, $cookieStore, $http) {
    $scope.phoneData = new Array();
    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $.each(eval(data), function (i, k) {
            if (k.t) {
                $scope.phoneData.push(k);
            }
        });
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });
}]);
'use strict';

app.directive("mifi", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/mifi/mifi.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.mifiTitle = attrs.title;
            scope.mifiSubTitle = attrs.subTitle;

            //获取套餐列表

            $http.get('/data/mifis.json').success(function (data) {
                scope.mifis = data;

            });

            scope.$root.disabledSim = function(index,status){
                var $simItem = $(".sim-type-lists").find(".item-box");
                if(status){
                    $simItem.eq(index).addClass("disabled");
                }else {
                    $simItem.eq(index).removeClass("disabled");
                }
            };

            //选择号码 对象类型
            scope.setMifi = function (event, mifi) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if(!$this.hasClass("curr")){//选择MIFI
                    scope.mifi = mifi;
                    scope.mainPrice = parseInt(mifi.price) + parseInt(scope.flowPackageItem.p);
                    $this.addClass('curr');
                    scope.$root.setSimType(event, 1, scope.simList[1]);
                    scope.$root.disabledSim(0,true);
                    writebdLog(scope.category, "_SelectMifi", "渠道号", scope.gh);
                }else {//取消MIFI
                    scope.mifi = false;
                    scope.$root.disabledSim(0,false);
                    scope.mainPrice = scope.flowPackageItem.p;
                    $this.removeClass('curr');
                    writebdLog(scope.category, "_CancelMifi", "渠道号", scope.gh);
                }
            };
        }
    };
}]);
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
                picUrl:'http://app.yfq.cn/images/active/share_active.jpg'
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
                $http.jsonp(cfApi.apiHost + "/product/getWxParameter.html?shareUrl=" + shareUrl + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
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

            scope.$watch('share',function (n,o,scope) {

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
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });

                var share_obj = new nativeShare('nativeShare', config);
            },true);
        }
    };
}]);
'use strict';

app.directive("topNav", ['$timeout', '$document', '$window', function ($timeout, $document, $window) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/nav/nav.html",
        link: function (scope, element, attrs) {

            scope.navVisibility = attrs.navVisibility;

            scope.navClass == "black";

            if (attrs.navClass) {//如果 navClass 存在
                scope.navClass = attrs.navClass;
            }

            scope.pageTitle = attrs.pageTitle;
            scope.$root.title = scope.pageTitle;
            scope.pageBack = attrs.pageBack;
            scope.pageDone = attrs.pageDone;
            scope.homeUrl = attrs.homeUrl;

            if ($window.history.length == 1) {
                scope.pageBack = "home";
            }

            scope.home = function () {
                $window.location.href = 'http://' + $window.location.host + scope.homeUrl + $window.location.search;
            };

            scope.back = function () {
                history.back();
            };

            scope.done = function () {

            };

            scope.getContact = function () {
                getMeiqia();
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };
        }
    };
}]);
app.directive('onFinish', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
}]);
'use strict';

app.directive("overlay", ['$http', '$compile', '$timeout', function ($http, $compile, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/overlay/overlay.html",
        link: function (scope, element, attrs) {
            var $overlayHook = $("#overlay-hook");
            var $container = $("#container");
            scope.$root.Overlay = {
                open: function (template) {//template,需要传入的html
                    //console.log(scope.simList);
                    $overlayHook.html(template);
                    $container.addClass("overlay-open");
                },
                openCompile: function (template) {
                    //console.log(scope.simList);
                    $compile($overlayHook.html(template))(scope);
                    $container.addClass("overlay-open");
                },
                close: function () {
                    $container.removeClass("overlay-open");
                    $overlayHook.html("");
                }
            };
            $(document).on('click', '.js-close-overlay', function () {
                scope.$root.Overlay.close();
            })
        }
    };
}]);
'use strict';

app.directive("owlCarousel", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'C',
        templateUrl: "modules/owlCarousel/owlCarousel.html",
        scope: {
            imgUrls: '='
        },
        link: function (scope, element, attrs) {

        }
    };
}]).directive("carouselItem", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (scope.$last) {
                $(element).parent().owlCarousel({
                    navigation: true, // Show next and prev buttons
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    singleItem: true,
                    autoPlay: 3000
                });
            }
        }
    };
}]);
'use strict';

app.directive("payType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTypeTitle = attrs.title;
            scope.payTypeSubTitle = attrs.subTitle;
            scope.class = attrs.addClass;
            //设置本模块的显示隐藏
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            var $form = $(attrs.submit);

            //默认赋值
            //scope.payType = 1;

            //设置默认payType;
            scope.setDefaultPayType = function (type) {
                scope.payType = type;
            };

            //获取地址栏支付方式的参数
            var _payType = $location.search().payType;

            //判断是否有带支付方式参数，如果有，更改默认支付方式;
            if (_payType) {
                scope.payType = _payType;
            }

            //选择支付方式

            scope.setPayType = function (event, type) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    if (scope.checkAddress()) {
                        if (scope.$root.checkActiveCode()) {
                            $("#payType").val(type);
                            if (type == 2) {
                                scope.showOverLay("payTipsPanel");
                            } else {
                                scope.$root.toast.open();
                                scope.$root.toast.open();
                                //$form.submit();
                                scope.$root.submitForm();
                            }
                        }
                    } else {
                        var $scrollTo = $('#receiverAddress');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }
                }
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.openCompile(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };

            scope.showHuOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.openCompile(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };

            scope.$root.tipsSubmit = function () {
                if (scope.$root.checkActiveCode()) {
                    scope.$root.toast.open();
                    //$form.submit();
                    scope.$root.submitForm();
                } else {
                    scope.$root.Overlay.close();
                }
            };

            scope.$root.submitForm = function () {
                var type = $("#payType").val();
                var value;
                if (type == 0) {
                    value = "_payAll";
                }
                if (type == 2) {
                    value = "_payMonthly";
                }
                if (type == 1) {
                    value = "_payCOD";
                }
                writebdLog(scope.category, value, "渠道号", scope.gh);//支付方式
                $form.submit();
            };


            /*$("#container").on("click",".btn-twitter",function () {
             scope.$root.Overlay.close;
             $form.submit();
             });*/
            /*scope.setPayType = function (event, type) {
             event.preventDefault();
             var $this = $(event.currentTarget);
             if ($this.hasClass("disabled")) {
             return false;
             } else {
             $this.parent().siblings().children().removeClass('curr');
             $this.addClass('curr');
             scope.payType = type;
             }
             };*/
        }
    };
}]);
'use strict';

app.directive("passport", function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/passport/passport.html",
        controller: "passportController",
        link: function (scope, element) {
        }
    }
}).controller('passportController',['$scope', '$cookieStore', function($scope,$cookieStore) {
    var receiverWatch = $scope.$watch('passport', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $cookieStore.put('passport',newVal);
        }
    },true);
}]);
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
                    scope.color = colors[getIndex(colors, "selected", "curr")];
                    //console.log(getIndex(colors, "selected", "curr"));

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
                    writebdLog(scope.category, "_FuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };

            scope.dialogShow = function (title, content) {
                //console.log("1");
                scope.$root.dialog.open(title, content);
            };

            scope.$watch('productId', function (n, o, scope) {//临时解决方案
                if (n != o && scope.colors) {
                    if (n == 256 || n==257) {
                        scope.colors[0].selected = "disabled";
                        $("#color0").removeClass("curr");
                        if (scope.color.colorName == "亮黑色") {
                            var _index = getIndex(scope.colors, "colorName", "黑色");
                            scope.color = scope.colors[_index];
                            $("#color" + _index).addClass("curr");
                            scope.dialogShow("", "'亮黑色'暂时没货，帮您换成了黑色，或者您可以重新选择");
                            //return;
                        }
                    } else {
                        scope.colors[0].selected = "";
                    }
                }
            });
        }
    };
}]);
'use strict';

app.directive("phonePackage", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/phonePackage.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class=attrs.addClass;
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            //选择号码 对象类型
            scope.setPhonePackage = function (event, pkg) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if($this.hasClass("curr")){
                    return false;
                }
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.pkg = pkg;
                writebdLog(scope.category,"_SelectPackage","渠道号",scope.gh);//选择套餐
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };
        }
    };
}]);
'use strict';

app.directive("phoneStorages", ['$http', 'Phone', function ($http, Phone) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneStorages/phoneStorages.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.storageTitle = attrs.title;
            scope.storageSubTitle = attrs.subTitle;

            //scope.size = attrs.size;

            //选择号码 对象类型
            scope.setPhoneStorage = function (event, storage) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.productId = storage.productId;
                    writebdLog(scope.category,"_FuselageMemory","渠道号",scope.gh);//选择机身内存
                }
            };
        }
    };
}]);
'use strict';

app.directive("phoneTypes", ['$http', 'Phone', function ($http, Phone) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneTypes/phoneTypes.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.phoneTypeTitle = attrs.title;
            scope.phoneTypeSubTitle = attrs.subTitle;

            scope.showDetails = attrs.phoneDetails;

            //scope.size = attrs.size;

            //选择号码 对象类型
            scope.setPhoneType = function (event, phoneType) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.productId = phoneType.productId;
                    writebdLog(scope.category,"_SelectVersion","渠道号",scope.gh);//选择版本
                }
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsPhone", "渠道号", scope.gh);//了解iPhone7
            };
        }
    };
}]);
app.directive("productDetails", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/productDetails/productDetails.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
app.directive("productHeader", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/productHeader/productHeader.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
'use strict';

app.directive("receiverAddress", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/receiverAddress.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber, e) {
                if ($(e.currentTarget).hasClass("not")) {
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                if (attrs.start) {
                    getArea('广东省', 1, '广东省', '', "");
                    stockShow();
                    dataAreaShow(1);
                    tabShow(1);
                } else {
                    getArea(0, 0, "", "", "");
                    stockShow();
                    dataAreaShow(0);
                    tabShow(0);
                }
            });

            //址选择器顶栏点击事件
            $objTabItem.click(function (e) {
                var index = $(this).index();
                var textValue = "";
                if (index === 0) {
                    stockHide();
                } else {
                    tabShow(index - 1);
                    dataAreaShow(index - 1);
                }
                return false;
            });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, value1, value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3);
                    scope.receiver.city = value1 + value2 + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
        }
    };
}]);
'use strict';

app.directive("redirectUrl", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/redirectUrl/redirectUrl.html",
        link: function (scope, element, attrs) {

            var _params = $location.search();
            var _href = "http://" + $location.host() + $location.path();
            var _hash;
            var i = 0;

            var res = new Array();

            //console.log(_params);

            $.each(_params, function (name, key) {

                if(Array.isArray(key)){
                    res.push(name + "=" + key[0]);
                }else {
                    res.push(name + "=" + key);
                }
            });

            //console.log(res);

            $.each(res, function (name, key) {
                if (i == 0) {
                    //console.log(_href);
                    _hash = "?" + key;
                    if (_href.indexOf("?") != -1) {
                        _hash = "&" + key;
                    }
                } else {
                    _hash = _hash + "&" + key;
                }
                i++;
            });

            scope.redirectUrl = _href + _hash;
        }
    };
}]);
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
            scope.cardGroup=["小卡(Nano卡)","大/中卡(二合一)"]
            //获取选择框尺码
            scope.size = attrs.size;

            //获取sim卡类型
            $http.get('/data/simType.json').success(function (data) {
                scope.simList = data;
                scope.simItem = data[0];
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
'use strict';

app.directive("referrerNo", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/referrerNo/referrerNo.html",
        link: function (scope, element, attrs) {
            scope.referrerNo = $location.search().referrerNo;
        }
    };
}]);
'use strict';

app.directive("spcPhone", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhone/spcPhone.html",
        link: function (scope, element, attrs) {
            var $container = $('.content-scrollable');
            scope.filterPhoneName = "iPhone7";

            scope.filterPhone = function (brand,notes) {
                scope.filterPhoneName = brand;
                writebdLog(scope.category, "_" + notes, "渠道号", scope.gh);//选择的手机品牌
            };

            scope.$root.checkMachineName = function () {
                if (!scope.checkoutForm.machineName.$valid) {
                    //alert("请输入收件人");
                    var $scrollTo = $('.order-content');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMachine = function (machine,productId) {
                scope.$root.machineName = machine;
                writebdLog(scope.category, "_" + productId, "渠道号", scope.gh);//选择的商品ID
            }
        }
    };
}]);
'use strict';

app.directive("spcPhoneB", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhoneB/spcPhone.html",
        link: function (scope, element, attrs) {
            var $container = $('.content-scrollable');
            scope.filterPhoneName = "";

            scope.filterPhone = function (brand,notes) {
                scope.filterPhoneName = brand;
                writebdLog(scope.category, "_" + notes, "渠道号", scope.gh);//选择的手机品牌
            };

            scope.$root.checkMachineName = function () {
                if (!scope.checkoutForm.machineName.$valid) {
                    //alert("请输入收件人");
                    var $scrollTo = $('.order-content');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMachine = function (machine,productId) {
                scope.$root.machineName = machine;
                writebdLog(scope.category, "_" + productId, "渠道号", scope.gh);//选择的商品ID
            }
        }
    };
}]);
'use strict';

app.directive("spcPhoneD", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhoneD/spcPhone.html",
        link: function (scope, element, attrs) {
            var $container = $('.content-scrollable');

            scope.spcNavOpen = false;

            scope.filterPhoneName = "";

            scope.filterPhone = function (brand, notes) {
                scope.filterPhoneName = brand;
                writebdLog(scope.category, "_" + notes, "渠道号", scope.gh);//选择的手机品牌
            };

            function writeBrand(name) {

                if (name == '华为') name = 'huawei';
                if (name == '小米') name = 'mi';
                if (name == '美图') name = 'meitu';
                return name;
            }

            scope.setMainPhoneBrand = function (e, index, myBrand) {
                scope.brandIndex = index;
                scope.brand = myBrand;
                scope.spcNavOpen = false;
                writebdLog(scope.category, "_" + writeBrand(myBrand.brandName), "渠道号", scope.gh);//选择的手机品牌
            };

            scope.$root.checkMachineName = function () {
                if (!scope.checkoutForm.machineName.$valid) {
                    //alert("请输入收件人");
                    var $scrollTo = $('.order-content');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMachine = function (machine, productId) {
                scope.$root.machineName = machine;
                writebdLog(scope.category, "_" + productId, "渠道号", scope.gh);//选择的商品ID
            }
        }
    };
}]);
'use strict';

app.directive("spcPhoneLjA", ['$http', '$compile', '$cookieStore', function ($http, $compile, $cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhoneLjA/spcPhone.html",
        link: function (scope, element, attrs) {
            var $container = $('.content-scrollable');

            scope.spcNavOpen = false;

            scope.filterPhoneName = "";

            scope.filterPhone = function (brand, notes) {
                scope.filterPhoneName = brand;
                writebdLog(scope.category, "_" + notes, "渠道号", scope.gh);//选择的手机品牌
            };

            function writeBrand(name) {

                if (name == '华为') name = 'huawei';
                if (name == '小米') name = 'mi';
                if (name == '美图') name = 'meitu';
                if (name == '全部') name = 'all';
                if (name == '热门机型') name = 'hot';
                if (name == '其它机型') name = 'other';
                return name;
            }

            scope.setMainPhoneBrand = function (e, index, myBrand) {
                scope.brandIndex = index;
                scope.brand = myBrand;
                scope.spcNavOpen = false;
                $cookieStore.put("brand",myBrand);
                writebdLog(scope.category, "_ClickBrand" + writeBrand(myBrand.brandName), "渠道号", scope.gh);//选择的手机品牌
            };

            scope.$root.checkMachineName = function () {
                if (!scope.checkoutForm.machineName.$valid) {
                    //alert("请输入收件人");
                    var $scrollTo = $('.order-content');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

        }
    };
}]);
'use strict';

app.directive("spcTitle", function () {
    return {
        restrict: 'E',
        replace: true,
        scope:{},
        templateUrl: "modules/spcTitle/spcTitle.html",
        link: function (scope, element, attrs) {
            scope.mainTitle = attrs.mainTitle;
            scope.subTitle = attrs.subTitle;
            scope.arrow = attrs.arrow;
        }
    };
});
'use strict';

app.directive("star", [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ratting: "="
        },
        templateUrl: "modules/star/star.html",
        link: function (scope, element, attrs) {

            scope.$watch('ratting', function (n, o, scope) {//临时解决方案
                var rate = (parseInt(scope.ratting[0]) + parseInt(scope.ratting[1]) + parseInt(scope.ratting[2]))/3;
                var $i = $(element).find(".stars-content").find("i");
                for (var i = 0; i < 5; i++) {
                    if (i < rate) {
                        $i.eq(i).addClass("on");
                    }
                }
            });

        }
    };
}]);
'use strict';

app.directive("stars", function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: "modules/stars/stars.html",
        link: function (scope, element, attrs) {
            var $i = $(".stars-content").find("i");
            scope.sold = Math.round(Math.random()*999);
            scope.score = (Math.random() + 4).toFixed(1);
            for (var i = 0; i < 4; i++) {
                if (i < scope.score) {
                    $i.eq(i).addClass("on");
                }
            }
        }
    };
});
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
'use strict';

app.directive("tempCart", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/tempCart/tempCart.html",
        link: function (scope, element, attrs) {
        }
    };
}]);
'use strict';

app.directive("timer", ['$interval',function ($interval) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/timer/timer.html",
        link: function (scope, element, attrs) {

            //scope.timer = "1";

            function getRTime() {

                var d = new Date();
                var _nowTime = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + "23:59:00";

                var EndTime = new Date(_nowTime);
                var NowTime = new Date();


                var t = EndTime.getTime() - NowTime.getTime();

                var d = Math.floor(t / 1000 / 60 / 60 / 24);
                var h = Math.floor(t / 1000 / 60 / 60 % 24);
                if(h < 10){
                    h = "0" + h;
                }
                var m = Math.floor(t / 1000 / 60 % 60);
                if(m < 10){
                    m = "0" + m;
                }
                var s = Math.floor(t / 1000 % 60);
                if(s < 10){
                    s = "0" + s;
                }
                scope.timer = "<i>" + h + "</i>" + "<sub>时</sub>" + "<i>" + m + "</i>" + "<sub>分</sub>" + "<i>" + s + "</i>" + "<sub>秒</sub>";
                //scope.timer = "1";
                //console.log(scope.timer);
            };

            $interval(getRTime, 1000);
        }
    };
}]);
'use strict';

app.directive("txtList", ["$http", function ($http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: "modules/txtList/txtList.html",
        link: function (scope, element, attrs) {
            $http.get(attrs.apiUrl).success(function (data) {
                scope.txtData = data;
            });
        }
    };
}]);
'use strict';

app.directive("dropzone", function () {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {

            var config = {
                url: 'http://www.cz.com:8082/uploadFile.html?decorator=blank',
                maxFilesize: 100,
                paramName: "uploadfile",
                maxThumbnailFilesize: 10,
                parallelUploads: 1,
                thumbnailWidth: 300,
                thumbnailHeight: 200,
                autoProcessQueue: true
            };

            var eventHandlers = {
                'addedfile': function(file) {
                    scope.file = file;
                    if (this.files[1]!=null) {
                        this.removeFile(this.files[0]);
                    }
                    scope.$apply(function() {
                        scope.fileAdded = true;
                    });
                },

                'success': function (file, response) {
                    console.log(response);
                    var _input = $("#" + attrs.id + "-input");
                    _input.val(response);
                }

            };

            var dropzone = new Dropzone(element[0], config);

            angular.forEach(eventHandlers, function(handler, event) {
                dropzone.on(event, handler);
            });

            scope.processDropzone = function() {
                dropzone.processQueue();
            };

            scope.resetDropzone = function() {
                dropzone.removeAllFiles();
            }
        }
    }
});
'use strict';

app.directive("userTrack", function () {
    return {
        restrict: 'E',
        replace: false,
        link: function (scope, element, attrs) {
            scope.userTrack = function (TrackName) {
                writebdLog(scope.category, TrackName, "渠道号", scope.gh);
            }
        }
    };
});
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('errorSuccess', { //app首页
            url: "/error/:status",
            templateUrl: "pages/error/error.html",
            controller: "errorController"
        });
}]).controller('errorController', ['$scope', '$rootScope', '$location', '$stateParams', function ($scope, $rootScope, $location, $stateParams) {
    $scope.errorStatus = $stateParams.status;

    if ($location.search()) {
        $scope.errorData = $location.search();
    }

    $scope.getContent = function () {
        getMeiqia();
        //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
        _MEIQIA('showPanel');
    };
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('about', { //关于我们
            url: "/about",
            templateUrl: "pages/about/about.html",
            controller: "aboutController"
        });
}]).controller('aboutController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {

}]);

"use strict";

/*app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('index', { //app首页
            url: "/",
            templateUrl: "html/pages/index/index.html",
            controller: "indexController"
        });
}]).controller('indexController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
}]);
    */
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('payState', { //app首页
            url: "/payState/:status",
            templateUrl: "pages/payState/payState.html",
            controller: "payStateController"
        });
}]).controller('payStateController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', function ($scope, $rootScope, $location, $stateParams, $http) {
    $scope.payStatus = $stateParams.status;

    $scope.params = window.location.search;

    if($location.search().orderNo != undefined){
        $scope.orderNo = $location.search().orderNo;
        $http.get("http://app.yfq.cn:3099/api/getSalesOrder/" + $scope.orderNo).success(function (data) {
            $scope.callbackUrl = data.items[0].salesOrder.callbackUrl;
        });
    }else {
        $scope.callbackUrl = "#";
    }

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jjk&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('paySuccess', { //app首页
            url: "/pay/:status",
            templateUrl: "pages/payStatus/payStatus.html",
            controller: "payController"
        });
}]).controller('payController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', function ($scope, $rootScope, $location, $stateParams, $http) {
    $scope.payStatus = $stateParams.status;

    if($location.search().orderNo != undefined){
        $scope.orderNo = $location.search().orderNo;
        $http.get("http://app.yfq.cn:3099/api/getSalesOrder/" + $scope.orderNo).success(function (data) {
            $scope.callbackUrl = data.items[0].salesOrder.callbackUrl;
        });
    }else {
        $scope.callbackUrl = "#";
    }
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('payment', { //app首页
            url: "/payment",
            templateUrl: "pages/payment/payment.html",
            controller: "paymentController"
        });
}]).controller('paymentController', ['$scope', '$rootScope', '$location', '$stateParams', '$cookieStore', '$http', function ($scope, $rootScope, $location, $stateParams, $cookieStore, $http) {

    $scope.orderNo = $location.search().orderNo;

    //$scope.appType = systemName + "_" + $stateParams.pageType + "_" + phone.phoneModel;
    //$scope.category = $scope.appType;

    if($cookieStore.get("phoneQueryUrl")){
        $scope.phoneQueryUrl = $cookieStore.get("phoneQueryUrl");
    };

    if ($scope.orderNo) {
        $scope.category = "_IndexSearch";
        $http.get("http://app.yfq.cn:3099/api/getSalesOrder/" + $scope.orderNo).success(function (data) {
            var machineId,productId,color,phoneNumber,price;

            $.each(data.items,function (i,o) {
                if(o.productName.indexOf("月") == -1){
                    machineId = o.productId;
                    color = o.salesOrder.color;
                    phoneNumber = o.salesOrder.buyMobile;
                    price = o.salesOrder.totalAmount;

                }else {
                    productId = o.productId;
                }
            });

            $scope.orderState = {
                machineId: machineId,
                productId: productId,
                color: color,
                phoneNumber: phoneNumber,
                price: price,
                category: $scope.category
            };

            $scope.receiver = {
                name: data.salesOrder.recieverName,
                mobile: data.salesOrder.recieverMobile,
                city: data.salesOrder.receiverCity,
                room: data.salesOrder.receiverRoom
            };
        });
    } else {
        $scope.orderState = $cookieStore.get("orderState");
        $scope.category = $scope.orderState.category;
    }

    //writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
}]);
'use strict';

app.directive("pkgInfo", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'C',
        scope: {
            ssDd: "="
        },
        templateUrl: "modules/cardPackage/d/cardPkg.html",
        link: function (scope, element, attrs) {
            scope.openCardPkg = function (targetId,e) {
                var $this = $(e.currentTarget);
                var targetHtml = $this.siblings(".pcd-infos").html();
                scope.$root.Overlay.open(targetHtml);
            }
        }
    };

}]);
'use strict';

app.directive("cardPkgN", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'C',
        scope: {
            ssDd: "="
        },
        templateUrl: "modules/cardPackage/n/cardPkg.html",
        link: function (scope, element, attrs) {
            scope.openCardPkg=function(targetId){
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
            }
        }
    };

}]);
'use strict';

app.directive("phoneQuery", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/phoneQuery.html",
        controller: "phoneQueryController",
        link: function (scope, element, attrs) {

            $container = $("#container");

            var _index;

            if ($cookieStore.get("orderState")) {
                var orderState = $cookieStore.get("orderState");
                //scope.phoneNumber = orderState.phoneNumber;
            }

            scope.npHide = function () {
                //event.preventDefault();
                $container.removeClass("phone-query");
                $("#numberPanel").hide();

            };

            scope.npShow = function (index) {
                //event.preventDefault();
                $container.addClass("phone-query");
                $("#numberPanel").show();
                _index = index;
                if (index != 'numberPanel') return;
                writebdLog(scope.category, "_CuteNumber", "渠道号", scope.gh);//选择靓号
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };

            scope.checkPhone = function () {
                if (!scope.checkoutForm.phoneNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    return false;
                }
                return true;
            };

            scope.setNumberItem = function (event, numberItem) {
                event.preventDefault();
                scope.phoneNumber = numberItem.n;

                var $this = $(event.currentTarget);

                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');

                writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
            };

            scope.getNumber = function () {

                if (scope.checkPhone()) {
                    scope.npHide();
                    var $scrollTo = $('#phoneQuery');
                    var $container = $(".content-scrollable");
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });

                    writebdLog(scope.category, "_ConfirmNumber", "渠道号", scope.gh);//确认号码
                } else {
                    scope.$root.dialog.open("", "请您选择号码！");
                }
            }
        }

    };
}]).controller('phoneQueryController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();

    $scope.phoneFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.items = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        $.each(eval(data), function (i, k) {
            if (!k.t) {
                $scope.phoneData.push(k);
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.pageSize = 10;
        //$scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数

        //$scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        //$scope.pageList = [];
        //$scope.selPage = 1;

        //设置数据源(分页)
        $scope.setData = function () {
            $scope.items = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
        };

        $scope.items = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        };
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
            writebdLog($scope.category, "_ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("toast", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/toast/toast.html",
        link: function (scope, element, attrs) {
            var $loadingToast = $("#loadingToast");
            scope.$root.toast = {
                open: function () {
                    $loadingToast.show();
                    $timeout(function () {
                        $loadingToast.hide();
                    }, 2000);
                },
                openUnLimit: function () {
                    $loadingToast.show();
                },
                close: function () {
                    $loadingToast.hide();
                }
            };
            scope.$root.toast.close();
        }
    };
}]);
'use strict';

app.directive("couponList", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/coupon/couponList/couponList.html",
        link: function (scope, element, attrs) {

            var dateNow = Date.parse(new Date());

            scope.selectCoupon = function (e, key) {
                if (scope.$root.coupons[key].available) {
                    scope.$root.coupons[key].checked = !scope.$root.coupons[key].checked;
                }
            };

            scope.$watch('receiver.mobile', function (n, o, scope) {
                if (n != undefined && n != '') {
                    $http.jsonp(cfApi.apiHost + '/product/getCouponList.html?recieverMobile=' + n + '&activity=' + scope.activity + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                        scope.$root.coupons = {};
                        
                        $timeout(function () {
                            var couponType, couponNo, couponName, couponTips, available, checked;
                            if (data.length == 0) {
                                scope.$root.hasCoupon = false;
                                for (var i = 0; i < scope.$root.coupons.length; i++) {
                                    scope.$root.coupons[i].checked = false;
                                }
                            } else {
                                scope.$root.hasCoupon = true;
                            }
                            $.each(data, function (i, k) {//为优惠券赋值
                                if (data[i].couponBatchName == 'JM') {
                                    couponType = 'exemptionCertificate';
                                    couponNo = k.couponNo;
                                    couponName = '￥800满减券';
                                    couponTips = '每满￥100送￥5';
                                    available = true;
                                    checked = true;
                                    if (scope.phone.activityproductId == 366 || scope.phone.activityproductId == 367 || scope.phone.activityproductId == 368 || scope.phone.activityproductId == 369) {
                                        available = false;
                                        checked = false;
                                    }

                                    scope.$root.coupons.jm = {
                                        couponType: couponType,
                                        couponNo: couponNo,
                                        couponName: couponName,
                                        couponTips: couponTips,
                                        available: available,
                                        checked: checked
                                    };
                                }

                                if (data[i].couponBatchName == 'MX') {
                                    couponType = 'interestCoupons';
                                    couponNo = k.couponNo;
                                    couponName = '12期免息券';
                                    couponTips = '19家银行信用卡免息';
                                    available = true;
                                    checked = true;
                                    if (scope.phone.activityproductId == 366 || scope.phone.activityproductId == 367 || scope.phone.activityproductId == 368 || scope.phone.activityproductId == 369) {
                                        available = false;
                                        checked = false;
                                    }

                                    scope.$root.coupons.mx = {
                                        couponType: couponType,
                                        couponNo: couponNo,
                                        couponName: couponName,
                                        couponTips: couponTips,
                                        available: available,
                                        checked: checked
                                    };
                                }

                                if (data[i].couponBatchName == 'HF') {
                                    couponType = 'billVoucher';
                                    couponNo = k.couponNo;
                                    couponName = '￥720话费券';
                                    couponTips = '每月返还￥20话费';
                                    available = true;
                                    checked = true;
                                    if (scope.phone.activityproductId == 366 || scope.phone.activityproductId == 367 || scope.phone.activityproductId == 368 || scope.phone.activityproductId == 369) {
                                        available = false;
                                        checked = false;
                                    }

                                    scope.$root.coupons.hf = {
                                        couponType: couponType,
                                        couponNo: couponNo,
                                        couponName: couponName,
                                        couponTips: couponTips,
                                        available: available,
                                        checked: checked
                                    };
                                }
                            });
                        });

                    }).error(function (data, status, headers, config) {
                        console.log(status);
                        //deferred.reject(status)
                    });
                }
            });

            scope.$watch('gettedCoupon', function (n, o, scope) {
                if (n != undefined && n != '') {
                    $http.jsonp(cfApi.apiHost + '/product/getCouponList.html?recieverMobile=' + scope.receiver.mobile + '&activity=' + scope.activity + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {

                        scope.$root.coupons = {};
                        var couponType, couponNo, couponName, couponTips, available, checked;
                        if (data.length == 0) {
                            scope.$root.hasCoupon = false;
                            for (var i = 0; i < scope.$root.coupons.length; i++) {
                                scope.$root.coupons[i].checked = false;
                            }
                        } else {
                            scope.$root.hasCoupon = true;
                        }
                        $.each(data, function (i, k) {//为优惠券赋值
                            if (data[i].couponBatchName == 'JM') {
                                couponType = 'exemptionCertificate';
                                couponNo = k.couponNo;
                                couponName = '￥800满减券';
                                couponTips = '每满￥100送￥10';
                                available = true;
                                checked = true;

                                scope.$root.coupons.jm = {
                                    couponType: couponType,
                                    couponNo: couponNo,
                                    couponName: couponName,
                                    couponTips: couponTips,
                                    available: available,
                                    checked: checked
                                };
                            }

                            if (data[i].couponBatchName == 'MX') {
                                couponType = 'interestCoupons';
                                couponNo = k.couponNo;
                                couponName = '12期免息券';
                                couponTips = '19家银行信用卡免息';
                                available = true;
                                checked = true;

                                scope.$root.coupons.mx = {
                                    couponType: couponType,
                                    couponNo: couponNo,
                                    couponName: couponName,
                                    couponTips: couponTips,
                                    available: available,
                                    checked: checked
                                };
                            }

                            if (data[i].couponBatchName == 'HF') {
                                couponType = 'billVoucher';
                                couponNo = k.couponNo;
                                couponName = '12期免息券';
                                couponTips = '19家银行信用卡免息';
                                available = true;
                                checked = true;

                                scope.$root.coupons.hf = {
                                    couponType: couponType,
                                    couponNo: couponNo,
                                    couponName: couponName,
                                    couponTips: couponTips,
                                    available: available,
                                    checked: checked
                                };
                            }
                        });

                    }).error(function (data, status, headers, config) {
                        console.log(status);
                        //deferred.reject(status)
                    });
                }
            })
        }
    };
}]);
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

'use strict';

app.directive("aPayType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/a/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTitle = attrs.title;
            scope.paySubTitle = attrs.subTitle;
            scope.details = "预付首月月租";
            //设置本模块的显示隐藏
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            var $form = $(attrs.submit);

            //默认赋值
            //scope.payType = 1;

            //设置默认payType;
            scope.setDefaultPayType = function (id, typeName) {
                scope.payType = id;
                scope.payTypeName = typeName;
            };

            //选择支付方式

            scope.setPayType = function (event, id) {
                event.preventDefault();
                scope.payType = id;
                //scope.payTypeName = typeName;
                var $this = $(event.currentTarget);
                //console.log($this.find(".title").html());
                scope.payTypeName = $this.data("title");
                wirtePayType(id);
            };

            var value;
            var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

            function wirtePayType(payType) {
                value = payTypeAry[payType];
                writebdLog(scope.category, "_" + value, "渠道号", scope.gh);//选择支付方式
            }
        }
    };
}]);
'use strict';

app.directive("cPayType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/c/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTitle = attrs.title;
            scope.paySubTitle = attrs.subTitle;
            scope.details = "预付首月月租";
            //设置本模块的显示隐藏
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            var $form = $(attrs.submit);

            //默认赋值
            //scope.payType = 1;

            //设置默认payType;
            scope.setDefaultPayType = function (id, typeName) {
                scope.payType = id;
                scope.payTypeName = typeName;
            };

            if (scope.cardPay) {
                scope.setDefaultPayType(0, "在线支付");
            }
            if (scope.totolPrice < 1500) {
                scope.setDefaultPayType(0, "马上付款");
            }
            if (scope.pageType == "pcd") {
                scope.details = "￥9.9元掏靓号";
            }

            //选择支付方式

            scope.setPayType = function (event, id) {
                event.preventDefault();
                scope.payType = id;
                //scope.payTypeName = typeName;
                var $this = $(event.currentTarget);
                //console.log($this.find(".title").html());
                scope.payTypeName = $this.data("title");
                wirtePayType(id);
            };

            var value;
            var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

            function wirtePayType(payType) {
                value = payTypeAry[payType];
                writebdLog(scope.category, "_" + value, "渠道号", scope.gh);//选择支付方式
            }
        }
    };
}]);
'use strict';

app.directive("nPayType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/n/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTitle = attrs.title;
            scope.paySubTitle = attrs.subTitle;
            scope.details = "预付首月月租";
            //设置本模块的显示隐藏
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            var $form = $(attrs.submit);

            //默认赋值
            //scope.payType = 1;

            //设置默认payType;
            scope.setDefaultPayType = function (id, typeName) {
                scope.payType = id;
                scope.payTypeName = typeName;
            };

            scope.setDefaultPayType(2, "信用卡分期");
            if (scope.cardPay) {
                scope.setDefaultPayType(0, "在线支付");
            }
            if (scope.totolPrice < 1500) {
                scope.setDefaultPayType(0, "一次性支付");
            }
            if (scope.pageType == "pcd") {
                scope.details = "￥9.9元掏靓号";
            }

            //选择支付方式

            scope.setPayType = function (event, id) {
                event.preventDefault();
                scope.payType = id;
                //scope.payTypeName = typeName;
                var $this = $(event.currentTarget);
                //console.log($this.find(".title").html());
                scope.payTypeName = $this.find(".title").html();
                wirtePayType(id);
            };

            var value;
            var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

            function wirtePayType(payType) {
                value = payTypeAry[payType];
                writebdLog(scope.category, "_" + value, "渠道号", scope.gh);//选择支付方式
            }
        }
    };
}]);
'use strict';

app.directive("mainColors", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/mainColors/colors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.mainColorTitle = attrs.title;
            scope.mainColorSubTitle = attrs.subTitle;

            scope.$root.mainColor = scope.phone.phoneTypes[0].mediaProductList[getIndex(scope.phone.phoneTypes[0].mediaProductList, 'selected', 1)];


            //选择手机颜色
            scope.setMainPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    //scope.mainColor = color;
                    scope.$root.mainColor = color;
                    writebdLog(scope.category, "_mainFuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };
        }
    };
}]);
'use strict';

app.directive("mainColorsLj", ['$http', '$q', '$timeout', '$location', function ($http, $q, $timeout, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/mainColorsLj/colors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.mainColorTitle = attrs.title;
            scope.mainColorSubTitle = attrs.subTitle;

            if ($location.search().colorTag == 'red') {

                scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'name', '红色');

                if (scope.mainColorIndex == undefined || scope.phone.phoneTypes[0].mediaProductList[scope.mainColorIndex].stock == 0) {//如果没有红色，或者红色无货
                    scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'selected', 1);
                }


            } else {
                scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'selected', 1);
            }

            scope.$root.mainColor = scope.phone.phoneTypes[0].mediaProductList[scope.mainColorIndex];


            //选择手机颜色
            scope.setMainPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    //scope.mainColor = color;
                    scope.$root.mainColor = color;
                    writebdLog(scope.category, "_mainFuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };
        }
    };
}]);
'use strict';

app.directive("subColors", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/subColors/colors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.subColorTitle = attrs.title;
            scope.subColorSubTitle = attrs.subTitle;

            scope.subColor = scope.phone.phoneTypes[1].mediaProductList[0];

            //选择手机颜色
            scope.setSubPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.subColor = color;
                    writebdLog(scope.category, "_subFuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };
        }
    };
}]);
'use strict';

app.directive("phoneBPackage", ['$http', '$stateParams', '$q', '$cookieStore', '$location', function ($http, $stateParams, $q, $cookieStore, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/b/b.html",
        controller: "numberBController",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class = attrs.addClass;
            scope.visibility = attrs.visibility;

            var $container = $('.content-scrollable');

            scope.queryNumber = true;

            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            scope.reChoose = function () {
                scope.queryNumber = true;
            };


            //选择号码 对象类型
            scope.setPhonePackage = function (event, pkg) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                /*if ($this.hasClass("curr")) {
                 return false;
                 }*/
                scope.package = pkg;
                $(".pick-panel").hide();
                scope.pickPanelShow = true;
                $this.siblings(".pick-number").find(".pick-panel").show();
                scope.queryNumber = true;

                writebdLog(scope.category, "_SelectPackage", "渠道号", scope.gh);//选择套餐
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };


            var $container = $('.content-scrollable');

            scope.$root.checkMainNumber = function () {
                if (!scope.couponForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#phonePackage');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.$root.checkMainProductId = function () {
                if (!scope.couponForm.mainProductId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickPackagePanel');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMainNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(numberItem.n, scope.subNumber)) {
                    scope.mainNumber = numberItem.n;
                    scope.queryNumber = false;
                    writebdLog(scope.category, "_mainSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }

            };

            scope.showMNumberPn = function (event) {
                if (!(attrs.noAnimate == "true")) {
                    $("#pickMainNumberPanel").slideToggle();
                    $(event.currentTarget).toggleClass("down");
                }
                writebdLog(scope.category, "_mainCuteNumber", "渠道号", scope.gh);//选择主卡靓号
            };

            scope.ok = function () {
                if (!scope.$root.checkMainProductId()) {
                    scope.$root.dialog.open('系统提示', '请选择套餐');
                }
                if (!scope.$root.checkMainNumber()) {
                    scope.$root.dialog.open('系统提示', '请选择手机号码');
                }

                $cookieStore.put('pkgAndNumber', {
                    pkg: scope.pkg,
                    number: scope.mainNumber
                });

                $location.path('/phs/sg/C/' + $stateParams.phoneId);
            }

        }
    };
}]).controller('numberBController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $scope.phoneSubData = new Array();

    $scope.phoneMainFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.phoneSubFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneSubData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterSubData = _data;
        } else {
            $scope.filterSubData = $scope.phoneSubData;
        }
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query, type) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_' + type + 'InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码

        data = data.sort(function (a, b) {
            return b.s - a.s;
        });

        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                $scope.phoneData.push(k);
                if (k.t == 0) {
                    $scope.phoneSubData.push(k);
                }
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.filterSubData = $scope.phoneSubData;
        $scope.pageSize = 6;

        //设置数据源(分页)
        $scope.setData = function (type) {
            if (type == "main") {
                $scope.mainItems = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
            else {
                $scope.subItems = $scope.filterSubData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
        };

        //初始化数据
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page, type) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData(type);
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function (type) {
            $scope.selectPage($scope.selPage - 1, type);
        };
        //下一页
        $scope.Next = function (type) {
            $scope.selectPage($scope.selPage + 1, type);
            writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("phoneCPackage", ['$http', '$stateParams', '$q', '$cookieStore', '$location', function ($http, $stateParams, $q, $cookieStore, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/c/c.html",
        controller: "numberCController",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class = attrs.addClass;
            scope.visibility = attrs.visibility;

            var $container = $('.content-scrollable');

            scope.queryNumber = true;

            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            scope.reChoose = function () {
                scope.queryNumber = true;
            };


            //选择号码 对象类型
            scope.setPhonePackage = function (event, pkg) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                /*if ($this.hasClass("curr")) {
                 return false;
                 }*/
                scope.package = pkg;
                $(".pick-panel").hide();
                scope.pickPanelShow = true;
                $this.siblings(".pick-number").find(".pick-panel").show();
                scope.queryNumber = true;

                writebdLog(scope.category, "_SelectPackage", "渠道号", scope.gh);//选择套餐
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };


            var $container = $('.content-scrollable');

            scope.$root.checkMainNumber = function () {
                if (!scope.checkoutForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#phonePackage');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.$root.checkMainProductId = function () {
                if (!scope.checkoutForm.mainProductId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickPackagePanel');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMainNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(numberItem.n, scope.subNumber)) {
                    scope.mainNumber = numberItem.n;
                    scope.queryNumber = false;
                    writebdLog(scope.category, "_mainSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }

            };

            scope.showMNumberPn = function (event) {
                if (!(attrs.noAnimate == "true")) {
                    $("#pickMainNumberPanel").slideToggle();
                    $(event.currentTarget).toggleClass("down");
                }
                writebdLog(scope.category, "_mainCuteNumber", "渠道号", scope.gh);//选择主卡靓号
            };

            scope.ok = function () {
                if (!scope.$root.checkMainProductId()) {
                    scope.$root.dialog.open('系统提示', '请选择套餐');
                }
                if (!scope.$root.checkMainNumber()) {
                    scope.$root.dialog.open('系统提示', '请选择手机号码');
                }

                $cookieStore.put('pkgAndNumber', {
                    pkg: scope.pkg,
                    number: scope.mainNumber
                });

                $location.path('/phs/sg/C/' + $stateParams.phoneId);
            }

        }
    };
}]).controller('numberCController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $scope.phoneSubData = new Array();

    $scope.phoneMainFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.phoneSubFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneSubData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterSubData = _data;
        } else {
            $scope.filterSubData = $scope.phoneSubData;
        }
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query, type) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_' + type + 'InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码

        data = data.sort(function (a, b) {
            return b.s - a.s;
        });

        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                $scope.phoneData.push(k);
                if (k.t == 0) {
                    $scope.phoneSubData.push(k);
                }
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.filterSubData = $scope.phoneSubData;
        $scope.pageSize = 6;

        //设置数据源(分页)
        $scope.setData = function (type) {
            if (type == "main") {
                $scope.mainItems = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
            else {
                $scope.subItems = $scope.filterSubData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
        };

        //初始化数据
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page, type) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData(type);
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function (type) {
            $scope.selectPage($scope.selPage - 1, type);
        };
        //下一页
        $scope.Next = function (type) {
            $scope.selectPage($scope.selPage + 1, type);
            writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("phoneDPackage", ['$http', '$stateParams', '$q', '$cookieStore', '$location', function ($http, $stateParams, $q, $cookieStore, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/d/d.html",
        controller: "numberDController",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class = attrs.addClass;
            scope.visibility = attrs.visibility;

            var $container = $('.content-scrollable');

            scope.queryNumber = true;

            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            scope.reChoose = function () {
                scope.queryNumber = true;
            };


            //选择号码 对象类型
            scope.setPhonePackage = function (event, pkg) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                /*if ($this.hasClass("curr")) {
                 return false;
                 }*/
                scope.package = pkg;
                $(".pick-panel").hide();
                scope.pickPanelShow = true;
                $this.siblings(".pick-number").find(".pick-panel").show();
                scope.queryNumber = true;

                writebdLog(scope.category, "_SelectPackage", "渠道号", scope.gh);//选择套餐
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };


            var $container = $('.content-scrollable');

            scope.$root.checkMainNumber = function () {
                if (!scope.checkoutForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#phonePackage');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.$root.checkMainProductId = function () {
                if (!scope.checkoutForm.mainProductId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickPackagePanel');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMainNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(numberItem.n, scope.subNumber)) {
                    scope.mainNumber = numberItem.n;
                    scope.queryNumber = false;
                    writebdLog(scope.category, "_mainSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }

            };

            scope.showMNumberPn = function (event) {
                if (!(attrs.noAnimate == "true")) {
                    $("#pickMainNumberPanel").slideToggle();
                    $(event.currentTarget).toggleClass("down");
                }
                writebdLog(scope.category, "_mainCuteNumber", "渠道号", scope.gh);//选择主卡靓号
            };

            scope.ok = function () {
                if (!scope.$root.checkMainProductId()) {
                    scope.$root.dialog.open('系统提示', '请选择套餐');
                }
                if (!scope.$root.checkMainNumber()) {
                    scope.$root.dialog.open('系统提示', '请选择手机号码');
                }

                $cookieStore.put('pkgAndNumber', {
                    pkg: scope.pkg,
                    number: scope.mainNumber
                });

                $location.path('/phs/sg/C/' + $stateParams.phoneId);
            }

        }
    };
}]).controller('numberDController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $scope.phoneSubData = new Array();

    $scope.phoneMainFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.phoneSubFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneSubData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterSubData = _data;
        } else {
            $scope.filterSubData = $scope.phoneSubData;
        }
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query, type) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_' + type + 'InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码

        data = data.sort(function (a, b) {
            return b.s - a.s;
        });

        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                $scope.phoneData.push(k);
                if (k.t == 0) {
                    $scope.phoneSubData.push(k);
                }
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.filterSubData = $scope.phoneSubData;
        $scope.pageSize = 6;

        //设置数据源(分页)
        $scope.setData = function (type) {
            if (type == "main") {
                $scope.mainItems = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
            else {
                $scope.subItems = $scope.filterSubData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
        };

        //初始化数据
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page, type) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData(type);
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function (type) {
            $scope.selectPage($scope.selPage - 1, type);
        };
        //下一页
        $scope.Next = function (type) {
            $scope.selectPage($scope.selPage + 1, type);
            writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("phoneNPackage", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/n/n.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class=attrs.addClass;
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //console.log(scope.phone.activityproductId);

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

        }
    };
}]);
'use strict';

app.directive("gds", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/gds/gds.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber,e) {
                if($(e.currentTarget).hasClass("not")){
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                getArea('', 1, '广东省', '', "");
                stockShow();
                dataAreaShow(1);
                tabShow(1);
            });

            //址选择器顶栏点击事件
            // $objTabItem.click(function (e) {
            //     var index = $(this).index();
            //     var textValue = "";
            //     if (index === 0) {
            //         stockHide();
            //     } else {
            //         tabShow(index - 1);
            //         dataAreaShow(index - 1);
            //     }
            //     return false;
            // });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, '广东省', value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html('广东省' + value2 + value3);
                    scope.receiver.city = '广东省' + value2 + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.$root.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
            scope.showReceiverPn = function (e) {
                writeAddressBar();
                if (!(attrs.noAnimate == "true")) {
                    $("#receiverAddressPanel").slideToggle();
                    $(".adr-tab").toggleClass("down");
                }
            };

            function writeAddressBar() {
                if ($("#receiverAddressPanel").is(":hidden"))
                    writebdLog(scope.category, "_ShowAddressBar", "渠道号", scope.gh); //展开地址栏
                else
                    writebdLog(scope.category, "_StopAddressBar", "渠道号", scope.gh); //收起地址栏
            }

            scope.adrOk = function () {
                scope.showReceiverPn();
            }
        }
    };
}]);
'use strict';

app.directive("gzs", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/gzs/gzs.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber,e) {
                if($(e.currentTarget).hasClass("not")){
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                getArea('广州市', 2, '广东省', '广州市', "");
                stockShow();
                dataAreaShow(2);
                tabShow(2);
            });

            //址选择器顶栏点击事件
            // $objTabItem.click(function (e) {
            //     var index = $(this).index();
            //     var textValue = "";
            //     if (index === 0) {
            //         stockHide();
            //     } else {
            //         tabShow(index - 1);
            //         dataAreaShow(index - 1);
            //     }
            //     return false;
            // });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, value1, value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html('广东省' + '广州市' + value3);
                    scope.receiver.city = '广东省' + '广州市' + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.$root.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
            scope.showReceiverPn = function (e) {
                writeAddressBar();
                if (!(attrs.noAnimate == "true")) {
                    $("#receiverAddressPanel").slideToggle();
                    $(".adr-tab").toggleClass("down");
                }
            };

            function writeAddressBar() {
                if ($("#receiverAddressPanel").is(":hidden"))
                    writebdLog(scope.category, "_ShowAddressBar", "渠道号", scope.gh); //展开地址栏
                else
                    writebdLog(scope.category, "_StopAddressBar", "渠道号", scope.gh); //收起地址栏
            }

            scope.adrOk = function () {
                scope.showReceiverPn();
            }
        }
    };
}]);
'use strict';

app.directive("nadr", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/nadr/gzs.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber,e) {
                if($(e.currentTarget).hasClass("not")){
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                getArea('', 1, '广东省', '', "");
                stockShow();
                dataAreaShow(1);
                tabShow(1);
            });

            //址选择器顶栏点击事件
            $objTabItem.click(function (e) {
                var index = $(this).index();
                var textValue = "";
                if (index === 1) {
                    stockHide();
                } else {
                    tabShow(index - 1);
                    dataAreaShow(index - 1);
                }
                return false;
            });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, '广东省', value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html('广东省' + value2 + value3);
                    scope.receiver.city = '广东省' + value2 + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.$root.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
            scope.showReceiverPn = function (e) {
                writeAddressBar();
                if (!(attrs.noAnimate == "true")) {
                    $("#receiverAddressPanel").slideToggle();
                    $(".adr-tab").toggleClass("down");
                }
            };

            function writeAddressBar() {
                if ($("#receiverAddressPanel").is(":hidden"))
                    writebdLog(scope.category, "_ShowAddressBar", "渠道号", scope.gh); //展开地址栏
                else
                    writebdLog(scope.category, "_StopAddressBar", "渠道号", scope.gh); //收起地址栏
            }

            scope.adrOk = function () {
                scope.showReceiverPn();
            }
        }
    };
}]);
'use strict';

app.directive("adr", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/n/adr.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber,e) {
                if($(e.currentTarget).hasClass("not")){
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + "has-hash='false' href='javascript:userTrack(" + field.name + ");'>" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + "has-hash='false' href='javascript:userTrack(" + field.name + ");'>" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                getArea(0, 0, "", "", "");
                stockShow();
                dataAreaShow(0);
                tabShow(0);
            });

            //址选择器顶栏点击事件
            $objTabItem.click(function (e) {
                var index = $(this).index();
                var textValue = "";
                if (index === 0) {
                    stockHide();
                } else {
                    tabShow(index - 1);
                    dataAreaShow(index - 1);
                }
                return false;
            });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, value1, value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3);
                    scope.receiver.city = value1 + value2 + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.$root.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
            scope.showReceiverPn = function (e) {
                writeAddressBar();
                if (!(attrs.noAnimate == "true")) {
                    $("#receiverAddressPanel").slideToggle();
                    $(".adr-tab").toggleClass("down");
                }
            };

            function writeAddressBar() {
                if ($("#receiverAddressPanel").is(":hidden"))
                    writebdLog(scope.category, "_ShowAddressBar", "渠道号", scope.gh); //展开地址栏
                else
                    writebdLog(scope.category, "_StopAddressBar", "渠道号", scope.gh); //收起地址栏
            }

            scope.adrOk = function () {
                scope.showReceiverPn();
            }
        }
    };
}]);
'use strict';

app.directive("receiverOAddress", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/other/receiverAddress.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };
            
            //只有输入信息才记录到闭环
            scope.inputFeedBack = function (feeback) {
            	if (feeback == undefined || feeback == "" || feeback.length <= 3) return;
            	writebdLog(scope.category, "_FeedBack", "渠道号", scope.gh);//卖家留言
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber,e) {
                if($(e.currentTarget).hasClass("not")){
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                getArea(0, 0, "", "", "");
                stockShow();
                dataAreaShow(0);
                tabShow(0);
            });

            //址选择器顶栏点击事件
            $objTabItem.click(function (e) {
                var index = $(this).index();
                var textValue = "";
                if (index === 0) {
                    stockHide();
                } else {
                    tabShow(index - 1);
                    dataAreaShow(index - 1);
                }
                return false;
            });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, value1, value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3);
                    scope.receiver.city = value1 + value2 + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
        }
    };
}]);
'use strict';

app.directive("flowCards", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/recharge/flowCards/flowCards.html",
        link: function (scope, element, attrs) {
            var $flowCards = $(".flow-cards");
            scope.getFlowCard = function (event, card) {
                //event.preventDefault();
                scope.flowCard = card;
                $flowCards.slideUp();
            };
            scope.$watch("receiverMobile", function (nv, ov, scope) {
                if (nv != ov) {
                    var url = baseApiUri + "/getUserFlowCards/" + nv;
                    $http.get(url).success(function (data) {
                        scope.flowCards = data;
                    });
                }
            });
        }
    };
}]);
'use strict';

app.directive("flowUsing", [function () {
    return {
        restrict: 'E',
        templateUrl: "modules/recharge/flowUsing/flowUsing.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
'use strict';

app.directive("rechargeCards", ["$http",function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/recharge/rechargeCards/rechargeCards.html",
        link: function (scope, element, attrs) {
            scope.recharge = function (e,id) {
                e.stopPropagation();

                if ($(e.currentTarget).hasClass("active")) {
                    $('#loadingToast').show();
                    window.location.href= "http://m.gd189fq.com/yfqcz/czOrdRechargeController.do?gotoPay&pid=" + id + "&iccid=" + scope.flowCard.iccid;
                    setTimeout(function () {
                        $('#loadingToast').hide();
                    }, 2000);
                } else {
                    return false;
                }
            };
            $http.get(baseApiUri + "/getFlowRechargeCard").success(function (data) {
                scope.rechargeCards = data;
            });
        }
    };
}]);
/*
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flow', { //关于我们
            url: "/flow",
            templateUrl: "pages/flow/index/index.html",
            controller: "flowController"
        });
}]).controller('flowController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

}]);*/

"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flowRecharge', { //关于我们
            url: "/flow/recharge",
            templateUrl: "pages/flowCard/recharge/recharge.html",
            controller: "flowRechargeController"
        });
}]).controller('flowRechargeController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

}]);

"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('otherAProduct', { //app首页
            url: "/others/A",
            templateUrl: "pages/others/A/a.html",
            controller: "otherAProductController"
        })
}]).controller('otherAProductController', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "csrtc";
    $scope.pageType = 'A';
    $scope.category = systemName + "_csrtc_" + $scope.pageType;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);


    $scope.products = [
        {
            id: 424,
            name: '健维宝1罐 + 神酒1瓶 + 干果1盒 送鲜果蜜1盒',
            price: 398,
            select: true
        },
        {
            id: 425,
            name: '春砂仁干果2盒 送鲜果蜜1盒',
            price: 298,
            select: false
        },
        {
            id: 426,
            name: '春砂仁健维宝2罐',
            price: 298,
            select: false
        },
        {
            id: 427,
            name: '春之神酒2瓶',
            price: 298,
            select: false
        },
        {
            id: 428,
            name: '春砂仁鲜果蜜2盒',
            price: 198,
            select: false
        }
    ];

    $scope.$root.share = {
        homeLink: 'http://' + window.location.host + '/others/A' + window.location.search,
        shareTitle: '春砂仁，您的养胃专家，广东阳春源产地生产，良心品质！',
        shareDisc: '养胃首选春砂仁，多种吃法，老少咸宜，套餐限时特价398元，再送鲜果密一盒！货到付款，先到先得！',
        picUrl: 'http://' + window.location.host + '/images/others/A/nativeShare.jpg'
    };

    $scope.mainProduct = $scope.products[0];

    $scope.selectProduct = function (product) {
        $scope.mainProduct = product;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);
    };


    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomReceiverPhone() + " 购买了春砂仁鲜果蜜2盒 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.checkBuyHistory = function () {

    };

    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");

        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }

        $scope.$root.toast.open();
        $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.mainProduct.id + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

            if (data.result) {
                $form.submit();
                $scope.$root.toast.close();
                writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
            } else {
                $scope.$root.toast.close();
                $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
            }
        });
    };

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if(n){
                var $form = $("#checkoutForm");
                $form.submit();
            }
        }
    });

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneIndex', { //app首页
            url: "/phone/:pageType/index",
            templateUrl: function ($stateParams) {
                return 'pages/phone/index/' + $stateParams.pageType + '/index.html';
            },
            controller: "pIndexController"
        });
}]).controller('pIndexController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', function ($scope, $location, $http, $stateParams, $interval, $timeout) {

    //$location.path("/phone/active/D/phones");

    $scope.pageType = $stateParams.pageType;
    if($scope.pageType !=undefined && $scope.pageType == "C")
    	$scope.appType = systemName + "_sdhd_" + $scope.pageType + "_index";
    else
    	$scope.appType = systemName + "_mysy_" + $scope.pageType + "_index";
    $scope.category = $scope.appType;
    //console.log($scope.category);

    $scope.params = window.location.search;

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=bdtc&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.pkgs = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=lj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=mysy&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {

        $scope.doublePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.st = function (target) {//单双机切换回滚
        var $container = $('.content-scrollable');
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.btNavItem = function (event, index, target) {
        var $this = $(event.currentTarget);
        if (index == 0 || index == 1) {
            $this.siblings().removeClass("curr");
            $this.addClass("curr");
            $(".tab-item").eq(index).trigger("click");
            $scope.st(target);
        } else if (index == 2) {
            $this.siblings().removeClass("curr");
            $this.addClass("curr");
            $scope.st(target);
        }
        else if (index == 3) {
            getMeiqia();
            _MEIQIA('showPanel');
        }
        writeBtNavItem(index);
    };

    var btNavItemName = ['_MYSYBt', '_BKDJBt', '_CZTCBt', '_CustConsult'];

    function writeBtNavItem(index) {
        writebdLog($scope.category, btNavItemName[index], "渠道号", $scope.gh);//选择模块
    }

    $interval(function () {
        $scope.selkillTxt = getRandomName() + "，刚刚购买了 " + getRandomProduct();
    }, 2000);

    //记录用户购买的商品：专区模块英文名称+商品id
    $scope.writeSelectFoods = function (obj, productId, modular) {
        writebdLog($scope.category, "_" + productId + modular, "渠道号", $scope.gh);//选择的商品ID
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $("img.lazy").lazyload({
            effect: "fadeIn",
            skip_invisible: false,
            container: $(".content-scrollable")
        });
    });

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.openCardPkg = function (targetId) {
        var targetHtml = $("#" + targetId).html();
        $scope.$root.Overlay.open(targetHtml);
    };

    $scope.gotoOrderContent = function () {
        var $container = $('.content-scrollable');
        var $scrollTo = $('.order-content');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
        });
        
        writebdLog($scope.category, "_ClickReceive", "渠道号", $scope.gh);//点击领取
    };

    $scope.submitFormCommon = function () {
        //console.log($scope.checkAddress());
        $scope.toast.open();
        //console.log($scope.checkAddress());
        if (!$scope.checkMachineName()) {
            $scope.toast.close();
            return false;
        }

        if (!$scope.checkAddress()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkActiveCode()) {
            $scope.toast.close();
            return false;
        }

        if(!$scope.gh){
            $scope.gh = "";
        }

        if(!$scope.activity){
            $scope.activity ="sdhd";
        }

        //console.log($scope.gh,$scope.activity);

        $scope.submitUrl = cfApi.apiHost + "/wap/taokafanghaoNew/submitOrderCommon.html?activeTag=sdhd&brand=" + encodeURI(encodeURI($scope.machineName)) + "&gh=" + $scope.gh + "&activity=" + $scope.activity + "&reciverName=" + encodeURI(encodeURI($scope.receiver.name)) + "&receiverMobile=" + $scope.receiver.mobile + "&receiverCity=" + encodeURI(encodeURI($scope.receiver.city)) + "&receiverRoom=" + encodeURI(encodeURI($scope.receiver.room)) + "&payType=1&category=" + $scope.category + "&callback=JSON_CALLBACK";

        $http.jsonp($scope.submitUrl).success(function (data, status, headers, config) {
            $scope.toast.close();
            if (data[0].resultCode == "0") {
                $scope.orderNo = data[0].resultMsg;
                var timer = $timeout(
                    function () {
                        var targetHtml = $("#wxQrCode").html();
                        $scope.Overlay.open(targetHtml);
                    },
                    100
                );
            } else {
                $scope.dialog.open("系统提示", data[0].resultMsg);
            }
        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh); //免费领卡
    };

}]);


"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('selectPkg', { //app首页
            url: "/phs/sg/C/:phoneId/selectPkg",
            templateUrl: function ($stateParams) {
                return 'pages/phone/selectPkg/selectPkg.html';
            },
            controller: "selectPkgController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('selectPkgController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = 'C';
    $scope.activeTag = "lj";

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_mysy_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);


    //选择号码 对象类型
    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneCardIndex', { //app首页
            url: "/pcd/:pageType/index",
            templateUrl: function($stateParams) {
                return 'pages/phoneCard/index/' + $stateParams.pageType + '/index.html';
            },
            controller: "phoneCardIndexController"
        });
}]).controller('phoneCardIndexController', ['$scope', '$rootScope', '$location', '$http', '$stateParams', '$timeout', '$interval', function($scope, $rootScope, $location, $http, $stateParams, $timeout, $interval) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    var $container = $('.content-scrollable');

    $scope.pageType = $stateParams.pageType;

    $scope.activeTag = "mysytcb";
    $scope.appType = systemName + "_" + $scope.pageType + "_0ylk";
    $scope.category = $scope.appType;
    $scope.second = 5;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.setPkg = function(event, pkgId) {
        $scope.pkgId = pkgId;
        //var $scrollTo = $('#pickMainPkg');
        var $scrollTo = $('.go-here');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_SelectPackage" + pkgId, "渠道号", $scope.gh);
    };
    
    $scope.userTrack = function(name) {
    	writebdLog($scope.category, name, "渠道号", $scope.gh);
    };

    $scope.checkMainPkg = function() {
        if (!$scope.checkoutForm.productId.$valid) { //原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('#pickMainPkg');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            return false;
        }
        return true;
    };



    $scope.submitForm = function() {
        $scope.toast.open();
        if (!$scope.checkMainPkg()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkSimType()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkMainNumber()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkAddress()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkActiveCode()) {
            $scope.toast.close();
            return false;
        }
        $scope.submitUrl = cfApi.apiHost + "/wap/taokafanghaoNew/submitOrderCommon.html?mainNumber=" + $scope.mainNumber + "&activeTag=" + $scope.activeTag + "&category=" + $scope.category + "&gh=" + $scope.gh + "&activity=" + $scope.activity + "&productId=" + $scope.pkgId + "&reciverName=" + encodeURI(encodeURI($scope.receiver.name)) + "&receiverMobile=" + $scope.receiver.mobile + "&receiverCity=" + encodeURI(encodeURI($scope.receiver.city)) + "&receiverRoom=" + encodeURI(encodeURI($scope.receiver.room)) + "&mainCardTypeId=" + $scope.simItem.id + "&payType=1&category=" + $scope.category + "&callback=JSON_CALLBACK";
        $http.jsonp($scope.submitUrl).success(function(data, status, headers, config) {
            $scope.toast.close();
            if (data[0].resultCode == "0") {
                $scope.orderNo = data[0].resultMsg;
                var timer = $timeout(
                    function() {
                        var targetHtml = $("#wxQrCode").html();
                        $scope.Overlay.open(targetHtml);
                    },
                    100
                );

                $interval(function() {
                    $scope.second--;
                    if ($scope.second <0) {
                        window.location.href = "http://m.yfq.cn/wap/taokafanghaoNew/uploadCardA.html?orderNo=" + $scope.orderNo + "&category=" + $scope.category + "&s=wap";
                        return false;
                    }
                        $("#time-new").html($scope.second);
                }, 1000);
                
            } else {
                $scope.dialog.open("系统提示", data[0].resultMsg);
            }
        }).error(function(data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh); //免费领卡
    };

    $(".fqa-more").click(function() {
        $(".fqa-lists").toggleClass("close");
        $(this).toggleClass("close");
    });


    androidInputBugFix();
}]);

"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider.state('pcdRecharge', { //app首页
        url: "/pcdRecharge/index",
        templateUrl: "pages/phoneCard/recharge/index.html",
        controller: "pdRechargeController"
    });
}]).controller('pdRechargeController', ['$scope', '$rootScope', '$location', '$http', '$timeout', function ($scope, $rootScope, $location, $http, $timeout) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
    //console.log($scope.referrerForm.referrerNo);
    $location.path("/phone/active/D/phones");

    $scope.pageType = "pcdRecharge";
    $scope.appType = systemName + "_recharge_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/pcdRecharge/index' + window.location.search,
        shareTitle: '翼分期商城——话费充值优惠',
        shareDisc: '翼分期商城新用户专享，话费充100送100，充200送150，更多充值优惠等你来！',
        picUrl:'http://app.yfq.cn/images/phoneCard/recharge/share.jpg'
    };

    //统计

    $timeout(function () {
        writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
        //$scope.$root.toast.close();
    });

    $scope.rechargeMobile = function (rechargeMobile) {
        $scope.rechargeStatus = undefined;
        if (!$scope.checkoutForm.iccid.$valid) {
            return false;
        } else {
            $("#iccid").blur();
        }
        $http.jsonp(cfApi.apiHost + '/yfqcz/czOrdRechargeController.do?checkAllowCharge&rechargeMobile=' + rechargeMobile + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.rechargeStatus = data.resultCode;

            writebdLog($scope.category, "_InputIndexNumber", "渠道号", $scope.gh);

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });
    };

    $http.jsonp(cfApi.apiHost + '/yfqcz/czProdProductsController.do?findRechargeProducts&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.rechargeProducts = data;

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.setProduct = function (event, product) {
        var $this = $(event.currentTarget);

        if ($this.hasClass("disabled")) {
            return false;
        }

        $scope.$root.toast.open();

        var name = "";
        if (product.name == "充 100 元送 5 元") name = "Give5Y";
        if (product.name == "充 50 元送 30 元") name = "Give30Y";
        if (product.name == "充 50 元送 50 元") name = "Give50Y";
        if (product.name == "充 100 元送 100 元") name = "Give100Y";
        if (product.name == "充 100 元") name = "Charge100Y";
        if (product.name == "充 200 元送 150 元") name = "Give150Y";
        if (product.name == "充 500 元送 300 元") name = "Give300Y";
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);

        $scope.product = product;
        $timeout(function () {
            $("#checkoutForm").submit();
            //$scope.$root.toast.close();
        });
    };

    $scope.showRechargeTip = function (e) {
        var targetHtml = $("#rechargeTipsPanel").html();
        $scope.$root.Overlay.open(targetHtml);
    };

    $scope.getContact = function (e) {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog(scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    //记录点击事件
    $scope.writeClickEvent = function (event, name) {
        var $this = $(event.currentTarget);
        if ($this.hasClass("disabled")) {
            event.preventDefault();
            return false;
        }
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);//记录点击事件
    };

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('referrerSysLogin', { //app首页
            url: "/referrerSys/login",
            templateUrl: "pages/referrerSys/login/login.html",
            controller: "referrerSysLoginController"
        });
}]).controller('referrerSysLoginController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
    //console.log($scope.referrerForm.referrerNo);
    $scope.homeUrl = "http://app.yfq.cn/phone/active/B";
    $scope.searchOrder = cfApi.apiHost + "/wap/customer/searchIndexA.html";
    $scope.$root.dialogClass = "referrer-dialog";

    $scope.$root.hasMoreBtn = true;

    $scope.login = function (event, referrerNo) {
        if ($scope.referrerForm.referrerNo.$valid) {
            $http.jsonp(cfApi.apiHost + '/product/getQrCode.html?referrerNo=' + referrerNo + '&gh=jktchd&activity=jktchd&url=' + $scope.homeUrl + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                var html = "<div class='img-box'><img src='" + data[0].upCodePath + "'></div><p><a href='" + $scope.homeUrl + "?gh=jktchd&activity=jktchd&referrerNo=" + referrerNo + "'>进入官网</a></p>";
                $http.jsonp(cfApi.apiHost + '/product/getQrCode.html?referrerNo=' + referrerNo + '&gh=jktchd&activity=jktchd&url=' + $scope.searchOrder + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                    html = html + "<div class='img-box'><img src='" + data[0].upCodePath + "'></div><p><a href='" + $scope.searchOrder + "?gh=jktchd&activity=jktchd&referrerNo=" + referrerNo + "'>查询订单</a></p>";
                    $scope.dialog.open("", html);
                }).error(function (data, status, headers, config) {
                    console.log("error");
                    //deferred.reject(status)
                });
            }).error(function (data, status, headers, config) {
                console.log("error");
                //deferred.reject(status)
            });
        } else {

        }
    }
}]);
'use strict';

app.directive("mainNumber", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/mainNumber/n.html",
        controller: "numberController",
        link: function (scope, element, attrs) {
            scope.phoneTitle=attrs.title;
            var $container = $('.content-scrollable');

            scope.$root.checkMainNumber = function () {
                if (!scope.checkoutForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickMainNumber');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    $("#pickMainNumberPanel").slideDown();
                    return false;
                }
                return true;
            };

            scope.setMainNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(numberItem.n, scope.subNumber)) {
                    scope.mainNumber = numberItem.n;
                    scope.$root._mainNumber = numberItem.n;
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    if(!(attrs.noAnimate == "true")){
                        $("#pickMainNumberPanel").slideToggle();
                        $("#pickMainNumber .weui-cells").toggleClass("down");
                    }
                    writebdLog(scope.category, "_mainSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }
            };

            scope.showMNumberPn = function (event) {
                if(!(attrs.noAnimate == "true")){
                    $("#pickMainNumberPanel").slideToggle();
                    $(event.currentTarget).toggleClass("down");
                }
                writebdLog(scope.category, "_mainCuteNumber", "渠道号", scope.gh);//选择主卡靓号
            };
        }
    };
}]).controller('numberController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $scope.phoneSubData = new Array();

    $scope.phoneMainFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.phoneSubFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneSubData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterSubData = _data;
        } else {
            $scope.filterSubData = $scope.phoneSubData;
        }
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query, type) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_' + type + 'InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码

        data = data.sort(function (a,b) {
            return b.s-a.s;
        });

        $.each(eval(data), function (i, k) {
            if(k.s<=800){
                $scope.phoneData.push(k);
                if(k.t == 0){
                    $scope.phoneSubData.push(k);
                }
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.filterSubData = $scope.phoneSubData;
        $scope.pageSize = 12;

        //设置数据源(分页)
        $scope.setData = function (type) {
            if (type == "main") {
                $scope.mainItems = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
            else {
                $scope.subItems = $scope.filterSubData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
        };

        //初始化数据
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page, type) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData(type);
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function (type) {
            $scope.selectPage($scope.selPage - 1, type);
        };
        //下一页
        $scope.Next = function (type) {
            $scope.selectPage($scope.selPage + 1, type);
            writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("subNumber", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/subNumber/n.html",
        controller: "numberController",
        link: function (scope, element, attrs) {

            var $container = $('.content-scrollable');

            scope.checkSubNumber = function () {
                //alert("sub");
                if (!scope.checkoutForm.subNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickSubNumber');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    $("#pickSubNumberPanel").slideDown();
                    return false;
                }
                return true;
            };

            scope.setSubNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(scope.mainNumber,numberItem.n)) {
                    scope.subNumber = numberItem.n;
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    $("#pickSubNumberPanel").slideToggle();
                    $("#pickSubNumber .weui-cells").toggleClass("down");
                    writebdLog(scope.category, "_subSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }
            };

            scope.showSNumberPn = function (event) {
                $("#pickSubNumberPanel").slideToggle();
                $(event.currentTarget).toggleClass("down");
                writebdLog(scope.category, "_subCuteNumber", "渠道号", scope.gh);//选择副卡靓号
            };
        }
    };
}]);
'use strict';

app.directive("appNumber", ["$cookieStore", '$timeout', function ($cookieStore, $timeout) {
    return {
        restrict: 'E',
        scope: {
            inputData: '=',
            outputData: '=',
            selectedData: '=',
            autoSelect: '='
        },
        templateUrl: "modules/common/phoneQuery/number/number.html",
        link: function (scope, element, attrs) {

            scope.pageSize = 6;

            scope.numberType = attrs.numberType;

            scope.setNumber = function (event, numberType, number) {
                var $this = $(event.currentTarget);
                if ($this.hasClass('disabled')) {
                    return false;
                }
                scope.outputData = {
                    numberType: numberType,
                    number: number
                };
                scope.thisNumber = {
                    numberType: numberType,
                    number: number
                };
            };

            scope.dataInit = function () {
                scope.selPage = 1;
                scope.pages = Math.ceil(scope.numbers.length / scope.pageSize); //分页数
                scope.items = scope.numbers.slice(0, scope.pageSize);

                //console.log(scope.outputData);
            };

            scope.setData = function () {
                scope.items = scope.numbers.slice((scope.pageSize * (scope.selPage - 1)), (scope.selPage * scope.pageSize));
            };

            scope.selectPage = function (page) {
                //不能小于1大于最大
                if (page < 1 || page > scope.pages) return;

                scope.selPage = page;
                scope.setData();
            };

            //上一页
            scope.Previous = function () {
                scope.selectPage(scope.selPage - 1);
            };
            //下一页
            scope.Next = function () {
                scope.selectPage(scope.selPage + 1);
            };

            scope.$watch('inputData', function (n, o, scope) {
                if (n !== o && n !== undefined) {
                    scope.numbers = n;
                    scope.dataInit();

                    var randIndex = parseInt(Math.random() * n.length);

                    if (scope.autoSelect) {
                        if (scope.numberType === 'mainNumber') {
                            scope.outputData = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                        }
                        $timeout(function () {
                            if (scope.numberType === 'subNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                            }
                        });
                        $timeout(function () {
                            if (scope.numberType === 'thirdNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                            }
                        });
                    }

                }
            }, true);

            scope.$watch('autoSelect', function (n, o, scope) {
                if (n !== o && n !== undefined) {
                    if (n) {

                        var randIndex = parseInt(Math.random() * n.length);
                        if (scope.numberType === 'mainNumber') {
                            scope.outputData = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                        }
                        if (scope.numberType === 'subNumber') {
                            scope.outputData = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                        }
                        $timeout(function () {
                            if (scope.numberType === 'thirdNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                            }
                        });
                    } else {
                        if (scope.numberType === 'mainNumber') {
                            scope.outputData = {
                                numberType: scope.numberType
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType
                            };
                        }
                        if (scope.numberType === 'subNumber') {
                            scope.outputData = {
                                numberType: scope.numberType
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType
                            };
                        }
                        $timeout(function () {
                            if (scope.numberType === 'thirdNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType
                                };
                            }
                        });
                    }
                }
            });
        }
    };
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flowCard', { //app首页
            url: "/fd/product",
            templateUrl: "pages/flowCard/flowCard-details/default/flowCard-details.html",
            controller: "fdProController"
        })
        .state('flowCardMifi', { //app首页
            url: "/fd/mifi",
            templateUrl: "pages/flowCard/flowCard-details/default/flowCard-details.html",
            controller: "fdProController"
        });
}]).controller('fdProController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {


    window.location.href = cfApi.apiHost + "/yfqcz/#/";
    $scope.appType = systemName + "_FlowPackage";

    if ($location.path() == "/fd/mifi") {
        $scope.appType = systemName + "_FlowPackage_MiFi";
    }

    $scope.category = $scope.appType;

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);//页面载入
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardIn', { //app首页
            url: "/fd/fds/:appType",
            templateUrl: "pages/flowCard/flowCard-details/in/flowCard-details.html",
            controller: "fdProInController"
        });
}]).controller('fdProInController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    window.location.href = cfApi.apiHost + "/yfqcz/#/";

    $scope.appType = systemName+"_FlowPackage";
    $scope.category = $scope.appType;

    writebdLog($scope.category,"_Load","渠道号",$scope.gh);//页面载入
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardV3', { //app首页
            url: "/fd/v3/:productId",
            templateUrl: "pages/flowCard/flowCard-details/v3/v3.html",
            controller: "flowCardV3Controller"
        })
}]).controller('flowCardV3Controller', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "mifitc";
    $scope.pageType = 'A';
    $scope.category = systemName + "_mifitc_" + $scope.pageType;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.productId + "&activeTag=mifitc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.product = data;
        $scope.selectedMifis = [$scope.product.activityproductId];
        $scope.packageItem = data.packageProductList[0];

        var mifis = [];
        $.each(data.phoneTypes, function (i, k) {
            mifis.push({
                productId: k.productId,
                productName: k.productName,
                salePrice: k.salePrice,
                selected: false
            });
        });

        $scope.mifis = mifis;
        $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/fd/v3/' + $stateParams.productId + window.location.search,
            shareTitle: '不限流量套餐，重磅推出，人均仅38元/月！送无线WIFI设备！',
            shareDisc: '一人付费，全家分享！无线广东流量，6G全国流量，1000分钟国内通话，抢先办理！',
            picUrl: 'http://app.yfq.cn/images/flow/flowcard/v3/nativeShare.jpg'
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    if ($location.search().duplicateNum) {
        $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
    }

    $scope.autoSelect = true;

    $scope.setAutoSelect = function () {
        $scope.autoSelect = !$scope.autoSelect;
        writebdLog($scope.category, "_SystemNumber" + !$scope.autoSelect, "渠道号", $scope.gh); //是否系统分配号码
    };

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomName() + "(" + getRandomReceiverPhone() + ")" + " 领取无限流量套餐 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        var _data = [];
        var inputData1 = [];
        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                if (k.t == 0) {
                    _data.push(k);
                }
            }
        });

        $.each(_data, function (i, k) {
            if (k.fee == 0) {
                inputData1.push(k);
            }
        });

        $scope.inputData = _data;
        $scope.inputData1 = inputData1;
    });

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.mainPanel = false;
    $scope.showMainPanel = function () {
        $scope.mainPanel = !$scope.mainPanel;
        writebdLog($scope.category, "_PanelMain" + $scope.mainPanel, "渠道号", $scope.gh);
    };

    $scope.subPanel = false;
    $scope.showSubPanel = function () {
        $scope.subPanel = !$scope.subPanel;
        writebdLog($scope.category, "_PanelSub" + $scope.subPanel, "渠道号", $scope.gh);
    };

    $scope.thirdPanel = false;
    $scope.showThirdPanel = function () {
        $scope.thirdPanel = !$scope.thirdPanel;
        writebdLog($scope.category, "_PanelThrid" + $scope.thirdPanel, "渠道号", $scope.gh);
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.selectedData = {};
    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");
        if (!$scope.checkoutForm.mainNumber.$valid) {
            $scope.mainNumberWarn = true;
            $scope.goTo('#mainNumberArea');
            return false;
        }
        if (!$scope.autoSelect) {
            if (!$scope.checkoutForm.subNumber.$valid) {
                $scope.subNumberWarn = true;
                $scope.goTo('#subNumberArea');
                return false;
            }
            if (!$scope.checkoutForm.thirdNumber.$valid) {
                $scope.thirdNumberWarn = true;
                $scope.goTo('#thirdNumberArea');
                return false;
            }
        }
        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        var url = cfApi.apiHost + "/product/checkPhoneState.html?number=[" + $scope.selectedData.mainNumber.n + "," + $scope.selectedData.subNumber.n + "," + $scope.selectedData.thirdNumber.n + "]&s=wap&callback=JSON_CALLBACK";

        $scope.$root.toast.open();
        $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
            if (data.tempIndexs.length === 0) {//查看号码是否被选
                $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.packageItem.productId + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

                    if (data.result) {
                        $form.submit();
                        $scope.$root.toast.close();
                        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
                    } else {
                        $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
                        $scope.$root.toast.close();
                    }
                });
            } else {
                $scope.$root.toast.close();
                var html = "您选择的";
                for (var i = 0; i < data.tempIndexs.length; i++) {
                    if (data.tempIndexs[i] === 0) {
                        html = html + "主卡电话号码：" + $scope.selectedData.mainNumber.n + "、";
                        $scope.mainNumberWarn = true;
                        $scope.selectedData.mainNumber = "";
                    }
                    if (data.tempIndexs[i] === 1) {
                        html = html + "副卡1电话号码：" + $scope.selectedData.subNumber.n + "、";
                        $scope.subNumberWarn = true;
                        $scope.selectedData.subNumber = "";
                    }
                    if (data.tempIndexs[i] === 2) {
                        html = html + "副卡2电话号码：" + $scope.selectedData.thirdNumber.n + "、";
                        $scope.thirdNumberWarn = true;
                        $scope.selectedData.thirdNumber = "";
                    }
                }
                html = html + "已被选择，请重新选号！";
                $scope.dialog.open("系统提示", html);
            }
        });
    };
    $scope.fqaMore = false;
    $scope.setFqaMore = function () {
        $scope.fqaMore = !$scope.fqaMore;
    };
    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [$scope.product.activityproductId];
            $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n) {
                var $form = $("#checkoutForm");
                $form.submit();
                writebdLog($scope.category, "_" + "BuyNowThree", "渠道号", $scope.gh);//立即支付
            }
        }
    });

    $scope.$watch('selectedData', function (n, o, $scope) {
        if (n != o && n.thirdNumber) {
            if (n.subNumber.n === n.thirdNumber.n) {
                $scope.autoSelect = !$scope.autoSelect;
                $scope.autoSelect = !$scope.autoSelect;
            }
        }

    }, true);

    $scope.$watch('outputData', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n.numberType === 'mainNumber') {
                $scope.selectedData.mainNumber = n.number;
                $scope.mainPanel = false;
                $scope.mainNumberWarn = false;

                if ($scope.inputData1.indexOf(n.number) != -1) {
                    $scope.inputData1 = $scope.inputData1.slice(0, $scope.inputData1.indexOf(n.number)).concat($scope.inputData1.slice($scope.inputData1.indexOf(n.number) + 1));
                }
            }
            if (n.numberType === 'subNumber') {
                $scope.selectedData.subNumber = n.number;
                if (n.number) {
                    $scope.subPanel = false;
                    $scope.subNumberWarn = false;
                } else {
                    $scope.subPanel = true;
                }
            }
            if (n.numberType === 'thirdNumber') {
                $scope.selectedData.thirdNumber = n.number;
                if (n.number) {
                    $scope.thirdPanel = false;
                    $scope.thirdNumberWarn = false;
                } else {
                    $scope.thirdPanel = true;
                }
            }
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardV4', { //app首页
            url: "/fd/v4/:productId",
            templateUrl: "pages/flowCard/flowCard-details/v4/v4.html",
            controller: "flowCardV4Controller"
        })
}]).controller('flowCardV4Controller', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "mifitc";
    $scope.pageType = 'B';
    $scope.category = systemName + "_mifitc_" + $scope.pageType;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.productId + "&activeTag=mifitc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.product = data;
        $scope.selectedMifis = [$scope.product.activityproductId];
        $scope.packageItem = data.packageProductList[0];

        var mifis = [];
        $.each(data.phoneTypes, function (i, k) {
            mifis.push({
                productId: k.productId,
                productName: k.productName,
                salePrice: k.salePrice,
                selected: false
            });
        });

        $scope.mifis = mifis;
        $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/fd/v4/' + $stateParams.productId + window.location.search,
            shareTitle: '不限流量套餐，重磅推出，人均仅38元/月！送无线WIFI设备！',
            shareDisc: '一人付费，全家分享！无线广东流量，6G全国流量，1000分钟国内通话，抢先办理！',
            picUrl: 'http://app.yfq.cn/images/flow/flowcard/v4/nativeShare.jpg'
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];
    $scope.payType = 0;
    $scope.setPayType = function (e, type) {
        $scope.payType = type;
        writebdLog($scope.category, "_" + payTypeAry[type], "渠道号", $scope.gh);//选择支付方式
    };

    if ($location.search().duplicateNum) {
        $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
    }

    $scope.autoSelect = true;

    $scope.setAutoSelect = function () {
        $scope.autoSelect = !$scope.autoSelect;
        writebdLog($scope.category, "_SystemNumber" + !$scope.autoSelect, "渠道号", $scope.gh); //是否系统分配号码
    };

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomName() + "(" + getRandomReceiverPhone() + ")" + " 领取无限流量套餐 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        var _data = [];
        var inputData1 = [];
        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                if (k.t == 0) {
                    _data.push(k);
                }
            }
        });

        $.each(_data, function (i, k) {
            if (k.fee == 0) {
                inputData1.push(k);
            }
        });

        $scope.inputData = _data;
        $scope.inputData1 = inputData1;
    });

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.mainPanel = false;
    $scope.showMainPanel = function () {
        $scope.mainPanel = !$scope.mainPanel;
        writebdLog($scope.category, "_PanelMain" + $scope.mainPanel, "渠道号", $scope.gh);
    };

    $scope.subPanel = false;
    $scope.showSubPanel = function () {
        $scope.subPanel = !$scope.subPanel;
        writebdLog($scope.category, "_PanelSub" + $scope.subPanel, "渠道号", $scope.gh);
    };

    $scope.thirdPanel = false;
    $scope.showThirdPanel = function () {
        $scope.thirdPanel = !$scope.thirdPanel;
        writebdLog($scope.category, "_PanelThrid" + $scope.thirdPanel, "渠道号", $scope.gh);
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.selectedData = {};

    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");
        if (!$scope.checkoutForm.mainNumber.$valid) {
            $scope.mainNumberWarn = true;
            $scope.goTo('#mainNumberArea');
            return false;
        }
        if (!$scope.autoSelect) {
            if (!$scope.checkoutForm.subNumber.$valid) {
                $scope.subNumberWarn = true;
                $scope.goTo('#subNumberArea');
                return false;
            }
            if (!$scope.checkoutForm.thirdNumber.$valid) {
                $scope.thirdNumberWarn = true;
                $scope.goTo('#thirdNumberArea');
                return false;
            }
        }
        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        var url = cfApi.apiHost + "/product/checkPhoneState.html?number=[" + $scope.selectedData.mainNumber.n + "," + $scope.selectedData.subNumber.n + "," + $scope.selectedData.thirdNumber.n + "]&s=wap&callback=JSON_CALLBACK";

        $scope.$root.toast.open();
        $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
            if (data.tempIndexs.length === 0) {//查看号码是否被选
                $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.packageItem.productId + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

                    if (data.result) {
                        $form.submit();
                        $scope.$root.toast.close();
                        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
                    } else {
                        $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
                        $scope.$root.toast.close();
                    }
                });
            } else {
                $scope.$root.toast.close();
                var html = "您选择的";
                for (var i = 0; i < data.tempIndexs.length; i++) {
                    if (data.tempIndexs[i] === 0) {
                        html = html + "主卡电话号码：" + $scope.selectedData.mainNumber.n + "、";
                        $scope.mainNumberWarn = true;
                        $scope.selectedData.mainNumber = "";
                    }
                    if (data.tempIndexs[i] === 1) {
                        html = html + "副卡1电话号码：" + $scope.selectedData.subNumber.n + "、";
                        $scope.subNumberWarn = true;
                        $scope.selectedData.subNumber = "";
                    }
                    if (data.tempIndexs[i] === 2) {
                        html = html + "副卡2电话号码：" + $scope.selectedData.thirdNumber.n + "、";
                        $scope.thirdNumberWarn = true;
                        $scope.selectedData.thirdNumber = "";
                    }
                }
                html = html + "已被选择，请重新选号！";
                $scope.dialog.open("系统提示", html);
            }
        });
    };
    $scope.fqaMore = false;
    $scope.setFqaMore = function () {
        $scope.fqaMore = !$scope.fqaMore;
    };
    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [$scope.product.activityproductId];
            $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n) {
                var $form = $("#checkoutForm");
                $form.submit();
                writebdLog($scope.category, "_" + "BuyNowThree", "渠道号", $scope.gh);//立即支付
            }
        }
    });

    $scope.$watch('selectedData', function (n, o, $scope) {
        if (n != o && n.thirdNumber) {
            if (n.subNumber.n === n.thirdNumber.n) {
                $scope.autoSelect = !$scope.autoSelect;
                $scope.autoSelect = !$scope.autoSelect;
            }
        }

    }, true);

    $scope.$watch('outputData', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n.numberType === 'mainNumber') {
                $scope.selectedData.mainNumber = n.number;
                $scope.mainPanel = false;
                $scope.mainNumberWarn = false;

                if ($scope.inputData1.indexOf(n.number) != -1) {
                    $scope.inputData1 = $scope.inputData1.slice(0, $scope.inputData1.indexOf(n.number)).concat($scope.inputData1.slice($scope.inputData1.indexOf(n.number) + 1));
                }
            }
            if (n.numberType === 'subNumber') {
                $scope.selectedData.subNumber = n.number;
                if (n.number) {
                    $scope.subPanel = false;
                    $scope.subNumberWarn = false;
                } else {
                    $scope.subPanel = true;
                }
            }
            if (n.numberType === 'thirdNumber') {
                $scope.selectedData.thirdNumber = n.number;
                if (n.number) {
                    $scope.thirdPanel = false;
                    $scope.thirdNumberWarn = false;
                } else {
                    $scope.thirdPanel = true;
                }
            }
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardV5', { //app首页
            url: "/fd/v5/:productId",
            templateUrl: "pages/flowCard/flowCard-details/v5/v5.html",
            controller: "flowCardV5Controller"
        })
}]).controller('flowCardV5Controller', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "mifitc";
    $scope.pageType = 'C';
    $scope.category = systemName + "_mifitc_" + $scope.pageType;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.productId + "&activeTag=mifitc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.product = data;
        $scope.selectedMifis = [$scope.product.activityproductId];
        $scope.packageItem = data.packageProductList[0];

        var mifis = [];
        $.each(data.phoneTypes, function (i, k) {
            mifis.push({
                productId: k.productId,
                productName: k.productName,
                salePrice: k.salePrice,
                selected: false
            });
        });

        $scope.mifis = mifis;
        $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/fd/v5/' + $stateParams.productId + window.location.search,
            shareTitle: '全国199元不限流量套餐，今日办理，送随身WIFI！',
            shareDisc: '无需换号，全国随意用！3000分钟国内通话，今日限100张！',
            picUrl: 'http://app.yfq.cn/images/flow/flowcard/v5/nativeShare.jpg'
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];
    $scope.payType = 1;
    $scope.setPayType = function (e, type) {
        $scope.payType = type;
        writebdLog($scope.category, "_" + payTypeAry[type], "渠道号", $scope.gh);//选择支付方式
    };

    if ($location.search().duplicateNum) {
        $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
    }

    $scope.autoSelect = true;

    $scope.setAutoSelect = function () {
        $scope.autoSelect = !$scope.autoSelect;
        writebdLog($scope.category, "_SystemNumber" + !$scope.autoSelect, "渠道号", $scope.gh); //是否系统分配号码
    };

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomName() + "(" + getRandomReceiverPhone() + ")" + " 领取无限流量套餐 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        var _data = [];
        var inputData1 = [];
        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                if (k.t == 0) {
                    _data.push(k);
                }
            }
        });

        $.each(_data, function (i, k) {
            if (k.fee == 0) {
                inputData1.push(k);
            }
        });

        $scope.inputData = _data;
        $scope.inputData1 = inputData1;
    });

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.mainPanel = false;
    $scope.showMainPanel = function () {
        $scope.mainPanel = !$scope.mainPanel;
        writebdLog($scope.category, "_PanelMain" + $scope.mainPanel, "渠道号", $scope.gh);
    };

    $scope.subPanel = false;
    $scope.showSubPanel = function () {
        $scope.subPanel = !$scope.subPanel;
        writebdLog($scope.category, "_PanelSub" + $scope.subPanel, "渠道号", $scope.gh);
    };

    $scope.thirdPanel = false;
    $scope.showThirdPanel = function () {
        $scope.thirdPanel = !$scope.thirdPanel;
        writebdLog($scope.category, "_PanelThrid" + $scope.thirdPanel, "渠道号", $scope.gh);
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.selectedData = {};

    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");
        if (!$scope.checkoutForm.mainNumber.$valid) {
            $scope.mainNumberWarn = true;
            $scope.goTo('#mainNumberArea');
            return false;
        }
        if (!$scope.autoSelect) {
            if (!$scope.checkoutForm.subNumber.$valid) {
                $scope.subNumberWarn = true;
                $scope.goTo('#subNumberArea');
                return false;
            }
            if (!$scope.checkoutForm.thirdNumber.$valid) {
                $scope.thirdNumberWarn = true;
                $scope.goTo('#thirdNumberArea');
                return false;
            }
        }
        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        var url = cfApi.apiHost + "/product/checkPhoneState.html?number=[" + $scope.selectedData.mainNumber.n + "]&s=wap&callback=JSON_CALLBACK";

        $scope.$root.toast.open();
        $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
            if (data.tempIndexs.length === 0) {//查看号码是否被选
                $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.packageItem.productId + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

                    if (data.result) {
                        $form.submit();
                        $scope.$root.toast.close();
                        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
                    } else {
                        $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
                        $scope.$root.toast.close();
                    }
                });
            } else {
                $scope.$root.toast.close();
                var html = "您选择的";
                for (var i = 0; i < data.tempIndexs.length; i++) {
                    if (data.tempIndexs[i] === 0) {
                        html = html + "主卡电话号码：" + $scope.selectedData.mainNumber.n + "、";
                        $scope.mainNumberWarn = true;
                        $scope.selectedData.mainNumber = "";
                    }
                    if (data.tempIndexs[i] === 1) {
                        html = html + "副卡1电话号码：" + $scope.selectedData.subNumber.n + "、";
                        $scope.subNumberWarn = true;
                        $scope.selectedData.subNumber = "";
                    }
                    if (data.tempIndexs[i] === 2) {
                        html = html + "副卡2电话号码：" + $scope.selectedData.thirdNumber.n + "、";
                        $scope.thirdNumberWarn = true;
                        $scope.selectedData.thirdNumber = "";
                    }
                }
                html = html + "已被选择，请重新选号！";
                $scope.dialog.open("系统提示", html);
            }
        });
    };
    $scope.fqaMore = false;
    $scope.setFqaMore = function () {
        $scope.fqaMore = !$scope.fqaMore;
    };
    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [$scope.product.activityproductId];
            $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n) {
                var $form = $("#checkoutForm");
                $form.submit();
                writebdLog($scope.category, "_" + "BuyNowThree", "渠道号", $scope.gh);//立即支付
            }
        }
    });

    $scope.$watch('selectedData', function (n, o, $scope) {
        if (n != o && n.thirdNumber) {
            if (n.subNumber.n === n.thirdNumber.n) {
                $scope.autoSelect = !$scope.autoSelect;
                $scope.autoSelect = !$scope.autoSelect;
            }
        }

    }, true);

    $scope.$watch('outputData', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n.numberType === 'mainNumber') {
                $scope.selectedData.mainNumber = n.number;
                $scope.mainPanel = false;
                $scope.mainNumberWarn = false;

                if ($scope.inputData1.indexOf(n.number) != -1) {
                    $scope.inputData1 = $scope.inputData1.slice(0, $scope.inputData1.indexOf(n.number)).concat($scope.inputData1.slice($scope.inputData1.indexOf(n.number) + 1));
                }
            }
            if (n.numberType === 'subNumber') {
                $scope.selectedData.subNumber = n.number;
                if (n.number) {
                    $scope.subPanel = false;
                    $scope.subNumberWarn = false;
                } else {
                    $scope.subPanel = true;
                }
            }
            if (n.numberType === 'thirdNumber') {
                $scope.selectedData.thirdNumber = n.number;
                if (n.number) {
                    $scope.thirdPanel = false;
                    $scope.thirdNumberWarn = false;
                } else {
                    $scope.thirdPanel = true;
                }
            }
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardV6', { //app首页
            url: "/fd/v6/:productId",
            templateUrl: "pages/flowCard/flowCard-details/v6/v6.html",
            controller: "flowCardV6Controller"
        })
}]).controller('flowCardV6Controller', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "99wxll";
    $scope.pageType = 'B';
    $scope.category = systemName + "_99wxll_" + $scope.pageType;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.productId + "&activeTag=mifitc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.product = data;
        $scope.selectedMifis = [$scope.product.activityproductId];
        $scope.packageItem = data.packageProductList[0];

        var mifis = [];
        $.each(data.phoneTypes, function (i, k) {
            mifis.push({
                productId: k.productId,
                productName: k.productName,
                salePrice: k.salePrice,
                selected: false
            });
        });

        $scope.mifis = mifis;
        $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/fd/v6/' + $stateParams.productId + window.location.search,
            shareTitle: '您有一张无限流量卡可以领取，今日办理，仅需99元！',
            shareDisc: '套餐包含：广东省内无限流量，全国3.5GB，全国通话900分钟！今日限100张！',
            picUrl: 'http://app.yfq.cn/images/flow/flowcard/v6/nativeShare.jpg'
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];
    $scope.payType = 1;
    $scope.setPayType = function (e, type) {
        $scope.payType = type;
        writebdLog($scope.category, "_" + payTypeAry[type], "渠道号", $scope.gh);//选择支付方式
    };

    if ($location.search().duplicateNum) {
        $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
    }

    $scope.autoSelect = true;

    $scope.setAutoSelect = function () {
        $scope.autoSelect = !$scope.autoSelect;
        writebdLog($scope.category, "_SystemNumber" + !$scope.autoSelect, "渠道号", $scope.gh); //是否系统分配号码
    };

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomName() + "(" + getRandomReceiverPhone() + ")" + " 领取无限流量套餐 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        var _data = [];
        var inputData1 = [];
        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                if (k.t == 0) {
                    _data.push(k);
                }
            }
        });

        $.each(_data, function (i, k) {
            if (k.fee == 0) {
                inputData1.push(k);
            }
        });

        $scope.inputData = _data;
        $scope.inputData1 = inputData1;
    });

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.mainPanel = false;
    $scope.showMainPanel = function () {
        $scope.mainPanel = !$scope.mainPanel;
        writebdLog($scope.category, "_PanelMain" + $scope.mainPanel, "渠道号", $scope.gh);
    };

    $scope.subPanel = false;
    $scope.showSubPanel = function () {
        $scope.subPanel = !$scope.subPanel;
        writebdLog($scope.category, "_PanelSub" + $scope.subPanel, "渠道号", $scope.gh);
    };

    $scope.thirdPanel = false;
    $scope.showThirdPanel = function () {
        $scope.thirdPanel = !$scope.thirdPanel;
        writebdLog($scope.category, "_PanelThrid" + $scope.thirdPanel, "渠道号", $scope.gh);
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.selectedData = {};

    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");
        if (!$scope.checkoutForm.mainNumber.$valid) {
            $scope.mainNumberWarn = true;
            $scope.goTo('#mainNumberArea');
            return false;
        }
        if (!$scope.autoSelect) {
            if (!$scope.checkoutForm.subNumber.$valid) {
                $scope.subNumberWarn = true;
                $scope.goTo('#subNumberArea');
                return false;
            }
            if (!$scope.checkoutForm.thirdNumber.$valid) {
                $scope.thirdNumberWarn = true;
                $scope.goTo('#thirdNumberArea');
                return false;
            }
        }
        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        var url = cfApi.apiHost + "/product/checkPhoneState.html?number=[" + $scope.selectedData.mainNumber.n + "," + $scope.selectedData.subNumber.n + "," + $scope.selectedData.thirdNumber.n + "]&s=wap&callback=JSON_CALLBACK";

        $scope.$root.toast.open();
        $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
            if (data.tempIndexs.length === 0) {//查看号码是否被选
                $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.packageItem.productId + '&category=' + $scope.category + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

                    if (data.result) {
                        $form.submit();
                        $scope.$root.toast.close();
                        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
                    } else {
                        $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
                        $scope.$root.toast.close();
                    }
                });
            } else {
                $scope.$root.toast.close();
                var html = "您选择的";
                for (var i = 0; i < data.tempIndexs.length; i++) {
                    if (data.tempIndexs[i] === 0) {
                        html = html + "主卡电话号码：" + $scope.selectedData.mainNumber.n + "、";
                        $scope.mainNumberWarn = true;
                        $scope.selectedData.mainNumber = "";
                    }
                    if (data.tempIndexs[i] === 1) {
                        html = html + "副卡1电话号码：" + $scope.selectedData.subNumber.n + "、";
                        $scope.subNumberWarn = true;
                        $scope.selectedData.subNumber = "";
                    }
                    if (data.tempIndexs[i] === 2) {
                        html = html + "副卡2电话号码：" + $scope.selectedData.thirdNumber.n + "、";
                        $scope.thirdNumberWarn = true;
                        $scope.selectedData.thirdNumber = "";
                    }
                }
                html = html + "已被选择，请重新选号！";
                $scope.dialog.open("系统提示", html);
            }
        });
    };
    $scope.fqaMore = false;
    $scope.setFqaMore = function () {
        $scope.fqaMore = !$scope.fqaMore;
    };
    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [$scope.product.activityproductId];
            $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n) {
                var $form = $("#checkoutForm");
                $form.submit();
                writebdLog($scope.category, "_" + "BuyNowThree", "渠道号", $scope.gh);//立即支付
            }
        }
    });

    $scope.$watch('selectedData', function (n, o, $scope) {
        if (n != o && n.thirdNumber) {
            if (n.subNumber.n === n.thirdNumber.n) {
                $scope.autoSelect = !$scope.autoSelect;
                $scope.autoSelect = !$scope.autoSelect;
            }
        }

    }, true);

    $scope.$watch('outputData', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n.numberType === 'mainNumber') {
                $scope.selectedData.mainNumber = n.number;
                $scope.mainPanel = false;
                $scope.mainNumberWarn = false;

                if ($scope.inputData1.indexOf(n.number) != -1) {
                    $scope.inputData1 = $scope.inputData1.slice(0, $scope.inputData1.indexOf(n.number)).concat($scope.inputData1.slice($scope.inputData1.indexOf(n.number) + 1));
                }
            }
            if (n.numberType === 'subNumber') {
                $scope.selectedData.subNumber = n.number;
                if (n.number) {
                    $scope.subPanel = false;
                    $scope.subNumberWarn = false;
                } else {
                    $scope.subPanel = true;
                }
            }
            if (n.numberType === 'thirdNumber') {
                $scope.selectedData.thirdNumber = n.number;
                if (n.number) {
                    $scope.thirdPanel = false;
                    $scope.thirdNumberWarn = false;
                } else {
                    $scope.thirdPanel = true;
                }
            }
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('BctiveIndex', { //app首页
            url: "/phone/active/B",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/B/index.html';
            },
            controller: "pBctiveController"
        });
}]).controller('pBctiveController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    //$location.path("/phone/active/D/phones");
    $scope.pageType = 'B';

    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.activePage = 'index';

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/A/phones';

    $scope.params = window.location.search;

    $scope.paracont = "获取验证码";
    $scope.paraclass = "but_null";
    var second = 59, timePromise = undefined;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/B' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    if ($cookieStore.get("rasherStore")) {
        $scope.rasherStore = $cookieStore.get("rasherStore");
    } else {
        $scope.rasherStore = $cookieStore.put("rasherStore", 8437);
    }

    if ($cookieStore.get("couponStore")) {
        $scope.couponStore = $cookieStore.get("couponStore");
    } else {
        $scope.couponStore = $cookieStore.put("couponStore", 35);
    }

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.rasherStore = $cookieStore.get("rasherStore");
    $scope.couponStore = $cookieStore.get("couponStore");

    var homeArgs = ['_InputIndexName', '_InputIndexNumber', '_InputIndexCode'];
    //记录落地页输入的操作
    $scope.$root.inputHomeArgs = function (type) {
        writebdLog($scope.category, homeArgs[type], "渠道号", $scope.gh); //输入操作
    };

    $scope.checkCouponMobile = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.couponMobile.$valid) {
            //alert("请输入联系电话");
            $(".input-mobile").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.checkCouponName = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.couponName.$valid) {
            //alert("请输入联系电话");
            $(".input-name").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.checkCouponActiveCode = function () {
        if (!$scope.couponForm.couponActiveCode.$valid) {
            $(".input-vcode").addClass("weui-cell_warn");
            return false;
        } else {
            if (!checkMobileCode($scope.coupon.mobile, $scope.coupon.activeCode)) {
                $(".input-vcode").removeClass("weui-cell_success");
                $(".input-vcode").addClass("weui-cell_warn");
                return false;
            }
            return true;
        }
    };

    $scope.getCouponActiveCode = function (event, phoneNumber) {
        if ($(event.currentTarget).hasClass("not")) {
            //scope.toast.close();
            return false;
        }

        $scope.toast.openUnLimit();

        if (!$scope.checkCouponMobile()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;
        }
        $http.get("http://m.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
            if (data == "") {
                $scope.toast.close();
                timePromise = $interval(function () {
                    if (second <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;

                        second = 59;
                        $scope.paracont = "重发验证码";
                        $scope.paraclass = "but_null";
                    } else {
                        $scope.paracont = second + "秒后可重发";
                        $scope.paraclass = "not but_null";
                        second--;

                    }
                }, 1000, 100);
            }
        });

        writebdLog($scope.category, "_VariIndexCode", "渠道号", $scope.gh); //获取下单页验证码
    };

    $scope.getQuan = function () {
        $scope.toast.open();

        if (!$scope.checkCouponName()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的姓名！");
            return false;
        }

        if (!$scope.checkCouponMobile()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;
        }

        if (!$scope.checkCouponActiveCode()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的验证码！");
            return false;
        }

        var headCategory = $location.search().headCategory;
        var category = $scope.category;
        if (headCategory != undefined && headCategory != null)
            category = headCategory;

        $http.jsonp(cfApi.apiHost + '/product/doReceiveMultipleCoupon.html?recieverMobile=' + $scope.coupon.mobile + '&couponType=HF-MX-JM&gh=' + $scope.gh + '&category=' + category + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $cookieStore.put("couponStore", $cookieStore.get("couponStore") - 1);
            $scope.couponStore = $cookieStore.get("couponStore") - 1;

            $cookieStore.put("rasherStore", $cookieStore.get("rasherStore") + 1);
            $scope.rasherStore = $cookieStore.get("rasherStore") + 1;

            $http.jsonp(cfApi.apiHost + '/product/intentionLog.html?activeTag=jktchd&dataType=tchd&operationName=' + $scope.coupon.mobile + '&operationValue=' + encodeURI($scope.coupon.name) + '&s=wap&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                $scope.toast.close();
                var _params;
                if ($scope.params == '') {
                    _params = "?receiverName=" + $scope.coupon.name + "&receiverMobile=" + $scope.coupon.mobile;
                } else {
                    _params = $scope.params + "&receiverName=" + $scope.coupon.name + "&receiverMobile=" + $scope.coupon.mobile;
                }
                if (data.resultCode == 200) {
                    window.location.href = '/phone/active/B/phones' + _params;
                } else {

                }
            }).error(function (data, status, headers, config) {
                console.log(status);
                //deferred.reject(status)
            });
        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        writebdLog($scope.category, "_NextOrder", "渠道号", $scope.gh); //点击进入下单页
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

        timerHtml = "<em>" + h.toString().slice(0, 1) + "</em><em>" + h.toString().slice(1, 2) + "</em>" + "<span>时</span>" + "<em>" + m.toString().slice(0, 1) + "</em><em>" + m.toString().slice(1, 2) + "</em>" + "<span>分</span>" + "<em>" + s.toString().slice(0, 1) + "</em><em>" + s.toString().slice(1, 2) + "</em><span>秒</span>";
        $(".timer").html(timerHtml);
    };

    setInterval(getRTime, 1000);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeIndex', { //app首页
            url: "/phone/active/A",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/A/hotPhones/hotPhones.html';
            },
            controller: "pActivePhonesController"
        });
}]).controller('pActiveController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = $stateParams.pageType;
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.activePage = 'index';

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/A/phones';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/A' + window.location.search,
        shareTitle: '我领到1888元购机年终奖！年前换个好手机，开开心心回家过大年！',
        shareDisc: '苹果、OPPO、华为、VIVO等大牌手机直降！用券购再立减！戳我抢→',
        picUrl:'http://app.yfq.cn/images/active/share_active.jpg'
    };

    if ($cookieStore.get("couponStore")) {
        $scope.cookieStore = $cookieStore.get("couponStore");
    } else {
        $scope.cookieStore = $cookieStore.put("couponStore", 199);
    }

    $scope.cookieStore = $cookieStore.get("couponStore");

    $scope.params = window.location.search;

    $scope.$root.apiCode = 2;

    $scope.toggleClose = true;

    $scope.fqaToggleClose = function () {
        $scope.toggleClose = !$scope.toggleClose;
        if ($scope.toggleClose)
            writebdLog($scope.category, "_CouExplainStop", "渠道号", $scope.gh);//收起优惠券说明
        else
            writebdLog($scope.category, "_CouExplainShow", "渠道号", $scope.gh);//展示优惠券说明
    };

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomReceiverPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    //记录点击事件
    $scope.writeClickEvent = function (name) {
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);//记录点击事件
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('DctiveIndex', { //app首页
            url: "/phone/active/D",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/D/index.html';
            },
            controller: "pDctivePhonesController"
        });
}]).controller('pDctiveController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = $stateParams.pageType;
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.activePage = 'indexD';

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl: 'http://app.yfq.cn/images/active/d/share_active.jpg'
    };

    if ($cookieStore.get("couponStore")) {
        $scope.cookieStore = $cookieStore.get("couponStore");
    } else {
        $scope.cookieStore = $cookieStore.put("couponStore", 199);
    }

    $scope.cookieStore = $cookieStore.get("couponStore");

    $scope.params = window.location.search;

    $scope.$root.apiCode = 2;

    $scope.toggleClose = true;

    $scope.fqaToggleClose = function () {
        $scope.toggleClose = !$scope.toggleClose;
        if ($scope.toggleClose)
            writebdLog($scope.category, "_CouExplainStop", "渠道号", $scope.gh);//收起优惠券说明
        else
            writebdLog($scope.category, "_CouExplainShow", "渠道号", $scope.gh);//展示优惠券说明
    };

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomReceiverPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    //记录点击事件
    $scope.writeClickEvent = function (name) {
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);//记录点击事件
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

}]);

"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneCardDetails', { //app首页
            url: "/phs/cd/:pageType/:cardId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/card/' + $stateParams.pageType + '/details.html';
            },
            controller: "pCardProController"
        });
}]).controller('pCardProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = $stateParams.pageType;
    $scope.activeTag = "mysytc";

    var activeName = "_mysy_" + $scope.pageType;
    if ($scope.pageType == 'pcdB') activeName = '_yucun_A';
    if ($scope.pageType == 'pcdC') activeName = '_yucun_B';
    if ($scope.pageType == 'pcdD') activeName = '_99wxll_A';
    if ($scope.pageType == 'pcdE') activeName = '_99wxll_B';
    $scope.category = systemName + activeName + "_FlowPackages";

    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();

    $scope.stores = Math.round(Math.random() * 100);
    $scope.sold = Math.round(Math.random() * 5000);

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.pkgs = [
        {
            "message": "50",
            "network": "3.5",
            "oldPrice": "204.00",
            "productId": 252,
            "productName": "5折预存102/月（3.5G流量900分钟通话）",
            "salesPrice": "99.00",
            "talkTime": "900",
            "pkgType": "dkyc50"
        },
        {
            "message": "50",
            "network": "4.5",
            "oldPrice": "304.00",
            "productId": 254,
            "productName": "5折预存156/月（4.5G流量 1800分钟通话）",
            "salesPrice": "156.00",
            "talkTime": "1800",
            "pkgType": "dkyc100"
        },
        {
            "message": "50",
            "network": "4.5",
            "oldPrice": "259.00",
            "productId": 351,
            "productName": "155元/月(900分钟通话,4.5G流量,50短信)",
            "salesPrice": "155.00",
            "talkTime": "900",
            "pkgType": "dkyc100"
        },
        {
            "message": "50",
            "network": "2.5",
            "oldPrice": "174.00",
            "productId": 251,
            "productName": "5折预存101/月（2.5G流量 850分钟）",
            "salesPrice": "98.00",
            "talkTime": "850",
            "pkgType": "dkyc50"
        }
    ];

    if ($scope.pageType == 'pcd') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/index.html' + window.location.search,
            shareTitle: '翼分期商城——电信新入网套餐5折起',
            shareDisc: '中国电信流量大降价，9.9元办五折优惠套餐，3.5G全国流量，仅102元/月！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/1.jpg'
        };
    }
    if ($scope.pageType == 'pcdB') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/indexB.html' + window.location.search,
            shareTitle: '翼分期商城——电信新入网套餐存100赠840',
            shareDisc: '4G月租优惠套餐，最低仅102元/月，3.5G全国流量！限时限量，手快有！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/B/tx1.png'
        };
    }
    if ($scope.pageType == 'pcdC') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/indexB.html' + window.location.search,
            shareTitle: '翼分期商城——电信新入网套餐存100赠840',
            shareDisc: '4G月租优惠套餐，最低仅102元/月，3.5G全国流量！限时限量，手快有！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/B/tx1.png'
        };
    }
    if ($scope.pageType == 'pcdD') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/indexD.html' + window.location.search,
            shareTitle: '您有一张无限流量卡可以领取，今日办理，仅需99元！',
            shareDisc: '套餐包含：广东省内无限流量，全国3.5GB，全国通话900分钟！今日限100张！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/D/nativeShare.jpg'
        };
        $scope.activeTag = "99wxll";
    }

    var pkgUrl;

    if ($stateParams.cardId == "") {
        pkgUrl = cfApi.apiHost + "/product/getPackageInfo.html?productId=" + $scope.pkgs[0].productId + "&s=wap&callback=JSON_CALLBACK";
    } else {
        pkgUrl = cfApi.apiHost + "/product/getPackageInfo.html?productId=" + $stateParams.cardId + "&s=wap&callback=JSON_CALLBACK";
    }

    //console.log(pkgUrl);


    $http.jsonp(pkgUrl).success(function (data, status, headers, config) {
        $scope.card = data;
        $scope.totolPrice = data.salesPrice;
        $scope.showPrice = 50;

        if (data.productId == 254 || data.productId == 351) {
            $scope.showPrice = 100;
        }

    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.cardPay = true;

    $scope.buyType = 1;

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        $(".pay-item").removeClass("on");
        $("#payType" + id).addClass("on");
        wirtePayType(id);
    };

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

    function wirtePayType(payType) {
        value = payTypeAry[payType];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.setBuyType = function (event, type) {
        event.preventDefault();
        $scope.buyType = type;
        var $this = $(event.currentTarget);
        $this.parent().siblings().children().removeClass('curr');
        $this.addClass('curr');
        if (type == 0) {
            $scope.activeTag = "lj";
            $scope.totolPrice = $scope.phone.phonePrice;
            if ($scope.totolPrice < 1500) {
                $scope.setSbPayType(0, '一次性支付');
            }
        } else {
            $scope.totolPrice = $scope.phone.phoneBillPrice + $scope.phone.phonePrice;
            $scope.activeTag = "jjk";
        }
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        $scope.card = pkg;
        $scope.showPrice = 50;

        if (pkg.productId == 254 || pkg.productId == 351) {
            $scope.showPrice = 100;
        }
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on');
        $this.parent().addClass('on');
        $("#pickPackagePanel").slideUp();
    };

    $scope.checkPackage = function () {
        if (!$scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('.card-details');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#pickPackagePanel").slideDown();
            return false;
        }
        return true;
    };

    $scope.showPkgPn = function () {
        $("#pickPackagePanel").slideToggle();
    };

    $scope.selectedMifis = [];

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [];
            $scope.totalPrice = 200;
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                 //选择默认内存
                 $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                 $scope.pkg = phone.packages[0];

                 $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                 $scope.mainPrice = phone.price;*/
            });
        }
    });

    $scope.$watch('card', function (n, o, $scope) {
        if (n !== o, n !== undefined) {
            $http.jsonp(cfApi.apiHost + "/product/getViewProductList.html?productId=" + n.productId + "&s=wap&callback=JSON_CALLBACK").success(function (data) {
                var mifis = [];
                $.each(data, function (i, k) {
                    mifis.push({
                        productId: k.productId,
                        productName: k.productName,
                        oldPrice: k.oldPrice,
                        salePrice: k.salePrice,
                        selected: false
                    });
                });

                $scope.mifis = mifis;
            });
        }
    });

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n) {
                var $form = $("#checkoutForm");
                $form.submit();
                writebdLog($scope.category, "_" + "BuyNowThree", "渠道号", $scope.gh);//立即支付
            }
        }
    });

    $scope.checkForms = function () {
        if ($scope.$root.checkActiveCode()) {

            //$("#checkoutForm").submit();

            var url = cfApi.apiHost + "/product/checkPhoneState.html?number=[" + $scope.checkoutForm.mainNumber.$modelValue + "," + $scope.checkoutForm.subNumber.$modelValue + "," + $scope.checkoutForm.thirdNumber.$modelValue + "]&s=wap&callback=JSON_CALLBACK";

            $scope.$root.toast.open();
            $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
                if (data.tempIndexs.length === 0) {//查看号码是否被选
                    $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.card.productId + '&category=' + $scope.category + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单
                        if (data.result) {
                            $("#checkoutForm").submit();
                            $scope.$root.toast.close();
                            writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
                        } else {
                            $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
                            $scope.$root.toast.close();
                        }
                    });
                } else {
                    $scope.$root.toast.close();
                    var html = "您选择的";
                    for (var i = 0; i < data.tempIndexs.length; i++) {
                        if (data.tempIndexs[i] === 0) {
                            html = html + "主卡电话号码：" + $scope.checkoutForm.mainNumber.$modelValue + "、";
                            $scope.mainNumberWarn = true;
                            //$scope.selectedData.mainNumber = "";
                        }
                        if (data.tempIndexs[i] === 1) {
                            html = html + "副卡1电话号码：" + $scope.checkoutForm.subNumber.$modelValue + "、";
                            $scope.subNumberWarn = true;
                            //$scope.selectedData.subNumber = "";
                        }
                        if (data.tempIndexs[i] === 2) {
                            html = html + "副卡2电话号码：" + $scope.checkoutForm.thirdNumber.$modelValue + "、";
                            $scope.thirdNumberWarn = true;
                            //$scope.selectedData.thirdNumber = "";
                        }
                    }
                    html = html + "已被选择，请重新选号！";
                    $scope.dialog.open("系统提示", html);
                }
            });

        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.submitMifi = function (e) {
        var $this = $(event.currentTarget);
        if ($this.hasClass("disabled")) {
            return false;
        }
        if (!$scope.checkMainNumber()) {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
            return false;
        }

        if (!$scope.checkSimType()) {
            return false;
        }

        if (!$scope.checkAddress()) {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
            return false;
        }

        $scope.checkForms();

    };

    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider',function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneDouble', { //app首页
            url: "/phs/db/:pageType/:phoneId",
            templateUrl: function ($stateParams){
                return 'pages/phone/phone-details/double/A/details.html';
            },
            controller: "pDoubleProController",
            onExit: function(){
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pDoubleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = $stateParams.pageType;

    $scope.activeTag = "mysy";
    
    $scope.appType = systemName + "_mysy_" + $scope.pageType+"_DoublePhones" ;
    $scope.category = $scope.appType;
    $scope.phoneQueryUrl = window.location.href;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.buyType = 1;

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=mysy&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.totolPrice = data.salePrice;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });


    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                //选择默认内存
                $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                $scope.pkg = phone.packages[0];

                $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                $scope.mainPrice = phone.price;*/
            });
        }
    });
    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phone', { //app首页
            url: "/:ghType/:pageType/:phoneId",
            //templateUrl: "pages/phone/phone-details/default/phone-details.html",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/' + $stateParams.ghType + '/details.html';
            },
            controller: "pProController"
        });
}]).controller('pProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore) {

    $scope.pageType = $stateParams.pageType;

    $scope.phone = Phone.get({
        phoneId: $stateParams.phoneId
    }, function (phone) {
        $scope.productId = phone.productId;

        $scope.appType = systemName + "_" + $scope.pageType + "_" + phone.phoneModel;
        //console.log($scope.appType);
        $scope.category = $scope.appType;
        writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
    });

    $cookieStore.put("phoneQueryUrl",window.location.href);
    if($cookieStore.get("phoneQueryUrl")){
        $scope.phoneQueryUrl = $cookieStore.get("phoneQueryUrl");
    };

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get('/data/phones/' + $scope.productId + '.json').success(function (phone) {
                $scope.phone = phone;

                //选择默认内存
                $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                $scope.pkg = phone.packages[0];

                $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                $scope.mainPrice = phone.price;
            });
        }
    });
    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneHu', { //app首页
            url: "/huPhones/:pageType/:phoneId",
            templateUrl: "pages/phone/phone-details/hu/phone-details.html",
            controller: "pProController"
        });
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneMo', { //app首页
            url: "/moPhones/:pageType/:phoneId",
            templateUrl: "pages/phone/phone-details/mo/phone-details.html",
            controller: "pProController"
        });
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('productC', { //app首页
            url: "/pd/productC",
            templateUrl: "pages/phoneCard/phoneCard-details/C/phoneCard-details.html",
            controller: "pdProController"
        });
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('product', { //app首页
            url: "/pd/:pageType/:productId",
            templateUrl: function ($stateParams){
                return 'pages/phoneCard/phoneCard-details/' + $stateParams.pageType + '/phoneCard-details.html';
            },
            controller: "pdProController"
        });
}]).controller('pdProController', ['$scope', '$rootScope', '$location', '$http', '$stateParams', function ($scope, $rootScope, $location, $http, $stateParams) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    $scope.pageType = $stateParams.pageType;

    $scope.appType = systemName + "_" + $scope.pageType + "phoneCard";
    $scope.category = $scope.appType;

    $scope.phone = [];

    $http.get("/data/phonePackage.json").success(function (data) {
        $scope.phone.packages = data;
        $scope.pkg = data[1];
    });

    $scope.$watch("pkg", function (n, o, scope) {
        if (n !== o) {
            $scope.mainPrice = n.price;
        }
    });
    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeBPhones', { //app首页
            url: "/phone/active/B/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/B/hotPhones/hotPhones.html';
            },
            controller: "pBctivePhonesController"
        });
}]).controller('pBctivePhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', '$compile', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore, $compile) {
    $scope.pageType = "B";
    $scope.activeTag = "jktchd";
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;

    var butie = "358:6388;359:5388;360:3880;361:2980;362:2400";

    $scope.payType = 0;

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/B' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    var $container = $(".content-scrollable");

    $scope.receiver = {
        name: $location.search().receiverName,
        mobile: $location.search().receiverMobile,
        city: "",
        room: ""
    };

    var $areaList = $(".area-list");

    writebdLog($scope.category, "_Order_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.setPayType = function (type) {
        $scope.payType = type;
        writebdLog($scope.category, "_PayType" + type, "渠道号", $scope.gh);//选择发货方式
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };


    /*$http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
     $scope.pkgs = data;

     }).error(function (data, status, headers, config) {
     console.log(status);
     //deferred.reject(status)
     });*/

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jktchd&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.phones = data;
        $scope.brands = [];
        $scope.brandsArry = [];
        $.each(data, function (i, k) {
            if ($scope.brandsArry.indexOf(k.brandName) == -1 && k.brandName != '') {
                var obj = {
                    brandName: k.brandName,
                    brandSort: k.brandSort

                };
                $scope.brandsArry.push(k.brandName);
                $scope.brands.push(obj);
            }
        });
        $scope.brands = $scope.brands.sort(function (a, b) {
            return a.brandSort - b.brandSort;
        });
        $scope.brand = $scope.brands[0];

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    function writeBrand(name) {

        if (name == '华为') name = 'huawei';
        if (name == '小米') name = 'mi';
        if (name == '美图') name = 'meitu';
        return name;
    }

    $scope.setMainPhoneBrand = function (e, myBrand) {
        $scope.brand = myBrand;
        writebdLog($scope.category, "_" + writeBrand(myBrand.brandName), "渠道号", $scope.gh);//选择的手机品牌
    };

    $scope.setMainPhone = function (e, phoneId) {
        $scope.phoneId = phoneId;
        writebdLog($scope.category, "_" + phoneId, "渠道号", $scope.gh);//选择的机型
    };

    $scope.setMainPhonePkg = function (e, pkg) {
        $scope.package = pkg;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择的套餐
    };

    $scope.setAddress = function (e, province, city, district, street) {
        $scope.receiver.city = province + city + district + street;
        $scope.addressShow = false;
    };

    $scope.getCity = function (e, province) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + province + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");

            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="getDistricts(e,\'' + province + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    $scope.hideAddress = function () {
        $scope.addressShow = false;
    };

    $scope.getStreet = function (e, province, city, district) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + province + "&city=" + city + "&district=" + district + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");
            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="setAddress(e,\'' + province + '\',\'' + city + '\',\'' + district + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    $scope.hideAddress = function () {
        $scope.addressShow = false;
    };

    $scope.getDistricts = function (e, province, city) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + province + "&city=" + city + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");

            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="getStreet(e,\'' + province + '\',\'' + city + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    //记录落地页输入的操作
    $scope.$root.writeReceiver = function () {
        writebdLog($scope.category, "_Address", "渠道号", $scope.gh); //输入地址
    };

    $scope.checkAddress = function () {
        $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.reciverName.$valid) {
            $(".input-name").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请输入正确的姓名！");
            return false;
        } else if (!$scope.couponForm.receiverMobile.$valid) {
            $(".input-mobile").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;
        } else if (!$scope.couponForm.receiverCity.$valid) {
            $(".input-city").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请选择收件区域！");
            return false;
        } else if (!$scope.couponForm.receiverRoom.$valid) {
            $(".input-room").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请输入详细地址！");
            return false;
        }

        $cookieStore.put("receiver", $scope.receiver);

        return true;
    };

    $scope.submit = function () {
        //$scope.$root.toast.open();
        if ($scope.checkMainNumber()) {
            if (!$scope.checkAddress()) {
                var $scrollTo = $('.quan-form');
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                });
                return false;
            }
            $scope.$root.toast.open();
            $("#couponForm").submit();
        }
        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//提交订单
    };

    $scope.$watch('brand', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $scope.brandPhones = [];
            $.each($scope.phones, function (i, k) {
                if (k.brandName != '' && k.brandName === n.brandName) {
                    $scope.brandPhones.push(k);
                }
            });
            $scope.phoneId = $scope.brandPhones[0].activityproductId;
        }
    }, true);

    $scope.$watch('phoneId', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {

                $scope.phone = data;

                $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                    $scope.pkgs = data;

                    $scope.packageIndex = 0;

                    var cardItems = $scope.phone.cardItems.split(";").sort(function (a, b) {
                        return a.slice(a.indexOf(":") + 1, a.length) - b.slice(b.indexOf(":") + 1, b.length);
                    });


                    $scope.packages = [];

                    $.each(eval(cardItems), function (i, k) {
                        var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                        obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                        obj.comparePrices = $scope.phone.phoneBillPrice - obj.salesPrice;

                        $.each(eval(butie.split(";")), function (jtem, value) {
                            if (value.split(":")[0] == k.slice(0, k.indexOf(':'))) {
                                if ($scope.phone.salePrice > value.split(":")[1]) {
                                    obj.comparePrices = obj.oldPrice * 18 + ($scope.phone.salePrice - value.split(":")[1]);
                                } else {
                                    obj.comparePrices = obj.oldPrice * 18;
                                }
                            }
                        });

                        $scope.packages.push(obj);
                    });

                    for (var i = 1; i < $scope.packages.length; i++) {
                        if ($scope.packages[i].comparePrices < $scope.packages[$scope.packageIndex].comparePrices) {
                            $scope.packageIndex = i;
                        }
                    }

                    $scope.package = $scope.packages[$scope.packageIndex];

                }).error(function (data, status, headers, config) {
                    console.log(status);
                    //deferred.reject(status)
                });

                /*$scope.phone = data;
                 $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[0];
                 $scope.packages = [];
                 $scope.comparePrices = [];
                 $scope.packageIndex = 0;
                 var distance;
                 $.each(eval(data.cardItems.split(";")), function (i, k) {
                 var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                 obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                 $scope.packages.push(obj);
                 $scope.comparePrices.push(data.salePrice - obj.salesPrice);
                 });

                 for (var i = 1; i < $scope.comparePrices.length; i++) {
                 if(Math.abs($scope.comparePrices[i]) < Math.abs($scope.comparePrices[$scope.packageIndex])){
                 $scope.packageIndex = i;
                 }
                 }

                 $scope.package = $scope.packages[$scope.packageIndex];*/
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    }, true);

    $scope.$watch('package', function (n, o, $scope) {
        if (n != o) {
            $.each(eval(butie.split(";")), function (i, k) {
                if (k.split(":")[0] == n.productId) {
                    $scope.btp = k.split(":")[1];
                }
            });

            if ($scope.phone.salePrice > $scope.btp) {
                $scope.totalPrice = $scope.package.oldPrice * 18 + ($scope.phone.salePrice - $scope.btp);
            } else {
                $scope.totalPrice = $scope.package.oldPrice * 18;
            }

            //console.log(cardPrices.indexOf(n.productId));
            //var cp = cardPrices.substr(cardPrices.indexOf(n.productId));
            /*if (n.salesPrice >= $scope.phone.phoneBillPrice) {
             $scope.totalPrice = n.salesPrice;
             } else {
             $scope.totalPrice = $scope.phone.phoneBillPrice;
             }*/
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('BctiveSuccess', { //app首页
            url: "/phone/active/B/success",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/B/success/success.html';
            },
            controller: "pBctiveSController"
        });
}]).controller('pBctiveSController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = 'B';
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;


    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/B' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };
    
    $scope.getOrderQuery = function () {
    	writebdLog($scope.category, "_OrderQuery", "渠道号", $scope.gh);//订单查询
    };

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeCPhones', { //app首页
            url: "/phone/active/C/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/C/hotPhones/hotPhones.html';
            },
            controller: "pCctivePhonesController"
        });
}]).controller('pCctivePhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', '$compile', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore, $compile) {
    $location.path("/phone/active/D/phones");
    $scope.pageType = "C";
    $scope.activeTag = "jktchd";
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/C/phones';

    $scope.payType = 0;

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.paracont = "获取验证码";
    $scope.paraclass = "but_null";
    var second = 59, timePromise = undefined;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/C/phones' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    var $container = $(".content-scrollable");

    $scope.receiver = {
        name: "",
        mobile: "",
        city: "",
        room: ""
    };

    var $areaList = $(".area-list");

    writebdLog($scope.category, "_Order_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.setPayType = function (type) {
        $scope.payType = type;
        writebdLog($scope.category, "_PayType" + type, "渠道号", $scope.gh);//选择发货方式
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };


    $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.pkgs = data;

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jktchd&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.phones = data;
        $scope.brands = [];
        $scope.brandsArry = [];
        $.each(data, function (i, k) {
            if ($scope.brandsArry.indexOf(k.brandName) == -1 && k.brandName != '') {
                var obj = {
                    brandName: k.brandName,
                    brandSort: k.brandSort

                };
                $scope.brandsArry.push(k.brandName);
                $scope.brands.push(obj);
            }
        });
        $scope.brands = $scope.brands.sort(function (a, b) {
            return a.brandSort - b.brandSort;
        });
        $scope.brand = $scope.brands[0];

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    function writeBrand(name) {

        if (name == '华为') name = 'huawei';
        if (name == '小米') name = 'mi';
        if (name == '美图') name = 'meitu';
        return name;
    }

    $scope.setMainPhoneBrand = function (e, myBrand) {
        $scope.brand = myBrand;
        writebdLog($scope.category, "_" + writeBrand(myBrand.brandName), "渠道号", $scope.gh);//选择的手机品牌
    };

    $scope.setMainPhone = function (e, phoneId) {
        $scope.phoneId = phoneId;
        writebdLog($scope.category, "_" + phoneId, "渠道号", $scope.gh);//选择的机型
    };

    $scope.setMainPhonePkg = function (e, pkg) {
        $scope.package = pkg;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择的套餐
    };

    $scope.setAddress = function (e, province, city, district, street) {
        $scope.receiver.city = province + city + district + street;
        $scope.addressShow = false;
    };

    $scope.checkCouponActiveCode = function () {
        if (!$scope.couponForm.couponActiveCode.$valid) {
            $(".input-vcode").addClass("weui-cell_warn");
            return false;
        } else {
            if (!checkMobileCode($scope.receiver.mobile, $scope.coupon.activeCode)) {
                $(".input-vcode").removeClass("weui-cell_success");
                $(".input-vcode").addClass("weui-cell_warn");
                return false;
            }
            return true;
        }
    };

    $scope.checkCouponName = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.reciverName.$valid) {
            //alert("请输入联系电话");
            $(".input-name").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.checkCouponMobile = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.receiverMobile.$valid) {
            //alert("请输入联系电话");
            $(".input-mobile").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.getCouponActiveCode = function (event, phoneNumber) {
        if ($(event.currentTarget).hasClass("not")) {
            //scope.toast.close();
            return false;
        }

        $scope.$root.toast.openUnLimit();

        if (!$scope.checkCouponMobile()) {
            $scope.$root.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;
        }
        $http.get("http://m.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
            if (data == "") {
                $scope.$root.toast.close();
                timePromise = $interval(function () {
                    if (second <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;

                        second = 59;
                        $scope.paracont = "重发验证码";
                        $scope.paraclass = "but_null";
                    } else {
                        $scope.paracont = second + "秒后可重发";
                        $scope.paraclass = "not but_null";
                        second--;

                    }
                }, 1000, 100);
            }
        });

        writebdLog($scope.category, "_VariIndexCode", "渠道号", $scope.gh); //获取下单页验证码
    };

    $scope.getStreet = function (e, province, city, district) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + province + "&city=" + city + "&district=" + district + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");
            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="setAddress(e,\'' + province + '\',\'' + city + '\',\'' + district + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    $scope.hideAddress = function () {
        $scope.addressShow = false;
    };

    $scope.getDistricts = function (e, province, city) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + province + "&city=" + city + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");

            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="getStreet(e,\'' + province + '\',\'' + city + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    //记录落地页输入的操作
    $scope.$root.writeReceiver = function () {
        writebdLog($scope.category, "_Address", "渠道号", $scope.gh); //输入地址
    };

    $scope.checkAddress = function () {
        $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.reciverName.$valid) {
            $scope.dialog.open("系统提示", "请输入正确的姓名！");
            $(".input-name").addClass("weui-cell_warn");
            return false;
        } else if (!$scope.couponForm.receiverMobile.$valid) {
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            $(".input-mobile").addClass("weui-cell_warn");
            return false;
        } else if (!$scope.couponForm.receiverCity.$valid) {
            $(".input-city").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请选择收件区域！");
            return false;
        } else if (!$scope.couponForm.receiverRoom.$valid) {
            $(".input-room").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请输入详细地址！");
            return false;
        }

        $cookieStore.put("receiver", $scope.receiver);

        return true;
    };

    $scope.submit = function () {
        $scope.$root.toast.open();
        if ($scope.payType == 3) {

            if (!$scope.checkCouponName()) {
                $scope.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的姓名！");
                return false;
            }

            if (!$scope.checkCouponMobile()) {
                $scope.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的手机号码！");
                return false;
            }

            if (!$scope.checkCouponActiveCode()) {
                $scope.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的验证码！");
                return false;
            }
            $("#couponForm").submit();
        } else {
            if (!$scope.checkAddress()) {
                $scope.$root.toast.close();
                var $scrollTo = $('.quan-form');
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                });
                return false;
            }

            if (!$scope.checkCouponActiveCode()) {
                $scope.$root.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的验证码！");
                var $scrollTo = $('.quan-form');
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                });
                return false;
            }
            $("#couponForm").submit();
        }

        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//提交订单
    };

    $scope.$watch('brand', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $scope.brandPhones = [];
            $.each($scope.phones, function (i, k) {
                if (k.brandName != '' && k.brandName === n.brandName) {
                    $scope.brandPhones.push(k);
                }
            });
            $scope.phoneId = $scope.brandPhones[0].activityproductId;
        }
    }, true);

    $scope.$watch('phoneId', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                $scope.phone = data;
                $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[0];
                $scope.packages = [];
                $scope.comparePrices = [];
                $scope.packageIndex = 0;
                var distance;
                $.each(eval(data.cardItems.split(";")), function (i, k) {
                    var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                    if (k.slice(k.indexOf(':') + 1, k.length) >= data.phoneBillPrice) {
                        obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                    } else {
                        obj.phonePrice = data.phoneBillPrice;
                    }
                    $scope.packages.push(obj);
                    $scope.comparePrices.push(data.salePrice - obj.salesPrice);
                });

                for (var i = 1; i < $scope.comparePrices.length; i++) {
                    if (Math.abs($scope.comparePrices[i]) < Math.abs($scope.comparePrices[$scope.packageIndex])) {
                        $scope.packageIndex = i;
                    }
                }

                $scope.package = $scope.packages[$scope.packageIndex];
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    }, true);

    var homeArgs = ['_InputIndexName', '_InputIndexNumber', '_InputIndexCode'];
    //记录落地页输入的操作
    $scope.$root.inputHomeArgs = function (type) {
        writebdLog($scope.category, homeArgs[type], "渠道号", $scope.gh); //输入操作
    };

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activePhones', { //app首页
            url: "/phone/active/A/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/A/hotPhones/hotPhones.html';
            },
            controller: "pActivePhonesController"
        });
}]).controller('pActivePhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = "A";
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.activePage = 'hotPhones';

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/A/phones';

    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/A' + window.location.search,
        shareTitle: '我领到1888元购机年终奖！年前换个好手机，开开心心回家过大年！',
        shareDisc: '苹果、OPPO、华为、VIVO等大牌手机直降！用券购再立减！戳我抢→',
        picUrl:'http://app.yfq.cn/images/active/share_active.jpg'
    };

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=lj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.$root.btNavItem = function (index) {
        writeBtNavItem(index);
    };

    var btNavItemName = ['_MyCoupon', '_MyOrder', '_CustConsult'];

    function writeBtNavItem(index) {
        writebdLog($scope.category, btNavItemName[index], "渠道号", $scope.gh);//选择模块
    }

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    }

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('CctiveSuccess', { //app首页
            url: "/phone/active/C/success",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/C/success/success.html';
            },
            controller: "pCctiveSController"
        });
}]).controller('pCctiveSController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = 'C';
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;


    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/C/phones' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };
    
    $scope.getOrderQuery = function () {
    	writebdLog($scope.category, "_OrderQuery", "渠道号", $scope.gh);//订单查询
    };

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeDPhones', { //app首页
            url: "/phone/active/D/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/D/hotPhones/hotPhones.html';
            },
            controller: "pDctivePhonesController"
        });
}]).controller('pDctivePhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = "D";
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    var cardPrices = "358:6012;359:5472;360:4662;361:3672;362:3132";
    var butie = "358:6388;359:5388;360:3880;361:2980;362:2400";

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D/phones';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl: 'http://app.yfq.cn/images/active/d/share_active.jpg'
    };

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };
    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jjk&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;

        $scope.brands = [
            {
                "brandName": "全部",
                "brandSort": 0,
                "tag": false
            },
            {
                "brandName": "0元购机",
                "brandSort": 1,
                "tag": true
            },
            {
                "brandName": "iPhone",
                "brandSort": 2,
                "tag": false
            },
            {
                "brandName": "华为",
                "brandSort": 3,
                "tag": false
            },
            {
                "brandName": "OPPO",
                "brandSort": 4,
                "tag": false
            },
            {
                "brandName": "VIVO",
                "brandSort": 5,
                "tag": false
            },
            {
                "brandName": "小米",
                "brandSort": 6,
                "tag": false
            },
            {
                "brandName": "其它机型",
                "brandSort": 999,
                "tag": false
            }
        ];
        $scope.brand = $scope.brands[0];

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.$root.btNavItem = function (index) {
        writeBtNavItem(index);
    };

    $scope.showFqa = function () {
        $(".fqa-lists").toggleClass("close");
        $(".fqa-more").toggleClass("close");
    };

    var btNavItemName = ['_MyCoupon', '_MyOrder', '_CustConsult'];

    function writeBtNavItem(index) {
        writebdLog($scope.category, btNavItemName[index], "渠道号", $scope.gh);//选择模块
    }

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    $scope.$watch('brand', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $scope.brandPhones = [];
            if (n.brandName == "全部") {
                $scope.brandNavName = "选择类别";
            } else {
                $scope.brandNavName = n.brandName;
            }
            $.each($scope.singlePhones, function (i, k) {
                if (n.brandName == "" || n.brandName == "全部") {
                    $scope.brandPhones.push(k);
                } else if (n.brandName == "其它机型") {
                    if (k.brandName != "iPhone" && k.brandName != "华为" && k.brandName != "OPPO" && k.brandName != "VIVO" && k.brandName != "小米") {
                        $scope.brandPhones.push(k);
                    }
                } else if (n.brandName == "0元购机") {
                    if (k.cardItems == k.fanhuan) {
                        $scope.brandPhones.push(k);
                    }
                } else {
                    if (k.brandName === n.brandName) {
                        $scope.brandPhones.push(k);
                    }
                }
            });

            if(n.brandName == "0元购机"){
                $scope.brandPhones = ($scope.brandPhones).sort(function (a, b) {
                    return parseInt(a.cardItems) - parseInt(b.cardItems);
                })
            }
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('DctiveSuccess', { //app首页
            url: "/phone/active/D/success",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/D/success/success.html';
            },
            controller: "pDctiveSController"
        });
}]).controller('pDctiveSController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = 'D';
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;


    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl:'http://app.yfq.cn/images/active/d/share_active.jpg'
    };

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };
    
    $scope.getOrderQuery = function () {
    	writebdLog($scope.category, "_OrderQuery", "渠道号", $scope.gh);//订单查询
    };

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('ljADetail', { //app首页
            url: "/phs/lj/A/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/lj/A/detail/detail.html';
            },
            controller: "ljADetailController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('ljADetailController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', '$timeout', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore, $timeout) {

    /*$scope.cfConvertId = $location.search().cfConvertId;

     if($location.search().cfConvertId){
     $scope.cfConvertId = $location.search().cfConvertId;
     }else {
     $scope.cfConvertId = "";
     }*/

    $scope.pageType = 'A';
    $scope.activeTag = "ljzma";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D/phones';

    $scope.limitNo = 5;

    $scope.setlimitNo = function (num) {
        $scope.limitNo = num;
    };

    $scope.sold = Math.round(Math.random() * 50);

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_ljzm_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $container = $(".content-scrollable");

    $scope.productId = $stateParams.phoneId;

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=ljzma&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.imgUrls = [];

        for (var i = 0; i < data.phoneTypes[0].mediaProductList.length; i++) {
            $scope.imgUrls.push("http://www.yfq.cn:8899/fileserver/medias/" + data.phoneTypes[0].mediaProductList[i].mediaUrl);
        }

        $http.jsonp(cfApi.czHost + "/yfqcz/czInterfaceController.do?messageDetail&productId=" + $stateParams.phoneId + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            $scope.feedbacks = data;
            $scope.feedbackType = 'all';
        }).error(function (data, status, headers, config) {
            console.log(status);
        });

        $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=ljzma&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.singlePhones = data;

            $scope.hotPhones = [];
            $.each($scope.singlePhones, function (i, k) {
                if (Math.abs(k.salePrice - $scope.phone.salePrice) <= 1500) {
                    $scope.hotPhones.push(k);
                }
            });

            if ($scope.hotPhones.length < 6) {
                $.each($scope.singlePhones, function (i, k) {
                    if (i < 6 - $scope.hotPhones.length) {
                        $scope.hotPhones.push(k);
                    }
                    if (Math.abs(k.salePrice - $scope.phone.salePrice) > 1500) {
                        $scope.hotPhones.push(k);
                    }
                });
            }

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/phs/lj/A/' + $stateParams.phoneId + window.location.search,
            shareTitle: '想换' + $scope.phone.productName + '？这里全场降价后再享95折，先抢了再说！',
            shareDisc: 'iPhone、OPPO、华为各大品牌新品现货抢购，最高可享12期0息分期！',
            picUrl: 'http://www.yfq.cn:8899/fileserver/medias/' + $scope.phone.phoneTypes[0].mediaProductList[0].mediaUrl
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

    function wirtePayType(payType) {
        value = payTypeAry[payType];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.writebdLogByValue = function (value) {
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);
    };

    if ($location.search().duplicateNum) {
        if (Array.isArray($location.search().duplicateNum)) {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum[0] + "已被购买，请重新选择");
        } else {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
        }
    }

    $scope.setFlashDriver = function (event, flash) {
        var $this = $(event.currentTarget);
        if ($this.hasClass("disabled")) {
            return false;
        }
        $scope.productId = flash.productId;
        writebdLog($scope.category, "_FuselageMemory", "渠道号", $scope.gh);
        //window.location.href = 'http://' + window.location.host + '/phs/dj/A/' + flash.productId + window.location.search;
    };

    $scope.showActionsheet = function (element) {
        showTheActionSheet(element);
        writebdLog($scope.category, "_show" + element.replace("#", ""), "渠道号", $scope.gh);
    };

    $scope.hideActionsheet = function (element) {
        hideTheActionSheet(element);
        writebdLog($scope.category, "_hide" + element.replace("#", ""), "渠道号", $scope.gh);
    };

    $scope.makeSelected = function (event, element) {
        if ($(event.currentTarget).hasClass("disabled")) {
            return false;
        }
        var $scrollTo = $('.pay-container');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        $scope.hideActionsheet(element);
    };

    $scope.checkForm = function () {

        var $form = $("#checkoutForm");
        if ($scope.$root.checkActiveCode()) {
            writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//立即支付
            $scope.$root.toast.open();

            $form.submit();
            /*_taq.push({convert_id: $scope.cfConvertId, event_type: "shopping"});*/
        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.seeAll = function () {
        $(".half").removeClass("half");
        $(".html-ft").hide();
    };

    $scope.payType = 0;
    $scope.payTypeName = "马上付款";

    $scope.loadedCheck = function () {
        if (!$scope.checkoutForm.reciverName.$valid) {
            //alert("请输入收件人");
            return false;
        } else if (!$scope.checkoutForm.receiverMobile.$valid) {
            //alert("请输入联系电话");
            return false;
        } else if (!$scope.checkoutForm.receiverCity.$valid) {
            //alert("请选择收件区域");
            return false;
        } else if (!$scope.checkoutForm.receiverRoom.$valid) {
            //alert("请输入详细地址");
            return false;
        }
        return true;
    };

    $timeout(function () {
        //console.log($scope.loadedCheck());
        if (!$scope.loadedCheck()) {
            $(".adr-tab").toggleClass("down");
            $("#receiverAddressPanel").slideDown();
        }
    });

    $scope.submitForm = function (event) {
        if ($(event.currentTarget).hasClass("disabled")) {
            return false;
        }
        if ($scope.checkAddress()) {
            $scope.checkForm();
        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.setFeedbackType = function (type) {
        $scope.feedbackType = type;
        writebdLog($scope.category, "_" + type, "渠道号", $scope.gh);//点击评价
    };

    $scope.goToDetail = function () {
        $("#scrollAnimate").animate({
            scrollTop: $(".dj-detail").offset().top - $("#scrollAnimate").offset().top + $("#scrollAnimate").scrollTop() - 50
        });
    };

    $("#scrollAnimate").bind('scroll', function (e) {
        var top1 = $(".dj-detail").offset().top - $(this).offset().top + $(this).scrollTop();
        var top2 = $(".dj-bottom").offset().top - $(this).offset().top + $(this).scrollTop() - $(this).height();
        if ($(this).scrollTop() >= top1 && $(this).scrollTop() <= top2) {
            $(".dj-detail").find(".weui-navbar").addClass("fixed-top");
        } else {
            $(".dj-detail").find(".weui-navbar").removeClass("fixed-top");
        }
    });

    $scope.$watch('feedbackType', function (n, o, $scope) {
        $scope.typeFeedbacks = [];
        if (n != undefined && n != o) {
            if ($scope.feedbacks.success) {
                if (n === 'all') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        $scope.typeFeedbacks.push(k);
                    });
                }
                if (n === 'best') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 >= 4) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
                if (n === 'good') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 > 2 && rate / 3 < 4) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
                if (n === 'bad') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 <= 2) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
            }
        }

    });

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&activeTag=ljzma&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                $scope.phone = data;

                var _colors = data.phoneTypes[0].mediaProductList;
                var _colorIndex = getIndex(data.phoneTypes[0].mediaProductList, "name", $scope.$root.mainColor.name);

                if (_colorIndex == undefined || data.phoneTypes[0].mediaProductList[_colorIndex].stock == 0) {
                    $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[getIndex(data.phoneTypes[0].mediaProductList, 'selected', 1)];
                } else {
                    $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[_colorIndex];
                }

                $scope.hotPhones = [];
                $.each($scope.singlePhones, function (i, k) {
                    if (Math.abs(k.salePrice - $scope.phone.salePrice) <= 1500) {
                        $scope.hotPhones.push(k);
                    }
                });

                if ($scope.hotPhones.length < 6) {
                    $.each($scope.singlePhones, function (i, k) {
                        if (i < 6 - $scope.hotPhones.length) {
                            $scope.hotPhones.push(k);
                        }
                        if (Math.abs(k.salePrice - $scope.phone.salePrice) > 1500) {
                            $scope.hotPhones.push(k);
                        }
                    });
                }

                $http.jsonp(cfApi.czHost + "/yfqcz/czInterfaceController.do?messageDetail&productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                    $scope.feedbacks = data;
                    $scope.feedbackType = 'all';
                }).error(function (data, status, headers, config) {
                    console.log(status);
                });

            }).error(function (data, status, headers, config) {
                console.log(status);
            });

            $scope.$root.share = {
                homeLink: 'http://app.yfq.cn/phs/lj/A/' + n + window.location.search,
                shareTitle: '想换' + $scope.phone.productName + '？这里全场降价后再享95折，先抢了再说！',
                shareDisc: 'iPhone、OPPO、华为各大品牌新品现货抢购，最高可享12期0息分期！',
                picUrl: 'http://www.yfq.cn:8899/fileserver/medias/' + $scope.phone.phoneTypes[0].mediaProductList[0].mediaUrl
            };

        }
    });

    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('ljIndexAPhones', { //app首页
            url: "/phone/lj/A/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/lj/A/index/index.html';
            },
            controller: "ljIndexAPhonesController"
        });
}]).controller('ljIndexAPhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = "A";
    $scope.appType = systemName + "_ljzm_" + $scope.pageType;
    $scope.category = $scope.appType;

    var cardPrices = "358:6012;359:5472;360:4662;361:3672;362:3132";
    var butie = "358:6388;359:5388;360:3880;361:2980;362:2400";

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/lj/A/phones';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/lj/A/phones' + window.location.search,
        shareTitle: '想换手机？这里全场降价后再享95折，先抢了再说！',
        shareDisc: 'iPhone、OPPO、华为各大品牌新品现货抢购，最高可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/lj/share_active.jpg'
    };

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };
    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=ljzma&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;

        $scope.brands = [
            {
                "brandName": "全部",
                "brandSort": 0,
                "tag": false
            },
            {
                "brandName": "热门机型",
                "brandSort": 1,
                "tag": true
            },
            {
                "brandName": "iPhone",
                "brandSort": 2,
                "tag": false
            },
            {
                "brandName": "华为",
                "brandSort": 3,
                "tag": false
            },
            {
                "brandName": "OPPO",
                "brandSort": 4,
                "tag": false
            },
            {
                "brandName": "vivo",
                "brandSort": 5,
                "tag": false
            },
            {
                "brandName": "小米",
                "brandSort": 6,
                "tag": false
            },
            {
                "brandName": "其它机型",
                "brandSort": 999,
                "tag": false
            }
        ];

        if($cookieStore.get("brand")){
            $scope.brand = $cookieStore.get("brand");
            $scope.brandIndex = getIndex($scope.brands, "brandName", $scope.brand.brandName);
        }else {
            $scope.brand = $scope.brands[0];
        }

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.$root.btNavItem = function (index) {
        writeBtNavItem(index);
    };

    $scope.showFqa = function () {
        $(".fqa-lists").toggleClass("close");
        $(".fqa-more").toggleClass("close");
    };

    var btNavItemName = ['_MyCoupon', '_MyOrder', '_CustConsult'];

    function writeBtNavItem(index) {
        writebdLog($scope.category, btNavItemName[index], "渠道号", $scope.gh);//选择模块
    }

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $("img.lazy").lazyload({
            effect: "fadeIn",
            skip_invisible: false,
            container: $(".content-scrollable")
        });
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_ClickGoods" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    $scope.$watch('brand', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $scope.brandPhones = [];
            if (n.brandName == "全部") {
                $scope.brandNavName = "选择类别";
            } else {
                $scope.brandNavName = n.brandName;
            }
            $.each($scope.singlePhones, function (i, k) {
                if (n.brandName == "" || n.brandName == "全部") {
                    $scope.brandPhones.push(k);
                } else if (n.brandName == "其它机型") {
                    if (k.brandName != "iPhone" && k.brandName != "华为" && k.brandName != "OPPO" && k.brandName != "vivo" && k.brandName != "小米") {
                        $scope.brandPhones.push(k);
                    }
                } else if (n.brandName == "热门机型") {
                    if (k.ifHot == 1) {
                        $scope.brandPhones.push(k);
                    }
                } else {
                    if (k.brandName === n.brandName) {
                        $scope.brandPhones.push(k);
                    }
                }
            });
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneBSingle', { //app首页
            url: "/phs/sg/B/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/single/B/details.html';
            },
            controller: "pBSingleProController",
            onExit: function(){
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pBSingleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = 'B';
    $scope.activeTag = "jjk";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/B/phones';

    var headCategory = $location.search().headCategory;
    if(headCategory != undefined && headCategory != null)
	    $scope.category = headCategory + "_SinglePhones";
    else
    	$scope.category = systemName + "_mysy_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.package=$scope.phone.packageProductList[0];
        $scope.totolPrice = data.salePrice;
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });
    $scope.buyType = 1;
    $scope.activeTagName = "裸机送0元4G流量卡";

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        wirtePayType(id);
    };
    
    var value;
    var payTypeAry=['payAll','payCOD','payMonthly'];
    function wirtePayType(payType)
    {
    	value=payTypeAry[payType];
    	writebdLog($scope.category, "_"+value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.setBuyType = function (event, type, typeName) {
        event.preventDefault();
        $scope.buyType = type;
        var $this = $(event.currentTarget);
        $this.parent().siblings().children().removeClass('curr');
        $this.addClass('curr');
        if (type == 0) {
            $scope.activeTag = "lj";
            //$scope.totolPrice = $scope.phone.phonePrice;
            $scope.activeTagName = typeName;

            //if ($scope.totolPrice < 1500) {
            if($scope.payType == 2){
                $scope.setSbPayType(0, '一次性支付');
            }else {
                //$scope.setSbPayType(0, '一次性支付');
            }

            //}
        } else {
            $scope.activeTag = "jjk";
            $scope.activeTagName = typeName;
        }
        writebdLog($scope.category, "_SelectBuyType", "渠道号", $scope.gh);//选择购买方式
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on-cardetails');
        $this.parent().addClass('on-cardetails');
        $("#pickPackagePanel").slideUp();
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };

    $scope.checkPackage = function () {
        if (!scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('.card-details');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#pickPackagePanel").slideDown();
            return false;
        }
        return true;
    };

    $scope.showPkgPn = function () {
        $("#pickPackagePanel").slideToggle();
        writebdLog($scope.category, "_SelectBillPackage", "渠道号", $scope.gh);//选择话费套餐
    };

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                 //选择默认内存
                 $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                 $scope.pkg = phone.packages[0];

                 $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                 $scope.mainPrice = phone.price;*/
            });
        }
    });
    $scope.$watch('activeTag', function (n, o, $scope) {
        if (n != o) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                //$scope.phone = data;
                //$scope.package=$scope.phone.packageProductList[0];
                $scope.totolPrice = data.salePrice;
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    });
    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneASingle', { //app首页
            url: "/phs/sg/A/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/single/A/details.html';
            },
            controller: "pASingleProController",
            onExit: function(){
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pASingleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = 'A';
    $scope.activeTag = "jjk";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/A/phones';

    var headCategory = $location.search().headCategory;
    if(headCategory != undefined && headCategory != null)
	    $scope.category = headCategory + "_SinglePhones";
    else
    	$scope.category = systemName + "_mysy_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.package=$scope.phone.packageProductList[0];
        $scope.totolPrice = data.salePrice;
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });
    $scope.buyType = 1;
    $scope.activeTagName = "裸机送0元4G流量卡";

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        wirtePayType(id);
    };
    
    var value;
    var payTypeAry=['payAll','payCOD','payMonthly'];
    function wirtePayType(payType)
    {
    	value=payTypeAry[payType];
    	writebdLog($scope.category, "_"+value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.setBuyType = function (event, type, typeName) {
        event.preventDefault();
        $scope.buyType = type;
        var $this = $(event.currentTarget);
        $this.parent().siblings().children().removeClass('curr');
        $this.addClass('curr');
        if (type == 0) {
            $scope.activeTag = "lj";
            //$scope.totolPrice = $scope.phone.phonePrice;
            $scope.activeTagName = typeName;

            //if ($scope.totolPrice < 1500) {
            if($scope.payType == 2){
                $scope.setSbPayType(0, '一次性支付');
            }else {
                //$scope.setSbPayType(0, '一次性支付');
            }

            //}
        } else {
            $scope.activeTag = "jjk";
            $scope.activeTagName = typeName;
        }
        writebdLog($scope.category, "_SelectBuyType", "渠道号", $scope.gh);//选择购买方式
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on-cardetails');
        $this.parent().addClass('on-cardetails');
        $("#pickPackagePanel").slideUp();
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };

    $scope.checkPackage = function () {
        if (!scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('.card-details');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#pickPackagePanel").slideDown();
            return false;
        }
        return true;
    };

    $scope.showPkgPn = function () {
        $("#pickPackagePanel").slideToggle();
        writebdLog($scope.category, "_SelectBillPackage", "渠道号", $scope.gh);//选择话费套餐
    };

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                 //选择默认内存
                 $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                 $scope.pkg = phone.packages[0];

                 $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                 $scope.mainPrice = phone.price;*/
            });
        }
    });
    $scope.$watch('activeTag', function (n, o, $scope) {
        if (n != o) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                //$scope.phone = data;
                //$scope.package=$scope.phone.packageProductList[0];
                $scope.totolPrice = data.salePrice;
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    });
    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneCSingle', { //app首页
            url: "/phs/sg/C/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/single/C/details.html';
            },
            controller: "pCSingleProController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pCSingleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', '$timeout', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore, $timeout) {

    $scope.pageType = 'C';
    $scope.activeTag = "jktchdd";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/C/phones';

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_coupon_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $container = $(".content-scrollable");

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.imgUrls = [];
        for (var i = 0; i < data.phoneTypes[0].mediaProductList.length; i++) {
            $scope.imgUrls.push("http://www.yfq.cn:8899/fileserver/medias/" + data.phoneTypes[0].mediaProductList[i].mediaUrl);
        }

        $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.pkgs = data;

            var cardItems = $scope.phone.cardItems.split(";").sort(function (a, b) {
                return a.slice(a.indexOf(":") + 1, a.length) - b.slice(b.indexOf(":") + 1, b.length);
            });


            $scope.packages = [];

            $.each(eval(cardItems), function (i, k) {
                var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                $scope.packages.push(obj);
                //$scope.comparePrices.push(data.salePrice - obj.salesPrice);
            });

            $scope.package = $scope.packages[0];

            if ($cookieStore.get('receiver')) {
                if ($cookieStore.get('receiver').city.indexOf('广州市') != -1) {
                    $scope.setDefaultPayType(0, "送货上门");
                } else {
                    $scope.setDefaultPayType(2, "信用卡分期");
                }
            } else {
                $scope.setDefaultPayType(2, "信用卡分期");
            }

            $(".phone-pkgs-item").eq(1).find(".pick-panel").addClass("show");

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });
    $scope.buyType = 1;
    $scope.activeTagName = "裸机";

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        wirtePayType(id);
    };

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

    function wirtePayType(payType) {
        value = payTypeAry[payType];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.setBuyType = function (event, type, typeName) {
        event.preventDefault();
        $scope.buyType = type;
        if (type == 0) {
            $scope.activeTag = "lj";
            //$scope.totolPrice = $scope.phone.phonePrice;
            $scope.activeTagName = typeName;

            //if ($scope.totolPrice < 1500) {
            if ($scope.payType == 2) {
                $scope.setSbPayType(0, '一次性支付');
            } else {
                //$scope.setSbPayType(0, '一次性支付');
            }

            //}
        } else {
            $scope.activeTag = "jjk";
            $scope.activeTagName = typeName;
        }
        writebdLog($scope.category, "_SelectBuyType", "渠道号", $scope.gh);//选择购买方式
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on-cardetails');
        $this.parent().addClass('on-cardetails');
        $("#pickPackagePanel").slideUp();
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };

    $scope.checkPackage = function () {
        if (!scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('.card-details');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#pickPackagePanel").slideDown();
            return false;
        }
        return true;
    };

    $scope.showPkgPn = function () {
        $(".card-details").slideToggle();
        writebdLog($scope.category, "_SelectBillPackage", "渠道号", $scope.gh);//选择话费套餐
    };

    //$scope.pkgAndNumber = $cookieStore.get('pkgAndNumber');
    if ($cookieStore.get('pkgAndNumber')) {
        $scope.pkgAndNumber = $cookieStore.get('pkgAndNumber');
    } else {
        $scope.pkgAndNumber = false;
    }

    $scope.checkForm = function () {

        var $form = $("#checkoutForm");
        if ($scope.$root.checkActiveCode()) {
            writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//立即支付
            $scope.$root.toast.open();

            $form.submit();
        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.submitForm = function (event) {
        if ($scope.checkMainNumber()) {
            if ($scope.checkAddress()) {
                $scope.checkForm();
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

    $scope.$watch('package', function (n, o, $scope) {
        if (n != o) {
            if (n.salesPrice >= $scope.phone.phoneBillPrice) {
                $scope.totalPrice = n.salesPrice;
            } else {
                $scope.totalPrice = $scope.phone.phoneBillPrice;
            }
        }
    }, true);

    $scope.$watch('receiver.city', function (n, o, $scope) {
        if (n.indexOf('广州市') != -1) {
            $scope.setDefaultPayType(0, "送货上门");
        }else {
            if($scope.payType == 0){
                $scope.setDefaultPayType(0, "一次性支付");
            }
        }
    });

    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneDSingle', { //app首页
            url: "/phs/sg/D/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/single/D/details.html';
            },
            controller: "pDSingleProController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pDSingleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', '$timeout', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore, $timeout) {

    /*$scope.cfConvertId = $location.search().cfConvertId;

    if($location.search().cfConvertId){
        $scope.cfConvertId = $location.search().cfConvertId;
    }else {
        $scope.cfConvertId = "";
    }*/

    $scope.mp = $location.search().mp;

    $scope.pageType = 'D';
    $scope.activeTag = "jktchdd";

    var butie = "359:5388;360:3880;361:2980;362:2400";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D/phones';

    /*$scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl: 'http://app.yfq.cn/images/active/d/share_active.jpg'
    };*/

    $scope.sold = Math.round(Math.random() * 1000);

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_coupon_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $container = $(".content-scrollable");

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.imgUrls = [];

        if ($scope.phone.activityproductId == 366) {
            $scope.phoneFlash = [
                {
                    "phoneId": 366,
                    "flash": 128
                },
                {
                    "phoneId": 367,
                    "flash": 256
                }
            ]
        }

        if ($scope.phone.activityproductId == 367) {
            $scope.phoneFlash = [
                {
                    "phoneId": 366,
                    "flash": 128
                },
                {
                    "phoneId": 367,
                    "flash": 256
                }
            ]
        }

        if ($scope.phone.activityproductId == 368) {
            $scope.phoneFlash = [
                {
                    "phoneId": 368,
                    "flash": 128
                },
                {
                    "phoneId": 369,
                    "flash": 256
                }
            ]
        }

        if ($scope.phone.activityproductId == 369) {
            $scope.phoneFlash = [
                {
                    "phoneId": 368,
                    "flash": 128
                },
                {
                    "phoneId": 369,
                    "flash": 256
                }
            ]
        }

        for (var i = 0; i < data.phoneTypes[0].mediaProductList.length; i++) {
            $scope.imgUrls.push("http://www.yfq.cn:8899/fileserver/medias/" + data.phoneTypes[0].mediaProductList[i].mediaUrl);
        }

        $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.pkgs = data;

            $scope.packageIndex = 0;

            var cardItems = $scope.phone.cardItems.split(";").sort(function (a, b) {
                return a.slice(a.indexOf(":") + 1, a.length) - b.slice(b.indexOf(":") + 1, b.length);
            });


            $scope.packages = [];

            $.each(eval(cardItems), function (i, k) {
                var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                obj.comparePrices = $scope.phone.phoneBillPrice - obj.salesPrice;

                $.each(eval(butie.split(";")), function (jtem, value) {
                    if (value.split(":")[0] == k.slice(0, k.indexOf(':'))) {
                        if ($scope.phone.salePrice > value.split(":")[1]) {
                            obj.comparePrices = obj.oldPrice * 18 + ($scope.phone.salePrice - value.split(":")[1]);
                        } else {
                            obj.comparePrices = obj.oldPrice * 18;
                        }
                    }
                });

                $scope.packages.push(obj);
            });

            for (var i = 1; i < $scope.packages.length; i++) {
                if ($scope.packages[i].comparePrices < $scope.packages[$scope.packageIndex].comparePrices) {
                    $scope.packageIndex = i;
                }
            }

            $scope.package = $scope.packages[$scope.packageIndex];

            /*if($scope.packages[$scope.packageIndex]){

             }*/

            if ($cookieStore.get('receiver')) {
                if ($cookieStore.get('receiver').city.indexOf('广州市') != -1) {
                    $scope.setDefaultPayType(1, "货到付款");
                } else {
                    $scope.setDefaultPayType(0, "马上付款");
                }
            } else {
                $scope.setDefaultPayType(0, "马上付款");
            }

            $(".phone-pkgs-item").eq(1).find(".pick-panel").addClass("show");

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        $scope.$watch('receiver.city', function (n, o, $scope) {
            if (n != "") {
                if (n.indexOf('广州市') != -1) {
                    $scope.setDefaultPayType(1, "货到付款");
                } else {
                    if ($scope.payType == 1) {
                        $scope.setDefaultPayType(0, "马上付款");
                    }
                }
            } else {
                $scope.setDefaultPayType(0, "马上付款");
            }
        });

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/phs/sg/D/' + $stateParams.phoneId + window.location.search,
            shareTitle: '想换手机？这里全场降价后再享95折，先抢了再说！',
            shareDisc: 'iPhone、OPPO、华为各大品牌新品现货抢购，最高可享12期0息分期！',
            picUrl: 'http://www.yfq.cn:8899/fileserver/medias/' + $scope.phone.phoneTypes[0].mediaProductList[0].mediaUrl
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });
    $scope.buyType = 1;
    $scope.activeTagName = "裸机";

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        wirtePayType(id);
    };

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

    function wirtePayType(payType) {
        value = payTypeAry[payType];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.showNgFudai = function (state) {
        if (!state) {
            $scope.showFudai('JM-MX');
        }
    };

    if ($location.search().duplicateNum) {
        if (Array.isArray($location.search().duplicateNum)) {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum[0] + "已被购买，请重新选择");
        } else {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
        }
    }

    $scope.setFlashDriver = function (flash) {
        window.location.href = 'http://' + window.location.host + '/phs/sg/D/' + flash.phoneId + window.location.search;
    };

    $scope.setBuyType = function (event, type, typeName) {
        event.preventDefault();
        $scope.buyType = type;
        if (type == 0) {
            $scope.activeTag = "lj";
            //$scope.totolPrice = $scope.phone.phonePrice;
            $scope.activeTagName = typeName;

            //if ($scope.totolPrice < 1500) {
            if ($scope.payType == 2) {
                $scope.setSbPayType(0, '马上付款');
            } else {
                //$scope.setSbPayType(0, '一次性支付');
            }

            //}
        } else {
            $scope.activeTag = "jjk";
            $scope.activeTagName = typeName;
        }
        writebdLog($scope.category, "_SelectBuyType", "渠道号", $scope.gh);//选择购买方式
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on-cardetails');
        $this.parent().addClass('on-cardetails');
        $("#pickPackagePanel").slideUp();
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };

    $scope.checkPackage = function () {
        if (!$scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('.card-details');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#pickPackagePanel").slideDown();
            return false;
        }
        return true;
    };

    $scope.showPkgPn = function () {
        $(".card-details").slideToggle();
        writebdLog($scope.category, "_SelectBillPackage", "渠道号", $scope.gh);//选择话费套餐
    };

    //$scope.pkgAndNumber = $cookieStore.get('pkgAndNumber');
    if ($cookieStore.get('pkgAndNumber')) {
        $scope.pkgAndNumber = $cookieStore.get('pkgAndNumber');
    } else {
        $scope.pkgAndNumber = false;
    }

    $scope.checkForm = function () {

        var $form = $("#checkoutForm");
        if ($scope.$root.checkActiveCode()) {
            writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//立即支付
            $scope.$root.toast.open();

            $form.submit();
            /*_taq.push({convert_id: $scope.cfConvertId, event_type: "shopping"});*/
        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.loadedCheck = function () {
        if (!$scope.checkoutForm.reciverName.$valid) {
            //alert("请输入收件人");
            return false;
        } else if (!$scope.checkoutForm.receiverMobile.$valid) {
            //alert("请输入联系电话");
            return false;
        } else if (!$scope.checkoutForm.receiverCity.$valid) {
            //alert("请选择收件区域");
            return false;
        } else if (!$scope.checkoutForm.receiverRoom.$valid) {
            //alert("请输入详细地址");
            return false;
        }
        return true;
    };

    $timeout(function () {
        //console.log($scope.loadedCheck());
        if (!$scope.loadedCheck()) {
            $(".adr-tab").toggleClass("down");
            $("#receiverAddressPanel").slideDown();
        }
    });

    $scope.submitForm = function (event) {
        if ($scope.checkMainNumber()) {
            if ($scope.checkAddress()) {
                $scope.checkForm();
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

    //var cardPrices = "358:6012;359:5472;360:4662;361:3672;362:3132";

    $scope.$watch('package', function (n, o, $scope) {
        if (n != o) {
            $.each(eval(butie.split(";")), function (i, k) {
                if (k.split(":")[0] == n.productId) {
                    $scope.btp = k.split(":")[1];
                }
            });

            if ($scope.phone.salePrice > $scope.btp) {
                $scope.totalPrice = $scope.package.oldPrice * 18 + ($scope.phone.salePrice - $scope.btp);
            } else {
                $scope.totalPrice = $scope.package.oldPrice * 18;
            }

            //console.log(cardPrices.indexOf(n.productId));
            //var cp = cardPrices.substr(cardPrices.indexOf(n.productId));
            /*if (n.salesPrice >= $scope.phone.phoneBillPrice) {
             $scope.totalPrice = n.salesPrice;
             } else {
             $scope.totalPrice = $scope.phone.phoneBillPrice;
             }*/
        }
    }, true);

    androidInputBugFix();
=======

'use strict';

// Declare app level module which depends on views, and components

/* App Module */

var app = angular.module('app', ['ui.router', 'appServices', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters']);

var baseApiUri = "http://app.gd189fq.com:3099/api";

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise(function () {
        return "/phone/active/D/phones" + window.location.search;
    });
}]).run(['$rootScope', function ($rootScope) {

    /*$rootScope.$on('$locationChangeStart',function(){

     });

     $rootScope.$on('$locationChangeSuccess',function(){

     });*/
}]);

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

'use strict';

/* Filters */
var appFilters = angular.module('appFilters', []);

appFilters.filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

appFilters.filter('MB', function () {
    return function (kb) {
        var m = 1024,
            //sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(kb) / Math.log(m));
        return (kb / m);
    };
});

appFilters.filter('GB', function () {
    return function (kb) {
        var m = 1024,
            g = 1024;
        //sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        //i = Math.floor(Math.log(kb) / Math.log(m));
        return ((kb / m) / g);
    };
});

appFilters.filter('replaceS', function () {
    return function (input, key) {
        if (key != undefined || key != null || key != "") {
            return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
        } else {

        }
    };
});

appFilters.filter('replaceInput', function () {
    return function (input, key) {
        if (key != undefined && key != "") {
            return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
        } else {
            return input;
        }
    };
});

appFilters.filter('onlyNumber', function () {
    return function (input) {
        return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
    };
});

appFilters.filter('formatMoney', function () {
    return function (input, lastindex) {
        if (input != undefined) {
            return input.slice(0, lastindex) + "<sub style='font-size:75%'>" + input.substr(lastindex) + "</sub>";
        }
    };
});

appFilters.filter('formatPhone', function () {
    return function (input) {
        var lastVar = input.slice(0, -4) + " " + input.substr(-4);
        return lastVar.slice(0, 3) + " " + lastVar.substr(3);
        //return lastVar;
    };
});

appFilters.filter('doubleName', function () {
    return function (input, key) {
        input = input.split(" + ");
        if (key == 1) {
            return input[1];
        } else {
            return input[0];
        }
    };
});

/*appFilters.filter('replaceImgSrc', ['$sce', function ($sce) {
    return function (input) {
        console.log(String(input).replace(/src=/g, 'class="lazy" data-original='));
        return $sce.trustAsHtml(String(input).replace(/src=/g, 'class="lazy" data-original='));
    };
}]);*/

appFilters.filter('range', function () {
    return function (data, start, end) {
        if (angular.isArray(data) && angular.isNumber(start) && angular.isNumber(end)) {
            if (data.length < start) {
                return data;
            }
            else {
                return data.slice(start, end);
            }
        }
    }
});

appFilters.filter('jm', function () {
    return function (price, max) {
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
    }
});

appFilters.filter('mx', function () {
    return function (price) {

        if (price > 7680) {
            return 768;
        } else {
            return Math.round(price * 0.1);
        }
    }
});

appFilters.filter('numberUp', function () {
    return function (price) {

        return Math.ceil(price);
    }
});

appFilters.filter('numberDown', function () {
    return function (price) {

        return Math.floor(price);
    }
});

appFilters.filter('mp', function () {
    return function (price) {

        if (price == 0) {
            return "&mp=0"
        } else {
            return ""
        }
    }
});

appFilters.filter('phoneFilter', function () {
    return function (price) {

        return price.substr(0, 4) + "****" + price.substr(8, 11);
    }
});
var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('FlowPackages', ['$resource', function ($resource) {
    return $resource('http://app.gd189fq.com:3099/api/getFlowPackages/:cardType', null, {
        query: {method: 'GET', params: {cardType: '0'}, isArray: true}
    });
}]);

appServices.factory('Phone', ['$resource','$q', function ($resource,$q) {
    return $resource('/data/phones/:phoneId.json', {}, {
        query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
    });
}]);
(function(){var a,b,c,d,e,f,g,h,i=[].slice,j={}.hasOwnProperty,k=function(a,b){function c(){this.constructor=a}for(var d in b)j.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};g=function(){},b=function(){function a(){}return a.prototype.addEventListener=a.prototype.on,a.prototype.on=function(a,b){return this._callbacks=this._callbacks||{},this._callbacks[a]||(this._callbacks[a]=[]),this._callbacks[a].push(b),this},a.prototype.emit=function(){var a,b,c,d,e,f;if(d=arguments[0],a=2<=arguments.length?i.call(arguments,1):[],this._callbacks=this._callbacks||{},c=this._callbacks[d])for(e=0,f=c.length;f>e;e++)b=c[e],b.apply(this,a);return this},a.prototype.removeListener=a.prototype.off,a.prototype.removeAllListeners=a.prototype.off,a.prototype.removeEventListener=a.prototype.off,a.prototype.off=function(a,b){var c,d,e,f,g;if(!this._callbacks||0===arguments.length)return this._callbacks={},this;if(d=this._callbacks[a],!d)return this;if(1===arguments.length)return delete this._callbacks[a],this;for(e=f=0,g=d.length;g>f;e=++f)if(c=d[e],c===b){d.splice(e,1);break}return this},a}(),a=function(a){function c(a,b){var e,f,g;if(this.element=a,this.version=c.version,this.defaultOptions.previewTemplate=this.defaultOptions.previewTemplate.replace(/\n*/g,""),this.clickableElements=[],this.listeners=[],this.files=[],"string"==typeof this.element&&(this.element=document.querySelector(this.element)),!this.element||null==this.element.nodeType)throw new Error("Invalid dropzone element.");if(this.element.dropzone)throw new Error("Dropzone already attached.");if(c.instances.push(this),this.element.dropzone=this,e=null!=(g=c.optionsForElement(this.element))?g:{},this.options=d({},this.defaultOptions,e,null!=b?b:{}),this.options.forceFallback||!c.isBrowserSupported())return this.options.fallback.call(this);if(null==this.options.url&&(this.options.url=this.element.getAttribute("action")),!this.options.url)throw new Error("No URL provided.");if(this.options.acceptedFiles&&this.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");this.options.acceptedMimeTypes&&(this.options.acceptedFiles=this.options.acceptedMimeTypes,delete this.options.acceptedMimeTypes),this.options.method=this.options.method.toUpperCase(),(f=this.getExistingFallback())&&f.parentNode&&f.parentNode.removeChild(f),this.options.previewsContainer!==!1&&(this.previewsContainer=this.options.previewsContainer?c.getElement(this.options.previewsContainer,"previewsContainer"):this.element),this.options.clickable&&(this.clickableElements=this.options.clickable===!0?[this.element]:c.getElements(this.options.clickable,"clickable")),this.init()}var d,e;return k(c,a),c.prototype.Emitter=b,c.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","addedfiles","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached","queuecomplete"],c.prototype.defaultOptions={url:null,method:"post",withCredentials:!1,parallelUploads:2,uploadMultiple:!1,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:10,thumbnailWidth:120,thumbnailHeight:120,filesizeBase:1e3,maxFiles:null,params:{},clickable:!0,ignoreHiddenFiles:!0,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:!0,autoQueue:!0,addRemoveLinks:!1,previewsContainer:null,hiddenInputContainer:"body",capture:null,renameFilename:null,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",dictCancelUpload:"Cancel upload",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",accept:function(a,b){return b()},init:function(){return g},forceFallback:!1,fallback:function(){var a,b,d,e,f,g;for(this.element.className=""+this.element.className+" dz-browser-not-supported",g=this.element.getElementsByTagName("div"),e=0,f=g.length;f>e;e++)a=g[e],/(^| )dz-message($| )/.test(a.className)&&(b=a,a.className="dz-message");return b||(b=c.createElement('<div class="dz-message"><span></span></div>'),this.element.appendChild(b)),d=b.getElementsByTagName("span")[0],d&&(null!=d.textContent?d.textContent=this.options.dictFallbackMessage:null!=d.innerText&&(d.innerText=this.options.dictFallbackMessage)),this.element.appendChild(this.getFallbackForm())},resize:function(a){var b,c,d;return b={srcX:0,srcY:0,srcWidth:a.width,srcHeight:a.height},c=a.width/a.height,b.optWidth=this.options.thumbnailWidth,b.optHeight=this.options.thumbnailHeight,null==b.optWidth&&null==b.optHeight?(b.optWidth=b.srcWidth,b.optHeight=b.srcHeight):null==b.optWidth?b.optWidth=c*b.optHeight:null==b.optHeight&&(b.optHeight=1/c*b.optWidth),d=b.optWidth/b.optHeight,a.height<b.optHeight||a.width<b.optWidth?(b.trgHeight=b.srcHeight,b.trgWidth=b.srcWidth):c>d?(b.srcHeight=a.height,b.srcWidth=b.srcHeight*d):(b.srcWidth=a.width,b.srcHeight=b.srcWidth/d),b.srcX=(a.width-b.srcWidth)/2,b.srcY=(a.height-b.srcHeight)/2,b},drop:function(){return this.element.classList.remove("dz-drag-hover")},dragstart:g,dragend:function(){return this.element.classList.remove("dz-drag-hover")},dragenter:function(){return this.element.classList.add("dz-drag-hover")},dragover:function(){return this.element.classList.add("dz-drag-hover")},dragleave:function(){return this.element.classList.remove("dz-drag-hover")},paste:g,reset:function(){return this.element.classList.remove("dz-started")},addedfile:function(a){var b,d,e,f,g,h,i,j,k,l,m,n,o;if(this.element===this.previewsContainer&&this.element.classList.add("dz-started"),this.previewsContainer){for(a.previewElement=c.createElement(this.options.previewTemplate.trim()),a.previewTemplate=a.previewElement,this.previewsContainer.appendChild(a.previewElement),l=a.previewElement.querySelectorAll("[data-dz-name]"),f=0,i=l.length;i>f;f++)b=l[f],b.textContent=this._renameFilename(a.name);for(m=a.previewElement.querySelectorAll("[data-dz-size]"),g=0,j=m.length;j>g;g++)b=m[g],b.innerHTML=this.filesize(a.size);for(this.options.addRemoveLinks&&(a._removeLink=c.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'+this.options.dictRemoveFile+"</a>"),a.previewElement.appendChild(a._removeLink)),d=function(b){return function(d){return d.preventDefault(),d.stopPropagation(),a.status===c.UPLOADING?c.confirm(b.options.dictCancelUploadConfirmation,function(){return b.removeFile(a)}):b.options.dictRemoveFileConfirmation?c.confirm(b.options.dictRemoveFileConfirmation,function(){return b.removeFile(a)}):b.removeFile(a)}}(this),n=a.previewElement.querySelectorAll("[data-dz-remove]"),o=[],h=0,k=n.length;k>h;h++)e=n[h],o.push(e.addEventListener("click",d));return o}},removedfile:function(a){var b;return a.previewElement&&null!=(b=a.previewElement)&&b.parentNode.removeChild(a.previewElement),this._updateMaxFilesReachedClass()},thumbnail:function(a,b){var c,d,e,f;if(a.previewElement){for(a.previewElement.classList.remove("dz-file-preview"),f=a.previewElement.querySelectorAll("[data-dz-thumbnail]"),d=0,e=f.length;e>d;d++)c=f[d],c.alt=a.name,c.src=b;return setTimeout(function(){return function(){return a.previewElement.classList.add("dz-image-preview")}}(this),1)}},error:function(a,b){var c,d,e,f,g;if(a.previewElement){for(a.previewElement.classList.add("dz-error"),"String"!=typeof b&&b.error&&(b=b.error),f=a.previewElement.querySelectorAll("[data-dz-errormessage]"),g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.textContent=b);return g}},errormultiple:g,processing:function(a){return a.previewElement&&(a.previewElement.classList.add("dz-processing"),a._removeLink)?a._removeLink.textContent=this.options.dictCancelUpload:void 0},processingmultiple:g,uploadprogress:function(a,b){var c,d,e,f,g;if(a.previewElement){for(f=a.previewElement.querySelectorAll("[data-dz-uploadprogress]"),g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push("PROGRESS"===c.nodeName?c.value=b:c.style.width=""+b+"%");return g}},totaluploadprogress:g,sending:g,sendingmultiple:g,success:function(a){return a.previewElement?a.previewElement.classList.add("dz-success"):void 0},successmultiple:g,canceled:function(a){return this.emit("error",a,"Upload canceled.")},canceledmultiple:g,complete:function(a){return a._removeLink&&(a._removeLink.textContent=this.options.dictRemoveFile),a.previewElement?a.previewElement.classList.add("dz-complete"):void 0},completemultiple:g,maxfilesexceeded:g,maxfilesreached:g,queuecomplete:g,addedfiles:g,previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>'},d=function(){var a,b,c,d,e,f,g;for(d=arguments[0],c=2<=arguments.length?i.call(arguments,1):[],f=0,g=c.length;g>f;f++){b=c[f];for(a in b)e=b[a],d[a]=e}return d},c.prototype.getAcceptedFiles=function(){var a,b,c,d,e;for(d=this.files,e=[],b=0,c=d.length;c>b;b++)a=d[b],a.accepted&&e.push(a);return e},c.prototype.getRejectedFiles=function(){var a,b,c,d,e;for(d=this.files,e=[],b=0,c=d.length;c>b;b++)a=d[b],a.accepted||e.push(a);return e},c.prototype.getFilesWithStatus=function(a){var b,c,d,e,f;for(e=this.files,f=[],c=0,d=e.length;d>c;c++)b=e[c],b.status===a&&f.push(b);return f},c.prototype.getQueuedFiles=function(){return this.getFilesWithStatus(c.QUEUED)},c.prototype.getUploadingFiles=function(){return this.getFilesWithStatus(c.UPLOADING)},c.prototype.getAddedFiles=function(){return this.getFilesWithStatus(c.ADDED)},c.prototype.getActiveFiles=function(){var a,b,d,e,f;for(e=this.files,f=[],b=0,d=e.length;d>b;b++)a=e[b],(a.status===c.UPLOADING||a.status===c.QUEUED)&&f.push(a);return f},c.prototype.init=function(){var a,b,d,e,f,g,h;for("form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")&&this.element.appendChild(c.createElement('<div class="dz-default dz-message"><span>'+this.options.dictDefaultMessage+"</span></div>")),this.clickableElements.length&&(d=function(a){return function(){return a.hiddenFileInput&&a.hiddenFileInput.parentNode.removeChild(a.hiddenFileInput),a.hiddenFileInput=document.createElement("input"),a.hiddenFileInput.setAttribute("type","file"),(null==a.options.maxFiles||a.options.maxFiles>1)&&a.hiddenFileInput.setAttribute("multiple","multiple"),a.hiddenFileInput.className="dz-hidden-input",null!=a.options.acceptedFiles&&a.hiddenFileInput.setAttribute("accept",a.options.acceptedFiles),null!=a.options.capture&&a.hiddenFileInput.setAttribute("capture",a.options.capture),a.hiddenFileInput.style.visibility="hidden",a.hiddenFileInput.style.position="absolute",a.hiddenFileInput.style.top="0",a.hiddenFileInput.style.left="0",a.hiddenFileInput.style.height="0",a.hiddenFileInput.style.width="0",document.querySelector(a.options.hiddenInputContainer).appendChild(a.hiddenFileInput),a.hiddenFileInput.addEventListener("change",function(){var b,c,e,f;if(c=a.hiddenFileInput.files,c.length)for(e=0,f=c.length;f>e;e++)b=c[e],a.addFile(b);return a.emit("addedfiles",c),d()})}}(this))(),this.URL=null!=(g=window.URL)?g:window.webkitURL,h=this.events,e=0,f=h.length;f>e;e++)a=h[e],this.on(a,this.options[a]);return this.on("uploadprogress",function(a){return function(){return a.updateTotalUploadProgress()}}(this)),this.on("removedfile",function(a){return function(){return a.updateTotalUploadProgress()}}(this)),this.on("canceled",function(a){return function(b){return a.emit("complete",b)}}(this)),this.on("complete",function(a){return function(){return 0===a.getAddedFiles().length&&0===a.getUploadingFiles().length&&0===a.getQueuedFiles().length?setTimeout(function(){return a.emit("queuecomplete")},0):void 0}}(this)),b=function(a){return a.stopPropagation(),a.preventDefault?a.preventDefault():a.returnValue=!1},this.listeners=[{element:this.element,events:{dragstart:function(a){return function(b){return a.emit("dragstart",b)}}(this),dragenter:function(a){return function(c){return b(c),a.emit("dragenter",c)}}(this),dragover:function(a){return function(c){var d;try{d=c.dataTransfer.effectAllowed}catch(e){}return c.dataTransfer.dropEffect="move"===d||"linkMove"===d?"move":"copy",b(c),a.emit("dragover",c)}}(this),dragleave:function(a){return function(b){return a.emit("dragleave",b)}}(this),drop:function(a){return function(c){return b(c),a.drop(c)}}(this),dragend:function(a){return function(b){return a.emit("dragend",b)}}(this)}}],this.clickableElements.forEach(function(a){return function(b){return a.listeners.push({element:b,events:{click:function(d){return(b!==a.element||d.target===a.element||c.elementInside(d.target,a.element.querySelector(".dz-message")))&&a.hiddenFileInput.click(),!0}}})}}(this)),this.enable(),this.options.init.call(this)},c.prototype.destroy=function(){var a;return this.disable(),this.removeAllFiles(!0),(null!=(a=this.hiddenFileInput)?a.parentNode:void 0)&&(this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),this.hiddenFileInput=null),delete this.element.dropzone,c.instances.splice(c.instances.indexOf(this),1)},c.prototype.updateTotalUploadProgress=function(){var a,b,c,d,e,f,g,h;if(d=0,c=0,a=this.getActiveFiles(),a.length){for(h=this.getActiveFiles(),f=0,g=h.length;g>f;f++)b=h[f],d+=b.upload.bytesSent,c+=b.upload.total;e=100*d/c}else e=100;return this.emit("totaluploadprogress",e,c,d)},c.prototype._getParamName=function(a){return"function"==typeof this.options.paramName?this.options.paramName(a):""+this.options.paramName+(this.options.uploadMultiple?"["+a+"]":"")},c.prototype._renameFilename=function(a){return"function"!=typeof this.options.renameFilename?a:this.options.renameFilename(a)},c.prototype.getFallbackForm=function(){var a,b,d,e;return(a=this.getExistingFallback())?a:(d='<div class="dz-fallback">',this.options.dictFallbackText&&(d+="<p>"+this.options.dictFallbackText+"</p>"),d+='<input type="file" name="'+this._getParamName(0)+'" '+(this.options.uploadMultiple?'multiple="multiple"':void 0)+' /><input type="submit" value="Upload!"></div>',b=c.createElement(d),"FORM"!==this.element.tagName?(e=c.createElement('<form action="'+this.options.url+'" enctype="multipart/form-data" method="'+this.options.method+'"></form>'),e.appendChild(b)):(this.element.setAttribute("enctype","multipart/form-data"),this.element.setAttribute("method",this.options.method)),null!=e?e:b)},c.prototype.getExistingFallback=function(){var a,b,c,d,e,f;for(b=function(a){var b,c,d;for(c=0,d=a.length;d>c;c++)if(b=a[c],/(^| )fallback($| )/.test(b.className))return b},f=["div","form"],d=0,e=f.length;e>d;d++)if(c=f[d],a=b(this.element.getElementsByTagName(c)))return a},c.prototype.setupEventListeners=function(){var a,b,c,d,e,f,g;for(f=this.listeners,g=[],d=0,e=f.length;e>d;d++)a=f[d],g.push(function(){var d,e;d=a.events,e=[];for(b in d)c=d[b],e.push(a.element.addEventListener(b,c,!1));return e}());return g},c.prototype.removeEventListeners=function(){var a,b,c,d,e,f,g;for(f=this.listeners,g=[],d=0,e=f.length;e>d;d++)a=f[d],g.push(function(){var d,e;d=a.events,e=[];for(b in d)c=d[b],e.push(a.element.removeEventListener(b,c,!1));return e}());return g},c.prototype.disable=function(){var a,b,c,d,e;for(this.clickableElements.forEach(function(a){return a.classList.remove("dz-clickable")}),this.removeEventListeners(),d=this.files,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(this.cancelUpload(a));return e},c.prototype.enable=function(){return this.clickableElements.forEach(function(a){return a.classList.add("dz-clickable")}),this.setupEventListeners()},c.prototype.filesize=function(a){var b,c,d,e,f,g,h,i;if(d=0,e="b",a>0){for(g=["TB","GB","MB","KB","b"],c=h=0,i=g.length;i>h;c=++h)if(f=g[c],b=Math.pow(this.options.filesizeBase,4-c)/10,a>=b){d=a/Math.pow(this.options.filesizeBase,4-c),e=f;break}d=Math.round(10*d)/10}return"<strong>"+d+"</strong> "+e},c.prototype._updateMaxFilesReachedClass=function(){return null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(this.getAcceptedFiles().length===this.options.maxFiles&&this.emit("maxfilesreached",this.files),this.element.classList.add("dz-max-files-reached")):this.element.classList.remove("dz-max-files-reached")},c.prototype.drop=function(a){var b,c;a.dataTransfer&&(this.emit("drop",a),b=a.dataTransfer.files,this.emit("addedfiles",b),b.length&&(c=a.dataTransfer.items,c&&c.length&&null!=c[0].webkitGetAsEntry?this._addFilesFromItems(c):this.handleFiles(b)))},c.prototype.paste=function(a){var b,c;if(null!=(null!=a&&null!=(c=a.clipboardData)?c.items:void 0))return this.emit("paste",a),b=a.clipboardData.items,b.length?this._addFilesFromItems(b):void 0},c.prototype.handleFiles=function(a){var b,c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this.addFile(b));return e},c.prototype._addFilesFromItems=function(a){var b,c,d,e,f;for(f=[],d=0,e=a.length;e>d;d++)c=a[d],f.push(null!=c.webkitGetAsEntry&&(b=c.webkitGetAsEntry())?b.isFile?this.addFile(c.getAsFile()):b.isDirectory?this._addFilesFromDirectory(b,b.name):void 0:null!=c.getAsFile?null==c.kind||"file"===c.kind?this.addFile(c.getAsFile()):void 0:void 0);return f},c.prototype._addFilesFromDirectory=function(a,b){var c,d,e;return c=a.createReader(),d=function(a){return"undefined"!=typeof console&&null!==console&&"function"==typeof console.log?console.log(a):void 0},(e=function(a){return function(){return c.readEntries(function(c){var d,f,g;if(c.length>0){for(f=0,g=c.length;g>f;f++)d=c[f],d.isFile?d.file(function(c){return a.options.ignoreHiddenFiles&&"."===c.name.substring(0,1)?void 0:(c.fullPath=""+b+"/"+c.name,a.addFile(c))}):d.isDirectory&&a._addFilesFromDirectory(d,""+b+"/"+d.name);e()}return null},d)}}(this))()},c.prototype.accept=function(a,b){return a.size>1024*this.options.maxFilesize*1024?b(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(a.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize)):c.isValidFile(a,this.options.acceptedFiles)?null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(b(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles)),this.emit("maxfilesexceeded",a)):this.options.accept.call(this,a,b):b(this.options.dictInvalidFileType)},c.prototype.addFile=function(a){return a.upload={progress:0,total:a.size,bytesSent:0},this.files.push(a),a.status=c.ADDED,this.emit("addedfile",a),this._enqueueThumbnail(a),this.accept(a,function(b){return function(c){return c?(a.accepted=!1,b._errorProcessing([a],c)):(a.accepted=!0,b.options.autoQueue&&b.enqueueFile(a)),b._updateMaxFilesReachedClass()}}(this))},c.prototype.enqueueFiles=function(a){var b,c,d;for(c=0,d=a.length;d>c;c++)b=a[c],this.enqueueFile(b);return null},c.prototype.enqueueFile=function(a){if(a.status!==c.ADDED||a.accepted!==!0)throw new Error("This file can't be queued because it has already been processed or was rejected.");return a.status=c.QUEUED,this.options.autoProcessQueue?setTimeout(function(a){return function(){return a.processQueue()}}(this),0):void 0},c.prototype._thumbnailQueue=[],c.prototype._processingThumbnail=!1,c.prototype._enqueueThumbnail=function(a){return this.options.createImageThumbnails&&a.type.match(/image.*/)&&a.size<=1024*this.options.maxThumbnailFilesize*1024?(this._thumbnailQueue.push(a),setTimeout(function(a){return function(){return a._processThumbnailQueue()}}(this),0)):void 0},c.prototype._processThumbnailQueue=function(){return this._processingThumbnail||0===this._thumbnailQueue.length?void 0:(this._processingThumbnail=!0,this.createThumbnail(this._thumbnailQueue.shift(),function(a){return function(){return a._processingThumbnail=!1,a._processThumbnailQueue()}}(this)))},c.prototype.removeFile=function(a){return a.status===c.UPLOADING&&this.cancelUpload(a),this.files=h(this.files,a),this.emit("removedfile",a),0===this.files.length?this.emit("reset"):void 0},c.prototype.removeAllFiles=function(a){var b,d,e,f;for(null==a&&(a=!1),f=this.files.slice(),d=0,e=f.length;e>d;d++)b=f[d],(b.status!==c.UPLOADING||a)&&this.removeFile(b);return null},c.prototype.createThumbnail=function(a,b){var c;return c=new FileReader,c.onload=function(d){return function(){return"image/svg+xml"===a.type?(d.emit("thumbnail",a,c.result),void(null!=b&&b())):d.createThumbnailFromUrl(a,c.result,b)}}(this),c.readAsDataURL(a)},c.prototype.createThumbnailFromUrl=function(a,b,c,d){var e;return e=document.createElement("img"),d&&(e.crossOrigin=d),e.onload=function(b){return function(){var d,g,h,i,j,k,l,m;return a.width=e.width,a.height=e.height,h=b.options.resize.call(b,a),null==h.trgWidth&&(h.trgWidth=h.optWidth),null==h.trgHeight&&(h.trgHeight=h.optHeight),d=document.createElement("canvas"),g=d.getContext("2d"),d.width=h.trgWidth,d.height=h.trgHeight,f(g,e,null!=(j=h.srcX)?j:0,null!=(k=h.srcY)?k:0,h.srcWidth,h.srcHeight,null!=(l=h.trgX)?l:0,null!=(m=h.trgY)?m:0,h.trgWidth,h.trgHeight),i=d.toDataURL("image/png"),b.emit("thumbnail",a,i),null!=c?c():void 0}}(this),null!=c&&(e.onerror=c),e.src=b},c.prototype.processQueue=function(){var a,b,c,d;if(b=this.options.parallelUploads,c=this.getUploadingFiles().length,a=c,!(c>=b)&&(d=this.getQueuedFiles(),d.length>0)){if(this.options.uploadMultiple)return this.processFiles(d.slice(0,b-c));for(;b>a;){if(!d.length)return;this.processFile(d.shift()),a++}}},c.prototype.processFile=function(a){return this.processFiles([a])},c.prototype.processFiles=function(a){var b,d,e;for(d=0,e=a.length;e>d;d++)b=a[d],b.processing=!0,b.status=c.UPLOADING,this.emit("processing",b);return this.options.uploadMultiple&&this.emit("processingmultiple",a),this.uploadFiles(a)},c.prototype._getFilesWithXhr=function(a){var b,c;return c=function(){var c,d,e,f;for(e=this.files,f=[],c=0,d=e.length;d>c;c++)b=e[c],b.xhr===a&&f.push(b);return f}.call(this)},c.prototype.cancelUpload=function(a){var b,d,e,f,g,h,i;if(a.status===c.UPLOADING){for(d=this._getFilesWithXhr(a.xhr),e=0,g=d.length;g>e;e++)b=d[e],b.status=c.CANCELED;for(a.xhr.abort(),f=0,h=d.length;h>f;f++)b=d[f],this.emit("canceled",b);this.options.uploadMultiple&&this.emit("canceledmultiple",d)}else((i=a.status)===c.ADDED||i===c.QUEUED)&&(a.status=c.CANCELED,this.emit("canceled",a),this.options.uploadMultiple&&this.emit("canceledmultiple",[a]));return this.options.autoProcessQueue?this.processQueue():void 0},e=function(){var a,b;return b=arguments[0],a=2<=arguments.length?i.call(arguments,1):[],"function"==typeof b?b.apply(this,a):b},c.prototype.uploadFile=function(a){return this.uploadFiles([a])},c.prototype.uploadFiles=function(a){var b,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L;for(w=new XMLHttpRequest,x=0,B=a.length;B>x;x++)b=a[x],b.xhr=w;p=e(this.options.method,a),u=e(this.options.url,a),w.open(p,u,!0),w.withCredentials=!!this.options.withCredentials,s=null,g=function(c){return function(){var d,e,f;for(f=[],d=0,e=a.length;e>d;d++)b=a[d],f.push(c._errorProcessing(a,s||c.options.dictResponseError.replace("{{statusCode}}",w.status),w));return f}}(this),t=function(c){return function(d){var e,f,g,h,i,j,k,l,m;if(null!=d)for(f=100*d.loaded/d.total,g=0,j=a.length;j>g;g++)b=a[g],b.upload={progress:f,total:d.total,bytesSent:d.loaded};else{for(e=!0,f=100,h=0,k=a.length;k>h;h++)b=a[h],(100!==b.upload.progress||b.upload.bytesSent!==b.upload.total)&&(e=!1),b.upload.progress=f,b.upload.bytesSent=b.upload.total;if(e)return}for(m=[],i=0,l=a.length;l>i;i++)b=a[i],m.push(c.emit("uploadprogress",b,f,b.upload.bytesSent));return m}}(this),w.onload=function(b){return function(d){var e;if(a[0].status!==c.CANCELED&&4===w.readyState){if(s=w.responseText,w.getResponseHeader("content-type")&&~w.getResponseHeader("content-type").indexOf("application/json"))try{s=JSON.parse(s)}catch(f){d=f,s="Invalid JSON response from server."}return t(),200<=(e=w.status)&&300>e?b._finished(a,s,d):g()}}}(this),w.onerror=function(){return function(){return a[0].status!==c.CANCELED?g():void 0}}(this),r=null!=(G=w.upload)?G:w,r.onprogress=t,j={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"},this.options.headers&&d(j,this.options.headers);for(h in j)i=j[h],i&&w.setRequestHeader(h,i);if(f=new FormData,this.options.params){H=this.options.params;for(o in H)v=H[o],f.append(o,v)}for(y=0,C=a.length;C>y;y++)b=a[y],this.emit("sending",b,w,f);if(this.options.uploadMultiple&&this.emit("sendingmultiple",a,w,f),"FORM"===this.element.tagName)for(I=this.element.querySelectorAll("input, textarea, select, button"),z=0,D=I.length;D>z;z++)if(l=I[z],m=l.getAttribute("name"),n=l.getAttribute("type"),"SELECT"===l.tagName&&l.hasAttribute("multiple"))for(J=l.options,A=0,E=J.length;E>A;A++)q=J[A],q.selected&&f.append(m,q.value);else(!n||"checkbox"!==(K=n.toLowerCase())&&"radio"!==K||l.checked)&&f.append(m,l.value);for(k=F=0,L=a.length-1;L>=0?L>=F:F>=L;k=L>=0?++F:--F)f.append(this._getParamName(k),a[k],this._renameFilename(a[k].name));return this.submitRequest(w,f,a)},c.prototype.submitRequest=function(a,b){return a.send(b)},c.prototype._finished=function(a,b,d){var e,f,g;for(f=0,g=a.length;g>f;f++)e=a[f],e.status=c.SUCCESS,this.emit("success",e,b,d),this.emit("complete",e);return this.options.uploadMultiple&&(this.emit("successmultiple",a,b,d),this.emit("completemultiple",a)),this.options.autoProcessQueue?this.processQueue():void 0},c.prototype._errorProcessing=function(a,b,d){var e,f,g;for(f=0,g=a.length;g>f;f++)e=a[f],e.status=c.ERROR,this.emit("error",e,b,d),this.emit("complete",e);return this.options.uploadMultiple&&(this.emit("errormultiple",a,b,d),this.emit("completemultiple",a)),this.options.autoProcessQueue?this.processQueue():void 0},c}(b),a.version="4.3.0",a.options={},a.optionsForElement=function(b){return b.getAttribute("id")?a.options[c(b.getAttribute("id"))]:void 0},a.instances=[],a.forElement=function(a){if("string"==typeof a&&(a=document.querySelector(a)),null==(null!=a?a.dropzone:void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");return a.dropzone},a.autoDiscover=!0,a.discover=function(){var b,c,d,e,f,g;for(document.querySelectorAll?d=document.querySelectorAll(".dropzone"):(d=[],b=function(a){var b,c,e,f;for(f=[],c=0,e=a.length;e>c;c++)b=a[c],f.push(/(^| )dropzone($| )/.test(b.className)?d.push(b):void 0);return f},b(document.getElementsByTagName("div")),b(document.getElementsByTagName("form"))),g=[],e=0,f=d.length;f>e;e++)c=d[e],g.push(a.optionsForElement(c)!==!1?new a(c):void 0);return g},a.blacklistedBrowsers=[/opera.*Macintosh.*version\/12/i],a.isBrowserSupported=function(){var b,c,d,e,f;if(b=!0,window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector)if("classList"in document.createElement("a"))for(f=a.blacklistedBrowsers,d=0,e=f.length;e>d;d++)c=f[d],c.test(navigator.userAgent)&&(b=!1);else b=!1;else b=!1;return b},h=function(a,b){var c,d,e,f;for(f=[],d=0,e=a.length;e>d;d++)c=a[d],c!==b&&f.push(c);return f},c=function(a){return a.replace(/[\-_](\w)/g,function(a){return a.charAt(1).toUpperCase()})},a.createElement=function(a){var b;return b=document.createElement("div"),b.innerHTML=a,b.childNodes[0]},a.elementInside=function(a,b){if(a===b)return!0;for(;a=a.parentNode;)if(a===b)return!0;return!1},a.getElement=function(a,b){var c;if("string"==typeof a?c=document.querySelector(a):null!=a.nodeType&&(c=a),null==c)throw new Error("Invalid `"+b+"` option provided. Please provide a CSS selector or a plain HTML element.");return c},a.getElements=function(a,b){var c,d,e,f,g,h,i,j;if(a instanceof Array){e=[];try{for(f=0,h=a.length;h>f;f++)d=a[f],e.push(this.getElement(d,b))}catch(k){c=k,e=null}}else if("string"==typeof a)for(e=[],j=document.querySelectorAll(a),g=0,i=j.length;i>g;g++)d=j[g],e.push(d);else null!=a.nodeType&&(e=[a]);if(null==e||!e.length)throw new Error("Invalid `"+b+"` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");return e},a.confirm=function(a,b,c){return window.confirm(a)?b():null!=c?c():void 0},a.isValidFile=function(a,b){var c,d,e,f,g;if(!b)return!0;for(b=b.split(","),d=a.type,c=d.replace(/\/.*$/,""),f=0,g=b.length;g>f;f++)if(e=b[f],e=e.trim(),"."===e.charAt(0)){if(-1!==a.name.toLowerCase().indexOf(e.toLowerCase(),a.name.length-e.length))return!0}else if(/\/\*$/.test(e)){if(c===e.replace(/\/.*$/,""))return!0
}else if(d===e)return!0;return!1},"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.fn.dropzone=function(b){return this.each(function(){return new a(this,b)})}),"undefined"!=typeof module&&null!==module?module.exports=a:window.Dropzone=a,a.ADDED="added",a.QUEUED="queued",a.ACCEPTED=a.QUEUED,a.UPLOADING="uploading",a.PROCESSING=a.UPLOADING,a.CANCELED="canceled",a.ERROR="error",a.SUCCESS="success",e=function(a){var b,c,d,e,f,g,h,i,j,k;for(h=a.naturalWidth,g=a.naturalHeight,c=document.createElement("canvas"),c.width=1,c.height=g,d=c.getContext("2d"),d.drawImage(a,0,0),e=d.getImageData(0,0,1,g).data,k=0,f=g,i=g;i>k;)b=e[4*(i-1)+3],0===b?f=i:k=i,i=f+k>>1;return j=i/g,0===j?1:j},f=function(a,b,c,d,f,g,h,i,j,k){var l;return l=e(b),a.drawImage(b,c,d,f,g,h,i,j,k/l)},d=function(a,b){var c,d,e,f,g,h,i,j,k;if(e=!1,k=!0,d=a.document,j=d.documentElement,c=d.addEventListener?"addEventListener":"attachEvent",i=d.addEventListener?"removeEventListener":"detachEvent",h=d.addEventListener?"":"on",f=function(c){return"readystatechange"!==c.type||"complete"===d.readyState?(("load"===c.type?a:d)[i](h+c.type,f,!1),!e&&(e=!0)?b.call(a,c.type||c):void 0):void 0},g=function(){var a;try{j.doScroll("left")}catch(b){return a=b,void setTimeout(g,50)}return f("poll")},"complete"!==d.readyState){if(d.createEventObject&&j.doScroll){try{k=!a.frameElement}catch(l){}k&&g()}return d[c](h+"DOMContentLoaded",f,!1),d[c](h+"readystatechange",f,!1),a[c](h+"load",f,!1)}},a._autoDiscoverFunction=function(){return a.autoDiscover?a.discover():void 0},d(window,a._autoDiscoverFunction)}).call(this);
'use strict';

app.directive("aboutUs", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/aboutUs/aboutUs.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
'use strict';

app.directive("appDialog", [function () {
    return {
        restrict: 'E',
        scope: {
            btnType: '='
        },
        templateUrl: "modules/appDialog/dialog.html",
        link: function (scope, element, attrs) {
            scope.$root.appDialog = {
                open: function (title, content) {
                    scope.dialogTitle = title;
                    scope.dialogContent = content;
                    //console.log($("#js-dialog").html());
                    $(element).find(".js_dialog").show();
                }
            };

            scope.close = function (type) {
                $(element).find(".js_dialog").hide();
                scope.btnType = type;
            }
        }
    };
}]);
'use strict';

app.directive("activity", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/activity/activity.html",
        link: function (scope, element, attrs) {
            if($location.search().activity == undefined){
                scope.activity = "";
            }else {
                scope.activity = $location.search().activity;
            }
        }
    };
}]);
'use strict';

app.directive("autoNumber", ["$cookieStore", '$http', function ($cookieStore, $http) {
    return {
        restrict: 'E',
        templateUrl: "modules/autoNumber/autoNumber.html",
        link: function (scope, element, attrs) {

            scope.rechs = function (index, len) {
                var randIndex = parseInt(Math.random() * len);
                if (randIndex !== index) {
                    return randIndex;
                } else {
                    console.log(index, len);
                    return rechs(index, len);
                }
            };

            $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
                var _data = [];
                var inputData1 = [];
                $.each(eval(data), function (i, k) {
                    if (k.s <= 800) {
                        if (k.t == 0) {
                            _data.push(k);
                        }
                    }
                });

                $.each(_data, function (i, k) {
                    if (k.fee == 0) {
                        inputData1.push(k);
                    }
                });

                scope.$watch('_mainNumber', function (n, o, scope) {
                    if (n !== o && n !== undefined) {
                        var index1 = scope.rechs(getIndex(inputData1, 'n', n), inputData1.length - 2);
                        var index2 = index1 + 1;
                        scope.subNumber = inputData1[index1].n;
                        scope.thirdNumber = inputData1[index2].n;
                    }
                })
            });
        }
    };
}]);
'use strict';

app.directive("cardPkg", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'C',
        scope:{
            ssDd:"="
        },
        templateUrl: "modules/cardPackage/cardPkg.html",
        link: function (scope, element, attrs) {
                scope.openCardPkg=function(targetId){
                    var targetHtml = $("#" + targetId).html();
                    scope.$root.Overlay.open(targetHtml);
            }
        }
    };

}]);
'use strict';

app.directive("buyers", ['$interval', function ($interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/buyers/buyers.html",
        link: function (scope, element, attrs) {
            scope.productType = attrs.type;
            scope.getBuyers = function () {
                var getBuyers = new Array();
                for (var i = 0; i < 4; i++) {
                    var obj = {
                        name: getRandomName(),
                        phone: getRandomPhone(),
                        pkg: getRandomPkg(),
                        time: getRanDomTime(),
                        product: getRandomProduct()
                    };
                    getBuyers.push(obj);
                }
                return getBuyers;
            };

            scope.buyers = scope.getBuyers();

            $interval(function () {
                scope.buyers = scope.getBuyers();
            }, 1000);
        }
    };
}]);
'use strict';

app.directive("chooseNumber", ["$compile", function ($compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/chooseNumber/chooseNumber.html",
        controller: "chooseNumberController",
        link: function (scope, element) {
            //scope.pageClass = "hide-checkbox";
            $compile($(".number-list").clone().appendTo(".page"))(scope);
            $(".choose-number .number-list").remove();

            var $span = $("#number-select span");
            var $numberList = $(".number-list");
            var $table = $numberList.find("table");
            var $lastNumberSpan = $("#number-select span:last-child");

            scope.currNumberIndex = 3;

            scope.closeNumberList = function () {
                $numberList.slideUp();
            };

            scope.selectNumber = function (k, e) {
                if ($(e.target).hasClass("active")) {
                    var j, numLast, number;
                    $span.eq(scope.currNumberIndex).attr("date-value", k);
                    $span.eq(scope.currNumberIndex).html(k);
                    $span.eq(scope.currNumberIndex).attr("class", "old");
                    $span.eq(scope.currNumberIndex + 1).attr("class", "curr");
                    if (scope.currNumberIndex < 10) {
                        scope.showPickNumberPanel(scope.currNumberIndex + 1, 'selectNumber');
                        $("#num-sure").removeClass("active");
                        $("#num-reset").removeClass("active");
                        return true;
                    }
                    if (scope.currNumberIndex == 10) {
                        numLast = "";
                        for (j = 0; j < 11; j++) {
                            numLast = numLast + $span.eq(j).attr("date-value");
                        }
                        number = numLast;
                        scope.phoneNumber = number;

                        $("#num-sure").addClass("active");
                        $("#num-reset").addClass("active");
                        $numberList.slideUp();
                    }
                } else {
                    return false;
                }

            };

            scope.showPickNumberPanel = function (pos, isWrite) {
                var i, numNow;
                numNow = "";
                scope.currNumberIndex = pos;

                $span.eq(pos).nextAll("span").attr("class", "future");
                $span.eq(pos - 1).nextAll("span").html("?");
                $span.eq(pos - 1).nextAll("span").attr("date-value", "");
                $table.find("td").find("a").attr("class", "");
                for (i = 0; i < pos; i++) {
                    numNow = numNow + $span.eq(i).attr("date-value");
                }
                var jsonDs = getNumArr(numNow, scope.phoneData);
                $table.find("td").find("a").removeClass("active");
                if ($span.eq(i - 1).attr("date-value") == "") {
                    return false;
                } else {
                    $span.eq(pos).attr("class", "curr");
                    $.each(eval(jsonDs), function (v, k) {
                        if (k == 0) {
                            $table.find("td").eq(10).find("a").attr("class", "active");
                        } else {
                            $table.find("td").eq(k - 1).find("a").attr("class", "active");
                        }
                    });
                    $numberList.slideDown();
                    //如果是输入号码，不需要记录行为 
                    if (isWrite != 'selectNumber') {
                        writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    }
                }
            };

            scope.checkPhone = function () {
                if (!$lastNumberSpan.hasClass("old")) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    //console.log(scope.currNumberIndex);
                    scope.showPickNumberPanel(scope.currNumberIndex);
                    return false;
                }
                return true;
            };

            scope.reChooseNumber = function () {
                scope.showPickNumberPanel(3, 'selectNumber');
                writebdLog(scope.category, "_AgainNumber", "渠道号", scope.gh);//重新选号
            };

            scope.$watch('phoneData', function (newVal, oldVal, scope) {
                if (newVal !== oldVal) {
                    //scope.showPickNumberPanel(3);
                }
            }, true);
        }
    };
}]).controller('chooseNumberController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $.each(eval(data), function (i, k) {
            if (!k.t) {
                $scope.phoneData.push(k);
            }
        });
        //$scope.showPickNumberPanel(3);
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("copyRight", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        replace:true,
        scope:{},
        templateUrl: "modules/copyRight/copyRight.html",
        link: function (scope, element, attrs) {
            scope.content = attrs.content;
        }
    };
}]);
'use strict';

app.directive("ngCoupon", ['$location', '$interval', '$http', '$cookieStore', '$timeout', function ($location, $interval, $http, $cookieStore, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/coupon/coupon.html",
        link: function (scope, element, attrs) {
            scope.showPhones = false;
            scope.$root.paracont = "获取手机验证码";
            scope.$root.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.showFudai = function (couponType) {
                scope.couponType = couponType;
                var targetHtml = $("#wxQrCode").html();
                scope.Overlay.openCompile(targetHtml);
                writebdLog(scope.category, "_ShowCouponBar", "渠道号", scope.gh); //展示领券栏
            };

            if ($location.search().gh !== undefined) {//判断是否需要执行showFudai;
                if ($location.search().gh.indexOf("yjtth5") != -1 && $location.path() === "/phone/active/A") {
                    scope.showFudai('JM-MX');
                }
                if ($location.search().gh.indexOf("wxword") != -1 && $location.path() === "/phone/active/A") {
                    scope.showFudai('JM-MX');
                }
            }


            if ($location.search().fromsearch !== undefined) {
                if ($location.search().fromsearch == 1) {
                    scope.showPhones = true;
                    $timeout(function () {
                        var $container = $('.content-scrollable');
                        var $scrollTo = $('.hot-phone');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }, 500);
                }
            }

            scope.$root.shareQuan = function () {
                scope.showShare();
                writebdLog(scope.category, "_Share", "渠道号", scope.gh); //点击分享
            };

            var homeArgs = ['_InputIndexCode', '_InputIndexNumber'];
            //记录落地页输入的操作
            scope.$root.inputHomeArgs = function (type) {
                writebdLog(scope.category, homeArgs[type], "渠道号", scope.gh); //输入操作
            };

            scope.$root.getQuan = function (couponType) {
                scope.toast.open();
                if (!scope.$root.checkCouponMobile()) {
                    scope.toast.close();
                    scope.dialog.open("系统提示", "请输入正确的手机号码！");
                    return false;
                }

                if (!scope.$root.checkCouponActiveCode()) {
                    scope.toast.close();
                    scope.dialog.open("系统提示", "请输入正确的验证码！");
                    return false;
                }

                var headCategory = $location.search().headCategory;
                var category = scope.category;
                if (headCategory != undefined && headCategory != null)
                    category = headCategory;


                $http.jsonp(cfApi.apiHost + '/product/doReceiveMultipleCoupon.html?recieverMobile=' + scope.coupon.mobile + '&couponType=' + scope.couponType + '&gh=' + scope.gh + '&activity=' + scope.activity + '&category=' + category + '&callbackUrl=' + encodeURI(scope.homeUrl + '?gh=' + scope.gh + '&activity=' + scope.activity) + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                    if (!(scope.activePage == 'hotPhones')) {
                        scope.receiver.mobile = scope.coupon.mobile;
                        scope.activeCode = scope.coupon.activeCode;
                    } else {
                        $cookieStore.put('receiver', {
                            name: '',
                            mobile: scope.coupon.mobile,
                            city: '',
                            room: ''
                        });
                        $cookieStore.put('activeCode',scope.coupon.activeCode);
                    }
                    scope.toast.close();
                    scope.$root.apiCode = 0;
                    if (data[0].resultCode == 0) {
                        $(".quan-result").removeClass("hide");
                        $(".quan-form").addClass("hide");
                        $(".fudai-1").hide();
                        $(".fudai-2").show();

                        scope.$root.gettedCoupon = true;
                        //scope.showPhones=true;
                        $cookieStore.put("couponStore", $cookieStore.get("couponStore") - 1);

                        scope.couponStore = $cookieStore.get("couponStore") - 1;

                        writebdLog(scope.category, "_ReceiveCoupons", "渠道号", scope.gh); //领券成功
                    } else {
                        $(".quan-error").removeClass("hide");
                        $(".quan-form").addClass("hide");
                        $(".fudai-1").hide();
                        $(".fudai-3").show();
                        //scope.dialog.open("系统提示", data[0].resultMsg);
                    }
                }).error(function (data, status, headers, config) {
                    console.log(status);
                    //deferred.reject(status)
                });

                writebdLog(scope.category, "_ClickCoupons", "渠道号", scope.gh); //点击领券
            };

            scope.$root.usingQuan = function () {
                scope.showPhones = true;
                scope.Overlay.close();

                writebdLog(scope.category, "_UseCoupons", "渠道号", scope.gh); //使用我的优惠券

                if (scope.activePage == 'index') {
                    $location.path('/phone/active/A/phones');
                } else if (scope.activePage == 'hotPhones') {
                    var $container = $('.content-scrollable');
                    var $scrollTo = $('#hotPhone');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                } else {
                    var $container = $('.content-scrollable');
                    var $scrollTo = $('#receiverAddress');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                }
            };

            scope.$root.checkCouponMobile = function () {
                $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.couponForm.couponMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                }

                return true;
            };

            scope.$root.getCouponActiveCode = function (event, phoneNumber) {
                if ($(event.currentTarget).hasClass("not")) {
                    //scope.toast.close();
                    return false;
                }

                scope.toast.openUnLimit();

                if (!scope.$root.checkCouponMobile()) {
                    scope.toast.close();
                    scope.dialog.open("系统提示", "请输入正确的手机号码！");
                    return false;
                }
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    if (data == "") {
                        scope.toast.close();
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.$root.paracont = "重新获取验证码";
                                scope.$root.paraclass = "but_null";
                            } else {
                                scope.$root.paracont = second + "秒后可重发";
                                scope.$root.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariIndexCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkCouponActiveCode = function () {
                if (!scope.couponForm.couponActiveCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.coupon.mobile, scope.coupon.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    return true;
                }
            };


        }
    };
}]);
'use strict';

app.directive("jsDialog", [function () {
    return {
        restrict: 'E',
        templateUrl: "modules/dialog/dialog.html",
        link: function (scope, element, attrs) {
            scope.$root.dialog = {
                open: function (title, content) {
                    scope.dialogTitle = title;
                    scope.dialogContent = content;
                    //console.log($("#js-dialog").html());
                    $(element).find(".js_dialog").show();
                },
                close: function (url) {
                    $(element).find(".js_dialog").hide();
                }
            };
        }
    };
}]);
'use strict';

app.directive("flowFqa", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/flowFqa/flowFqa.html",
        link: function (scope, element, attrs) {
        }
    };
}]);
'use strict';

app.directive("flowPackage", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/flowPackage/flowPackage.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;

            //获取选择框尺码
            scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            //获取套餐列表


            $http.get(baseApiUri + '/getFlowPackages').success(function (data) {
                scope.flowPackageList = data;

                //设置默认选中项 start
                scope.flowPackageItem = data[3];
                //end
            });

            /*$http.get('/data/flowPackage.json').success(function (data) {
             scope.flowPackageList = data;

             //设置默认选中项 start
             scope.flowPackageItem = data[3];
             //end
             });*/

            //选择号码 对象类型
            scope.setFlowPackage = function (event, flowPackageItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.flowPackageItem = flowPackageItem;
                writebdLog(scope.category, "_SelectPackage", "渠道号", scope.gh);//优惠套餐
            };

            scope.$watch('flowPackageItem', function (nv, ov, scope) {
                if (nv != ov) {
                    if(scope.mifi){
                        scope.mainPrice = parseInt(scope.mifi.price) + parseInt(scope.flowPackageItem.p);
                    }else {
                        scope.mainPrice = nv.p;
                    }
                }
            });
        }
    };
}]);
'use strict';

app.directive("footerNav", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/footerNav.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $lastNumberSpan = $("#number-select span:last-child");
            var $scrollTo;

            var searchType = attrs.searchType;

            scope.priceType = attrs.priceType;

            if (searchType == "phone") {
                scope.orderURL = "http://m.gd189fq.com/wap/customer/searchIndexA.html?s=wap";
            } else {
                scope.orderURL = "http://m.gd189fq.com/yfqcz/#/purchaseOrderList?redirect_uri=http://app.yfq.cn";
            }

            scope.checks = eval(attrs.checks);

            scope.getSearch = function () {
                //console.log(scope.appType);
                writebdLog(scope.category, "_OrderQuery", "渠道号", scope.gh);//订单查询
            };

            scope.getContent = function () {
                getMeiqia();
                //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };

            scope.submitForm = function (event,type) {
                event.preventDefault();
                if (attrs.checkPhone == "true") {
                    if (scope.checkPhone()) {
                        //writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    } else {
                        $scrollTo = $('#numberPanel');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() -50
                        });
                        return false;
                    }
                }
                if (scope.checkAddress()) {
                    //writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                    if (scope.$root.checkActiveCode()) {
                        writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                        scope.$root.toast.open();
                        if(scope.payType == 2){
                            scope.showHuOverLay("payTipsPanel");
                            return false;
                        }else {
                            $form.submit();
                        }
                    }else {
                        $scrollTo = $('#receiverAddress');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }
                } else {
                    $scrollTo = $('#receiverAddress');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                }
            }
        }
    };
}]);

'use strict';

app.directive("footerNavNew", ['$http', '$cookieStore', function ($http, $cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/footerNav.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $lastNumberSpan = $("#number-select span:last-child");
            var $scrollTo;

            var searchType = attrs.searchType;

            scope.priceType = attrs.priceType;

            if (searchType == "phone") {
                scope.orderURL = "http://m.gd189fq.com/wap/customer/searchIndexA.html?s=wap";
            } else {
                scope.orderURL = "http://m.gd189fq.com/yfqcz/#/purchaseOrderList?redirect_uri=http://app.yfq.cn";
            }

            scope.payTypeName = "下一步";

            if (attrs.payTypeName) {
                scope.payTypeName = attrs.payTypeName;
            }

            scope.checks = eval(attrs.checks);

            scope.getSearch = function () {
                //console.log(scope.appType);
                writebdLog(scope.category, "_OrderQuery", "渠道号", scope.gh);//订单查询
            };

            scope.getContent = function () {
                getMeiqia();
                //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };

            function checkPhoneNumber() {
                if (!scope.checkoutForm.phoneNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    //console.log(scope.currNumberIndex);
                    //scope.npShow();
                    return false;
                }
                return true;
            }

            scope.submitForm = function (event) {
                if (scope.checkPhone()) {
                    scope.orderState = {
                        machineId: scope.phone.productId,
                        productId: scope.pkg.productId,
                        color: scope.color.colorName,
                        phoneNumber: scope.phoneNumber,
                        price: scope.mainPrice,
                        category: scope.category
                    };
                    $cookieStore.put("orderState", scope.orderState);
                    writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//下一步
                    scope.$root.toast.open();
                    //$form.submit();
                } else {
                    event.preventDefault();
                    scope.npShow(1);
                }
            }
        }
    };
}]);

'use strict';

app.directive("footerNavRb", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/footerNav/footerNavRb.html",
        link: function (scope, element, attrs) {
            var $form = $(attrs.submit);
            var $container = $('.content-scrollable');
            var $scrollTo;

            scope.orderSearchUrl = attrs.orderSearchUrl;

            scope.cod = attrs.cod;
            scope.codName = "货到付款";
            scope.payTypeName = "立即支付";

            scope.getSearch = function () {
                //console.log(scope.appType);
                writebdLog(scope.category, "_OrderQuery", "渠道号", scope.gh);//订单查询
            };

            scope.getContent = function () {
                getMeiqia();
                //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };

            scope.submitForm = function (event, type) {
                event.preventDefault();
                if (attrs.checkPhone == "true") {
                    if (scope.checkPhone()) {
                        //writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    } else {
                        $scrollTo = $("#phoneQuery");
                        //console.log($scrollTo);
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                        return false;
                    }
                }
                if (attrs.checkAddress == "true") {
                    if (scope.checkAddress()) {
                        //writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                        if (scope.$root.checkActiveCode()) {
                            writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                            scope.$root.toast.open();

                            if (type == 1) {
                                //scope.formAction = "http://m.yfq.cn/wap/taokafanghaoNew/uploadCard.html";
                                $form.attr("action",cfApi.apiHost + "/wap/taokafanghaoNew/uploadCardB.html");
                            } else if (type == 0) {
                                //scope.formAction = "http://m.yfq.cn/wap/taokafanghaoNew/submitOrder.html";
                                $form.attr("action",cfApi.apiHost + "/wap/taokafanghaoNew/submitOrderSingle.html");
                            }

                            //console.log(scope.formAction);

                            $form.submit();

                        } else {
                            $scrollTo = $('#receiverAddress');
                            $container.animate({
                                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                            });
                        }
                    } else {
                        $scrollTo = $('#receiverAddress');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }
                }
            }
        }
    };
}]);

/*
'use strict';

app.directive("getContact", ['$location', function ($location) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {

            scope.getContact = function () {
                getMeiqia();
                //$("#contactUs").show();
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
            };
        }
    };
}]);*/

'use strict';

app.directive("gh", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/gh/gh.html",
        link: function (scope, element, attrs) {
            if ($location.search().gh == undefined) {
                scope.gh = "";
            } else {
                scope.gh = $location.search().gh;
            }
        }
    };
}]);
'use strict';

app.directive("goTop", ['$cookieStore', '$timeout', function ($cookieStore, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/goTop/goTop.html",
        link: function (scope, element, attrs) {
            var $scrollContainer = $(".content-scrollable");
            scope.goTop = function () {
                $scrollContainer.animate({
                    scrollTop: 0
                });
            }
        }
    };
}]);
'use strict';

app.directive("a", ['$location', function ($location) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var _params = $location.search();
            var _href = attrs.href;
            var _hash;
            var i = 0;

            if (_href) {
                //console.log(_href);
                $.each(_params, function (name, key) {
                    if (i == 0) {
                        //console.log(_href);
                        _hash = "?" + name + "=" + key;
                        if (_href.indexOf("?") != -1) {
                            _hash = "&" + name + "=" + key;
                        }
                    } else {
                        _hash = _hash + "&" + name + "=" + key;
                    }
                    i++;
                });
                scope.hash = _hash;
                if (_href != "javascript:;" && scope.hash != undefined && attrs.hasHash != "false") {
                    element.attr("href", _href + scope.hash);
                }
            }
        }
    };
}]);
'use strict';

app.directive("historyScrollTop", ['$cookieStore', '$timeout', function ($cookieStore, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var $scrollContainer = $(".content-scrollable");
            $scrollContainer.on('scroll', function () {
                $cookieStore.put('historyScrollTop', $(element).scrollTop());
            });
            if ($cookieStore.get('historyScrollTop')) {
                $timeout(function () {
                    $scrollContainer.animate({
                        scrollTop: $cookieStore.get('historyScrollTop')
                    });
                }, 700);
            } else {
            }
        }
    };
}]);
'use strict';

app.directive("inputQuery", function () {
    return {
        restrict: 'E',
        templateUrl: "modules/inputQuery/inputQuery.html",
        controller: "inputQueryController",
        link: function (scope, element, attrs) {

            //选择号码 对象类型
            scope.setNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.numberItem = numberItem;
            };

            //监视号码数据变动
            scope.$watch('phoneData', function (newVal, oldVal, scope) {
                if (newVal !== oldVal) {
                    //console.log(newVal);
                }
            }, true);
        }
    };
}).controller('inputQueryController', ['$scope', '$cookieStore', '$http', function ($scope, $cookieStore, $http) {
    $scope.phoneData = new Array();
    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $.each(eval(data), function (i, k) {
            if (k.t) {
                $scope.phoneData.push(k);
            }
        });
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });
}]);
'use strict';

app.directive("mifi", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/mifi/mifi.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.mifiTitle = attrs.title;
            scope.mifiSubTitle = attrs.subTitle;

            //获取套餐列表

            $http.get('/data/mifis.json').success(function (data) {
                scope.mifis = data;

            });

            scope.$root.disabledSim = function(index,status){
                var $simItem = $(".sim-type-lists").find(".item-box");
                if(status){
                    $simItem.eq(index).addClass("disabled");
                }else {
                    $simItem.eq(index).removeClass("disabled");
                }
            };

            //选择号码 对象类型
            scope.setMifi = function (event, mifi) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if(!$this.hasClass("curr")){//选择MIFI
                    scope.mifi = mifi;
                    scope.mainPrice = parseInt(mifi.price) + parseInt(scope.flowPackageItem.p);
                    $this.addClass('curr');
                    scope.$root.setSimType(event, 1, scope.simList[1]);
                    scope.$root.disabledSim(0,true);
                    writebdLog(scope.category, "_SelectMifi", "渠道号", scope.gh);
                }else {//取消MIFI
                    scope.mifi = false;
                    scope.$root.disabledSim(0,false);
                    scope.mainPrice = scope.flowPackageItem.p;
                    $this.removeClass('curr');
                    writebdLog(scope.category, "_CancelMifi", "渠道号", scope.gh);
                }
            };
        }
    };
}]);
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
                picUrl:'http://app.yfq.cn/images/active/share_active.jpg'
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
                $http.jsonp(cfApi.apiHost + "/product/getWxParameter.html?shareUrl=" + shareUrl + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
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

            scope.$watch('share',function (n,o,scope) {

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
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });

                var share_obj = new nativeShare('nativeShare', config);
            },true);
        }
    };
}]);
'use strict';

app.directive("topNav", ['$timeout', '$document', '$window', function ($timeout, $document, $window) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/nav/nav.html",
        link: function (scope, element, attrs) {

            scope.navVisibility = attrs.navVisibility;

            scope.navClass == "black";

            if (attrs.navClass) {//如果 navClass 存在
                scope.navClass = attrs.navClass;
            }

            scope.pageTitle = attrs.pageTitle;
            scope.$root.title = scope.pageTitle;
            scope.pageBack = attrs.pageBack;
            scope.pageDone = attrs.pageDone;
            scope.homeUrl = attrs.homeUrl;

            if ($window.history.length == 1) {
                scope.pageBack = "home";
            }

            scope.home = function () {
                $window.location.href = 'http://' + $window.location.host + scope.homeUrl + $window.location.search;
            };

            scope.back = function () {
                history.back();
            };

            scope.done = function () {

            };

            scope.getContact = function () {
                getMeiqia();
                _MEIQIA('showPanel');
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };
        }
    };
}]);
app.directive('onFinish', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
}]);
'use strict';

app.directive("overlay", ['$http', '$compile', '$timeout', function ($http, $compile, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/overlay/overlay.html",
        link: function (scope, element, attrs) {
            var $overlayHook = $("#overlay-hook");
            var $container = $("#container");
            scope.$root.Overlay = {
                open: function (template) {//template,需要传入的html
                    //console.log(scope.simList);
                    $overlayHook.html(template);
                    $container.addClass("overlay-open");
                },
                openCompile: function (template) {
                    //console.log(scope.simList);
                    $compile($overlayHook.html(template))(scope);
                    $container.addClass("overlay-open");
                },
                close: function () {
                    $container.removeClass("overlay-open");
                    $overlayHook.html("");
                }
            };
            $(document).on('click', '.js-close-overlay', function () {
                scope.$root.Overlay.close();
            })
        }
    };
}]);
'use strict';

app.directive("owlCarousel", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'C',
        templateUrl: "modules/owlCarousel/owlCarousel.html",
        scope: {
            imgUrls: '='
        },
        link: function (scope, element, attrs) {

        }
    };
}]).directive("carouselItem", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (scope.$last) {
                $(element).parent().owlCarousel({
                    navigation: true, // Show next and prev buttons
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    singleItem: true,
                    autoPlay: 3000
                });
            }
        }
    };
}]);
'use strict';

app.directive("payType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTypeTitle = attrs.title;
            scope.payTypeSubTitle = attrs.subTitle;
            scope.class = attrs.addClass;
            //设置本模块的显示隐藏
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            var $form = $(attrs.submit);

            //默认赋值
            //scope.payType = 1;

            //设置默认payType;
            scope.setDefaultPayType = function (type) {
                scope.payType = type;
            };

            //获取地址栏支付方式的参数
            var _payType = $location.search().payType;

            //判断是否有带支付方式参数，如果有，更改默认支付方式;
            if (_payType) {
                scope.payType = _payType;
            }

            //选择支付方式

            scope.setPayType = function (event, type) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    if (scope.checkAddress()) {
                        if (scope.$root.checkActiveCode()) {
                            $("#payType").val(type);
                            if (type == 2) {
                                scope.showOverLay("payTipsPanel");
                            } else {
                                scope.$root.toast.open();
                                scope.$root.toast.open();
                                //$form.submit();
                                scope.$root.submitForm();
                            }
                        }
                    } else {
                        var $scrollTo = $('#receiverAddress');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }
                }
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.openCompile(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };

            scope.showHuOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.openCompile(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };

            scope.$root.tipsSubmit = function () {
                if (scope.$root.checkActiveCode()) {
                    scope.$root.toast.open();
                    //$form.submit();
                    scope.$root.submitForm();
                } else {
                    scope.$root.Overlay.close();
                }
            };

            scope.$root.submitForm = function () {
                var type = $("#payType").val();
                var value;
                if (type == 0) {
                    value = "_payAll";
                }
                if (type == 2) {
                    value = "_payMonthly";
                }
                if (type == 1) {
                    value = "_payCOD";
                }
                writebdLog(scope.category, value, "渠道号", scope.gh);//支付方式
                $form.submit();
            };


            /*$("#container").on("click",".btn-twitter",function () {
             scope.$root.Overlay.close;
             $form.submit();
             });*/
            /*scope.setPayType = function (event, type) {
             event.preventDefault();
             var $this = $(event.currentTarget);
             if ($this.hasClass("disabled")) {
             return false;
             } else {
             $this.parent().siblings().children().removeClass('curr');
             $this.addClass('curr');
             scope.payType = type;
             }
             };*/
        }
    };
}]);
'use strict';

app.directive("passport", function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/passport/passport.html",
        controller: "passportController",
        link: function (scope, element) {
        }
    }
}).controller('passportController',['$scope', '$cookieStore', function($scope,$cookieStore) {
    var receiverWatch = $scope.$watch('passport', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $cookieStore.put('passport',newVal);
        }
    },true);
}]);
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
                    scope.color = colors[getIndex(colors, "selected", "curr")];
                    //console.log(getIndex(colors, "selected", "curr"));

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
                    writebdLog(scope.category, "_FuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };

            scope.dialogShow = function (title, content) {
                //console.log("1");
                scope.$root.dialog.open(title, content);
            };

            scope.$watch('productId', function (n, o, scope) {//临时解决方案
                if (n != o && scope.colors) {
                    if (n == 256 || n==257) {
                        scope.colors[0].selected = "disabled";
                        $("#color0").removeClass("curr");
                        if (scope.color.colorName == "亮黑色") {
                            var _index = getIndex(scope.colors, "colorName", "黑色");
                            scope.color = scope.colors[_index];
                            $("#color" + _index).addClass("curr");
                            scope.dialogShow("", "'亮黑色'暂时没货，帮您换成了黑色，或者您可以重新选择");
                            //return;
                        }
                    } else {
                        scope.colors[0].selected = "";
                    }
                }
            });
        }
    };
}]);
'use strict';

app.directive("phonePackage", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/phonePackage.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class=attrs.addClass;
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            //选择号码 对象类型
            scope.setPhonePackage = function (event, pkg) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if($this.hasClass("curr")){
                    return false;
                }
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.pkg = pkg;
                writebdLog(scope.category,"_SelectPackage","渠道号",scope.gh);//选择套餐
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };
        }
    };
}]);
'use strict';

app.directive("phoneStorages", ['$http', 'Phone', function ($http, Phone) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneStorages/phoneStorages.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.storageTitle = attrs.title;
            scope.storageSubTitle = attrs.subTitle;

            //scope.size = attrs.size;

            //选择号码 对象类型
            scope.setPhoneStorage = function (event, storage) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.productId = storage.productId;
                    writebdLog(scope.category,"_FuselageMemory","渠道号",scope.gh);//选择机身内存
                }
            };
        }
    };
}]);
'use strict';

app.directive("phoneTypes", ['$http', 'Phone', function ($http, Phone) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneTypes/phoneTypes.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.phoneTypeTitle = attrs.title;
            scope.phoneTypeSubTitle = attrs.subTitle;

            scope.showDetails = attrs.phoneDetails;

            //scope.size = attrs.size;

            //选择号码 对象类型
            scope.setPhoneType = function (event, phoneType) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.productId = phoneType.productId;
                    writebdLog(scope.category,"_SelectVersion","渠道号",scope.gh);//选择版本
                }
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsPhone", "渠道号", scope.gh);//了解iPhone7
            };
        }
    };
}]);
app.directive("productDetails", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/productDetails/productDetails.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
app.directive("productHeader", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/productHeader/productHeader.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
'use strict';

app.directive("receiverAddress", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/receiverAddress.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber, e) {
                if ($(e.currentTarget).hasClass("not")) {
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                if (attrs.start) {
                    getArea('广东省', 1, '广东省', '', "");
                    stockShow();
                    dataAreaShow(1);
                    tabShow(1);
                } else {
                    getArea(0, 0, "", "", "");
                    stockShow();
                    dataAreaShow(0);
                    tabShow(0);
                }
            });

            //址选择器顶栏点击事件
            $objTabItem.click(function (e) {
                var index = $(this).index();
                var textValue = "";
                if (index === 0) {
                    stockHide();
                } else {
                    tabShow(index - 1);
                    dataAreaShow(index - 1);
                }
                return false;
            });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, value1, value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3);
                    scope.receiver.city = value1 + value2 + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
        }
    };
}]);
'use strict';

app.directive("redirectUrl", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/redirectUrl/redirectUrl.html",
        link: function (scope, element, attrs) {

            var _params = $location.search();
            var _href = "http://" + $location.host() + $location.path();
            var _hash;
            var i = 0;

            var res = new Array();

            //console.log(_params);

            $.each(_params, function (name, key) {

                if(Array.isArray(key)){
                    res.push(name + "=" + key[0]);
                }else {
                    res.push(name + "=" + key);
                }
            });

            //console.log(res);

            $.each(res, function (name, key) {
                if (i == 0) {
                    //console.log(_href);
                    _hash = "?" + key;
                    if (_href.indexOf("?") != -1) {
                        _hash = "&" + key;
                    }
                } else {
                    _hash = _hash + "&" + key;
                }
                i++;
            });

            scope.redirectUrl = _href + _hash;
        }
    };
}]);
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
            scope.cardGroup=["小卡(Nano卡)","大/中卡(二合一)"]
            //获取选择框尺码
            scope.size = attrs.size;

            //获取sim卡类型
            $http.get('/data/simType.json').success(function (data) {
                scope.simList = data;
                scope.simItem = data[0];
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
'use strict';

app.directive("referrerNo", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/referrerNo/referrerNo.html",
        link: function (scope, element, attrs) {
            scope.referrerNo = $location.search().referrerNo;
        }
    };
}]);
'use strict';

app.directive("spcPhone", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhone/spcPhone.html",
        link: function (scope, element, attrs) {
            var $container = $('.content-scrollable');
            scope.filterPhoneName = "iPhone7";

            scope.filterPhone = function (brand,notes) {
                scope.filterPhoneName = brand;
                writebdLog(scope.category, "_" + notes, "渠道号", scope.gh);//选择的手机品牌
            };

            scope.$root.checkMachineName = function () {
                if (!scope.checkoutForm.machineName.$valid) {
                    //alert("请输入收件人");
                    var $scrollTo = $('.order-content');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMachine = function (machine,productId) {
                scope.$root.machineName = machine;
                writebdLog(scope.category, "_" + productId, "渠道号", scope.gh);//选择的商品ID
            }
        }
    };
}]);
'use strict';

app.directive("spcPhoneB", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhoneB/spcPhone.html",
        link: function (scope, element, attrs) {
            var $container = $('.content-scrollable');
            scope.filterPhoneName = "";

            scope.filterPhone = function (brand,notes) {
                scope.filterPhoneName = brand;
                writebdLog(scope.category, "_" + notes, "渠道号", scope.gh);//选择的手机品牌
            };

            scope.$root.checkMachineName = function () {
                if (!scope.checkoutForm.machineName.$valid) {
                    //alert("请输入收件人");
                    var $scrollTo = $('.order-content');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMachine = function (machine,productId) {
                scope.$root.machineName = machine;
                writebdLog(scope.category, "_" + productId, "渠道号", scope.gh);//选择的商品ID
            }
        }
    };
}]);
'use strict';

app.directive("spcPhoneD", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhoneD/spcPhone.html",
        link: function (scope, element, attrs) {
            var $container = $('.content-scrollable');

            scope.spcNavOpen = false;

            scope.filterPhoneName = "";

            scope.filterPhone = function (brand, notes) {
                scope.filterPhoneName = brand;
                writebdLog(scope.category, "_" + notes, "渠道号", scope.gh);//选择的手机品牌
            };

            function writeBrand(name) {

                if (name == '华为') name = 'huawei';
                if (name == '小米') name = 'mi';
                if (name == '美图') name = 'meitu';
                return name;
            }

            scope.setMainPhoneBrand = function (e, index, myBrand) {
                scope.brandIndex = index;
                scope.brand = myBrand;
                scope.spcNavOpen = false;
                writebdLog(scope.category, "_" + writeBrand(myBrand.brandName), "渠道号", scope.gh);//选择的手机品牌
            };

            scope.$root.checkMachineName = function () {
                if (!scope.checkoutForm.machineName.$valid) {
                    //alert("请输入收件人");
                    var $scrollTo = $('.order-content');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMachine = function (machine, productId) {
                scope.$root.machineName = machine;
                writebdLog(scope.category, "_" + productId, "渠道号", scope.gh);//选择的商品ID
            }
        }
    };
}]);
'use strict';

app.directive("spcPhoneLjA", ['$http', '$compile', '$cookieStore', function ($http, $compile, $cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/spcPhoneLjA/spcPhone.html",
        link: function (scope, element, attrs) {
            var $container = $('.content-scrollable');

            scope.spcNavOpen = false;

            scope.filterPhoneName = "";

            scope.filterPhone = function (brand, notes) {
                scope.filterPhoneName = brand;
                writebdLog(scope.category, "_" + notes, "渠道号", scope.gh);//选择的手机品牌
            };

            function writeBrand(name) {

                if (name == '华为') name = 'huawei';
                if (name == '小米') name = 'mi';
                if (name == '美图') name = 'meitu';
                if (name == '全部') name = 'all';
                if (name == '热门机型') name = 'hot';
                if (name == '其它机型') name = 'other';
                return name;
            }

            scope.setMainPhoneBrand = function (e, index, myBrand) {
                scope.brandIndex = index;
                scope.brand = myBrand;
                scope.spcNavOpen = false;
                $cookieStore.put("brand",myBrand);
                writebdLog(scope.category, "_ClickBrand" + writeBrand(myBrand.brandName), "渠道号", scope.gh);//选择的手机品牌
            };

            scope.$root.checkMachineName = function () {
                if (!scope.checkoutForm.machineName.$valid) {
                    //alert("请输入收件人");
                    var $scrollTo = $('.order-content');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

        }
    };
}]);
'use strict';

app.directive("spcTitle", function () {
    return {
        restrict: 'E',
        replace: true,
        scope:{},
        templateUrl: "modules/spcTitle/spcTitle.html",
        link: function (scope, element, attrs) {
            scope.mainTitle = attrs.mainTitle;
            scope.subTitle = attrs.subTitle;
            scope.arrow = attrs.arrow;
        }
    };
});
'use strict';

app.directive("star", [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ratting: "="
        },
        templateUrl: "modules/star/star.html",
        link: function (scope, element, attrs) {

            scope.$watch('ratting', function (n, o, scope) {//临时解决方案
                var rate = (parseInt(scope.ratting[0]) + parseInt(scope.ratting[1]) + parseInt(scope.ratting[2]))/3;
                var $i = $(element).find(".stars-content").find("i");
                for (var i = 0; i < 5; i++) {
                    if (i < rate) {
                        $i.eq(i).addClass("on");
                    }
                }
            });

        }
    };
}]);
'use strict';

app.directive("stars", function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: "modules/stars/stars.html",
        link: function (scope, element, attrs) {
            var $i = $(".stars-content").find("i");
            scope.sold = Math.round(Math.random()*999);
            scope.score = (Math.random() + 4).toFixed(1);
            for (var i = 0; i < 4; i++) {
                if (i < scope.score) {
                    $i.eq(i).addClass("on");
                }
            }
        }
    };
});
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
'use strict';

app.directive("tempCart", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/tempCart/tempCart.html",
        link: function (scope, element, attrs) {
        }
    };
}]);
'use strict';

app.directive("timer", ['$interval',function ($interval) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "modules/timer/timer.html",
        link: function (scope, element, attrs) {

            //scope.timer = "1";

            function getRTime() {

                var d = new Date();
                var _nowTime = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + "23:59:00";

                var EndTime = new Date(_nowTime);
                var NowTime = new Date();


                var t = EndTime.getTime() - NowTime.getTime();

                var d = Math.floor(t / 1000 / 60 / 60 / 24);
                var h = Math.floor(t / 1000 / 60 / 60 % 24);
                if(h < 10){
                    h = "0" + h;
                }
                var m = Math.floor(t / 1000 / 60 % 60);
                if(m < 10){
                    m = "0" + m;
                }
                var s = Math.floor(t / 1000 % 60);
                if(s < 10){
                    s = "0" + s;
                }
                scope.timer = "<i>" + h + "</i>" + "<sub>时</sub>" + "<i>" + m + "</i>" + "<sub>分</sub>" + "<i>" + s + "</i>" + "<sub>秒</sub>";
                //scope.timer = "1";
                //console.log(scope.timer);
            };

            $interval(getRTime, 1000);
        }
    };
}]);
'use strict';

app.directive("txtList", ["$http", function ($http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: "modules/txtList/txtList.html",
        link: function (scope, element, attrs) {
            $http.get(attrs.apiUrl).success(function (data) {
                scope.txtData = data;
            });
        }
    };
}]);
'use strict';

app.directive("dropzone", function () {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {

            var config = {
                url: 'http://www.cz.com:8082/uploadFile.html?decorator=blank',
                maxFilesize: 100,
                paramName: "uploadfile",
                maxThumbnailFilesize: 10,
                parallelUploads: 1,
                thumbnailWidth: 300,
                thumbnailHeight: 200,
                autoProcessQueue: true
            };

            var eventHandlers = {
                'addedfile': function(file) {
                    scope.file = file;
                    if (this.files[1]!=null) {
                        this.removeFile(this.files[0]);
                    }
                    scope.$apply(function() {
                        scope.fileAdded = true;
                    });
                },

                'success': function (file, response) {
                    console.log(response);
                    var _input = $("#" + attrs.id + "-input");
                    _input.val(response);
                }

            };

            var dropzone = new Dropzone(element[0], config);

            angular.forEach(eventHandlers, function(handler, event) {
                dropzone.on(event, handler);
            });

            scope.processDropzone = function() {
                dropzone.processQueue();
            };

            scope.resetDropzone = function() {
                dropzone.removeAllFiles();
            }
        }
    }
});
'use strict';

app.directive("userTrack", function () {
    return {
        restrict: 'E',
        replace: false,
        link: function (scope, element, attrs) {
            scope.userTrack = function (TrackName) {
                writebdLog(scope.category, TrackName, "渠道号", scope.gh);
            }
        }
    };
});
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('errorSuccess', { //app首页
            url: "/error/:status",
            templateUrl: "pages/error/error.html",
            controller: "errorController"
        });
}]).controller('errorController', ['$scope', '$rootScope', '$location', '$stateParams', function ($scope, $rootScope, $location, $stateParams) {
    $scope.errorStatus = $stateParams.status;

    if ($location.search()) {
        $scope.errorData = $location.search();
    }

    $scope.getContent = function () {
        getMeiqia();
        //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
        _MEIQIA('showPanel');
    };
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('about', { //关于我们
            url: "/about",
            templateUrl: "pages/about/about.html",
            controller: "aboutController"
        });
}]).controller('aboutController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {

}]);

"use strict";

/*app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('index', { //app首页
            url: "/",
            templateUrl: "html/pages/index/index.html",
            controller: "indexController"
        });
}]).controller('indexController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
}]);
    */
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('payState', { //app首页
            url: "/payState/:status",
            templateUrl: "pages/payState/payState.html",
            controller: "payStateController"
        });
}]).controller('payStateController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', function ($scope, $rootScope, $location, $stateParams, $http) {
    $scope.payStatus = $stateParams.status;

    $scope.params = window.location.search;

    if($location.search().orderNo != undefined){
        $scope.orderNo = $location.search().orderNo;
        $http.get("http://app.yfq.cn:3099/api/getSalesOrder/" + $scope.orderNo).success(function (data) {
            $scope.callbackUrl = data.items[0].salesOrder.callbackUrl;
        });
    }else {
        $scope.callbackUrl = "#";
    }

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jjk&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('paySuccess', { //app首页
            url: "/pay/:status",
            templateUrl: "pages/payStatus/payStatus.html",
            controller: "payController"
        });
}]).controller('payController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', function ($scope, $rootScope, $location, $stateParams, $http) {
    $scope.payStatus = $stateParams.status;

    if($location.search().orderNo != undefined){
        $scope.orderNo = $location.search().orderNo;
        $http.get("http://app.yfq.cn:3099/api/getSalesOrder/" + $scope.orderNo).success(function (data) {
            $scope.callbackUrl = data.items[0].salesOrder.callbackUrl;
        });
    }else {
        $scope.callbackUrl = "#";
    }
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('payment', { //app首页
            url: "/payment",
            templateUrl: "pages/payment/payment.html",
            controller: "paymentController"
        });
}]).controller('paymentController', ['$scope', '$rootScope', '$location', '$stateParams', '$cookieStore', '$http', function ($scope, $rootScope, $location, $stateParams, $cookieStore, $http) {

    $scope.orderNo = $location.search().orderNo;

    //$scope.appType = systemName + "_" + $stateParams.pageType + "_" + phone.phoneModel;
    //$scope.category = $scope.appType;

    if($cookieStore.get("phoneQueryUrl")){
        $scope.phoneQueryUrl = $cookieStore.get("phoneQueryUrl");
    };

    if ($scope.orderNo) {
        $scope.category = "_IndexSearch";
        $http.get("http://app.yfq.cn:3099/api/getSalesOrder/" + $scope.orderNo).success(function (data) {
            var machineId,productId,color,phoneNumber,price;

            $.each(data.items,function (i,o) {
                if(o.productName.indexOf("月") == -1){
                    machineId = o.productId;
                    color = o.salesOrder.color;
                    phoneNumber = o.salesOrder.buyMobile;
                    price = o.salesOrder.totalAmount;

                }else {
                    productId = o.productId;
                }
            });

            $scope.orderState = {
                machineId: machineId,
                productId: productId,
                color: color,
                phoneNumber: phoneNumber,
                price: price,
                category: $scope.category
            };

            $scope.receiver = {
                name: data.salesOrder.recieverName,
                mobile: data.salesOrder.recieverMobile,
                city: data.salesOrder.receiverCity,
                room: data.salesOrder.receiverRoom
            };
        });
    } else {
        $scope.orderState = $cookieStore.get("orderState");
        $scope.category = $scope.orderState.category;
    }

    //writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
}]);
'use strict';

app.directive("pkgInfo", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'C',
        scope: {
            ssDd: "="
        },
        templateUrl: "modules/cardPackage/d/cardPkg.html",
        link: function (scope, element, attrs) {
            scope.openCardPkg = function (targetId,e) {
                var $this = $(e.currentTarget);
                var targetHtml = $this.siblings(".pcd-infos").html();
                scope.$root.Overlay.open(targetHtml);
            }
        }
    };

}]);
'use strict';

app.directive("cardPkgN", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'C',
        scope: {
            ssDd: "="
        },
        templateUrl: "modules/cardPackage/n/cardPkg.html",
        link: function (scope, element, attrs) {
            scope.openCardPkg=function(targetId){
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
            }
        }
    };

}]);
'use strict';

app.directive("phoneQuery", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/phoneQuery.html",
        controller: "phoneQueryController",
        link: function (scope, element, attrs) {

            $container = $("#container");

            var _index;

            if ($cookieStore.get("orderState")) {
                var orderState = $cookieStore.get("orderState");
                //scope.phoneNumber = orderState.phoneNumber;
            }

            scope.npHide = function () {
                //event.preventDefault();
                $container.removeClass("phone-query");
                $("#numberPanel").hide();

            };

            scope.npShow = function (index) {
                //event.preventDefault();
                $container.addClass("phone-query");
                $("#numberPanel").show();
                _index = index;
                if (index != 'numberPanel') return;
                writebdLog(scope.category, "_CuteNumber", "渠道号", scope.gh);//选择靓号
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };

            scope.checkPhone = function () {
                if (!scope.checkoutForm.phoneNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    return false;
                }
                return true;
            };

            scope.setNumberItem = function (event, numberItem) {
                event.preventDefault();
                scope.phoneNumber = numberItem.n;

                var $this = $(event.currentTarget);

                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');

                writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
            };

            scope.getNumber = function () {

                if (scope.checkPhone()) {
                    scope.npHide();
                    var $scrollTo = $('#phoneQuery');
                    var $container = $(".content-scrollable");
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });

                    writebdLog(scope.category, "_ConfirmNumber", "渠道号", scope.gh);//确认号码
                } else {
                    scope.$root.dialog.open("", "请您选择号码！");
                }
            }
        }

    };
}]).controller('phoneQueryController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();

    $scope.phoneFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.items = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        $.each(eval(data), function (i, k) {
            if (!k.t) {
                $scope.phoneData.push(k);
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.pageSize = 10;
        //$scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数

        //$scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        //$scope.pageList = [];
        //$scope.selPage = 1;

        //设置数据源(分页)
        $scope.setData = function () {
            $scope.items = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
        };

        $scope.items = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        };
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
            writebdLog($scope.category, "_ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("toast", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/toast/toast.html",
        link: function (scope, element, attrs) {
            var $loadingToast = $("#loadingToast");
            scope.$root.toast = {
                open: function () {
                    $loadingToast.show();
                    $timeout(function () {
                        $loadingToast.hide();
                    }, 2000);
                },
                openUnLimit: function () {
                    $loadingToast.show();
                },
                close: function () {
                    $loadingToast.hide();
                }
            };
            scope.$root.toast.close();
        }
    };
}]);
'use strict';

app.directive("couponList", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/coupon/couponList/couponList.html",
        link: function (scope, element, attrs) {

            var dateNow = Date.parse(new Date());

            scope.selectCoupon = function (e, key) {
                if (scope.$root.coupons[key].available) {
                    scope.$root.coupons[key].checked = !scope.$root.coupons[key].checked;
                }
            };

            scope.$watch('receiver.mobile', function (n, o, scope) {
                if (n != undefined && n != '') {
                    $http.jsonp(cfApi.apiHost + '/product/getCouponList.html?recieverMobile=' + n + '&activity=' + scope.activity + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                        scope.$root.coupons = {};
                        
                        $timeout(function () {
                            var couponType, couponNo, couponName, couponTips, available, checked;
                            if (data.length == 0) {
                                scope.$root.hasCoupon = false;
                                for (var i = 0; i < scope.$root.coupons.length; i++) {
                                    scope.$root.coupons[i].checked = false;
                                }
                            } else {
                                scope.$root.hasCoupon = true;
                            }
                            $.each(data, function (i, k) {//为优惠券赋值
                                if (data[i].couponBatchName == 'JM') {
                                    couponType = 'exemptionCertificate';
                                    couponNo = k.couponNo;
                                    couponName = '￥800满减券';
                                    couponTips = '每满￥100送￥5';
                                    available = true;
                                    checked = true;
                                    if (scope.phone.activityproductId == 366 || scope.phone.activityproductId == 367 || scope.phone.activityproductId == 368 || scope.phone.activityproductId == 369) {
                                        available = false;
                                        checked = false;
                                    }

                                    scope.$root.coupons.jm = {
                                        couponType: couponType,
                                        couponNo: couponNo,
                                        couponName: couponName,
                                        couponTips: couponTips,
                                        available: available,
                                        checked: checked
                                    };
                                }

                                if (data[i].couponBatchName == 'MX') {
                                    couponType = 'interestCoupons';
                                    couponNo = k.couponNo;
                                    couponName = '12期免息券';
                                    couponTips = '19家银行信用卡免息';
                                    available = true;
                                    checked = true;
                                    if (scope.phone.activityproductId == 366 || scope.phone.activityproductId == 367 || scope.phone.activityproductId == 368 || scope.phone.activityproductId == 369) {
                                        available = false;
                                        checked = false;
                                    }

                                    scope.$root.coupons.mx = {
                                        couponType: couponType,
                                        couponNo: couponNo,
                                        couponName: couponName,
                                        couponTips: couponTips,
                                        available: available,
                                        checked: checked
                                    };
                                }

                                if (data[i].couponBatchName == 'HF') {
                                    couponType = 'billVoucher';
                                    couponNo = k.couponNo;
                                    couponName = '￥720话费券';
                                    couponTips = '每月返还￥20话费';
                                    available = true;
                                    checked = true;
                                    if (scope.phone.activityproductId == 366 || scope.phone.activityproductId == 367 || scope.phone.activityproductId == 368 || scope.phone.activityproductId == 369) {
                                        available = false;
                                        checked = false;
                                    }

                                    scope.$root.coupons.hf = {
                                        couponType: couponType,
                                        couponNo: couponNo,
                                        couponName: couponName,
                                        couponTips: couponTips,
                                        available: available,
                                        checked: checked
                                    };
                                }
                            });
                        });

                    }).error(function (data, status, headers, config) {
                        console.log(status);
                        //deferred.reject(status)
                    });
                }
            });

            scope.$watch('gettedCoupon', function (n, o, scope) {
                if (n != undefined && n != '') {
                    $http.jsonp(cfApi.apiHost + '/product/getCouponList.html?recieverMobile=' + scope.receiver.mobile + '&activity=' + scope.activity + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {

                        scope.$root.coupons = {};
                        var couponType, couponNo, couponName, couponTips, available, checked;
                        if (data.length == 0) {
                            scope.$root.hasCoupon = false;
                            for (var i = 0; i < scope.$root.coupons.length; i++) {
                                scope.$root.coupons[i].checked = false;
                            }
                        } else {
                            scope.$root.hasCoupon = true;
                        }
                        $.each(data, function (i, k) {//为优惠券赋值
                            if (data[i].couponBatchName == 'JM') {
                                couponType = 'exemptionCertificate';
                                couponNo = k.couponNo;
                                couponName = '￥800满减券';
                                couponTips = '每满￥100送￥10';
                                available = true;
                                checked = true;

                                scope.$root.coupons.jm = {
                                    couponType: couponType,
                                    couponNo: couponNo,
                                    couponName: couponName,
                                    couponTips: couponTips,
                                    available: available,
                                    checked: checked
                                };
                            }

                            if (data[i].couponBatchName == 'MX') {
                                couponType = 'interestCoupons';
                                couponNo = k.couponNo;
                                couponName = '12期免息券';
                                couponTips = '19家银行信用卡免息';
                                available = true;
                                checked = true;

                                scope.$root.coupons.mx = {
                                    couponType: couponType,
                                    couponNo: couponNo,
                                    couponName: couponName,
                                    couponTips: couponTips,
                                    available: available,
                                    checked: checked
                                };
                            }

                            if (data[i].couponBatchName == 'HF') {
                                couponType = 'billVoucher';
                                couponNo = k.couponNo;
                                couponName = '12期免息券';
                                couponTips = '19家银行信用卡免息';
                                available = true;
                                checked = true;

                                scope.$root.coupons.hf = {
                                    couponType: couponType,
                                    couponNo: couponNo,
                                    couponName: couponName,
                                    couponTips: couponTips,
                                    available: available,
                                    checked: checked
                                };
                            }
                        });

                    }).error(function (data, status, headers, config) {
                        console.log(status);
                        //deferred.reject(status)
                    });
                }
            })
        }
    };
}]);
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

'use strict';

app.directive("aPayType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/a/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTitle = attrs.title;
            scope.paySubTitle = attrs.subTitle;
            scope.details = "预付首月月租";
            //设置本模块的显示隐藏
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            var $form = $(attrs.submit);

            //默认赋值
            //scope.payType = 1;

            //设置默认payType;
            scope.setDefaultPayType = function (id, typeName) {
                scope.payType = id;
                scope.payTypeName = typeName;
            };

            //选择支付方式

            scope.setPayType = function (event, id) {
                event.preventDefault();
                scope.payType = id;
                //scope.payTypeName = typeName;
                var $this = $(event.currentTarget);
                //console.log($this.find(".title").html());
                scope.payTypeName = $this.data("title");
                wirtePayType(id);
            };

            var value;
            var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

            function wirtePayType(payType) {
                value = payTypeAry[payType];
                writebdLog(scope.category, "_" + value, "渠道号", scope.gh);//选择支付方式
            }
        }
    };
}]);
'use strict';

app.directive("cPayType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/c/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTitle = attrs.title;
            scope.paySubTitle = attrs.subTitle;
            scope.details = "预付首月月租";
            //设置本模块的显示隐藏
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            var $form = $(attrs.submit);

            //默认赋值
            //scope.payType = 1;

            //设置默认payType;
            scope.setDefaultPayType = function (id, typeName) {
                scope.payType = id;
                scope.payTypeName = typeName;
            };

            if (scope.cardPay) {
                scope.setDefaultPayType(0, "在线支付");
            }
            if (scope.totolPrice < 1500) {
                scope.setDefaultPayType(0, "马上付款");
            }
            if (scope.pageType == "pcd") {
                scope.details = "￥9.9元掏靓号";
            }

            //选择支付方式

            scope.setPayType = function (event, id) {
                event.preventDefault();
                scope.payType = id;
                //scope.payTypeName = typeName;
                var $this = $(event.currentTarget);
                //console.log($this.find(".title").html());
                scope.payTypeName = $this.data("title");
                wirtePayType(id);
            };

            var value;
            var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

            function wirtePayType(payType) {
                value = payTypeAry[payType];
                writebdLog(scope.category, "_" + value, "渠道号", scope.gh);//选择支付方式
            }
        }
    };
}]);
'use strict';

app.directive("nPayType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/n/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTitle = attrs.title;
            scope.paySubTitle = attrs.subTitle;
            scope.details = "预付首月月租";
            //设置本模块的显示隐藏
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            var $form = $(attrs.submit);

            //默认赋值
            //scope.payType = 1;

            //设置默认payType;
            scope.setDefaultPayType = function (id, typeName) {
                scope.payType = id;
                scope.payTypeName = typeName;
            };

            scope.setDefaultPayType(2, "信用卡分期");
            if (scope.cardPay) {
                scope.setDefaultPayType(0, "在线支付");
            }
            if (scope.totolPrice < 1500) {
                scope.setDefaultPayType(0, "一次性支付");
            }
            if (scope.pageType == "pcd") {
                scope.details = "￥9.9元掏靓号";
            }

            //选择支付方式

            scope.setPayType = function (event, id) {
                event.preventDefault();
                scope.payType = id;
                //scope.payTypeName = typeName;
                var $this = $(event.currentTarget);
                //console.log($this.find(".title").html());
                scope.payTypeName = $this.find(".title").html();
                wirtePayType(id);
            };

            var value;
            var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

            function wirtePayType(payType) {
                value = payTypeAry[payType];
                writebdLog(scope.category, "_" + value, "渠道号", scope.gh);//选择支付方式
            }
        }
    };
}]);
'use strict';

app.directive("mainColors", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/mainColors/colors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.mainColorTitle = attrs.title;
            scope.mainColorSubTitle = attrs.subTitle;

            scope.$root.mainColor = scope.phone.phoneTypes[0].mediaProductList[getIndex(scope.phone.phoneTypes[0].mediaProductList, 'selected', 1)];


            //选择手机颜色
            scope.setMainPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    //scope.mainColor = color;
                    scope.$root.mainColor = color;
                    writebdLog(scope.category, "_mainFuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };
        }
    };
}]);
'use strict';

app.directive("mainColorsLj", ['$http', '$q', '$timeout', '$location', function ($http, $q, $timeout, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/mainColorsLj/colors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.mainColorTitle = attrs.title;
            scope.mainColorSubTitle = attrs.subTitle;

            if ($location.search().colorTag == 'red') {

                scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'name', '红色');

                if (scope.mainColorIndex == undefined || scope.phone.phoneTypes[0].mediaProductList[scope.mainColorIndex].stock == 0) {//如果没有红色，或者红色无货
                    scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'selected', 1);
                }


            } else {
                scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'selected', 1);
            }

            scope.$root.mainColor = scope.phone.phoneTypes[0].mediaProductList[scope.mainColorIndex];


            //选择手机颜色
            scope.setMainPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    //scope.mainColor = color;
                    scope.$root.mainColor = color;
                    writebdLog(scope.category, "_mainFuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };
        }
    };
}]);
'use strict';

app.directive("subColors", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/subColors/colors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.subColorTitle = attrs.title;
            scope.subColorSubTitle = attrs.subTitle;

            scope.subColor = scope.phone.phoneTypes[1].mediaProductList[0];

            //选择手机颜色
            scope.setSubPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.subColor = color;
                    writebdLog(scope.category, "_subFuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };
        }
    };
}]);
'use strict';

app.directive("phoneBPackage", ['$http', '$stateParams', '$q', '$cookieStore', '$location', function ($http, $stateParams, $q, $cookieStore, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/b/b.html",
        controller: "numberBController",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class = attrs.addClass;
            scope.visibility = attrs.visibility;

            var $container = $('.content-scrollable');

            scope.queryNumber = true;

            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            scope.reChoose = function () {
                scope.queryNumber = true;
            };


            //选择号码 对象类型
            scope.setPhonePackage = function (event, pkg) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                /*if ($this.hasClass("curr")) {
                 return false;
                 }*/
                scope.package = pkg;
                $(".pick-panel").hide();
                scope.pickPanelShow = true;
                $this.siblings(".pick-number").find(".pick-panel").show();
                scope.queryNumber = true;

                writebdLog(scope.category, "_SelectPackage", "渠道号", scope.gh);//选择套餐
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };


            var $container = $('.content-scrollable');

            scope.$root.checkMainNumber = function () {
                if (!scope.couponForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#phonePackage');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.$root.checkMainProductId = function () {
                if (!scope.couponForm.mainProductId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickPackagePanel');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMainNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(numberItem.n, scope.subNumber)) {
                    scope.mainNumber = numberItem.n;
                    scope.queryNumber = false;
                    writebdLog(scope.category, "_mainSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }

            };

            scope.showMNumberPn = function (event) {
                if (!(attrs.noAnimate == "true")) {
                    $("#pickMainNumberPanel").slideToggle();
                    $(event.currentTarget).toggleClass("down");
                }
                writebdLog(scope.category, "_mainCuteNumber", "渠道号", scope.gh);//选择主卡靓号
            };

            scope.ok = function () {
                if (!scope.$root.checkMainProductId()) {
                    scope.$root.dialog.open('系统提示', '请选择套餐');
                }
                if (!scope.$root.checkMainNumber()) {
                    scope.$root.dialog.open('系统提示', '请选择手机号码');
                }

                $cookieStore.put('pkgAndNumber', {
                    pkg: scope.pkg,
                    number: scope.mainNumber
                });

                $location.path('/phs/sg/C/' + $stateParams.phoneId);
            }

        }
    };
}]).controller('numberBController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $scope.phoneSubData = new Array();

    $scope.phoneMainFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.phoneSubFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneSubData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterSubData = _data;
        } else {
            $scope.filterSubData = $scope.phoneSubData;
        }
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query, type) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_' + type + 'InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码

        data = data.sort(function (a, b) {
            return b.s - a.s;
        });

        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                $scope.phoneData.push(k);
                if (k.t == 0) {
                    $scope.phoneSubData.push(k);
                }
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.filterSubData = $scope.phoneSubData;
        $scope.pageSize = 6;

        //设置数据源(分页)
        $scope.setData = function (type) {
            if (type == "main") {
                $scope.mainItems = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
            else {
                $scope.subItems = $scope.filterSubData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
        };

        //初始化数据
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page, type) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData(type);
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function (type) {
            $scope.selectPage($scope.selPage - 1, type);
        };
        //下一页
        $scope.Next = function (type) {
            $scope.selectPage($scope.selPage + 1, type);
            writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("phoneCPackage", ['$http', '$stateParams', '$q', '$cookieStore', '$location', function ($http, $stateParams, $q, $cookieStore, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/c/c.html",
        controller: "numberCController",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class = attrs.addClass;
            scope.visibility = attrs.visibility;

            var $container = $('.content-scrollable');

            scope.queryNumber = true;

            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            scope.reChoose = function () {
                scope.queryNumber = true;
            };


            //选择号码 对象类型
            scope.setPhonePackage = function (event, pkg) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                /*if ($this.hasClass("curr")) {
                 return false;
                 }*/
                scope.package = pkg;
                $(".pick-panel").hide();
                scope.pickPanelShow = true;
                $this.siblings(".pick-number").find(".pick-panel").show();
                scope.queryNumber = true;

                writebdLog(scope.category, "_SelectPackage", "渠道号", scope.gh);//选择套餐
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };


            var $container = $('.content-scrollable');

            scope.$root.checkMainNumber = function () {
                if (!scope.checkoutForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#phonePackage');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.$root.checkMainProductId = function () {
                if (!scope.checkoutForm.mainProductId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickPackagePanel');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMainNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(numberItem.n, scope.subNumber)) {
                    scope.mainNumber = numberItem.n;
                    scope.queryNumber = false;
                    writebdLog(scope.category, "_mainSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }

            };

            scope.showMNumberPn = function (event) {
                if (!(attrs.noAnimate == "true")) {
                    $("#pickMainNumberPanel").slideToggle();
                    $(event.currentTarget).toggleClass("down");
                }
                writebdLog(scope.category, "_mainCuteNumber", "渠道号", scope.gh);//选择主卡靓号
            };

            scope.ok = function () {
                if (!scope.$root.checkMainProductId()) {
                    scope.$root.dialog.open('系统提示', '请选择套餐');
                }
                if (!scope.$root.checkMainNumber()) {
                    scope.$root.dialog.open('系统提示', '请选择手机号码');
                }

                $cookieStore.put('pkgAndNumber', {
                    pkg: scope.pkg,
                    number: scope.mainNumber
                });

                $location.path('/phs/sg/C/' + $stateParams.phoneId);
            }

        }
    };
}]).controller('numberCController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $scope.phoneSubData = new Array();

    $scope.phoneMainFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.phoneSubFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneSubData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterSubData = _data;
        } else {
            $scope.filterSubData = $scope.phoneSubData;
        }
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query, type) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_' + type + 'InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码

        data = data.sort(function (a, b) {
            return b.s - a.s;
        });

        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                $scope.phoneData.push(k);
                if (k.t == 0) {
                    $scope.phoneSubData.push(k);
                }
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.filterSubData = $scope.phoneSubData;
        $scope.pageSize = 6;

        //设置数据源(分页)
        $scope.setData = function (type) {
            if (type == "main") {
                $scope.mainItems = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
            else {
                $scope.subItems = $scope.filterSubData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
        };

        //初始化数据
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page, type) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData(type);
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function (type) {
            $scope.selectPage($scope.selPage - 1, type);
        };
        //下一页
        $scope.Next = function (type) {
            $scope.selectPage($scope.selPage + 1, type);
            writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("phoneDPackage", ['$http', '$stateParams', '$q', '$cookieStore', '$location', function ($http, $stateParams, $q, $cookieStore, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/d/d.html",
        controller: "numberDController",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class = attrs.addClass;
            scope.visibility = attrs.visibility;

            var $container = $('.content-scrollable');

            scope.queryNumber = true;

            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            scope.reChoose = function () {
                scope.queryNumber = true;
            };


            //选择号码 对象类型
            scope.setPhonePackage = function (event, pkg) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                /*if ($this.hasClass("curr")) {
                 return false;
                 }*/
                scope.package = pkg;
                $(".pick-panel").hide();
                scope.pickPanelShow = true;
                $this.siblings(".pick-number").find(".pick-panel").show();
                scope.queryNumber = true;

                writebdLog(scope.category, "_SelectPackage", "渠道号", scope.gh);//选择套餐
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };


            var $container = $('.content-scrollable');

            scope.$root.checkMainNumber = function () {
                if (!scope.checkoutForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#phonePackage');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.$root.checkMainProductId = function () {
                if (!scope.checkoutForm.mainProductId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickPackagePanel');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMainNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(numberItem.n, scope.subNumber)) {
                    scope.mainNumber = numberItem.n;
                    scope.queryNumber = false;
                    writebdLog(scope.category, "_mainSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }

            };

            scope.showMNumberPn = function (event) {
                if (!(attrs.noAnimate == "true")) {
                    $("#pickMainNumberPanel").slideToggle();
                    $(event.currentTarget).toggleClass("down");
                }
                writebdLog(scope.category, "_mainCuteNumber", "渠道号", scope.gh);//选择主卡靓号
            };

            scope.ok = function () {
                if (!scope.$root.checkMainProductId()) {
                    scope.$root.dialog.open('系统提示', '请选择套餐');
                }
                if (!scope.$root.checkMainNumber()) {
                    scope.$root.dialog.open('系统提示', '请选择手机号码');
                }

                $cookieStore.put('pkgAndNumber', {
                    pkg: scope.pkg,
                    number: scope.mainNumber
                });

                $location.path('/phs/sg/C/' + $stateParams.phoneId);
            }

        }
    };
}]).controller('numberDController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $scope.phoneSubData = new Array();

    $scope.phoneMainFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.phoneSubFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneSubData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterSubData = _data;
        } else {
            $scope.filterSubData = $scope.phoneSubData;
        }
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query, type) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_' + type + 'InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码

        data = data.sort(function (a, b) {
            return b.s - a.s;
        });

        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                $scope.phoneData.push(k);
                if (k.t == 0) {
                    $scope.phoneSubData.push(k);
                }
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.filterSubData = $scope.phoneSubData;
        $scope.pageSize = 6;

        //设置数据源(分页)
        $scope.setData = function (type) {
            if (type == "main") {
                $scope.mainItems = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
            else {
                $scope.subItems = $scope.filterSubData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
        };

        //初始化数据
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page, type) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData(type);
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function (type) {
            $scope.selectPage($scope.selPage - 1, type);
        };
        //下一页
        $scope.Next = function (type) {
            $scope.selectPage($scope.selPage + 1, type);
            writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("phoneNPackage", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/n/n.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class=attrs.addClass;
            scope.visibility = attrs.visibility;
            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //console.log(scope.phone.activityproductId);

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

        }
    };
}]);
'use strict';

app.directive("gds", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/gds/gds.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber,e) {
                if($(e.currentTarget).hasClass("not")){
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                getArea('', 1, '广东省', '', "");
                stockShow();
                dataAreaShow(1);
                tabShow(1);
            });

            //址选择器顶栏点击事件
            // $objTabItem.click(function (e) {
            //     var index = $(this).index();
            //     var textValue = "";
            //     if (index === 0) {
            //         stockHide();
            //     } else {
            //         tabShow(index - 1);
            //         dataAreaShow(index - 1);
            //     }
            //     return false;
            // });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, '广东省', value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html('广东省' + value2 + value3);
                    scope.receiver.city = '广东省' + value2 + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.$root.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
            scope.showReceiverPn = function (e) {
                writeAddressBar();
                if (!(attrs.noAnimate == "true")) {
                    $("#receiverAddressPanel").slideToggle();
                    $(".adr-tab").toggleClass("down");
                }
            };

            function writeAddressBar() {
                if ($("#receiverAddressPanel").is(":hidden"))
                    writebdLog(scope.category, "_ShowAddressBar", "渠道号", scope.gh); //展开地址栏
                else
                    writebdLog(scope.category, "_StopAddressBar", "渠道号", scope.gh); //收起地址栏
            }

            scope.adrOk = function () {
                scope.showReceiverPn();
            }
        }
    };
}]);
'use strict';

app.directive("gzs", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/gzs/gzs.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber,e) {
                if($(e.currentTarget).hasClass("not")){
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                getArea('广州市', 2, '广东省', '广州市', "");
                stockShow();
                dataAreaShow(2);
                tabShow(2);
            });

            //址选择器顶栏点击事件
            // $objTabItem.click(function (e) {
            //     var index = $(this).index();
            //     var textValue = "";
            //     if (index === 0) {
            //         stockHide();
            //     } else {
            //         tabShow(index - 1);
            //         dataAreaShow(index - 1);
            //     }
            //     return false;
            // });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, value1, value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html('广东省' + '广州市' + value3);
                    scope.receiver.city = '广东省' + '广州市' + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.$root.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
            scope.showReceiverPn = function (e) {
                writeAddressBar();
                if (!(attrs.noAnimate == "true")) {
                    $("#receiverAddressPanel").slideToggle();
                    $(".adr-tab").toggleClass("down");
                }
            };

            function writeAddressBar() {
                if ($("#receiverAddressPanel").is(":hidden"))
                    writebdLog(scope.category, "_ShowAddressBar", "渠道号", scope.gh); //展开地址栏
                else
                    writebdLog(scope.category, "_StopAddressBar", "渠道号", scope.gh); //收起地址栏
            }

            scope.adrOk = function () {
                scope.showReceiverPn();
            }
        }
    };
}]);
'use strict';

app.directive("nadr", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/nadr/gzs.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber,e) {
                if($(e.currentTarget).hasClass("not")){
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                getArea('', 1, '广东省', '', "");
                stockShow();
                dataAreaShow(1);
                tabShow(1);
            });

            //址选择器顶栏点击事件
            $objTabItem.click(function (e) {
                var index = $(this).index();
                var textValue = "";
                if (index === 1) {
                    stockHide();
                } else {
                    tabShow(index - 1);
                    dataAreaShow(index - 1);
                }
                return false;
            });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, '广东省', value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html('广东省' + value2 + value3);
                    scope.receiver.city = '广东省' + value2 + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.$root.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
            scope.showReceiverPn = function (e) {
                writeAddressBar();
                if (!(attrs.noAnimate == "true")) {
                    $("#receiverAddressPanel").slideToggle();
                    $(".adr-tab").toggleClass("down");
                }
            };

            function writeAddressBar() {
                if ($("#receiverAddressPanel").is(":hidden"))
                    writebdLog(scope.category, "_ShowAddressBar", "渠道号", scope.gh); //展开地址栏
                else
                    writebdLog(scope.category, "_StopAddressBar", "渠道号", scope.gh); //收起地址栏
            }

            scope.adrOk = function () {
                scope.showReceiverPn();
            }
        }
    };
}]);
'use strict';

app.directive("adr", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/n/adr.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber,e) {
                if($(e.currentTarget).hasClass("not")){
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + "has-hash='false' href='javascript:userTrack(" + field.name + ");'>" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + "has-hash='false' href='javascript:userTrack(" + field.name + ");'>" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                getArea(0, 0, "", "", "");
                stockShow();
                dataAreaShow(0);
                tabShow(0);
            });

            //址选择器顶栏点击事件
            $objTabItem.click(function (e) {
                var index = $(this).index();
                var textValue = "";
                if (index === 0) {
                    stockHide();
                } else {
                    tabShow(index - 1);
                    dataAreaShow(index - 1);
                }
                return false;
            });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, value1, value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3);
                    scope.receiver.city = value1 + value2 + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.$root.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
            scope.showReceiverPn = function (e) {
                writeAddressBar();
                if (!(attrs.noAnimate == "true")) {
                    $("#receiverAddressPanel").slideToggle();
                    $(".adr-tab").toggleClass("down");
                }
            };

            function writeAddressBar() {
                if ($("#receiverAddressPanel").is(":hidden"))
                    writebdLog(scope.category, "_ShowAddressBar", "渠道号", scope.gh); //展开地址栏
                else
                    writebdLog(scope.category, "_StopAddressBar", "渠道号", scope.gh); //收起地址栏
            }

            scope.adrOk = function () {
                scope.showReceiverPn();
            }
        }
    };
}]);
'use strict';

app.directive("receiverOAddress", ["$compile", "$cookieStore", '$http', '$interval', function ($compile, $cookieStore, $http, $interval) {
    return {
        restrict: 'E',
        templateUrl: "modules/receiverAddress/other/receiverAddress.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.receiverTitle = attrs.title;

            //拷贝 $address-panel、$address-overlay 到appBody
            $compile($("#address-panel").clone().appendTo(".page"))(scope);
            $compile($(".address-overlay").clone().appendTo(".page"))(scope);
            $(".address #address-panel").remove();
            $(".address .address-overlay").remove();

            var value1, value2, value3, value4;
            var $inputsStoreSelect = $(element).find("#inputsStoreSelect");
            var $storeSelector = $("#container");
            var $storeClose = $storeSelector.find(".close");
            var $objTabItem = $("#cfStock .tab").find("li");
            var $dataAreas = $("#cfStock").find(".mc");
            var $areaList = $dataAreas.find(".area-list");

            //定义送货信息对象


            //判断cookie是否存在
            if ($cookieStore.get("receiver")) {
                scope.receiver = $cookieStore.get("receiver");
            } else {
                scope.receiver = {
                    name: "",
                    mobile: "",
                    city: "",
                    room: ""
                };
            }

            if ($cookieStore.get("activeCode")) {
                scope.activeCode = $cookieStore.get("activeCode");
            } else {
                scope.activeCode = "";
            }

            //隐藏地址选择器
            var stockHide = function () {
                $storeSelector.removeClass("hover");
                $storeClose.hide();
            };

            //显示地址选择器
            var stockShow = function () {
                $storeSelector.addClass("hover");
                $storeClose.show();
            };

            //地址选择器顶栏状态
            var tabShow = function (index) {
                $objTabItem.removeClass("curr");
                $objTabItem.eq(index).addClass("curr");
            };

            //显示可选地址区域
            var dataAreaShow = function (index) {
                $dataAreas.hide();
                $dataAreas.eq(index).show();
            };

            //获取下单页输入验证码
            scope.inputHomeCode = function () {
                writebdLog(scope.category, "_InputHomeCode", "渠道号", scope.gh);
            };

            //只有输入详细收货地址才记录到闭环
            scope.inputAddress = function (room) {
                if (room == undefined || room == "" || room.length <= 3) return;
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
            };
            
            //只有输入信息才记录到闭环
            scope.inputFeedBack = function (feeback) {
            	if (feeback == undefined || feeback == "" || feeback.length <= 3) return;
            	writebdLog(scope.category, "_FeedBack", "渠道号", scope.gh);//卖家留言
            };

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber,e) {
                if($(e.currentTarget).hasClass("not")){
                    return false;
                }
                scope.toast.open();
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
                    scope.toast.close();
                    if (data == "") {
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.paracont = "重发验证码";
                                scope.paraclass = "but_null";
                            } else {
                                scope.paracont = second + "秒后可重发";
                                scope.paraclass = "not but_null";
                                second--;

                            }
                        }, 1000, 100);
                    }
                });

                writebdLog(scope.category, "_VariHomeCode", "渠道号", scope.gh); //获取下单页验证码
            };

            scope.$root.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.receiver.mobile, scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    $cookieStore.put("activeCode", scope.activeCode);
                    return true;
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
                }
                $areaList.eq(index).html("");
                $.ajax({
                    dataType: "jsonp",
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    jsonp: "callback",
                    jsonpCallback: "getAreaList",
                    success: function (json) {
                        $.each(eval(json), function (i, field) {
                            if ((field.name).length > 6) {
                                $areaList.eq(index).append("<li data-value=" + field.name + " class='long-area'><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            } else {
                                $areaList.eq(index).append("<li data-value=" + field.name + "><a data-value=" + field.name + ">" + field.name + "</a></li>");
                            }
                        });
                    },
                    error: function (e) {
                        alert("获取地址信息失败，请联系客服");
                    }
                });
            };

            //收件区域点击事件
            $inputsStoreSelect.click(function () {
                getArea(0, 0, "", "", "");
                stockShow();
                dataAreaShow(0);
                tabShow(0);
            });

            //址选择器顶栏点击事件
            $objTabItem.click(function (e) {
                var index = $(this).index();
                var textValue = "";
                if (index === 0) {
                    stockHide();
                } else {
                    tabShow(index - 1);
                    dataAreaShow(index - 1);
                }
                return false;
            });

            //地址选定事件
            $areaList.on("click", "li", function (e) {
                var dataVal, dataAreaValue;
                var $this = $(this);
                dataAreaValue = $this.parentsUntil("#cfStock", ".mc").data("area");
                dataVal = $this.find("a").data("value");
                if (dataAreaValue === 0) {
                    dataAreaShow(1);
                    tabShow(1);
                    value1 = $this.data("value");
                    getArea(dataVal, 1, value1, "", "");
                } else if (dataAreaValue === 1) {
                    dataAreaShow(2);
                    tabShow(2);
                    value2 = $this.data("value");
                    getArea(dataVal, 2, value1, value2, "");
                } else if (dataAreaValue === 2) {
                    //dataAreaShow(3);
                    //tabShow(3);
                    value3 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3);
                    scope.receiver.city = value1 + value2 + value3;
                    //getArea(dataVal, 3, value1, value2, value3);
                } else if (dataAreaValue === 3) {
                    value4 = $this.data("value");
                    stockHide();
                    $("#store-text").find("div").html(value1 + value2 + value3 + value4);
                    scope.receiver.city = value1 + value2 + value3 + value4;
                }
                scope.$apply();
                return false;
            });

            scope.checkAddress = function () {
                $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
                if (!scope.checkoutForm.reciverName.$valid) {
                    //alert("请输入收件人");
                    $(".input-name").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverMobile.$valid) {
                    //alert("请输入联系电话");
                    $(".input-mobile").addClass("weui-cell_warn");
                    return false;
                } else if (!scope.checkoutForm.receiverCity.$valid) {
                    $(".input-city").addClass("weui-cell_warn");
                    //alert("请选择收件区域");
                    return false;
                } else if (!scope.checkoutForm.receiverRoom.$valid) {
                    $(".input-room").addClass("weui-cell_warn");
                    //alert("请输入详细地址");
                    return false;
                }

                $cookieStore.put("receiver", scope.receiver);

                return true;
            };
        }
    };
}]);
'use strict';

app.directive("flowCards", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/recharge/flowCards/flowCards.html",
        link: function (scope, element, attrs) {
            var $flowCards = $(".flow-cards");
            scope.getFlowCard = function (event, card) {
                //event.preventDefault();
                scope.flowCard = card;
                $flowCards.slideUp();
            };
            scope.$watch("receiverMobile", function (nv, ov, scope) {
                if (nv != ov) {
                    var url = baseApiUri + "/getUserFlowCards/" + nv;
                    $http.get(url).success(function (data) {
                        scope.flowCards = data;
                    });
                }
            });
        }
    };
}]);
'use strict';

app.directive("flowUsing", [function () {
    return {
        restrict: 'E',
        templateUrl: "modules/recharge/flowUsing/flowUsing.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
'use strict';

app.directive("rechargeCards", ["$http",function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/recharge/rechargeCards/rechargeCards.html",
        link: function (scope, element, attrs) {
            scope.recharge = function (e,id) {
                e.stopPropagation();

                if ($(e.currentTarget).hasClass("active")) {
                    $('#loadingToast').show();
                    window.location.href= "http://m.gd189fq.com/yfqcz/czOrdRechargeController.do?gotoPay&pid=" + id + "&iccid=" + scope.flowCard.iccid;
                    setTimeout(function () {
                        $('#loadingToast').hide();
                    }, 2000);
                } else {
                    return false;
                }
            };
            $http.get(baseApiUri + "/getFlowRechargeCard").success(function (data) {
                scope.rechargeCards = data;
            });
        }
    };
}]);
/*
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flow', { //关于我们
            url: "/flow",
            templateUrl: "pages/flow/index/index.html",
            controller: "flowController"
        });
}]).controller('flowController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

}]);*/

"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flowRecharge', { //关于我们
            url: "/flow/recharge",
            templateUrl: "pages/flowCard/recharge/recharge.html",
            controller: "flowRechargeController"
        });
}]).controller('flowRechargeController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

}]);

"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('otherAProduct', { //app首页
            url: "/others/A",
            templateUrl: "pages/others/A/a.html",
            controller: "otherAProductController"
        })
}]).controller('otherAProductController', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "csrtc";
    $scope.pageType = 'A';
    $scope.category = systemName + "_csrtc_" + $scope.pageType;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);


    $scope.products = [
        {
            id: 424,
            name: '健维宝1罐 + 神酒1瓶 + 干果1盒 送鲜果蜜1盒',
            price: 398,
            select: true
        },
        {
            id: 425,
            name: '春砂仁干果2盒 送鲜果蜜1盒',
            price: 298,
            select: false
        },
        {
            id: 426,
            name: '春砂仁健维宝2罐',
            price: 298,
            select: false
        },
        {
            id: 427,
            name: '春之神酒2瓶',
            price: 298,
            select: false
        },
        {
            id: 428,
            name: '春砂仁鲜果蜜2盒',
            price: 198,
            select: false
        }
    ];

    $scope.$root.share = {
        homeLink: 'http://' + window.location.host + '/others/A' + window.location.search,
        shareTitle: '春砂仁，您的养胃专家，广东阳春源产地生产，良心品质！',
        shareDisc: '养胃首选春砂仁，多种吃法，老少咸宜，套餐限时特价398元，再送鲜果密一盒！货到付款，先到先得！',
        picUrl: 'http://' + window.location.host + '/images/others/A/nativeShare.jpg'
    };

    $scope.mainProduct = $scope.products[0];

    $scope.selectProduct = function (product) {
        $scope.mainProduct = product;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);
    };


    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomReceiverPhone() + " 购买了春砂仁鲜果蜜2盒 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.checkBuyHistory = function () {

    };

    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");

        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }

        $scope.$root.toast.open();
        $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.mainProduct.id + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

            if (data.result) {
                $form.submit();
                $scope.$root.toast.close();
                writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
            } else {
                $scope.$root.toast.close();
                $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
            }
        });
    };

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if(n){
                var $form = $("#checkoutForm");
                $form.submit();
            }
        }
    });

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneIndex', { //app首页
            url: "/phone/:pageType/index",
            templateUrl: function ($stateParams) {
                return 'pages/phone/index/' + $stateParams.pageType + '/index.html';
            },
            controller: "pIndexController"
        });
}]).controller('pIndexController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', function ($scope, $location, $http, $stateParams, $interval, $timeout) {

    //$location.path("/phone/active/D/phones");

    $scope.pageType = $stateParams.pageType;
    if($scope.pageType !=undefined && $scope.pageType == "C")
    	$scope.appType = systemName + "_sdhd_" + $scope.pageType + "_index";
    else
    	$scope.appType = systemName + "_mysy_" + $scope.pageType + "_index";
    $scope.category = $scope.appType;
    //console.log($scope.category);

    $scope.params = window.location.search;

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=bdtc&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.pkgs = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=lj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=mysy&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {

        $scope.doublePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.st = function (target) {//单双机切换回滚
        var $container = $('.content-scrollable');
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.btNavItem = function (event, index, target) {
        var $this = $(event.currentTarget);
        if (index == 0 || index == 1) {
            $this.siblings().removeClass("curr");
            $this.addClass("curr");
            $(".tab-item").eq(index).trigger("click");
            $scope.st(target);
        } else if (index == 2) {
            $this.siblings().removeClass("curr");
            $this.addClass("curr");
            $scope.st(target);
        }
        else if (index == 3) {
            getMeiqia();
            _MEIQIA('showPanel');
        }
        writeBtNavItem(index);
    };

    var btNavItemName = ['_MYSYBt', '_BKDJBt', '_CZTCBt', '_CustConsult'];

    function writeBtNavItem(index) {
        writebdLog($scope.category, btNavItemName[index], "渠道号", $scope.gh);//选择模块
    }

    $interval(function () {
        $scope.selkillTxt = getRandomName() + "，刚刚购买了 " + getRandomProduct();
    }, 2000);

    //记录用户购买的商品：专区模块英文名称+商品id
    $scope.writeSelectFoods = function (obj, productId, modular) {
        writebdLog($scope.category, "_" + productId + modular, "渠道号", $scope.gh);//选择的商品ID
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $("img.lazy").lazyload({
            effect: "fadeIn",
            skip_invisible: false,
            container: $(".content-scrollable")
        });
    });

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.openCardPkg = function (targetId) {
        var targetHtml = $("#" + targetId).html();
        $scope.$root.Overlay.open(targetHtml);
    };

    $scope.gotoOrderContent = function () {
        var $container = $('.content-scrollable');
        var $scrollTo = $('.order-content');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
        });
        
        writebdLog($scope.category, "_ClickReceive", "渠道号", $scope.gh);//点击领取
    };

    $scope.submitFormCommon = function () {
        //console.log($scope.checkAddress());
        $scope.toast.open();
        //console.log($scope.checkAddress());
        if (!$scope.checkMachineName()) {
            $scope.toast.close();
            return false;
        }

        if (!$scope.checkAddress()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkActiveCode()) {
            $scope.toast.close();
            return false;
        }

        if(!$scope.gh){
            $scope.gh = "";
        }

        if(!$scope.activity){
            $scope.activity ="sdhd";
        }

        //console.log($scope.gh,$scope.activity);

        $scope.submitUrl = cfApi.apiHost + "/wap/taokafanghaoNew/submitOrderCommon.html?activeTag=sdhd&brand=" + encodeURI(encodeURI($scope.machineName)) + "&gh=" + $scope.gh + "&activity=" + $scope.activity + "&reciverName=" + encodeURI(encodeURI($scope.receiver.name)) + "&receiverMobile=" + $scope.receiver.mobile + "&receiverCity=" + encodeURI(encodeURI($scope.receiver.city)) + "&receiverRoom=" + encodeURI(encodeURI($scope.receiver.room)) + "&payType=1&category=" + $scope.category + "&callback=JSON_CALLBACK";

        $http.jsonp($scope.submitUrl).success(function (data, status, headers, config) {
            $scope.toast.close();
            if (data[0].resultCode == "0") {
                $scope.orderNo = data[0].resultMsg;
                var timer = $timeout(
                    function () {
                        var targetHtml = $("#wxQrCode").html();
                        $scope.Overlay.open(targetHtml);
                    },
                    100
                );
            } else {
                $scope.dialog.open("系统提示", data[0].resultMsg);
            }
        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh); //免费领卡
    };

}]);


"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('selectPkg', { //app首页
            url: "/phs/sg/C/:phoneId/selectPkg",
            templateUrl: function ($stateParams) {
                return 'pages/phone/selectPkg/selectPkg.html';
            },
            controller: "selectPkgController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('selectPkgController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = 'C';
    $scope.activeTag = "lj";

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_mysy_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);


    //选择号码 对象类型
    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneCardIndex', { //app首页
            url: "/pcd/:pageType/index",
            templateUrl: function($stateParams) {
                return 'pages/phoneCard/index/' + $stateParams.pageType + '/index.html';
            },
            controller: "phoneCardIndexController"
        });
}]).controller('phoneCardIndexController', ['$scope', '$rootScope', '$location', '$http', '$stateParams', '$timeout', '$interval', function($scope, $rootScope, $location, $http, $stateParams, $timeout, $interval) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    var $container = $('.content-scrollable');

    $scope.pageType = $stateParams.pageType;

    $scope.activeTag = "mysytcb";
    $scope.appType = systemName + "_" + $scope.pageType + "_0ylk";
    $scope.category = $scope.appType;
    $scope.second = 5;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.setPkg = function(event, pkgId) {
        $scope.pkgId = pkgId;
        //var $scrollTo = $('#pickMainPkg');
        var $scrollTo = $('.go-here');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_SelectPackage" + pkgId, "渠道号", $scope.gh);
    };
    
    $scope.userTrack = function(name) {
    	writebdLog($scope.category, name, "渠道号", $scope.gh);
    };

    $scope.checkMainPkg = function() {
        if (!$scope.checkoutForm.productId.$valid) { //原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('#pickMainPkg');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            return false;
        }
        return true;
    };



    $scope.submitForm = function() {
        $scope.toast.open();
        if (!$scope.checkMainPkg()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkSimType()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkMainNumber()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkAddress()) {
            $scope.toast.close();
            return false;
        }
        if (!$scope.checkActiveCode()) {
            $scope.toast.close();
            return false;
        }
        $scope.submitUrl = cfApi.apiHost + "/wap/taokafanghaoNew/submitOrderCommon.html?mainNumber=" + $scope.mainNumber + "&activeTag=" + $scope.activeTag + "&category=" + $scope.category + "&gh=" + $scope.gh + "&activity=" + $scope.activity + "&productId=" + $scope.pkgId + "&reciverName=" + encodeURI(encodeURI($scope.receiver.name)) + "&receiverMobile=" + $scope.receiver.mobile + "&receiverCity=" + encodeURI(encodeURI($scope.receiver.city)) + "&receiverRoom=" + encodeURI(encodeURI($scope.receiver.room)) + "&mainCardTypeId=" + $scope.simItem.id + "&payType=1&category=" + $scope.category + "&callback=JSON_CALLBACK";
        $http.jsonp($scope.submitUrl).success(function(data, status, headers, config) {
            $scope.toast.close();
            if (data[0].resultCode == "0") {
                $scope.orderNo = data[0].resultMsg;
                var timer = $timeout(
                    function() {
                        var targetHtml = $("#wxQrCode").html();
                        $scope.Overlay.open(targetHtml);
                    },
                    100
                );

                $interval(function() {
                    $scope.second--;
                    if ($scope.second <0) {
                        window.location.href = "http://m.yfq.cn/wap/taokafanghaoNew/uploadCardA.html?orderNo=" + $scope.orderNo + "&category=" + $scope.category + "&s=wap";
                        return false;
                    }
                        $("#time-new").html($scope.second);
                }, 1000);
                
            } else {
                $scope.dialog.open("系统提示", data[0].resultMsg);
            }
        }).error(function(data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh); //免费领卡
    };

    $(".fqa-more").click(function() {
        $(".fqa-lists").toggleClass("close");
        $(this).toggleClass("close");
    });


    androidInputBugFix();
}]);

"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider.state('pcdRecharge', { //app首页
        url: "/pcdRecharge/index",
        templateUrl: "pages/phoneCard/recharge/index.html",
        controller: "pdRechargeController"
    });
}]).controller('pdRechargeController', ['$scope', '$rootScope', '$location', '$http', '$timeout', function ($scope, $rootScope, $location, $http, $timeout) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
    //console.log($scope.referrerForm.referrerNo);
    $location.path("/phone/active/D/phones");

    $scope.pageType = "pcdRecharge";
    $scope.appType = systemName + "_recharge_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/pcdRecharge/index' + window.location.search,
        shareTitle: '翼分期商城——话费充值优惠',
        shareDisc: '翼分期商城新用户专享，话费充100送100，充200送150，更多充值优惠等你来！',
        picUrl:'http://app.yfq.cn/images/phoneCard/recharge/share.jpg'
    };

    //统计

    $timeout(function () {
        writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
        //$scope.$root.toast.close();
    });

    $scope.rechargeMobile = function (rechargeMobile) {
        $scope.rechargeStatus = undefined;
        if (!$scope.checkoutForm.iccid.$valid) {
            return false;
        } else {
            $("#iccid").blur();
        }
        $http.jsonp(cfApi.apiHost + '/yfqcz/czOrdRechargeController.do?checkAllowCharge&rechargeMobile=' + rechargeMobile + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.rechargeStatus = data.resultCode;

            writebdLog($scope.category, "_InputIndexNumber", "渠道号", $scope.gh);

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });
    };

    $http.jsonp(cfApi.apiHost + '/yfqcz/czProdProductsController.do?findRechargeProducts&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.rechargeProducts = data;

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.setProduct = function (event, product) {
        var $this = $(event.currentTarget);

        if ($this.hasClass("disabled")) {
            return false;
        }

        $scope.$root.toast.open();

        var name = "";
        if (product.name == "充 100 元送 5 元") name = "Give5Y";
        if (product.name == "充 50 元送 30 元") name = "Give30Y";
        if (product.name == "充 50 元送 50 元") name = "Give50Y";
        if (product.name == "充 100 元送 100 元") name = "Give100Y";
        if (product.name == "充 100 元") name = "Charge100Y";
        if (product.name == "充 200 元送 150 元") name = "Give150Y";
        if (product.name == "充 500 元送 300 元") name = "Give300Y";
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);

        $scope.product = product;
        $timeout(function () {
            $("#checkoutForm").submit();
            //$scope.$root.toast.close();
        });
    };

    $scope.showRechargeTip = function (e) {
        var targetHtml = $("#rechargeTipsPanel").html();
        $scope.$root.Overlay.open(targetHtml);
    };

    $scope.getContact = function (e) {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog(scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    //记录点击事件
    $scope.writeClickEvent = function (event, name) {
        var $this = $(event.currentTarget);
        if ($this.hasClass("disabled")) {
            event.preventDefault();
            return false;
        }
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);//记录点击事件
    };

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('referrerSysLogin', { //app首页
            url: "/referrerSys/login",
            templateUrl: "pages/referrerSys/login/login.html",
            controller: "referrerSysLoginController"
        });
}]).controller('referrerSysLoginController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;
    //console.log($scope.referrerForm.referrerNo);
    $scope.homeUrl = "http://app.yfq.cn/phone/active/B";
    $scope.searchOrder = cfApi.apiHost + "/wap/customer/searchIndexA.html";
    $scope.$root.dialogClass = "referrer-dialog";

    $scope.$root.hasMoreBtn = true;

    $scope.login = function (event, referrerNo) {
        if ($scope.referrerForm.referrerNo.$valid) {
            $http.jsonp(cfApi.apiHost + '/product/getQrCode.html?referrerNo=' + referrerNo + '&gh=jktchd&activity=jktchd&url=' + $scope.homeUrl + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                var html = "<div class='img-box'><img src='" + data[0].upCodePath + "'></div><p><a href='" + $scope.homeUrl + "?gh=jktchd&activity=jktchd&referrerNo=" + referrerNo + "'>进入官网</a></p>";
                $http.jsonp(cfApi.apiHost + '/product/getQrCode.html?referrerNo=' + referrerNo + '&gh=jktchd&activity=jktchd&url=' + $scope.searchOrder + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                    html = html + "<div class='img-box'><img src='" + data[0].upCodePath + "'></div><p><a href='" + $scope.searchOrder + "?gh=jktchd&activity=jktchd&referrerNo=" + referrerNo + "'>查询订单</a></p>";
                    $scope.dialog.open("", html);
                }).error(function (data, status, headers, config) {
                    console.log("error");
                    //deferred.reject(status)
                });
            }).error(function (data, status, headers, config) {
                console.log("error");
                //deferred.reject(status)
            });
        } else {

        }
    }
}]);
'use strict';

app.directive("mainNumber", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/mainNumber/n.html",
        controller: "numberController",
        link: function (scope, element, attrs) {
            scope.phoneTitle=attrs.title;
            var $container = $('.content-scrollable');

            scope.$root.checkMainNumber = function () {
                if (!scope.checkoutForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickMainNumber');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    $("#pickMainNumberPanel").slideDown();
                    return false;
                }
                return true;
            };

            scope.setMainNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(numberItem.n, scope.subNumber)) {
                    scope.mainNumber = numberItem.n;
                    scope.$root._mainNumber = numberItem.n;
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    if(!(attrs.noAnimate == "true")){
                        $("#pickMainNumberPanel").slideToggle();
                        $("#pickMainNumber .weui-cells").toggleClass("down");
                    }
                    writebdLog(scope.category, "_mainSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }
            };

            scope.showMNumberPn = function (event) {
                if(!(attrs.noAnimate == "true")){
                    $("#pickMainNumberPanel").slideToggle();
                    $(event.currentTarget).toggleClass("down");
                }
                writebdLog(scope.category, "_mainCuteNumber", "渠道号", scope.gh);//选择主卡靓号
            };
        }
    };
}]).controller('numberController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $scope.phoneSubData = new Array();

    $scope.phoneMainFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.phoneSubFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneSubData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterSubData = _data;
        } else {
            $scope.filterSubData = $scope.phoneSubData;
        }
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query, type) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_' + type + 'InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码

        data = data.sort(function (a,b) {
            return b.s-a.s;
        });

        $.each(eval(data), function (i, k) {
            if(k.s<=800){
                $scope.phoneData.push(k);
                if(k.t == 0){
                    $scope.phoneSubData.push(k);
                }
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.filterSubData = $scope.phoneSubData;
        $scope.pageSize = 12;

        //设置数据源(分页)
        $scope.setData = function (type) {
            if (type == "main") {
                $scope.mainItems = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
            else {
                $scope.subItems = $scope.filterSubData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
        };

        //初始化数据
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page, type) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData(type);
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function (type) {
            $scope.selectPage($scope.selPage - 1, type);
        };
        //下一页
        $scope.Next = function (type) {
            $scope.selectPage($scope.selPage + 1, type);
            writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("subNumber", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/subNumber/n.html",
        controller: "numberController",
        link: function (scope, element, attrs) {

            var $container = $('.content-scrollable');

            scope.checkSubNumber = function () {
                //alert("sub");
                if (!scope.checkoutForm.subNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickSubNumber');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    $("#pickSubNumberPanel").slideDown();
                    return false;
                }
                return true;
            };

            scope.setSubNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(scope.mainNumber,numberItem.n)) {
                    scope.subNumber = numberItem.n;
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    $("#pickSubNumberPanel").slideToggle();
                    $("#pickSubNumber .weui-cells").toggleClass("down");
                    writebdLog(scope.category, "_subSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }
            };

            scope.showSNumberPn = function (event) {
                $("#pickSubNumberPanel").slideToggle();
                $(event.currentTarget).toggleClass("down");
                writebdLog(scope.category, "_subCuteNumber", "渠道号", scope.gh);//选择副卡靓号
            };
        }
    };
}]);
'use strict';

app.directive("appNumber", ["$cookieStore", '$timeout', function ($cookieStore, $timeout) {
    return {
        restrict: 'E',
        scope: {
            inputData: '=',
            outputData: '=',
            selectedData: '=',
            autoSelect: '='
        },
        templateUrl: "modules/common/phoneQuery/number/number.html",
        link: function (scope, element, attrs) {

            scope.pageSize = 6;

            scope.numberType = attrs.numberType;

            scope.setNumber = function (event, numberType, number) {
                var $this = $(event.currentTarget);
                if ($this.hasClass('disabled')) {
                    return false;
                }
                scope.outputData = {
                    numberType: numberType,
                    number: number
                };
                scope.thisNumber = {
                    numberType: numberType,
                    number: number
                };
            };

            scope.dataInit = function () {
                scope.selPage = 1;
                scope.pages = Math.ceil(scope.numbers.length / scope.pageSize); //分页数
                scope.items = scope.numbers.slice(0, scope.pageSize);

                //console.log(scope.outputData);
            };

            scope.setData = function () {
                scope.items = scope.numbers.slice((scope.pageSize * (scope.selPage - 1)), (scope.selPage * scope.pageSize));
            };

            scope.selectPage = function (page) {
                //不能小于1大于最大
                if (page < 1 || page > scope.pages) return;

                scope.selPage = page;
                scope.setData();
            };

            //上一页
            scope.Previous = function () {
                scope.selectPage(scope.selPage - 1);
            };
            //下一页
            scope.Next = function () {
                scope.selectPage(scope.selPage + 1);
            };

            scope.$watch('inputData', function (n, o, scope) {
                if (n !== o && n !== undefined) {
                    scope.numbers = n;
                    scope.dataInit();

                    var randIndex = parseInt(Math.random() * n.length);

                    if (scope.autoSelect) {
                        if (scope.numberType === 'mainNumber') {
                            scope.outputData = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                        }
                        $timeout(function () {
                            if (scope.numberType === 'subNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                            }
                        });
                        $timeout(function () {
                            if (scope.numberType === 'thirdNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                            }
                        });
                    }

                }
            }, true);

            scope.$watch('autoSelect', function (n, o, scope) {
                if (n !== o && n !== undefined) {
                    if (n) {

                        var randIndex = parseInt(Math.random() * n.length);
                        if (scope.numberType === 'mainNumber') {
                            scope.outputData = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                        }
                        if (scope.numberType === 'subNumber') {
                            scope.outputData = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                        }
                        $timeout(function () {
                            if (scope.numberType === 'thirdNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                            }
                        });
                    } else {
                        if (scope.numberType === 'mainNumber') {
                            scope.outputData = {
                                numberType: scope.numberType
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType
                            };
                        }
                        if (scope.numberType === 'subNumber') {
                            scope.outputData = {
                                numberType: scope.numberType
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType
                            };
                        }
                        $timeout(function () {
                            if (scope.numberType === 'thirdNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType
                                };
                            }
                        });
                    }
                }
            });
        }
    };
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flowCard', { //app首页
            url: "/fd/product",
            templateUrl: "pages/flowCard/flowCard-details/default/flowCard-details.html",
            controller: "fdProController"
        })
        .state('flowCardMifi', { //app首页
            url: "/fd/mifi",
            templateUrl: "pages/flowCard/flowCard-details/default/flowCard-details.html",
            controller: "fdProController"
        });
}]).controller('fdProController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {


    window.location.href = cfApi.apiHost + "/yfqcz/#/";
    $scope.appType = systemName + "_FlowPackage";

    if ($location.path() == "/fd/mifi") {
        $scope.appType = systemName + "_FlowPackage_MiFi";
    }

    $scope.category = $scope.appType;

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);//页面载入
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardIn', { //app首页
            url: "/fd/fds/:appType",
            templateUrl: "pages/flowCard/flowCard-details/in/flowCard-details.html",
            controller: "fdProInController"
        });
}]).controller('fdProInController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    window.location.href = cfApi.apiHost + "/yfqcz/#/";

    $scope.appType = systemName+"_FlowPackage";
    $scope.category = $scope.appType;

    writebdLog($scope.category,"_Load","渠道号",$scope.gh);//页面载入
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardV3', { //app首页
            url: "/fd/v3/:productId",
            templateUrl: "pages/flowCard/flowCard-details/v3/v3.html",
            controller: "flowCardV3Controller"
        })
}]).controller('flowCardV3Controller', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "mifitc";
    $scope.pageType = 'A';
    $scope.category = systemName + "_mifitc_" + $scope.pageType;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.productId + "&activeTag=mifitc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.product = data;
        $scope.selectedMifis = [$scope.product.activityproductId];
        $scope.packageItem = data.packageProductList[0];

        var mifis = [];
        $.each(data.phoneTypes, function (i, k) {
            mifis.push({
                productId: k.productId,
                productName: k.productName,
                salePrice: k.salePrice,
                selected: false
            });
        });

        $scope.mifis = mifis;
        $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/fd/v3/' + $stateParams.productId + window.location.search,
            shareTitle: '不限流量套餐，重磅推出，人均仅38元/月！送无线WIFI设备！',
            shareDisc: '一人付费，全家分享！无线广东流量，6G全国流量，1000分钟国内通话，抢先办理！',
            picUrl: 'http://app.yfq.cn/images/flow/flowcard/v3/nativeShare.jpg'
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    if ($location.search().duplicateNum) {
        $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
    }

    $scope.autoSelect = true;

    $scope.setAutoSelect = function () {
        $scope.autoSelect = !$scope.autoSelect;
        writebdLog($scope.category, "_SystemNumber" + !$scope.autoSelect, "渠道号", $scope.gh); //是否系统分配号码
    };

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomName() + "(" + getRandomReceiverPhone() + ")" + " 领取无限流量套餐 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        var _data = [];
        var inputData1 = [];
        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                if (k.t == 0) {
                    _data.push(k);
                }
            }
        });

        $.each(_data, function (i, k) {
            if (k.fee == 0) {
                inputData1.push(k);
            }
        });

        $scope.inputData = _data;
        $scope.inputData1 = inputData1;
    });

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.mainPanel = false;
    $scope.showMainPanel = function () {
        $scope.mainPanel = !$scope.mainPanel;
        writebdLog($scope.category, "_PanelMain" + $scope.mainPanel, "渠道号", $scope.gh);
    };

    $scope.subPanel = false;
    $scope.showSubPanel = function () {
        $scope.subPanel = !$scope.subPanel;
        writebdLog($scope.category, "_PanelSub" + $scope.subPanel, "渠道号", $scope.gh);
    };

    $scope.thirdPanel = false;
    $scope.showThirdPanel = function () {
        $scope.thirdPanel = !$scope.thirdPanel;
        writebdLog($scope.category, "_PanelThrid" + $scope.thirdPanel, "渠道号", $scope.gh);
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.selectedData = {};
    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");
        if (!$scope.checkoutForm.mainNumber.$valid) {
            $scope.mainNumberWarn = true;
            $scope.goTo('#mainNumberArea');
            return false;
        }
        if (!$scope.autoSelect) {
            if (!$scope.checkoutForm.subNumber.$valid) {
                $scope.subNumberWarn = true;
                $scope.goTo('#subNumberArea');
                return false;
            }
            if (!$scope.checkoutForm.thirdNumber.$valid) {
                $scope.thirdNumberWarn = true;
                $scope.goTo('#thirdNumberArea');
                return false;
            }
        }
        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        var url = cfApi.apiHost + "/product/checkPhoneState.html?number=[" + $scope.selectedData.mainNumber.n + "," + $scope.selectedData.subNumber.n + "," + $scope.selectedData.thirdNumber.n + "]&s=wap&callback=JSON_CALLBACK";

        $scope.$root.toast.open();
        $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
            if (data.tempIndexs.length === 0) {//查看号码是否被选
                $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.packageItem.productId + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

                    if (data.result) {
                        $form.submit();
                        $scope.$root.toast.close();
                        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
                    } else {
                        $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
                        $scope.$root.toast.close();
                    }
                });
            } else {
                $scope.$root.toast.close();
                var html = "您选择的";
                for (var i = 0; i < data.tempIndexs.length; i++) {
                    if (data.tempIndexs[i] === 0) {
                        html = html + "主卡电话号码：" + $scope.selectedData.mainNumber.n + "、";
                        $scope.mainNumberWarn = true;
                        $scope.selectedData.mainNumber = "";
                    }
                    if (data.tempIndexs[i] === 1) {
                        html = html + "副卡1电话号码：" + $scope.selectedData.subNumber.n + "、";
                        $scope.subNumberWarn = true;
                        $scope.selectedData.subNumber = "";
                    }
                    if (data.tempIndexs[i] === 2) {
                        html = html + "副卡2电话号码：" + $scope.selectedData.thirdNumber.n + "、";
                        $scope.thirdNumberWarn = true;
                        $scope.selectedData.thirdNumber = "";
                    }
                }
                html = html + "已被选择，请重新选号！";
                $scope.dialog.open("系统提示", html);
            }
        });
    };
    $scope.fqaMore = false;
    $scope.setFqaMore = function () {
        $scope.fqaMore = !$scope.fqaMore;
    };
    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [$scope.product.activityproductId];
            $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n) {
                var $form = $("#checkoutForm");
                $form.submit();
                writebdLog($scope.category, "_" + "BuyNowThree", "渠道号", $scope.gh);//立即支付
            }
        }
    });

    $scope.$watch('selectedData', function (n, o, $scope) {
        if (n != o && n.thirdNumber) {
            if (n.subNumber.n === n.thirdNumber.n) {
                $scope.autoSelect = !$scope.autoSelect;
                $scope.autoSelect = !$scope.autoSelect;
            }
        }

    }, true);

    $scope.$watch('outputData', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n.numberType === 'mainNumber') {
                $scope.selectedData.mainNumber = n.number;
                $scope.mainPanel = false;
                $scope.mainNumberWarn = false;

                if ($scope.inputData1.indexOf(n.number) != -1) {
                    $scope.inputData1 = $scope.inputData1.slice(0, $scope.inputData1.indexOf(n.number)).concat($scope.inputData1.slice($scope.inputData1.indexOf(n.number) + 1));
                }
            }
            if (n.numberType === 'subNumber') {
                $scope.selectedData.subNumber = n.number;
                if (n.number) {
                    $scope.subPanel = false;
                    $scope.subNumberWarn = false;
                } else {
                    $scope.subPanel = true;
                }
            }
            if (n.numberType === 'thirdNumber') {
                $scope.selectedData.thirdNumber = n.number;
                if (n.number) {
                    $scope.thirdPanel = false;
                    $scope.thirdNumberWarn = false;
                } else {
                    $scope.thirdPanel = true;
                }
            }
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardV4', { //app首页
            url: "/fd/v4/:productId",
            templateUrl: "pages/flowCard/flowCard-details/v4/v4.html",
            controller: "flowCardV4Controller"
        })
}]).controller('flowCardV4Controller', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "mifitc";
    $scope.pageType = 'B';
    $scope.category = systemName + "_mifitc_" + $scope.pageType;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.productId + "&activeTag=mifitc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.product = data;
        $scope.selectedMifis = [$scope.product.activityproductId];
        $scope.packageItem = data.packageProductList[0];

        var mifis = [];
        $.each(data.phoneTypes, function (i, k) {
            mifis.push({
                productId: k.productId,
                productName: k.productName,
                salePrice: k.salePrice,
                selected: false
            });
        });

        $scope.mifis = mifis;
        $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/fd/v4/' + $stateParams.productId + window.location.search,
            shareTitle: '不限流量套餐，重磅推出，人均仅38元/月！送无线WIFI设备！',
            shareDisc: '一人付费，全家分享！无线广东流量，6G全国流量，1000分钟国内通话，抢先办理！',
            picUrl: 'http://app.yfq.cn/images/flow/flowcard/v4/nativeShare.jpg'
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];
    $scope.payType = 0;
    $scope.setPayType = function (e, type) {
        $scope.payType = type;
        writebdLog($scope.category, "_" + payTypeAry[type], "渠道号", $scope.gh);//选择支付方式
    };

    if ($location.search().duplicateNum) {
        $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
    }

    $scope.autoSelect = true;

    $scope.setAutoSelect = function () {
        $scope.autoSelect = !$scope.autoSelect;
        writebdLog($scope.category, "_SystemNumber" + !$scope.autoSelect, "渠道号", $scope.gh); //是否系统分配号码
    };

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomName() + "(" + getRandomReceiverPhone() + ")" + " 领取无限流量套餐 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        var _data = [];
        var inputData1 = [];
        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                if (k.t == 0) {
                    _data.push(k);
                }
            }
        });

        $.each(_data, function (i, k) {
            if (k.fee == 0) {
                inputData1.push(k);
            }
        });

        $scope.inputData = _data;
        $scope.inputData1 = inputData1;
    });

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.mainPanel = false;
    $scope.showMainPanel = function () {
        $scope.mainPanel = !$scope.mainPanel;
        writebdLog($scope.category, "_PanelMain" + $scope.mainPanel, "渠道号", $scope.gh);
    };

    $scope.subPanel = false;
    $scope.showSubPanel = function () {
        $scope.subPanel = !$scope.subPanel;
        writebdLog($scope.category, "_PanelSub" + $scope.subPanel, "渠道号", $scope.gh);
    };

    $scope.thirdPanel = false;
    $scope.showThirdPanel = function () {
        $scope.thirdPanel = !$scope.thirdPanel;
        writebdLog($scope.category, "_PanelThrid" + $scope.thirdPanel, "渠道号", $scope.gh);
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.selectedData = {};

    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");
        if (!$scope.checkoutForm.mainNumber.$valid) {
            $scope.mainNumberWarn = true;
            $scope.goTo('#mainNumberArea');
            return false;
        }
        if (!$scope.autoSelect) {
            if (!$scope.checkoutForm.subNumber.$valid) {
                $scope.subNumberWarn = true;
                $scope.goTo('#subNumberArea');
                return false;
            }
            if (!$scope.checkoutForm.thirdNumber.$valid) {
                $scope.thirdNumberWarn = true;
                $scope.goTo('#thirdNumberArea');
                return false;
            }
        }
        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        var url = cfApi.apiHost + "/product/checkPhoneState.html?number=[" + $scope.selectedData.mainNumber.n + "," + $scope.selectedData.subNumber.n + "," + $scope.selectedData.thirdNumber.n + "]&s=wap&callback=JSON_CALLBACK";

        $scope.$root.toast.open();
        $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
            if (data.tempIndexs.length === 0) {//查看号码是否被选
                $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.packageItem.productId + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

                    if (data.result) {
                        $form.submit();
                        $scope.$root.toast.close();
                        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
                    } else {
                        $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
                        $scope.$root.toast.close();
                    }
                });
            } else {
                $scope.$root.toast.close();
                var html = "您选择的";
                for (var i = 0; i < data.tempIndexs.length; i++) {
                    if (data.tempIndexs[i] === 0) {
                        html = html + "主卡电话号码：" + $scope.selectedData.mainNumber.n + "、";
                        $scope.mainNumberWarn = true;
                        $scope.selectedData.mainNumber = "";
                    }
                    if (data.tempIndexs[i] === 1) {
                        html = html + "副卡1电话号码：" + $scope.selectedData.subNumber.n + "、";
                        $scope.subNumberWarn = true;
                        $scope.selectedData.subNumber = "";
                    }
                    if (data.tempIndexs[i] === 2) {
                        html = html + "副卡2电话号码：" + $scope.selectedData.thirdNumber.n + "、";
                        $scope.thirdNumberWarn = true;
                        $scope.selectedData.thirdNumber = "";
                    }
                }
                html = html + "已被选择，请重新选号！";
                $scope.dialog.open("系统提示", html);
            }
        });
    };
    $scope.fqaMore = false;
    $scope.setFqaMore = function () {
        $scope.fqaMore = !$scope.fqaMore;
    };
    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [$scope.product.activityproductId];
            $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n) {
                var $form = $("#checkoutForm");
                $form.submit();
                writebdLog($scope.category, "_" + "BuyNowThree", "渠道号", $scope.gh);//立即支付
            }
        }
    });

    $scope.$watch('selectedData', function (n, o, $scope) {
        if (n != o && n.thirdNumber) {
            if (n.subNumber.n === n.thirdNumber.n) {
                $scope.autoSelect = !$scope.autoSelect;
                $scope.autoSelect = !$scope.autoSelect;
            }
        }

    }, true);

    $scope.$watch('outputData', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n.numberType === 'mainNumber') {
                $scope.selectedData.mainNumber = n.number;
                $scope.mainPanel = false;
                $scope.mainNumberWarn = false;

                if ($scope.inputData1.indexOf(n.number) != -1) {
                    $scope.inputData1 = $scope.inputData1.slice(0, $scope.inputData1.indexOf(n.number)).concat($scope.inputData1.slice($scope.inputData1.indexOf(n.number) + 1));
                }
            }
            if (n.numberType === 'subNumber') {
                $scope.selectedData.subNumber = n.number;
                if (n.number) {
                    $scope.subPanel = false;
                    $scope.subNumberWarn = false;
                } else {
                    $scope.subPanel = true;
                }
            }
            if (n.numberType === 'thirdNumber') {
                $scope.selectedData.thirdNumber = n.number;
                if (n.number) {
                    $scope.thirdPanel = false;
                    $scope.thirdNumberWarn = false;
                } else {
                    $scope.thirdPanel = true;
                }
            }
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardV5', { //app首页
            url: "/fd/v5/:productId",
            templateUrl: "pages/flowCard/flowCard-details/v5/v5.html",
            controller: "flowCardV5Controller"
        })
}]).controller('flowCardV5Controller', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "mifitc";
    $scope.pageType = 'C';
    $scope.category = systemName + "_mifitc_" + $scope.pageType;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.productId + "&activeTag=mifitc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.product = data;
        $scope.selectedMifis = [$scope.product.activityproductId];
        $scope.packageItem = data.packageProductList[0];

        var mifis = [];
        $.each(data.phoneTypes, function (i, k) {
            mifis.push({
                productId: k.productId,
                productName: k.productName,
                salePrice: k.salePrice,
                selected: false
            });
        });

        $scope.mifis = mifis;
        $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/fd/v5/' + $stateParams.productId + window.location.search,
            shareTitle: '全国199元不限流量套餐，今日办理，送随身WIFI！',
            shareDisc: '无需换号，全国随意用！3000分钟国内通话，今日限100张！',
            picUrl: 'http://app.yfq.cn/images/flow/flowcard/v5/nativeShare.jpg'
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];
    $scope.payType = 1;
    $scope.setPayType = function (e, type) {
        $scope.payType = type;
        writebdLog($scope.category, "_" + payTypeAry[type], "渠道号", $scope.gh);//选择支付方式
    };

    if ($location.search().duplicateNum) {
        $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
    }

    $scope.autoSelect = true;

    $scope.setAutoSelect = function () {
        $scope.autoSelect = !$scope.autoSelect;
        writebdLog($scope.category, "_SystemNumber" + !$scope.autoSelect, "渠道号", $scope.gh); //是否系统分配号码
    };

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomName() + "(" + getRandomReceiverPhone() + ")" + " 领取无限流量套餐 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        var _data = [];
        var inputData1 = [];
        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                if (k.t == 0) {
                    _data.push(k);
                }
            }
        });

        $.each(_data, function (i, k) {
            if (k.fee == 0) {
                inputData1.push(k);
            }
        });

        $scope.inputData = _data;
        $scope.inputData1 = inputData1;
    });

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.mainPanel = false;
    $scope.showMainPanel = function () {
        $scope.mainPanel = !$scope.mainPanel;
        writebdLog($scope.category, "_PanelMain" + $scope.mainPanel, "渠道号", $scope.gh);
    };

    $scope.subPanel = false;
    $scope.showSubPanel = function () {
        $scope.subPanel = !$scope.subPanel;
        writebdLog($scope.category, "_PanelSub" + $scope.subPanel, "渠道号", $scope.gh);
    };

    $scope.thirdPanel = false;
    $scope.showThirdPanel = function () {
        $scope.thirdPanel = !$scope.thirdPanel;
        writebdLog($scope.category, "_PanelThrid" + $scope.thirdPanel, "渠道号", $scope.gh);
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.selectedData = {};

    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");
        if (!$scope.checkoutForm.mainNumber.$valid) {
            $scope.mainNumberWarn = true;
            $scope.goTo('#mainNumberArea');
            return false;
        }
        if (!$scope.autoSelect) {
            if (!$scope.checkoutForm.subNumber.$valid) {
                $scope.subNumberWarn = true;
                $scope.goTo('#subNumberArea');
                return false;
            }
            if (!$scope.checkoutForm.thirdNumber.$valid) {
                $scope.thirdNumberWarn = true;
                $scope.goTo('#thirdNumberArea');
                return false;
            }
        }
        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        var url = cfApi.apiHost + "/product/checkPhoneState.html?number=[" + $scope.selectedData.mainNumber.n + "]&s=wap&callback=JSON_CALLBACK";

        $scope.$root.toast.open();
        $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
            if (data.tempIndexs.length === 0) {//查看号码是否被选
                $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.packageItem.productId + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

                    if (data.result) {
                        $form.submit();
                        $scope.$root.toast.close();
                        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
                    } else {
                        $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
                        $scope.$root.toast.close();
                    }
                });
            } else {
                $scope.$root.toast.close();
                var html = "您选择的";
                for (var i = 0; i < data.tempIndexs.length; i++) {
                    if (data.tempIndexs[i] === 0) {
                        html = html + "主卡电话号码：" + $scope.selectedData.mainNumber.n + "、";
                        $scope.mainNumberWarn = true;
                        $scope.selectedData.mainNumber = "";
                    }
                    if (data.tempIndexs[i] === 1) {
                        html = html + "副卡1电话号码：" + $scope.selectedData.subNumber.n + "、";
                        $scope.subNumberWarn = true;
                        $scope.selectedData.subNumber = "";
                    }
                    if (data.tempIndexs[i] === 2) {
                        html = html + "副卡2电话号码：" + $scope.selectedData.thirdNumber.n + "、";
                        $scope.thirdNumberWarn = true;
                        $scope.selectedData.thirdNumber = "";
                    }
                }
                html = html + "已被选择，请重新选号！";
                $scope.dialog.open("系统提示", html);
            }
        });
    };
    $scope.fqaMore = false;
    $scope.setFqaMore = function () {
        $scope.fqaMore = !$scope.fqaMore;
    };
    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [$scope.product.activityproductId];
            $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n) {
                var $form = $("#checkoutForm");
                $form.submit();
                writebdLog($scope.category, "_" + "BuyNowThree", "渠道号", $scope.gh);//立即支付
            }
        }
    });

    $scope.$watch('selectedData', function (n, o, $scope) {
        if (n != o && n.thirdNumber) {
            if (n.subNumber.n === n.thirdNumber.n) {
                $scope.autoSelect = !$scope.autoSelect;
                $scope.autoSelect = !$scope.autoSelect;
            }
        }

    }, true);

    $scope.$watch('outputData', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n.numberType === 'mainNumber') {
                $scope.selectedData.mainNumber = n.number;
                $scope.mainPanel = false;
                $scope.mainNumberWarn = false;

                if ($scope.inputData1.indexOf(n.number) != -1) {
                    $scope.inputData1 = $scope.inputData1.slice(0, $scope.inputData1.indexOf(n.number)).concat($scope.inputData1.slice($scope.inputData1.indexOf(n.number) + 1));
                }
            }
            if (n.numberType === 'subNumber') {
                $scope.selectedData.subNumber = n.number;
                if (n.number) {
                    $scope.subPanel = false;
                    $scope.subNumberWarn = false;
                } else {
                    $scope.subPanel = true;
                }
            }
            if (n.numberType === 'thirdNumber') {
                $scope.selectedData.thirdNumber = n.number;
                if (n.number) {
                    $scope.thirdPanel = false;
                    $scope.thirdNumberWarn = false;
                } else {
                    $scope.thirdPanel = true;
                }
            }
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    // 设定路由
    $stateProvider
        .state('flowCardV6', { //app首页
            url: "/fd/v6/:productId",
            templateUrl: "pages/flowCard/flowCard-details/v6/v6.html",
            controller: "flowCardV6Controller"
        })
}]).controller('flowCardV6Controller', ['$scope', '$rootScope', '$stateParams', '$location', '$http', function ($scope, $rootScope, $stateParams, $location, $http) {

    $scope.activeTag = "99wxll";
    $scope.pageType = 'B';
    $scope.category = systemName + "_99wxll_" + $scope.pageType;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.productId + "&activeTag=mifitc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.product = data;
        $scope.selectedMifis = [$scope.product.activityproductId];
        $scope.packageItem = data.packageProductList[0];

        var mifis = [];
        $.each(data.phoneTypes, function (i, k) {
            mifis.push({
                productId: k.productId,
                productName: k.productName,
                salePrice: k.salePrice,
                selected: false
            });
        });

        $scope.mifis = mifis;
        $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/fd/v6/' + $stateParams.productId + window.location.search,
            shareTitle: '您有一张无限流量卡可以领取，今日办理，仅需99元！',
            shareDisc: '套餐包含：广东省内无限流量，全国3.5GB，全国通话900分钟！今日限100张！',
            picUrl: 'http://app.yfq.cn/images/flow/flowcard/v6/nativeShare.jpg'
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];
    $scope.payType = 1;
    $scope.setPayType = function (e, type) {
        $scope.payType = type;
        writebdLog($scope.category, "_" + payTypeAry[type], "渠道号", $scope.gh);//选择支付方式
    };

    if ($location.search().duplicateNum) {
        $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
    }

    $scope.autoSelect = true;

    $scope.setAutoSelect = function () {
        $scope.autoSelect = !$scope.autoSelect;
        writebdLog($scope.category, "_SystemNumber" + !$scope.autoSelect, "渠道号", $scope.gh); //是否系统分配号码
    };

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomName() + "(" + getRandomReceiverPhone() + ")" + " 领取无限流量套餐 <span>" + getRanDomTime() + "分钟前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    $container = $(".content-scrollable");

    $scope.goToSelect = function () {
        var $scrollTo = $('.select-area');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        writebdLog($scope.category, "_ToSelect", "渠道号", $scope.gh); //立即订购
    };

    $scope.goTo = function (target) {
        var $scrollTo = $(target);
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        var _data = [];
        var inputData1 = [];
        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                if (k.t == 0) {
                    _data.push(k);
                }
            }
        });

        $.each(_data, function (i, k) {
            if (k.fee == 0) {
                inputData1.push(k);
            }
        });

        $scope.inputData = _data;
        $scope.inputData1 = inputData1;
    });

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.mainPanel = false;
    $scope.showMainPanel = function () {
        $scope.mainPanel = !$scope.mainPanel;
        writebdLog($scope.category, "_PanelMain" + $scope.mainPanel, "渠道号", $scope.gh);
    };

    $scope.subPanel = false;
    $scope.showSubPanel = function () {
        $scope.subPanel = !$scope.subPanel;
        writebdLog($scope.category, "_PanelSub" + $scope.subPanel, "渠道号", $scope.gh);
    };

    $scope.thirdPanel = false;
    $scope.showThirdPanel = function () {
        $scope.thirdPanel = !$scope.thirdPanel;
        writebdLog($scope.category, "_PanelThrid" + $scope.thirdPanel, "渠道号", $scope.gh);
    };

    $scope.getContact = function () {
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh); //客服咨询
    };

    $scope.selectedData = {};

    $scope.submitForm = function (e, value) {
        var $form = $("#checkoutForm");
        if (!$scope.checkoutForm.mainNumber.$valid) {
            $scope.mainNumberWarn = true;
            $scope.goTo('#mainNumberArea');
            return false;
        }
        if (!$scope.autoSelect) {
            if (!$scope.checkoutForm.subNumber.$valid) {
                $scope.subNumberWarn = true;
                $scope.goTo('#subNumberArea');
                return false;
            }
            if (!$scope.checkoutForm.thirdNumber.$valid) {
                $scope.thirdNumberWarn = true;
                $scope.goTo('#thirdNumberArea');
                return false;
            }
        }
        if (!$scope.checkAddress()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        if (!$scope.$root.checkActiveCode()) {
            $scope.goTo('#receiverAddress');
            return false;
        }
        var url = cfApi.apiHost + "/product/checkPhoneState.html?number=[" + $scope.selectedData.mainNumber.n + "," + $scope.selectedData.subNumber.n + "," + $scope.selectedData.thirdNumber.n + "]&s=wap&callback=JSON_CALLBACK";

        $scope.$root.toast.open();
        $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
            if (data.tempIndexs.length === 0) {//查看号码是否被选
                $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.packageItem.productId + '&category=' + $scope.category + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单

                    if (data.result) {
                        $form.submit();
                        $scope.$root.toast.close();
                        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
                    } else {
                        $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
                        $scope.$root.toast.close();
                    }
                });
            } else {
                $scope.$root.toast.close();
                var html = "您选择的";
                for (var i = 0; i < data.tempIndexs.length; i++) {
                    if (data.tempIndexs[i] === 0) {
                        html = html + "主卡电话号码：" + $scope.selectedData.mainNumber.n + "、";
                        $scope.mainNumberWarn = true;
                        $scope.selectedData.mainNumber = "";
                    }
                    if (data.tempIndexs[i] === 1) {
                        html = html + "副卡1电话号码：" + $scope.selectedData.subNumber.n + "、";
                        $scope.subNumberWarn = true;
                        $scope.selectedData.subNumber = "";
                    }
                    if (data.tempIndexs[i] === 2) {
                        html = html + "副卡2电话号码：" + $scope.selectedData.thirdNumber.n + "、";
                        $scope.thirdNumberWarn = true;
                        $scope.selectedData.thirdNumber = "";
                    }
                }
                html = html + "已被选择，请重新选号！";
                $scope.dialog.open("系统提示", html);
            }
        });
    };
    $scope.fqaMore = false;
    $scope.setFqaMore = function () {
        $scope.fqaMore = !$scope.fqaMore;
    };
    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [$scope.product.activityproductId];
            $scope.totalPrice = parseInt($scope.product.packageProductList[0].salesPrice);
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n) {
                var $form = $("#checkoutForm");
                $form.submit();
                writebdLog($scope.category, "_" + "BuyNowThree", "渠道号", $scope.gh);//立即支付
            }
        }
    });

    $scope.$watch('selectedData', function (n, o, $scope) {
        if (n != o && n.thirdNumber) {
            if (n.subNumber.n === n.thirdNumber.n) {
                $scope.autoSelect = !$scope.autoSelect;
                $scope.autoSelect = !$scope.autoSelect;
            }
        }

    }, true);

    $scope.$watch('outputData', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n.numberType === 'mainNumber') {
                $scope.selectedData.mainNumber = n.number;
                $scope.mainPanel = false;
                $scope.mainNumberWarn = false;

                if ($scope.inputData1.indexOf(n.number) != -1) {
                    $scope.inputData1 = $scope.inputData1.slice(0, $scope.inputData1.indexOf(n.number)).concat($scope.inputData1.slice($scope.inputData1.indexOf(n.number) + 1));
                }
            }
            if (n.numberType === 'subNumber') {
                $scope.selectedData.subNumber = n.number;
                if (n.number) {
                    $scope.subPanel = false;
                    $scope.subNumberWarn = false;
                } else {
                    $scope.subPanel = true;
                }
            }
            if (n.numberType === 'thirdNumber') {
                $scope.selectedData.thirdNumber = n.number;
                if (n.number) {
                    $scope.thirdPanel = false;
                    $scope.thirdNumberWarn = false;
                } else {
                    $scope.thirdPanel = true;
                }
            }
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('BctiveIndex', { //app首页
            url: "/phone/active/B",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/B/index.html';
            },
            controller: "pBctiveController"
        });
}]).controller('pBctiveController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    //$location.path("/phone/active/D/phones");
    $scope.pageType = 'B';

    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.activePage = 'index';

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/A/phones';

    $scope.params = window.location.search;

    $scope.paracont = "获取验证码";
    $scope.paraclass = "but_null";
    var second = 59, timePromise = undefined;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/B' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    if ($cookieStore.get("rasherStore")) {
        $scope.rasherStore = $cookieStore.get("rasherStore");
    } else {
        $scope.rasherStore = $cookieStore.put("rasherStore", 8437);
    }

    if ($cookieStore.get("couponStore")) {
        $scope.couponStore = $cookieStore.get("couponStore");
    } else {
        $scope.couponStore = $cookieStore.put("couponStore", 35);
    }

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.rasherStore = $cookieStore.get("rasherStore");
    $scope.couponStore = $cookieStore.get("couponStore");

    var homeArgs = ['_InputIndexName', '_InputIndexNumber', '_InputIndexCode'];
    //记录落地页输入的操作
    $scope.$root.inputHomeArgs = function (type) {
        writebdLog($scope.category, homeArgs[type], "渠道号", $scope.gh); //输入操作
    };

    $scope.checkCouponMobile = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.couponMobile.$valid) {
            //alert("请输入联系电话");
            $(".input-mobile").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.checkCouponName = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.couponName.$valid) {
            //alert("请输入联系电话");
            $(".input-name").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.checkCouponActiveCode = function () {
        if (!$scope.couponForm.couponActiveCode.$valid) {
            $(".input-vcode").addClass("weui-cell_warn");
            return false;
        } else {
            if (!checkMobileCode($scope.coupon.mobile, $scope.coupon.activeCode)) {
                $(".input-vcode").removeClass("weui-cell_success");
                $(".input-vcode").addClass("weui-cell_warn");
                return false;
            }
            return true;
        }
    };

    $scope.getCouponActiveCode = function (event, phoneNumber) {
        if ($(event.currentTarget).hasClass("not")) {
            //scope.toast.close();
            return false;
        }

        $scope.toast.openUnLimit();

        if (!$scope.checkCouponMobile()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;
        }
        $http.get("http://m.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
            if (data == "") {
                $scope.toast.close();
                timePromise = $interval(function () {
                    if (second <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;

                        second = 59;
                        $scope.paracont = "重发验证码";
                        $scope.paraclass = "but_null";
                    } else {
                        $scope.paracont = second + "秒后可重发";
                        $scope.paraclass = "not but_null";
                        second--;

                    }
                }, 1000, 100);
            }
        });

        writebdLog($scope.category, "_VariIndexCode", "渠道号", $scope.gh); //获取下单页验证码
    };

    $scope.getQuan = function () {
        $scope.toast.open();

        if (!$scope.checkCouponName()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的姓名！");
            return false;
        }

        if (!$scope.checkCouponMobile()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;
        }

        if (!$scope.checkCouponActiveCode()) {
            $scope.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的验证码！");
            return false;
        }

        var headCategory = $location.search().headCategory;
        var category = $scope.category;
        if (headCategory != undefined && headCategory != null)
            category = headCategory;

        $http.jsonp(cfApi.apiHost + '/product/doReceiveMultipleCoupon.html?recieverMobile=' + $scope.coupon.mobile + '&couponType=HF-MX-JM&gh=' + $scope.gh + '&category=' + category + '&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $cookieStore.put("couponStore", $cookieStore.get("couponStore") - 1);
            $scope.couponStore = $cookieStore.get("couponStore") - 1;

            $cookieStore.put("rasherStore", $cookieStore.get("rasherStore") + 1);
            $scope.rasherStore = $cookieStore.get("rasherStore") + 1;

            $http.jsonp(cfApi.apiHost + '/product/intentionLog.html?activeTag=jktchd&dataType=tchd&operationName=' + $scope.coupon.mobile + '&operationValue=' + encodeURI($scope.coupon.name) + '&s=wap&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                $scope.toast.close();
                var _params;
                if ($scope.params == '') {
                    _params = "?receiverName=" + $scope.coupon.name + "&receiverMobile=" + $scope.coupon.mobile;
                } else {
                    _params = $scope.params + "&receiverName=" + $scope.coupon.name + "&receiverMobile=" + $scope.coupon.mobile;
                }
                if (data.resultCode == 200) {
                    window.location.href = '/phone/active/B/phones' + _params;
                } else {

                }
            }).error(function (data, status, headers, config) {
                console.log(status);
                //deferred.reject(status)
            });
        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        writebdLog($scope.category, "_NextOrder", "渠道号", $scope.gh); //点击进入下单页
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

        timerHtml = "<em>" + h.toString().slice(0, 1) + "</em><em>" + h.toString().slice(1, 2) + "</em>" + "<span>时</span>" + "<em>" + m.toString().slice(0, 1) + "</em><em>" + m.toString().slice(1, 2) + "</em>" + "<span>分</span>" + "<em>" + s.toString().slice(0, 1) + "</em><em>" + s.toString().slice(1, 2) + "</em><span>秒</span>";
        $(".timer").html(timerHtml);
    };

    setInterval(getRTime, 1000);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeIndex', { //app首页
            url: "/phone/active/A",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/A/hotPhones/hotPhones.html';
            },
            controller: "pActivePhonesController"
        });
}]).controller('pActiveController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = $stateParams.pageType;
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.activePage = 'index';

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/A/phones';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/A' + window.location.search,
        shareTitle: '我领到1888元购机年终奖！年前换个好手机，开开心心回家过大年！',
        shareDisc: '苹果、OPPO、华为、VIVO等大牌手机直降！用券购再立减！戳我抢→',
        picUrl:'http://app.yfq.cn/images/active/share_active.jpg'
    };

    if ($cookieStore.get("couponStore")) {
        $scope.cookieStore = $cookieStore.get("couponStore");
    } else {
        $scope.cookieStore = $cookieStore.put("couponStore", 199);
    }

    $scope.cookieStore = $cookieStore.get("couponStore");

    $scope.params = window.location.search;

    $scope.$root.apiCode = 2;

    $scope.toggleClose = true;

    $scope.fqaToggleClose = function () {
        $scope.toggleClose = !$scope.toggleClose;
        if ($scope.toggleClose)
            writebdLog($scope.category, "_CouExplainStop", "渠道号", $scope.gh);//收起优惠券说明
        else
            writebdLog($scope.category, "_CouExplainShow", "渠道号", $scope.gh);//展示优惠券说明
    };

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomReceiverPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    //记录点击事件
    $scope.writeClickEvent = function (name) {
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);//记录点击事件
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('DctiveIndex', { //app首页
            url: "/phone/active/D",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/D/index.html';
            },
            controller: "pDctivePhonesController"
        });
}]).controller('pDctiveController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = $stateParams.pageType;
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.activePage = 'indexD';

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl: 'http://app.yfq.cn/images/active/d/share_active.jpg'
    };

    if ($cookieStore.get("couponStore")) {
        $scope.cookieStore = $cookieStore.get("couponStore");
    } else {
        $scope.cookieStore = $cookieStore.put("couponStore", 199);
    }

    $scope.cookieStore = $cookieStore.get("couponStore");

    $scope.params = window.location.search;

    $scope.$root.apiCode = 2;

    $scope.toggleClose = true;

    $scope.fqaToggleClose = function () {
        $scope.toggleClose = !$scope.toggleClose;
        if ($scope.toggleClose)
            writebdLog($scope.category, "_CouExplainStop", "渠道号", $scope.gh);//收起优惠券说明
        else
            writebdLog($scope.category, "_CouExplainShow", "渠道号", $scope.gh);//展示优惠券说明
    };

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    var objGetters = new Array();

    for (var i = 0; i <= 10; i++) {
        objGetters.push(
            {
                txt: getRandomReceiverPhone() + " 领取了1888元大红包 <span>" + getRanDomTime() + "秒前</span>"
            }
        );
    }

    $scope.getters = objGetters;

    //记录点击事件
    $scope.writeClickEvent = function (name) {
        writebdLog($scope.category, "_" + name, "渠道号", $scope.gh);//记录点击事件
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $(".getters").slide({
            mainCell: "ul",
            autoPage: true,
            effect: "topMarquee",
            autoPlay: true,
            interTime: 50,
            vis: 5
        });
    });

}]);

"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneCardDetails', { //app首页
            url: "/phs/cd/:pageType/:cardId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/card/' + $stateParams.pageType + '/details.html';
            },
            controller: "pCardProController"
        });
}]).controller('pCardProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = $stateParams.pageType;
    $scope.activeTag = "mysytc";

    var activeName = "_mysy_" + $scope.pageType;
    if ($scope.pageType == 'pcdB') activeName = '_yucun_A';
    if ($scope.pageType == 'pcdC') activeName = '_yucun_B';
    if ($scope.pageType == 'pcdD') activeName = '_99wxll_A';
    if ($scope.pageType == 'pcdE') activeName = '_99wxll_B';
    $scope.category = systemName + activeName + "_FlowPackages";

    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();

    $scope.stores = Math.round(Math.random() * 100);
    $scope.sold = Math.round(Math.random() * 5000);

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.pkgs = [
        {
            "message": "50",
            "network": "3.5",
            "oldPrice": "204.00",
            "productId": 252,
            "productName": "5折预存102/月（3.5G流量900分钟通话）",
            "salesPrice": "99.00",
            "talkTime": "900",
            "pkgType": "dkyc50"
        },
        {
            "message": "50",
            "network": "4.5",
            "oldPrice": "304.00",
            "productId": 254,
            "productName": "5折预存156/月（4.5G流量 1800分钟通话）",
            "salesPrice": "156.00",
            "talkTime": "1800",
            "pkgType": "dkyc100"
        },
        {
            "message": "50",
            "network": "4.5",
            "oldPrice": "259.00",
            "productId": 351,
            "productName": "155元/月(900分钟通话,4.5G流量,50短信)",
            "salesPrice": "155.00",
            "talkTime": "900",
            "pkgType": "dkyc100"
        },
        {
            "message": "50",
            "network": "2.5",
            "oldPrice": "174.00",
            "productId": 251,
            "productName": "5折预存101/月（2.5G流量 850分钟）",
            "salesPrice": "98.00",
            "talkTime": "850",
            "pkgType": "dkyc50"
        }
    ];

    if ($scope.pageType == 'pcd') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/index.html' + window.location.search,
            shareTitle: '翼分期商城——电信新入网套餐5折起',
            shareDisc: '中国电信流量大降价，9.9元办五折优惠套餐，3.5G全国流量，仅102元/月！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/1.jpg'
        };
    }
    if ($scope.pageType == 'pcdB') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/indexB.html' + window.location.search,
            shareTitle: '翼分期商城——电信新入网套餐存100赠840',
            shareDisc: '4G月租优惠套餐，最低仅102元/月，3.5G全国流量！限时限量，手快有！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/B/tx1.png'
        };
    }
    if ($scope.pageType == 'pcdC') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/indexB.html' + window.location.search,
            shareTitle: '翼分期商城——电信新入网套餐存100赠840',
            shareDisc: '4G月租优惠套餐，最低仅102元/月，3.5G全国流量！限时限量，手快有！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/B/tx1.png'
        };
    }
    if ($scope.pageType == 'pcdD') {
        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/spc/pcd/indexD.html' + window.location.search,
            shareTitle: '您有一张无限流量卡可以领取，今日办理，仅需99元！',
            shareDisc: '套餐包含：广东省内无限流量，全国3.5GB，全国通话900分钟！今日限100张！',
            picUrl: 'http://app.yfq.cn/spc/img/pcd/D/nativeShare.jpg'
        };
        $scope.activeTag = "99wxll";
    }

    var pkgUrl;

    if ($stateParams.cardId == "") {
        pkgUrl = cfApi.apiHost + "/product/getPackageInfo.html?productId=" + $scope.pkgs[0].productId + "&s=wap&callback=JSON_CALLBACK";
    } else {
        pkgUrl = cfApi.apiHost + "/product/getPackageInfo.html?productId=" + $stateParams.cardId + "&s=wap&callback=JSON_CALLBACK";
    }

    //console.log(pkgUrl);


    $http.jsonp(pkgUrl).success(function (data, status, headers, config) {
        $scope.card = data;
        $scope.totolPrice = data.salesPrice;
        $scope.showPrice = 50;

        if (data.productId == 254 || data.productId == 351) {
            $scope.showPrice = 100;
        }

    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.cardPay = true;

    $scope.buyType = 1;

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        $(".pay-item").removeClass("on");
        $("#payType" + id).addClass("on");
        wirtePayType(id);
    };

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

    function wirtePayType(payType) {
        value = payTypeAry[payType];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.setBuyType = function (event, type) {
        event.preventDefault();
        $scope.buyType = type;
        var $this = $(event.currentTarget);
        $this.parent().siblings().children().removeClass('curr');
        $this.addClass('curr');
        if (type == 0) {
            $scope.activeTag = "lj";
            $scope.totolPrice = $scope.phone.phonePrice;
            if ($scope.totolPrice < 1500) {
                $scope.setSbPayType(0, '一次性支付');
            }
        } else {
            $scope.totolPrice = $scope.phone.phoneBillPrice + $scope.phone.phonePrice;
            $scope.activeTag = "jjk";
        }
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        $scope.card = pkg;
        $scope.showPrice = 50;

        if (pkg.productId == 254 || pkg.productId == 351) {
            $scope.showPrice = 100;
        }
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on');
        $this.parent().addClass('on');
        $("#pickPackagePanel").slideUp();
    };

    $scope.checkPackage = function () {
        if (!$scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('.card-details');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#pickPackagePanel").slideDown();
            return false;
        }
        return true;
    };

    $scope.showPkgPn = function () {
        $("#pickPackagePanel").slideToggle();
    };

    $scope.selectedMifis = [];

    $scope.setItem = function (e, index, item) {
        $scope.mifis[index].selected = !$scope.mifis[index].selected;
        writebdLog($scope.category, "_SelectMIFI" + item.productId, "渠道号", $scope.gh); //选择mifi产品
    };

    $scope.$watch('mifis', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            $scope.selectedMifis = [];
            $scope.totalPrice = 200;
            $.each(n, function (i, k) {
                if (k.selected) {
                    $scope.totalPrice = $scope.totalPrice + k.salePrice;
                    $scope.selectedMifis.push(k.productId);
                }
            });
        }
    }, true);

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                 //选择默认内存
                 $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                 $scope.pkg = phone.packages[0];

                 $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                 $scope.mainPrice = phone.price;*/
            });
        }
    });

    $scope.$watch('card', function (n, o, $scope) {
        if (n !== o, n !== undefined) {
            $http.jsonp(cfApi.apiHost + "/product/getViewProductList.html?productId=" + n.productId + "&s=wap&callback=JSON_CALLBACK").success(function (data) {
                var mifis = [];
                $.each(data, function (i, k) {
                    mifis.push({
                        productId: k.productId,
                        productName: k.productName,
                        oldPrice: k.oldPrice,
                        salePrice: k.salePrice,
                        selected: false
                    });
                });

                $scope.mifis = mifis;
            });
        }
    });

    $scope.$watch('btnType', function (n, o, $scope) {
        if (n !== o && n !== undefined) {
            if (n) {
                var $form = $("#checkoutForm");
                $form.submit();
                writebdLog($scope.category, "_" + "BuyNowThree", "渠道号", $scope.gh);//立即支付
            }
        }
    });

    $scope.checkForms = function () {
        if ($scope.$root.checkActiveCode()) {

            //$("#checkoutForm").submit();

            var url = cfApi.apiHost + "/product/checkPhoneState.html?number=[" + $scope.checkoutForm.mainNumber.$modelValue + "," + $scope.checkoutForm.subNumber.$modelValue + "," + $scope.checkoutForm.thirdNumber.$modelValue + "]&s=wap&callback=JSON_CALLBACK";

            $scope.$root.toast.open();
            $http.jsonp(url).success(function (data, status, headers, config) {//查看号码是否被选
                if (data.tempIndexs.length === 0) {//查看号码是否被选
                    $http.jsonp(cfApi.apiHost + '/product/checkOrderCount.html?receiverMobile=' + $scope.checkoutForm.receiverMobile.$modelValue + '&productId=' + $scope.card.productId + '&category=' + $scope.category + '&s=wap&time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//查看是否下过单
                        if (data.result) {
                            $("#checkoutForm").submit();
                            $scope.$root.toast.close();
                            writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//立即支付
                        } else {
                            $scope.$root.appDialog.open('', '您已购买过该商品，确认要再买一单吗？');
                            $scope.$root.toast.close();
                        }
                    });
                } else {
                    $scope.$root.toast.close();
                    var html = "您选择的";
                    for (var i = 0; i < data.tempIndexs.length; i++) {
                        if (data.tempIndexs[i] === 0) {
                            html = html + "主卡电话号码：" + $scope.checkoutForm.mainNumber.$modelValue + "、";
                            $scope.mainNumberWarn = true;
                            //$scope.selectedData.mainNumber = "";
                        }
                        if (data.tempIndexs[i] === 1) {
                            html = html + "副卡1电话号码：" + $scope.checkoutForm.subNumber.$modelValue + "、";
                            $scope.subNumberWarn = true;
                            //$scope.selectedData.subNumber = "";
                        }
                        if (data.tempIndexs[i] === 2) {
                            html = html + "副卡2电话号码：" + $scope.checkoutForm.thirdNumber.$modelValue + "、";
                            $scope.thirdNumberWarn = true;
                            //$scope.selectedData.thirdNumber = "";
                        }
                    }
                    html = html + "已被选择，请重新选号！";
                    $scope.dialog.open("系统提示", html);
                }
            });

        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.submitMifi = function (e) {
        var $this = $(event.currentTarget);
        if ($this.hasClass("disabled")) {
            return false;
        }
        if (!$scope.checkMainNumber()) {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
            return false;
        }

        if (!$scope.checkSimType()) {
            return false;
        }

        if (!$scope.checkAddress()) {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
            return false;
        }

        $scope.checkForms();

    };

    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider',function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneDouble', { //app首页
            url: "/phs/db/:pageType/:phoneId",
            templateUrl: function ($stateParams){
                return 'pages/phone/phone-details/double/A/details.html';
            },
            controller: "pDoubleProController",
            onExit: function(){
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pDoubleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = $stateParams.pageType;

    $scope.activeTag = "mysy";
    
    $scope.appType = systemName + "_mysy_" + $scope.pageType+"_DoublePhones" ;
    $scope.category = $scope.appType;
    $scope.phoneQueryUrl = window.location.href;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.buyType = 1;

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=mysy&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.totolPrice = data.salePrice;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });


    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                //选择默认内存
                $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                $scope.pkg = phone.packages[0];

                $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                $scope.mainPrice = phone.price;*/
            });
        }
    });
    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phone', { //app首页
            url: "/:ghType/:pageType/:phoneId",
            //templateUrl: "pages/phone/phone-details/default/phone-details.html",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/' + $stateParams.ghType + '/details.html';
            },
            controller: "pProController"
        });
}]).controller('pProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore) {

    $scope.pageType = $stateParams.pageType;

    $scope.phone = Phone.get({
        phoneId: $stateParams.phoneId
    }, function (phone) {
        $scope.productId = phone.productId;

        $scope.appType = systemName + "_" + $scope.pageType + "_" + phone.phoneModel;
        //console.log($scope.appType);
        $scope.category = $scope.appType;
        writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
    });

    $cookieStore.put("phoneQueryUrl",window.location.href);
    if($cookieStore.get("phoneQueryUrl")){
        $scope.phoneQueryUrl = $cookieStore.get("phoneQueryUrl");
    };

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get('/data/phones/' + $scope.productId + '.json').success(function (phone) {
                $scope.phone = phone;

                //选择默认内存
                $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                $scope.pkg = phone.packages[0];

                $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                $scope.mainPrice = phone.price;
            });
        }
    });
    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneHu', { //app首页
            url: "/huPhones/:pageType/:phoneId",
            templateUrl: "pages/phone/phone-details/hu/phone-details.html",
            controller: "pProController"
        });
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneMo', { //app首页
            url: "/moPhones/:pageType/:phoneId",
            templateUrl: "pages/phone/phone-details/mo/phone-details.html",
            controller: "pProController"
        });
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('productC', { //app首页
            url: "/pd/productC",
            templateUrl: "pages/phoneCard/phoneCard-details/C/phoneCard-details.html",
            controller: "pdProController"
        });
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('product', { //app首页
            url: "/pd/:pageType/:productId",
            templateUrl: function ($stateParams){
                return 'pages/phoneCard/phoneCard-details/' + $stateParams.pageType + '/phoneCard-details.html';
            },
            controller: "pdProController"
        });
}]).controller('pdProController', ['$scope', '$rootScope', '$location', '$http', '$stateParams', function ($scope, $rootScope, $location, $http, $stateParams) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    $scope.pageType = $stateParams.pageType;

    $scope.appType = systemName + "_" + $scope.pageType + "phoneCard";
    $scope.category = $scope.appType;

    $scope.phone = [];

    $http.get("/data/phonePackage.json").success(function (data) {
        $scope.phone.packages = data;
        $scope.pkg = data[1];
    });

    $scope.$watch("pkg", function (n, o, scope) {
        if (n !== o) {
            $scope.mainPrice = n.price;
        }
    });
    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeBPhones', { //app首页
            url: "/phone/active/B/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/B/hotPhones/hotPhones.html';
            },
            controller: "pBctivePhonesController"
        });
}]).controller('pBctivePhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', '$compile', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore, $compile) {
    $scope.pageType = "B";
    $scope.activeTag = "jktchd";
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;

    var butie = "358:6388;359:5388;360:3880;361:2980;362:2400";

    $scope.payType = 0;

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/B' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    var $container = $(".content-scrollable");

    $scope.receiver = {
        name: $location.search().receiverName,
        mobile: $location.search().receiverMobile,
        city: "",
        room: ""
    };

    var $areaList = $(".area-list");

    writebdLog($scope.category, "_Order_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.setPayType = function (type) {
        $scope.payType = type;
        writebdLog($scope.category, "_PayType" + type, "渠道号", $scope.gh);//选择发货方式
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };


    /*$http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
     $scope.pkgs = data;

     }).error(function (data, status, headers, config) {
     console.log(status);
     //deferred.reject(status)
     });*/

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jktchd&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.phones = data;
        $scope.brands = [];
        $scope.brandsArry = [];
        $.each(data, function (i, k) {
            if ($scope.brandsArry.indexOf(k.brandName) == -1 && k.brandName != '') {
                var obj = {
                    brandName: k.brandName,
                    brandSort: k.brandSort

                };
                $scope.brandsArry.push(k.brandName);
                $scope.brands.push(obj);
            }
        });
        $scope.brands = $scope.brands.sort(function (a, b) {
            return a.brandSort - b.brandSort;
        });
        $scope.brand = $scope.brands[0];

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    function writeBrand(name) {

        if (name == '华为') name = 'huawei';
        if (name == '小米') name = 'mi';
        if (name == '美图') name = 'meitu';
        return name;
    }

    $scope.setMainPhoneBrand = function (e, myBrand) {
        $scope.brand = myBrand;
        writebdLog($scope.category, "_" + writeBrand(myBrand.brandName), "渠道号", $scope.gh);//选择的手机品牌
    };

    $scope.setMainPhone = function (e, phoneId) {
        $scope.phoneId = phoneId;
        writebdLog($scope.category, "_" + phoneId, "渠道号", $scope.gh);//选择的机型
    };

    $scope.setMainPhonePkg = function (e, pkg) {
        $scope.package = pkg;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择的套餐
    };

    $scope.setAddress = function (e, province, city, district, street) {
        $scope.receiver.city = province + city + district + street;
        $scope.addressShow = false;
    };

    $scope.getCity = function (e, province) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + province + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");

            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="getDistricts(e,\'' + province + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    $scope.hideAddress = function () {
        $scope.addressShow = false;
    };

    $scope.getStreet = function (e, province, city, district) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + province + "&city=" + city + "&district=" + district + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");
            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="setAddress(e,\'' + province + '\',\'' + city + '\',\'' + district + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    $scope.hideAddress = function () {
        $scope.addressShow = false;
    };

    $scope.getDistricts = function (e, province, city) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + province + "&city=" + city + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");

            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="getStreet(e,\'' + province + '\',\'' + city + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    //记录落地页输入的操作
    $scope.$root.writeReceiver = function () {
        writebdLog($scope.category, "_Address", "渠道号", $scope.gh); //输入地址
    };

    $scope.checkAddress = function () {
        $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.reciverName.$valid) {
            $(".input-name").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请输入正确的姓名！");
            return false;
        } else if (!$scope.couponForm.receiverMobile.$valid) {
            $(".input-mobile").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;
        } else if (!$scope.couponForm.receiverCity.$valid) {
            $(".input-city").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请选择收件区域！");
            return false;
        } else if (!$scope.couponForm.receiverRoom.$valid) {
            $(".input-room").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请输入详细地址！");
            return false;
        }

        $cookieStore.put("receiver", $scope.receiver);

        return true;
    };

    $scope.submit = function () {
        //$scope.$root.toast.open();
        if ($scope.checkMainNumber()) {
            if (!$scope.checkAddress()) {
                var $scrollTo = $('.quan-form');
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                });
                return false;
            }
            $scope.$root.toast.open();
            $("#couponForm").submit();
        }
        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//提交订单
    };

    $scope.$watch('brand', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $scope.brandPhones = [];
            $.each($scope.phones, function (i, k) {
                if (k.brandName != '' && k.brandName === n.brandName) {
                    $scope.brandPhones.push(k);
                }
            });
            $scope.phoneId = $scope.brandPhones[0].activityproductId;
        }
    }, true);

    $scope.$watch('phoneId', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {

                $scope.phone = data;

                $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
                    $scope.pkgs = data;

                    $scope.packageIndex = 0;

                    var cardItems = $scope.phone.cardItems.split(";").sort(function (a, b) {
                        return a.slice(a.indexOf(":") + 1, a.length) - b.slice(b.indexOf(":") + 1, b.length);
                    });


                    $scope.packages = [];

                    $.each(eval(cardItems), function (i, k) {
                        var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                        obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                        obj.comparePrices = $scope.phone.phoneBillPrice - obj.salesPrice;

                        $.each(eval(butie.split(";")), function (jtem, value) {
                            if (value.split(":")[0] == k.slice(0, k.indexOf(':'))) {
                                if ($scope.phone.salePrice > value.split(":")[1]) {
                                    obj.comparePrices = obj.oldPrice * 18 + ($scope.phone.salePrice - value.split(":")[1]);
                                } else {
                                    obj.comparePrices = obj.oldPrice * 18;
                                }
                            }
                        });

                        $scope.packages.push(obj);
                    });

                    for (var i = 1; i < $scope.packages.length; i++) {
                        if ($scope.packages[i].comparePrices < $scope.packages[$scope.packageIndex].comparePrices) {
                            $scope.packageIndex = i;
                        }
                    }

                    $scope.package = $scope.packages[$scope.packageIndex];

                }).error(function (data, status, headers, config) {
                    console.log(status);
                    //deferred.reject(status)
                });

                /*$scope.phone = data;
                 $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[0];
                 $scope.packages = [];
                 $scope.comparePrices = [];
                 $scope.packageIndex = 0;
                 var distance;
                 $.each(eval(data.cardItems.split(";")), function (i, k) {
                 var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                 obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                 $scope.packages.push(obj);
                 $scope.comparePrices.push(data.salePrice - obj.salesPrice);
                 });

                 for (var i = 1; i < $scope.comparePrices.length; i++) {
                 if(Math.abs($scope.comparePrices[i]) < Math.abs($scope.comparePrices[$scope.packageIndex])){
                 $scope.packageIndex = i;
                 }
                 }

                 $scope.package = $scope.packages[$scope.packageIndex];*/
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    }, true);

    $scope.$watch('package', function (n, o, $scope) {
        if (n != o) {
            $.each(eval(butie.split(";")), function (i, k) {
                if (k.split(":")[0] == n.productId) {
                    $scope.btp = k.split(":")[1];
                }
            });

            if ($scope.phone.salePrice > $scope.btp) {
                $scope.totalPrice = $scope.package.oldPrice * 18 + ($scope.phone.salePrice - $scope.btp);
            } else {
                $scope.totalPrice = $scope.package.oldPrice * 18;
            }

            //console.log(cardPrices.indexOf(n.productId));
            //var cp = cardPrices.substr(cardPrices.indexOf(n.productId));
            /*if (n.salesPrice >= $scope.phone.phoneBillPrice) {
             $scope.totalPrice = n.salesPrice;
             } else {
             $scope.totalPrice = $scope.phone.phoneBillPrice;
             }*/
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('BctiveSuccess', { //app首页
            url: "/phone/active/B/success",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/B/success/success.html';
            },
            controller: "pBctiveSController"
        });
}]).controller('pBctiveSController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = 'B';
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;


    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/B' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };
    
    $scope.getOrderQuery = function () {
    	writebdLog($scope.category, "_OrderQuery", "渠道号", $scope.gh);//订单查询
    };

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeCPhones', { //app首页
            url: "/phone/active/C/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/C/hotPhones/hotPhones.html';
            },
            controller: "pCctivePhonesController"
        });
}]).controller('pCctivePhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', '$compile', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore, $compile) {
    $location.path("/phone/active/D/phones");
    $scope.pageType = "C";
    $scope.activeTag = "jktchd";
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/C/phones';

    $scope.payType = 0;

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.paracont = "获取验证码";
    $scope.paraclass = "but_null";
    var second = 59, timePromise = undefined;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/C/phones' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    var $container = $(".content-scrollable");

    $scope.receiver = {
        name: "",
        mobile: "",
        city: "",
        room: ""
    };

    var $areaList = $(".area-list");

    writebdLog($scope.category, "_Order_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.setPayType = function (type) {
        $scope.payType = type;
        writebdLog($scope.category, "_PayType" + type, "渠道号", $scope.gh);//选择发货方式
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };


    $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.pkgs = data;

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jktchd&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.phones = data;
        $scope.brands = [];
        $scope.brandsArry = [];
        $.each(data, function (i, k) {
            if ($scope.brandsArry.indexOf(k.brandName) == -1 && k.brandName != '') {
                var obj = {
                    brandName: k.brandName,
                    brandSort: k.brandSort

                };
                $scope.brandsArry.push(k.brandName);
                $scope.brands.push(obj);
            }
        });
        $scope.brands = $scope.brands.sort(function (a, b) {
            return a.brandSort - b.brandSort;
        });
        $scope.brand = $scope.brands[0];

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    function writeBrand(name) {

        if (name == '华为') name = 'huawei';
        if (name == '小米') name = 'mi';
        if (name == '美图') name = 'meitu';
        return name;
    }

    $scope.setMainPhoneBrand = function (e, myBrand) {
        $scope.brand = myBrand;
        writebdLog($scope.category, "_" + writeBrand(myBrand.brandName), "渠道号", $scope.gh);//选择的手机品牌
    };

    $scope.setMainPhone = function (e, phoneId) {
        $scope.phoneId = phoneId;
        writebdLog($scope.category, "_" + phoneId, "渠道号", $scope.gh);//选择的机型
    };

    $scope.setMainPhonePkg = function (e, pkg) {
        $scope.package = pkg;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择的套餐
    };

    $scope.setAddress = function (e, province, city, district, street) {
        $scope.receiver.city = province + city + district + street;
        $scope.addressShow = false;
    };

    $scope.checkCouponActiveCode = function () {
        if (!$scope.couponForm.couponActiveCode.$valid) {
            $(".input-vcode").addClass("weui-cell_warn");
            return false;
        } else {
            if (!checkMobileCode($scope.receiver.mobile, $scope.coupon.activeCode)) {
                $(".input-vcode").removeClass("weui-cell_success");
                $(".input-vcode").addClass("weui-cell_warn");
                return false;
            }
            return true;
        }
    };

    $scope.checkCouponName = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.reciverName.$valid) {
            //alert("请输入联系电话");
            $(".input-name").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.checkCouponMobile = function () {
        $("#couponForm").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.receiverMobile.$valid) {
            //alert("请输入联系电话");
            $(".input-mobile").addClass("weui-cell_warn");
            return false;
        }

        return true;
    };

    $scope.getCouponActiveCode = function (event, phoneNumber) {
        if ($(event.currentTarget).hasClass("not")) {
            //scope.toast.close();
            return false;
        }

        $scope.$root.toast.openUnLimit();

        if (!$scope.checkCouponMobile()) {
            $scope.$root.toast.close();
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            return false;
        }
        $http.get("http://m.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
            if (data == "") {
                $scope.$root.toast.close();
                timePromise = $interval(function () {
                    if (second <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;

                        second = 59;
                        $scope.paracont = "重发验证码";
                        $scope.paraclass = "but_null";
                    } else {
                        $scope.paracont = second + "秒后可重发";
                        $scope.paraclass = "not but_null";
                        second--;

                    }
                }, 1000, 100);
            }
        });

        writebdLog($scope.category, "_VariIndexCode", "渠道号", $scope.gh); //获取下单页验证码
    };

    $scope.getStreet = function (e, province, city, district) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=street&province=" + province + "&city=" + city + "&district=" + district + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");
            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="setAddress(e,\'' + province + '\',\'' + city + '\',\'' + district + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    $scope.hideAddress = function () {
        $scope.addressShow = false;
    };

    $scope.getDistricts = function (e, province, city) {
        var _html = "";
        $http.jsonp(cfApi.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + province + "&city=" + city + "&callback=JSON_CALLBACK&s=wap").success(function (data, status, headers, config) {
            $areaList.html("");

            $.each(eval(data), function (i, field) {
                _html = _html + '<li><a ng-click="getStreet(e,\'' + province + '\',\'' + city + '\',\'' + field.name + '\')">' + field.name + '</a></li>';
            });
            $compile($areaList.append(_html))($scope);
            $scope.addressShow = true;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    //记录落地页输入的操作
    $scope.$root.writeReceiver = function () {
        writebdLog($scope.category, "_Address", "渠道号", $scope.gh); //输入地址
    };

    $scope.checkAddress = function () {
        $("#receiverAddress").find(".weui_cell").removeClass("weui-cell_warn");
        if (!$scope.couponForm.reciverName.$valid) {
            $scope.dialog.open("系统提示", "请输入正确的姓名！");
            $(".input-name").addClass("weui-cell_warn");
            return false;
        } else if (!$scope.couponForm.receiverMobile.$valid) {
            $scope.dialog.open("系统提示", "请输入正确的手机号码！");
            $(".input-mobile").addClass("weui-cell_warn");
            return false;
        } else if (!$scope.couponForm.receiverCity.$valid) {
            $(".input-city").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请选择收件区域！");
            return false;
        } else if (!$scope.couponForm.receiverRoom.$valid) {
            $(".input-room").addClass("weui-cell_warn");
            $scope.dialog.open("系统提示", "请输入详细地址！");
            return false;
        }

        $cookieStore.put("receiver", $scope.receiver);

        return true;
    };

    $scope.submit = function () {
        $scope.$root.toast.open();
        if ($scope.payType == 3) {

            if (!$scope.checkCouponName()) {
                $scope.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的姓名！");
                return false;
            }

            if (!$scope.checkCouponMobile()) {
                $scope.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的手机号码！");
                return false;
            }

            if (!$scope.checkCouponActiveCode()) {
                $scope.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的验证码！");
                return false;
            }
            $("#couponForm").submit();
        } else {
            if (!$scope.checkAddress()) {
                $scope.$root.toast.close();
                var $scrollTo = $('.quan-form');
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                });
                return false;
            }

            if (!$scope.checkCouponActiveCode()) {
                $scope.$root.toast.close();
                $scope.dialog.open("系统提示", "请输入正确的验证码！");
                var $scrollTo = $('.quan-form');
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                });
                return false;
            }
            $("#couponForm").submit();
        }

        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//提交订单
    };

    $scope.$watch('brand', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $scope.brandPhones = [];
            $.each($scope.phones, function (i, k) {
                if (k.brandName != '' && k.brandName === n.brandName) {
                    $scope.brandPhones.push(k);
                }
            });
            $scope.phoneId = $scope.brandPhones[0].activityproductId;
        }
    }, true);

    $scope.$watch('phoneId', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                $scope.phone = data;
                $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[0];
                $scope.packages = [];
                $scope.comparePrices = [];
                $scope.packageIndex = 0;
                var distance;
                $.each(eval(data.cardItems.split(";")), function (i, k) {
                    var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                    if (k.slice(k.indexOf(':') + 1, k.length) >= data.phoneBillPrice) {
                        obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                    } else {
                        obj.phonePrice = data.phoneBillPrice;
                    }
                    $scope.packages.push(obj);
                    $scope.comparePrices.push(data.salePrice - obj.salesPrice);
                });

                for (var i = 1; i < $scope.comparePrices.length; i++) {
                    if (Math.abs($scope.comparePrices[i]) < Math.abs($scope.comparePrices[$scope.packageIndex])) {
                        $scope.packageIndex = i;
                    }
                }

                $scope.package = $scope.packages[$scope.packageIndex];
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    }, true);

    var homeArgs = ['_InputIndexName', '_InputIndexNumber', '_InputIndexCode'];
    //记录落地页输入的操作
    $scope.$root.inputHomeArgs = function (type) {
        writebdLog($scope.category, homeArgs[type], "渠道号", $scope.gh); //输入操作
    };

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activePhones', { //app首页
            url: "/phone/active/A/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/A/hotPhones/hotPhones.html';
            },
            controller: "pActivePhonesController"
        });
}]).controller('pActivePhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = "A";
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    $scope.activePage = 'hotPhones';

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/A/phones';

    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/A' + window.location.search,
        shareTitle: '我领到1888元购机年终奖！年前换个好手机，开开心心回家过大年！',
        shareDisc: '苹果、OPPO、华为、VIVO等大牌手机直降！用券购再立减！戳我抢→',
        picUrl:'http://app.yfq.cn/images/active/share_active.jpg'
    };

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };

    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=lj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.$root.btNavItem = function (index) {
        writeBtNavItem(index);
    };

    var btNavItemName = ['_MyCoupon', '_MyOrder', '_CustConsult'];

    function writeBtNavItem(index) {
        writebdLog($scope.category, btNavItemName[index], "渠道号", $scope.gh);//选择模块
    }

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    }

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('CctiveSuccess', { //app首页
            url: "/phone/active/C/success",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/C/success/success.html';
            },
            controller: "pCctiveSController"
        });
}]).controller('pCctiveSController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = 'C';
    $scope.appType = systemName + "_xxyx_" + $scope.pageType;
    $scope.category = $scope.appType;


    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/C/phones' + window.location.search,
        shareTitle: '中国电信“0”机价即可拿iPhone，最高还送6388元话费！先到先得！',
        shareDisc: '多重优惠！广州地区可送货上门验机，今日下单可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/active/share_active-1.png'
    };

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };
    
    $scope.getOrderQuery = function () {
    	writebdLog($scope.category, "_OrderQuery", "渠道号", $scope.gh);//订单查询
    };

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('activeDPhones', { //app首页
            url: "/phone/active/D/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/D/hotPhones/hotPhones.html';
            },
            controller: "pDctivePhonesController"
        });
}]).controller('pDctivePhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = "D";
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;

    var cardPrices = "358:6012;359:5472;360:4662;361:3672;362:3132";
    var butie = "358:6388;359:5388;360:3880;361:2980;362:2400";

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D/phones';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl: 'http://app.yfq.cn/images/active/d/share_active.jpg'
    };

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };
    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=jjk&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;

        $scope.brands = [
            {
                "brandName": "全部",
                "brandSort": 0,
                "tag": false
            },
            {
                "brandName": "0元购机",
                "brandSort": 1,
                "tag": true
            },
            {
                "brandName": "iPhone",
                "brandSort": 2,
                "tag": false
            },
            {
                "brandName": "华为",
                "brandSort": 3,
                "tag": false
            },
            {
                "brandName": "OPPO",
                "brandSort": 4,
                "tag": false
            },
            {
                "brandName": "VIVO",
                "brandSort": 5,
                "tag": false
            },
            {
                "brandName": "小米",
                "brandSort": 6,
                "tag": false
            },
            {
                "brandName": "其它机型",
                "brandSort": 999,
                "tag": false
            }
        ];
        $scope.brand = $scope.brands[0];

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.$root.btNavItem = function (index) {
        writeBtNavItem(index);
    };

    $scope.showFqa = function () {
        $(".fqa-lists").toggleClass("close");
        $(".fqa-more").toggleClass("close");
    };

    var btNavItemName = ['_MyCoupon', '_MyOrder', '_CustConsult'];

    function writeBtNavItem(index) {
        writebdLog($scope.category, btNavItemName[index], "渠道号", $scope.gh);//选择模块
    }

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    $scope.$watch('brand', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $scope.brandPhones = [];
            if (n.brandName == "全部") {
                $scope.brandNavName = "选择类别";
            } else {
                $scope.brandNavName = n.brandName;
            }
            $.each($scope.singlePhones, function (i, k) {
                if (n.brandName == "" || n.brandName == "全部") {
                    $scope.brandPhones.push(k);
                } else if (n.brandName == "其它机型") {
                    if (k.brandName != "iPhone" && k.brandName != "华为" && k.brandName != "OPPO" && k.brandName != "VIVO" && k.brandName != "小米") {
                        $scope.brandPhones.push(k);
                    }
                } else if (n.brandName == "0元购机") {
                    if (k.cardItems == k.fanhuan) {
                        $scope.brandPhones.push(k);
                    }
                } else {
                    if (k.brandName === n.brandName) {
                        $scope.brandPhones.push(k);
                    }
                }
            });

            if(n.brandName == "0元购机"){
                $scope.brandPhones = ($scope.brandPhones).sort(function (a, b) {
                    return parseInt(a.cardItems) - parseInt(b.cardItems);
                })
            }
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('DctiveSuccess', { //app首页
            url: "/phone/active/D/success",
            templateUrl: function ($stateParams) {
                return 'pages/phone/active/D/success/success.html';
            },
            controller: "pDctiveSController"
        });
}]).controller('pDctiveSController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = 'D';
    $scope.appType = systemName + "_coupon_" + $scope.pageType;
    $scope.category = $scope.appType;


    $scope.params = window.location.search;

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl:'http://app.yfq.cn/images/active/d/share_active.jpg'
    };

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };
    
    $scope.getOrderQuery = function () {
    	writebdLog($scope.category, "_OrderQuery", "渠道号", $scope.gh);//订单查询
    };

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('ljADetail', { //app首页
            url: "/phs/lj/A/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/lj/A/detail/detail.html';
            },
            controller: "ljADetailController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('ljADetailController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', '$timeout', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore, $timeout) {

    /*$scope.cfConvertId = $location.search().cfConvertId;

     if($location.search().cfConvertId){
     $scope.cfConvertId = $location.search().cfConvertId;
     }else {
     $scope.cfConvertId = "";
     }*/

    $scope.pageType = 'A';
    $scope.activeTag = "ljzma";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D/phones';

    $scope.limitNo = 5;

    $scope.setlimitNo = function (num) {
        $scope.limitNo = num;
    };

    $scope.sold = Math.round(Math.random() * 50);

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_ljzm_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $container = $(".content-scrollable");

    $scope.productId = $stateParams.phoneId;

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=ljzma&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.imgUrls = [];

        for (var i = 0; i < data.phoneTypes[0].mediaProductList.length; i++) {
            $scope.imgUrls.push("http://www.yfq.cn:8899/fileserver/medias/" + data.phoneTypes[0].mediaProductList[i].mediaUrl);
        }

        $http.jsonp(cfApi.czHost + "/yfqcz/czInterfaceController.do?messageDetail&productId=" + $stateParams.phoneId + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            $scope.feedbacks = data;
            $scope.feedbackType = 'all';
        }).error(function (data, status, headers, config) {
            console.log(status);
        });

        $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=ljzma&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.singlePhones = data;

            $scope.hotPhones = [];
            $.each($scope.singlePhones, function (i, k) {
                if (Math.abs(k.salePrice - $scope.phone.salePrice) <= 1500) {
                    $scope.hotPhones.push(k);
                }
            });

            if ($scope.hotPhones.length < 6) {
                $.each($scope.singlePhones, function (i, k) {
                    if (i < 6 - $scope.hotPhones.length) {
                        $scope.hotPhones.push(k);
                    }
                    if (Math.abs(k.salePrice - $scope.phone.salePrice) > 1500) {
                        $scope.hotPhones.push(k);
                    }
                });
            }

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/phs/lj/A/' + $stateParams.phoneId + window.location.search,
            shareTitle: '想换' + $scope.phone.productName + '？这里全场降价后再享95折，先抢了再说！',
            shareDisc: 'iPhone、OPPO、华为各大品牌新品现货抢购，最高可享12期0息分期！',
            picUrl: 'http://www.yfq.cn:8899/fileserver/medias/' + $scope.phone.phoneTypes[0].mediaProductList[0].mediaUrl
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

    function wirtePayType(payType) {
        value = payTypeAry[payType];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.writebdLogByValue = function (value) {
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);
    };

    if ($location.search().duplicateNum) {
        if (Array.isArray($location.search().duplicateNum)) {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum[0] + "已被购买，请重新选择");
        } else {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
        }
    }

    $scope.setFlashDriver = function (event, flash) {
        var $this = $(event.currentTarget);
        if ($this.hasClass("disabled")) {
            return false;
        }
        $scope.productId = flash.productId;
        writebdLog($scope.category, "_FuselageMemory", "渠道号", $scope.gh);
        //window.location.href = 'http://' + window.location.host + '/phs/dj/A/' + flash.productId + window.location.search;
    };

    $scope.showActionsheet = function (element) {
        showTheActionSheet(element);
        writebdLog($scope.category, "_show" + element.replace("#", ""), "渠道号", $scope.gh);
    };

    $scope.hideActionsheet = function (element) {
        hideTheActionSheet(element);
        writebdLog($scope.category, "_hide" + element.replace("#", ""), "渠道号", $scope.gh);
    };

    $scope.makeSelected = function (event, element) {
        if ($(event.currentTarget).hasClass("disabled")) {
            return false;
        }
        var $scrollTo = $('.pay-container');
        $container.animate({
            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        });
        $scope.hideActionsheet(element);
    };

    $scope.checkForm = function () {

        var $form = $("#checkoutForm");
        if ($scope.$root.checkActiveCode()) {
            writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//立即支付
            $scope.$root.toast.open();

            $form.submit();
            /*_taq.push({convert_id: $scope.cfConvertId, event_type: "shopping"});*/
        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.seeAll = function () {
        $(".half").removeClass("half");
        $(".html-ft").hide();
    };

    $scope.payType = 0;
    $scope.payTypeName = "马上付款";

    $scope.loadedCheck = function () {
        if (!$scope.checkoutForm.reciverName.$valid) {
            //alert("请输入收件人");
            return false;
        } else if (!$scope.checkoutForm.receiverMobile.$valid) {
            //alert("请输入联系电话");
            return false;
        } else if (!$scope.checkoutForm.receiverCity.$valid) {
            //alert("请选择收件区域");
            return false;
        } else if (!$scope.checkoutForm.receiverRoom.$valid) {
            //alert("请输入详细地址");
            return false;
        }
        return true;
    };

    $timeout(function () {
        //console.log($scope.loadedCheck());
        if (!$scope.loadedCheck()) {
            $(".adr-tab").toggleClass("down");
            $("#receiverAddressPanel").slideDown();
        }
    });

    $scope.submitForm = function (event) {
        if ($(event.currentTarget).hasClass("disabled")) {
            return false;
        }
        if ($scope.checkAddress()) {
            $scope.checkForm();
        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.setFeedbackType = function (type) {
        $scope.feedbackType = type;
        writebdLog($scope.category, "_" + type, "渠道号", $scope.gh);//点击评价
    };

    $scope.goToDetail = function () {
        $("#scrollAnimate").animate({
            scrollTop: $(".dj-detail").offset().top - $("#scrollAnimate").offset().top + $("#scrollAnimate").scrollTop() - 50
        });
    };

    $("#scrollAnimate").bind('scroll', function (e) {
        var top1 = $(".dj-detail").offset().top - $(this).offset().top + $(this).scrollTop();
        var top2 = $(".dj-bottom").offset().top - $(this).offset().top + $(this).scrollTop() - $(this).height();
        if ($(this).scrollTop() >= top1 && $(this).scrollTop() <= top2) {
            $(".dj-detail").find(".weui-navbar").addClass("fixed-top");
        } else {
            $(".dj-detail").find(".weui-navbar").removeClass("fixed-top");
        }
    });

    $scope.$watch('feedbackType', function (n, o, $scope) {
        $scope.typeFeedbacks = [];
        if (n != undefined && n != o) {
            if ($scope.feedbacks.success) {
                if (n === 'all') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        $scope.typeFeedbacks.push(k);
                    });
                }
                if (n === 'best') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 >= 4) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
                if (n === 'good') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 > 2 && rate / 3 < 4) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
                if (n === 'bad') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 <= 2) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
            }
        }

    });

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&activeTag=ljzma&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                $scope.phone = data;

                var _colors = data.phoneTypes[0].mediaProductList;
                var _colorIndex = getIndex(data.phoneTypes[0].mediaProductList, "name", $scope.$root.mainColor.name);

                if (_colorIndex == undefined || data.phoneTypes[0].mediaProductList[_colorIndex].stock == 0) {
                    $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[getIndex(data.phoneTypes[0].mediaProductList, 'selected', 1)];
                } else {
                    $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[_colorIndex];
                }

                $scope.hotPhones = [];
                $.each($scope.singlePhones, function (i, k) {
                    if (Math.abs(k.salePrice - $scope.phone.salePrice) <= 1500) {
                        $scope.hotPhones.push(k);
                    }
                });

                if ($scope.hotPhones.length < 6) {
                    $.each($scope.singlePhones, function (i, k) {
                        if (i < 6 - $scope.hotPhones.length) {
                            $scope.hotPhones.push(k);
                        }
                        if (Math.abs(k.salePrice - $scope.phone.salePrice) > 1500) {
                            $scope.hotPhones.push(k);
                        }
                    });
                }

                $http.jsonp(cfApi.czHost + "/yfqcz/czInterfaceController.do?messageDetail&productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                    $scope.feedbacks = data;
                    $scope.feedbackType = 'all';
                }).error(function (data, status, headers, config) {
                    console.log(status);
                });

            }).error(function (data, status, headers, config) {
                console.log(status);
            });

            $scope.$root.share = {
                homeLink: 'http://app.yfq.cn/phs/lj/A/' + n + window.location.search,
                shareTitle: '想换' + $scope.phone.productName + '？这里全场降价后再享95折，先抢了再说！',
                shareDisc: 'iPhone、OPPO、华为各大品牌新品现货抢购，最高可享12期0息分期！',
                picUrl: 'http://www.yfq.cn:8899/fileserver/medias/' + $scope.phone.phoneTypes[0].mediaProductList[0].mediaUrl
            };

        }
    });

    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('ljIndexAPhones', { //app首页
            url: "/phone/lj/A/phones",
            templateUrl: function ($stateParams) {
                return 'pages/phone/lj/A/index/index.html';
            },
            controller: "ljIndexAPhonesController"
        });
}]).controller('ljIndexAPhonesController', ['$scope', '$location', '$http', '$stateParams', '$interval', '$timeout', '$cookieStore', function ($scope, $location, $http, $stateParams, $interval, $timeout, $cookieStore) {

    $scope.pageType = "A";
    $scope.appType = systemName + "_ljzm_" + $scope.pageType;
    $scope.category = $scope.appType;

    var cardPrices = "358:6012;359:5472;360:4662;361:3672;362:3132";
    var butie = "358:6388;359:5388;360:3880;361:2980;362:2400";

    $scope.activePage = 'hotPhones';

    $scope.params = window.location.search;

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/lj/A/phones';

    $scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/lj/A/phones' + window.location.search,
        shareTitle: '想换手机？这里全场降价后再享95折，先抢了再说！',
        shareDisc: 'iPhone、OPPO、华为各大品牌新品现货抢购，最高可享12期0息分期！',
        picUrl: 'http://app.yfq.cn/images/lj/share_active.jpg'
    };

    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.goToTop = function () {
        var $container = $('.content-scrollable');
        $container.animate({
            scrollTop: 0
        });
    };
    $http.jsonp(cfApi.apiHost + '/product/getProList.html?activeTag=ljzma&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;

        $scope.brands = [
            {
                "brandName": "全部",
                "brandSort": 0,
                "tag": false
            },
            {
                "brandName": "热门机型",
                "brandSort": 1,
                "tag": true
            },
            {
                "brandName": "iPhone",
                "brandSort": 2,
                "tag": false
            },
            {
                "brandName": "华为",
                "brandSort": 3,
                "tag": false
            },
            {
                "brandName": "OPPO",
                "brandSort": 4,
                "tag": false
            },
            {
                "brandName": "vivo",
                "brandSort": 5,
                "tag": false
            },
            {
                "brandName": "小米",
                "brandSort": 6,
                "tag": false
            },
            {
                "brandName": "其它机型",
                "brandSort": 999,
                "tag": false
            }
        ];

        if($cookieStore.get("brand")){
            $scope.brand = $cookieStore.get("brand");
            $scope.brandIndex = getIndex($scope.brands, "brandName", $scope.brand.brandName);
        }else {
            $scope.brand = $scope.brands[0];
        }

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.$root.btNavItem = function (index) {
        writeBtNavItem(index);
    };

    $scope.showFqa = function () {
        $(".fqa-lists").toggleClass("close");
        $(".fqa-more").toggleClass("close");
    };

    var btNavItemName = ['_MyCoupon', '_MyOrder', '_CustConsult'];

    function writeBtNavItem(index) {
        writebdLog($scope.category, btNavItemName[index], "渠道号", $scope.gh);//选择模块
    }

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $("img.lazy").lazyload({
            effect: "fadeIn",
            skip_invisible: false,
            container: $(".content-scrollable")
        });
    });

    $scope.setMachine = function (machine, productId) {
        writebdLog($scope.category, "_ClickGoods" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    $scope.$watch('brand', function (n, o, $scope) {
        if (o !== n && n !== undefined) {
            $scope.brandPhones = [];
            if (n.brandName == "全部") {
                $scope.brandNavName = "选择类别";
            } else {
                $scope.brandNavName = n.brandName;
            }
            $.each($scope.singlePhones, function (i, k) {
                if (n.brandName == "" || n.brandName == "全部") {
                    $scope.brandPhones.push(k);
                } else if (n.brandName == "其它机型") {
                    if (k.brandName != "iPhone" && k.brandName != "华为" && k.brandName != "OPPO" && k.brandName != "vivo" && k.brandName != "小米") {
                        $scope.brandPhones.push(k);
                    }
                } else if (n.brandName == "热门机型") {
                    if (k.ifHot == 1) {
                        $scope.brandPhones.push(k);
                    }
                } else {
                    if (k.brandName === n.brandName) {
                        $scope.brandPhones.push(k);
                    }
                }
            });
        }
    }, true);

}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneBSingle', { //app首页
            url: "/phs/sg/B/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/single/B/details.html';
            },
            controller: "pBSingleProController",
            onExit: function(){
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pBSingleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = 'B';
    $scope.activeTag = "jjk";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/B/phones';

    var headCategory = $location.search().headCategory;
    if(headCategory != undefined && headCategory != null)
	    $scope.category = headCategory + "_SinglePhones";
    else
    	$scope.category = systemName + "_mysy_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.package=$scope.phone.packageProductList[0];
        $scope.totolPrice = data.salePrice;
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });
    $scope.buyType = 1;
    $scope.activeTagName = "裸机送0元4G流量卡";

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        wirtePayType(id);
    };
    
    var value;
    var payTypeAry=['payAll','payCOD','payMonthly'];
    function wirtePayType(payType)
    {
    	value=payTypeAry[payType];
    	writebdLog($scope.category, "_"+value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.setBuyType = function (event, type, typeName) {
        event.preventDefault();
        $scope.buyType = type;
        var $this = $(event.currentTarget);
        $this.parent().siblings().children().removeClass('curr');
        $this.addClass('curr');
        if (type == 0) {
            $scope.activeTag = "lj";
            //$scope.totolPrice = $scope.phone.phonePrice;
            $scope.activeTagName = typeName;

            //if ($scope.totolPrice < 1500) {
            if($scope.payType == 2){
                $scope.setSbPayType(0, '一次性支付');
            }else {
                //$scope.setSbPayType(0, '一次性支付');
            }

            //}
        } else {
            $scope.activeTag = "jjk";
            $scope.activeTagName = typeName;
        }
        writebdLog($scope.category, "_SelectBuyType", "渠道号", $scope.gh);//选择购买方式
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on-cardetails');
        $this.parent().addClass('on-cardetails');
        $("#pickPackagePanel").slideUp();
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };

    $scope.checkPackage = function () {
        if (!scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('.card-details');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#pickPackagePanel").slideDown();
            return false;
        }
        return true;
    };

    $scope.showPkgPn = function () {
        $("#pickPackagePanel").slideToggle();
        writebdLog($scope.category, "_SelectBillPackage", "渠道号", $scope.gh);//选择话费套餐
    };

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                 //选择默认内存
                 $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                 $scope.pkg = phone.packages[0];

                 $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                 $scope.mainPrice = phone.price;*/
            });
        }
    });
    $scope.$watch('activeTag', function (n, o, $scope) {
        if (n != o) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                //$scope.phone = data;
                //$scope.package=$scope.phone.packageProductList[0];
                $scope.totolPrice = data.salePrice;
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    });
    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneASingle', { //app首页
            url: "/phs/sg/A/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/single/A/details.html';
            },
            controller: "pASingleProController",
            onExit: function(){
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pASingleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.pageType = 'A';
    $scope.activeTag = "jjk";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/A/phones';

    var headCategory = $location.search().headCategory;
    if(headCategory != undefined && headCategory != null)
	    $scope.category = headCategory + "_SinglePhones";
    else
    	$scope.category = systemName + "_mysy_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.package=$scope.phone.packageProductList[0];
        $scope.totolPrice = data.salePrice;
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });
    $scope.buyType = 1;
    $scope.activeTagName = "裸机送0元4G流量卡";

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        wirtePayType(id);
    };
    
    var value;
    var payTypeAry=['payAll','payCOD','payMonthly'];
    function wirtePayType(payType)
    {
    	value=payTypeAry[payType];
    	writebdLog($scope.category, "_"+value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.setBuyType = function (event, type, typeName) {
        event.preventDefault();
        $scope.buyType = type;
        var $this = $(event.currentTarget);
        $this.parent().siblings().children().removeClass('curr');
        $this.addClass('curr');
        if (type == 0) {
            $scope.activeTag = "lj";
            //$scope.totolPrice = $scope.phone.phonePrice;
            $scope.activeTagName = typeName;

            //if ($scope.totolPrice < 1500) {
            if($scope.payType == 2){
                $scope.setSbPayType(0, '一次性支付');
            }else {
                //$scope.setSbPayType(0, '一次性支付');
            }

            //}
        } else {
            $scope.activeTag = "jjk";
            $scope.activeTagName = typeName;
        }
        writebdLog($scope.category, "_SelectBuyType", "渠道号", $scope.gh);//选择购买方式
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on-cardetails');
        $this.parent().addClass('on-cardetails');
        $("#pickPackagePanel").slideUp();
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };

    $scope.checkPackage = function () {
        if (!scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('.card-details');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#pickPackagePanel").slideDown();
            return false;
        }
        return true;
    };

    $scope.showPkgPn = function () {
        $("#pickPackagePanel").slideToggle();
        writebdLog($scope.category, "_SelectBillPackage", "渠道号", $scope.gh);//选择话费套餐
    };

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.get(cfApi.apiHost + "/product/getProDetial.html?productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (phone) {
                /*$scope.phone = phone;

                 //选择默认内存
                 $scope.storage = phone.storages[getIndex(phone.storages, "curr")];

                 $scope.pkg = phone.packages[0];

                 $scope.phoneType = phone.phoneTypes[getIndex(phone.phoneTypes, "curr")];

                 $scope.mainPrice = phone.price;*/
            });
        }
    });
    $scope.$watch('activeTag', function (n, o, $scope) {
        if (n != o) {
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                //$scope.phone = data;
                //$scope.package=$scope.phone.packageProductList[0];
                $scope.totolPrice = data.salePrice;
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    });
    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneCSingle', { //app首页
            url: "/phs/sg/C/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/single/C/details.html';
            },
            controller: "pCSingleProController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pCSingleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', '$timeout', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore, $timeout) {

    $scope.pageType = 'C';
    $scope.activeTag = "jktchdd";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/C/phones';

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_coupon_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $container = $(".content-scrollable");

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.imgUrls = [];
        for (var i = 0; i < data.phoneTypes[0].mediaProductList.length; i++) {
            $scope.imgUrls.push("http://www.yfq.cn:8899/fileserver/medias/" + data.phoneTypes[0].mediaProductList[i].mediaUrl);
        }

        $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.pkgs = data;

            var cardItems = $scope.phone.cardItems.split(";").sort(function (a, b) {
                return a.slice(a.indexOf(":") + 1, a.length) - b.slice(b.indexOf(":") + 1, b.length);
            });


            $scope.packages = [];

            $.each(eval(cardItems), function (i, k) {
                var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                $scope.packages.push(obj);
                //$scope.comparePrices.push(data.salePrice - obj.salesPrice);
            });

            $scope.package = $scope.packages[0];

            if ($cookieStore.get('receiver')) {
                if ($cookieStore.get('receiver').city.indexOf('广州市') != -1) {
                    $scope.setDefaultPayType(0, "送货上门");
                } else {
                    $scope.setDefaultPayType(2, "信用卡分期");
                }
            } else {
                $scope.setDefaultPayType(2, "信用卡分期");
            }

            $(".phone-pkgs-item").eq(1).find(".pick-panel").addClass("show");

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });
    $scope.buyType = 1;
    $scope.activeTagName = "裸机";

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        wirtePayType(id);
    };

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

    function wirtePayType(payType) {
        value = payTypeAry[payType];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.setBuyType = function (event, type, typeName) {
        event.preventDefault();
        $scope.buyType = type;
        if (type == 0) {
            $scope.activeTag = "lj";
            //$scope.totolPrice = $scope.phone.phonePrice;
            $scope.activeTagName = typeName;

            //if ($scope.totolPrice < 1500) {
            if ($scope.payType == 2) {
                $scope.setSbPayType(0, '一次性支付');
            } else {
                //$scope.setSbPayType(0, '一次性支付');
            }

            //}
        } else {
            $scope.activeTag = "jjk";
            $scope.activeTagName = typeName;
        }
        writebdLog($scope.category, "_SelectBuyType", "渠道号", $scope.gh);//选择购买方式
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on-cardetails');
        $this.parent().addClass('on-cardetails');
        $("#pickPackagePanel").slideUp();
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };

    $scope.checkPackage = function () {
        if (!scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('.card-details');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#pickPackagePanel").slideDown();
            return false;
        }
        return true;
    };

    $scope.showPkgPn = function () {
        $(".card-details").slideToggle();
        writebdLog($scope.category, "_SelectBillPackage", "渠道号", $scope.gh);//选择话费套餐
    };

    //$scope.pkgAndNumber = $cookieStore.get('pkgAndNumber');
    if ($cookieStore.get('pkgAndNumber')) {
        $scope.pkgAndNumber = $cookieStore.get('pkgAndNumber');
    } else {
        $scope.pkgAndNumber = false;
    }

    $scope.checkForm = function () {

        var $form = $("#checkoutForm");
        if ($scope.$root.checkActiveCode()) {
            writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//立即支付
            $scope.$root.toast.open();

            $form.submit();
        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.submitForm = function (event) {
        if ($scope.checkMainNumber()) {
            if ($scope.checkAddress()) {
                $scope.checkForm();
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

    $scope.$watch('package', function (n, o, $scope) {
        if (n != o) {
            if (n.salesPrice >= $scope.phone.phoneBillPrice) {
                $scope.totalPrice = n.salesPrice;
            } else {
                $scope.totalPrice = $scope.phone.phoneBillPrice;
            }
        }
    }, true);

    $scope.$watch('receiver.city', function (n, o, $scope) {
        if (n.indexOf('广州市') != -1) {
            $scope.setDefaultPayType(0, "送货上门");
        }else {
            if($scope.payType == 0){
                $scope.setDefaultPayType(0, "一次性支付");
            }
        }
    });

    androidInputBugFix();
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneDSingle', { //app首页
            url: "/phs/sg/D/:phoneId",
            templateUrl: function ($stateParams) {
                return 'pages/phone/phone-details/single/D/details.html';
            },
            controller: "pDSingleProController",
            onExit: function () {
                $("#container").removeClass("overlay-open");
                $("#overlay-hook").html("");
            }
        });
}]).controller('pDSingleProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', '$cookieStore', '$timeout', function ($scope, $rootScope, $location, $stateParams, $http, Phone, $cookieStore, $timeout) {

    /*$scope.cfConvertId = $location.search().cfConvertId;

    if($location.search().cfConvertId){
        $scope.cfConvertId = $location.search().cfConvertId;
    }else {
        $scope.cfConvertId = "";
    }*/

    $scope.mp = $location.search().mp;

    $scope.pageType = 'D';
    $scope.activeTag = "jktchdd";

    var butie = "359:5388;360:3880;361:2980;362:2400";

    $scope.homeUrl = $location.protocol() + '://' + $location.host() + '/phone/active/D/phones';

    /*$scope.$root.share = {
        homeLink: 'http://app.yfq.cn/phone/active/D/phones' + window.location.search,
        shareTitle: '震惊！电信新入网，只要预存话费就可0元购机！领券最高再减800元！',
        shareDisc: '预存话费直抵购机价，信用卡用户在享0息分期，广州地区可即日送货上门验机后办理！',
        picUrl: 'http://app.yfq.cn/images/active/d/share_active.jpg'
    };*/

    $scope.sold = Math.round(Math.random() * 1000);

    var headCategory = $location.search().headCategory;
    if (headCategory != undefined && headCategory != null)
        $scope.category = headCategory + "_SinglePhones";
    else
        $scope.category = systemName + "_coupon_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $container = $(".content-scrollable");

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.html?productId=" + $stateParams.phoneId + "&activeTag=jjk&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;
        $scope.imgUrls = [];

        if ($scope.phone.activityproductId == 366) {
            $scope.phoneFlash = [
                {
                    "phoneId": 366,
                    "flash": 128
                },
                {
                    "phoneId": 367,
                    "flash": 256
                }
            ]
        }

        if ($scope.phone.activityproductId == 367) {
            $scope.phoneFlash = [
                {
                    "phoneId": 366,
                    "flash": 128
                },
                {
                    "phoneId": 367,
                    "flash": 256
                }
            ]
        }

        if ($scope.phone.activityproductId == 368) {
            $scope.phoneFlash = [
                {
                    "phoneId": 368,
                    "flash": 128
                },
                {
                    "phoneId": 369,
                    "flash": 256
                }
            ]
        }

        if ($scope.phone.activityproductId == 369) {
            $scope.phoneFlash = [
                {
                    "phoneId": 368,
                    "flash": 128
                },
                {
                    "phoneId": 369,
                    "flash": 256
                }
            ]
        }

        for (var i = 0; i < data.phoneTypes[0].mediaProductList.length; i++) {
            $scope.imgUrls.push("http://www.yfq.cn:8899/fileserver/medias/" + data.phoneTypes[0].mediaProductList[i].mediaUrl);
        }

        $http.jsonp(cfApi.apiHost + '/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.pkgs = data;

            $scope.packageIndex = 0;

            var cardItems = $scope.phone.cardItems.split(";").sort(function (a, b) {
                return a.slice(a.indexOf(":") + 1, a.length) - b.slice(b.indexOf(":") + 1, b.length);
            });


            $scope.packages = [];

            $.each(eval(cardItems), function (i, k) {
                var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                obj.comparePrices = $scope.phone.phoneBillPrice - obj.salesPrice;

                $.each(eval(butie.split(";")), function (jtem, value) {
                    if (value.split(":")[0] == k.slice(0, k.indexOf(':'))) {
                        if ($scope.phone.salePrice > value.split(":")[1]) {
                            obj.comparePrices = obj.oldPrice * 18 + ($scope.phone.salePrice - value.split(":")[1]);
                        } else {
                            obj.comparePrices = obj.oldPrice * 18;
                        }
                    }
                });

                $scope.packages.push(obj);
            });

            for (var i = 1; i < $scope.packages.length; i++) {
                if ($scope.packages[i].comparePrices < $scope.packages[$scope.packageIndex].comparePrices) {
                    $scope.packageIndex = i;
                }
            }

            $scope.package = $scope.packages[$scope.packageIndex];

            /*if($scope.packages[$scope.packageIndex]){

             }*/

            if ($cookieStore.get('receiver')) {
                if ($cookieStore.get('receiver').city.indexOf('广州市') != -1) {
                    $scope.setDefaultPayType(1, "货到付款");
                } else {
                    $scope.setDefaultPayType(0, "马上付款");
                }
            } else {
                $scope.setDefaultPayType(0, "马上付款");
            }

            $(".phone-pkgs-item").eq(1).find(".pick-panel").addClass("show");

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });

        $scope.$watch('receiver.city', function (n, o, $scope) {
            if (n != "") {
                if (n.indexOf('广州市') != -1) {
                    $scope.setDefaultPayType(1, "货到付款");
                } else {
                    if ($scope.payType == 1) {
                        $scope.setDefaultPayType(0, "马上付款");
                    }
                }
            } else {
                $scope.setDefaultPayType(0, "马上付款");
            }
        });

        $scope.$root.share = {
            homeLink: 'http://app.yfq.cn/phs/sg/D/' + $stateParams.phoneId + window.location.search,
            shareTitle: '想换手机？这里全场降价后再享95折，先抢了再说！',
            shareDisc: 'iPhone、OPPO、华为各大品牌新品现货抢购，最高可享12期0息分期！',
            picUrl: 'http://www.yfq.cn:8899/fileserver/medias/' + $scope.phone.phoneTypes[0].mediaProductList[0].mediaUrl
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    //初始化图片按需加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });
    $scope.buyType = 1;
    $scope.activeTagName = "裸机";

    $scope.setSbPayType = function (id, typeName) {
        $scope.payType = id;
        $scope.payTypeName = typeName;
        wirtePayType(id);
    };

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];

    function wirtePayType(payType) {
        value = payTypeAry[payType];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    }

    $scope.showNgFudai = function (state) {
        if (!state) {
            $scope.showFudai('JM-MX');
        }
    };

    if ($location.search().duplicateNum) {
        if (Array.isArray($location.search().duplicateNum)) {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum[0] + "已被购买，请重新选择");
        } else {
            $scope.dialog.open("系统提示", "您选择的号码：" + $location.search().duplicateNum + "已被购买，请重新选择");
        }
    }

    $scope.setFlashDriver = function (flash) {
        window.location.href = 'http://' + window.location.host + '/phs/sg/D/' + flash.phoneId + window.location.search;
    };

    $scope.setBuyType = function (event, type, typeName) {
        event.preventDefault();
        $scope.buyType = type;
        if (type == 0) {
            $scope.activeTag = "lj";
            //$scope.totolPrice = $scope.phone.phonePrice;
            $scope.activeTagName = typeName;

            //if ($scope.totolPrice < 1500) {
            if ($scope.payType == 2) {
                $scope.setSbPayType(0, '马上付款');
            } else {
                //$scope.setSbPayType(0, '一次性支付');
            }

            //}
        } else {
            $scope.activeTag = "jjk";
            $scope.activeTagName = typeName;
        }
        writebdLog($scope.category, "_SelectBuyType", "渠道号", $scope.gh);//选择购买方式
    };

    $scope.setPackage = function (event, pkg) {
        $scope.package = pkg;
        var $this = $(event.currentTarget);
        $this.parent().siblings().removeClass('on-cardetails');
        $this.parent().addClass('on-cardetails');
        $("#pickPackagePanel").slideUp();
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };

    $scope.checkPackage = function () {
        if (!$scope.checkoutForm.productId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
            var $scrollTo = $('.card-details');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
            });
            $("#pickPackagePanel").slideDown();
            return false;
        }
        return true;
    };

    $scope.showPkgPn = function () {
        $(".card-details").slideToggle();
        writebdLog($scope.category, "_SelectBillPackage", "渠道号", $scope.gh);//选择话费套餐
    };

    //$scope.pkgAndNumber = $cookieStore.get('pkgAndNumber');
    if ($cookieStore.get('pkgAndNumber')) {
        $scope.pkgAndNumber = $cookieStore.get('pkgAndNumber');
    } else {
        $scope.pkgAndNumber = false;
    }

    $scope.checkForm = function () {

        var $form = $("#checkoutForm");
        if ($scope.$root.checkActiveCode()) {
            writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//立即支付
            $scope.$root.toast.open();

            $form.submit();
            /*_taq.push({convert_id: $scope.cfConvertId, event_type: "shopping"});*/
        } else {
            var $scrollTo = $('#receiverAddress');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            });
            $("#receiverAddressPanel").slideDown();
            $(".adr-tab").addClass("down");
        }
    };

    $scope.loadedCheck = function () {
        if (!$scope.checkoutForm.reciverName.$valid) {
            //alert("请输入收件人");
            return false;
        } else if (!$scope.checkoutForm.receiverMobile.$valid) {
            //alert("请输入联系电话");
            return false;
        } else if (!$scope.checkoutForm.receiverCity.$valid) {
            //alert("请选择收件区域");
            return false;
        } else if (!$scope.checkoutForm.receiverRoom.$valid) {
            //alert("请输入详细地址");
            return false;
        }
        return true;
    };

    $timeout(function () {
        //console.log($scope.loadedCheck());
        if (!$scope.loadedCheck()) {
            $(".adr-tab").toggleClass("down");
            $("#receiverAddressPanel").slideDown();
        }
    });

    $scope.submitForm = function (event) {
        if ($scope.checkMainNumber()) {
            if ($scope.checkAddress()) {
                $scope.checkForm();
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

    //var cardPrices = "358:6012;359:5472;360:4662;361:3672;362:3132";

    $scope.$watch('package', function (n, o, $scope) {
        if (n != o) {
            $.each(eval(butie.split(";")), function (i, k) {
                if (k.split(":")[0] == n.productId) {
                    $scope.btp = k.split(":")[1];
                }
            });

            if ($scope.phone.salePrice > $scope.btp) {
                $scope.totalPrice = $scope.package.oldPrice * 18 + ($scope.phone.salePrice - $scope.btp);
            } else {
                $scope.totalPrice = $scope.package.oldPrice * 18;
            }

            //console.log(cardPrices.indexOf(n.productId));
            //var cp = cardPrices.substr(cardPrices.indexOf(n.productId));
            /*if (n.salesPrice >= $scope.phone.phoneBillPrice) {
             $scope.totalPrice = n.salesPrice;
             } else {
             $scope.totalPrice = $scope.phone.phoneBillPrice;
             }*/
        }
    }, true);

    androidInputBugFix();
>>>>>>> branch 'master' of https://github.com/pengcl/angular1-seed
}]);
