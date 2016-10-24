
'use strict';

// Declare app level module which depends on views, and components

/* App Module */

var app = angular.module('app', ['ui.router', 'appServices', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters']);

var baseApiUri = "http://app.gd189fq.com:3099/api";

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise("/phones/256");
}]).run(['$rootScope', function ($rootScope) {



    /*$rootScope.$on('$locationChangeStart',function(){

    });

    $rootScope.$on('$locationChangeSuccess',function(){

    });*/
}]);

'use strict';

//全局统计
var systemName = "yfqapp";

var userTrack = function (category, action, gh, value) {

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

app.directive("activity", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/activity/activity.html",
        link: function (scope, element, attrs) {
            scope.activity = $location.search().activity;
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
                        scope.showPickNumberPanel(scope.currNumberIndex + 1,'selectNumber');
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

            scope.showPickNumberPanel = function (pos,isWrite) {
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
                    if(isWrite!='selectNumber')
                    {
	                    writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    } 
                }
            };

            scope.reChooseNumber = function () {
                scope.showPickNumberPanel(3,'selectNumber');
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
    $http.jsonp('http://m.gd189fq.com/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {
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

app.directive("flowFqa", ['$location', function ($location) {
    return {
        restrict: 'E',
        templateUrl: "modules/flowFqa/flowFqa.html",
        link: function (scope, element, attrs) {
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
                    $(".js_dialog").show();
                },
                close: function (url) {
                    $(".js_dialog").hide();
                }
            };
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

            if (scope.payType == 1) {
                scope.payTypeName = "下一步";
            } else if (scope.payType == 2) {
                scope.payTypeName = "货到付款";
            }
            else {
                scope.payTypeName = "立即支付";
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
                if (!$lastNumberSpan.hasClass("old")) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    //console.log(scope.currNumberIndex);
                    scope.showPickNumberPanel(scope.currNumberIndex);
                    return false;
                }
                return true;
            }

            scope.submitForm = function (event) {
                event.preventDefault();
                if (attrs.checkPhone == "true") {
                    if (checkPhoneNumber()) {
                        //writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    } else {
                        $scrollTo = $('#chooseNumber');
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                        return false;
                    }
                }
                if (scope.checkAddress()) {
                    //writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                    if (scope.checkActiveCode()) {
                        writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//立即支付
                        scope.$root.toast.open();
                        $form.submit();
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
                if (checkPhoneNumber()) {
                    scope.orderState = {
                        machineId: scope.phone.productId,
                        productId: scope.pkg.productId,
                        color: scope.color.colorName,
                        phoneNumber: scope.phoneNumber,
                        price: scope.mainPrice,
                        category: scope.category
                    };
                    $cookieStore.put("orderState", scope.orderState);
                    if (scope.checkActiveCode()) {
                        writebdLog(scope.category, "_BuyNow", "渠道号", scope.gh);//下一步
                        scope.$root.toast.open();
                        $form.submit();
                    }
                } else {
                    event.preventDefault();
                    scope.npShow(1);
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
            scope.gh = $location.search().gh;
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
            //console.log(element);

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
    $http.jsonp('http://m.gd189fq.com/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {
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

app.directive("topNav", ['$timeout', function ($timeout) {
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
            scope.back = function () {
                var $viewContainer = $(".view-container");
                //var $viewFrame = $(".view-frame");
                $viewContainer.addClass("ng-back");
                history.back();
                var timer = $timeout(function () {
                    $viewContainer.removeClass("ng-back");
                }, 600);
            };
            
            scope.done = function () {

            };
        }
    };
}]);
'use strict';

app.directive("overlay", ['$http','$compile', function ($http,$compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/overlay/overlay.html",
        link: function (scope, element, attrs) {
            var $overlayHook = $("#overlay-hook");
            var $container = $("#container");
            scope.$root.Overlay = {
                open: function(template) {
                    //console.log(scope.simList);
                    $compile($overlayHook.html(template))(scope);
                    $container.addClass("overlay-open");
                },
                openCompile: function(template) {
                    //console.log(scope.simList);
                    $compile($overlayHook.html(template))(scope);
                    $container.addClass("overlay-open");
                },
                close: function() {
                    $container.removeClass("overlay-open");
                    $overlayHook.html("");
                }
            };
            $(document).on('click','.js-close-overlay',function () {
                scope.$root.Overlay.close();
            })
        }
    };
}]);
'use strict';

app.directive("owlCarousel", ['$http','$compile', function ($http,$compile) {
    return {
        restrict: 'C',
        templateUrl: "modules/owlCarousel/owlCarousel.html",
        scope : {
            imgUrls : '='
        },
        link: function (scope, element, attrs) {
        }
    };
}]).directive("carouselItem", ['$http','$compile', function ($http,$compile) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if(scope.$last){
                $(element).parent().owlCarousel({
                    navigation : true, // Show next and prev buttons
                    slideSpeed : 300,
                    paginationSpeed : 400,
                    singleItem:true,
                    autoPlay:3000
                });
            }
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

app.directive("payType", ['$location', '$compile', '$q', function ($location, $compile, $q) {
    return {
        restrict: 'E',
        templateUrl: "modules/payType/payType.html",
        link: function (scope, element, attrs) {
            //模块标题
            scope.payTypeTitle = attrs.title;
            scope.payTypeSubTitle = attrs.subTitle;

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
            //var _payType = $location.search().payType;

            //判断是否有带支付方式参数，如果有，更改默认支付方式;
            /*if (_payType) {
             scope.setDefaultPayType(_payType);
             }*/

            //选择支付方式

            scope.setPayType = function (event, type) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    if (scope.checkAddress()) {

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
                        $("#payType").val(type);

                        if (type == 2) {
                            scope.showOverLay("payTipsPanel");
                            return;
                        } else {
                            //scope.$root.toast.open();
                        }

                        if (scope.checkActiveCode()) {
                            scope.$root.toast.open();
                            $form.submit();
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

            scope.$root.tipsSubmit = function () {
                if (scope.checkActiveCode()) {
                    scope.$root.toast.open();
                    $form.submit();
                }else {
                    scope.$root.Overlay.close();
                }
            };
            
            scope.$root.submitForm = function () {
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

            scope.paracont = "获取验证码";
            scope.paraclass = "but_null";
            var second = 59, timePromise = undefined;

            scope.getActiveCode = function (phoneNumber) {
                $http.get("http://app.yfq.cn:3099/api/getActiveCode/" + phoneNumber).success(function (data) {
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
            };

            scope.checkActiveCode = function () {
                if (!scope.checkoutForm.activeCode.$valid) {
                    $(".input-vcode").addClass("weui-cell_warn");
                    return false;
                } else {
                    if (!checkMobileCode(scope.activeCode)) {
                        $(".input-vcode").removeClass("weui-cell_success");
                        $(".input-vcode").addClass("weui-cell_warn");
                        return false;
                    }
                    return checkMobileCode(scope.activeCode);
                }
            };

            //获取地址数据
            var getArea = function (id, index, province, city, district) {
                var url, thisHtml;
                if (index === 0) {
                    url = "http://m.gd189fq.com/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date();
                } else if (index === 1) {
                    url = "http://m.gd189fq.com/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date();
                } else if (index === 2) {
                    url = "http://m.gd189fq.com/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date();
                } else {
                    url = "http://m.gd189fq.com/wap/comm/czCommonController/getRegion.html?need=street&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&district=" + encodeURI(district) + "&key=" + new Date();
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
                writebdLog(scope.category, "_Address", "渠道号", scope.gh);//收货地址
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
                    dataAreaShow(3);
                    tabShow(3);
                    value3 = $this.data("value");
                    getArea(dataVal, 3, value1, value2, value3);
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
            scope.redirectUrl = "http://" + $location.host() + $location.url();
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
            //console.log(attrs.addClass);

            //获取选择框尺码
            scope.size = attrs.size;

            //获取sim卡类型
            $http.get('/data/simType.json').success(function (data) {
                scope.simList = data;

                //设置默认值
                scope.simItem = data[0];
            });

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
                writebdLog(scope.category,"_SelectCardType","渠道号",scope.gh);//流量卡类型
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
                var m = Math.floor(t / 1000 / 60 % 60);
                var s = Math.floor(t / 1000 % 60);

                scope.timer = "<i>" + h + "</i>" + "<sub>时</sub>" + "<i>" + m + "</i>" + "<sub>分</sub>" + "<i>" + s + "</i>" + "<sub>秒</sub>";
                //scope.timer = "1";
                //console.log(scope.timer);
            };

            $interval(getRTime, 1000);
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
        .state('about', { //关于我们
            url: "/about",
            templateUrl: "pages/about/about.html",
            controller: "aboutController"
        });
}]).controller('aboutController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

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
        .state('paySuccess', { //app首页
            url: "/pay/:status",
            templateUrl: "pages/payStatus/payStatus.html",
            controller: "payController"
        });
}]).controller('payController', ['$scope', '$rootScope', '$location', '$stateParams', function ($scope, $rootScope, $location, $stateParams) {
    $scope.payStatus = $stateParams.status;
    $scope.orderNo = $location.search().orderNo;
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

app.directive("phoneQuery", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/phoneQuery.html",
        controller: "phoneQueryController",
        link: function (scope, element, attrs) {

            $container = $("#container");

            var _index;

            if($cookieStore.get("orderState")){
                var orderState = $cookieStore.get("orderState");
                scope.phoneNumber = orderState.phoneNumber;
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

            function checkPhoneNumber() {
                if (!scope.checkoutForm.phoneNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    return false;
                }
                return true;
            }

            scope.setNumberItem = function (event, numberItem) {
                event.preventDefault();
                scope.phoneNumber = numberItem.n;

                var $this = $(event.currentTarget);

                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');

                writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
            };

            scope.getNumber = function () {

                if (checkPhoneNumber()) {
                    scope.npHide();
                    var $scrollTo = $('#phoneQuery');
                    var $container = $(".content-scrollable");
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                } else {
                    scope.$root.dialog.open("", "请您选择号码！");
                }
            }
        }

    };
}]).controller('phoneQueryController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();

    $scope.phoneFilter = function (query) {
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

    $scope.inputNumber = function (query) {
        if (query == "") return;
        writebdLog($scope.category, '_InputNumber', "渠道号", $scope.gh);//输入查询号码
    }

    $http.jsonp('http://m.gd189fq.com/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {
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
                close: function () {
                    $loadingToast.hide();
                }
            };
            scope.$root.toast.close();
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

}]);
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
        .state('phoneIndexC', { //app首页
            url: "/phone/indexC",
            templateUrl: "pages/phone/index/index.html",
            controller: "pIndexController"
        });
}]).controller('pIndexController', ['$scope', '$location', function ($scope, $location) {


    var _path,_version;
    _path = $location.path();
    if(_path == "/phone/indexC"){
        _version = "C";
    }
    if(_path == "/phone/indexD"){
        _version = "D";
    }
    if(_path == "/phone/indexD"){
        _version = "E";
    }
    $scope.appType = systemName + "_" + _version + "_index";
    $scope.category = $scope.appType;

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        container: $(".content-scrollable")
    });

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
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
    $scope.appType = systemName+"_FlowPackage";
    $scope.category = $scope.appType;

    writebdLog($scope.category,"_Load","渠道号",$scope.gh);//页面载入
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneIndexD', { //app首页
            url: "/phone/indexD",
            templateUrl: "pages/phone/index/D/index.html",
            controller: "pIndexController"
        });
}]);
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneIndexN', { //app首页
            url: "/phone/indexE",
            templateUrl: "pages/phone/index/E/index.html",
            controller: "pIndexController"
        });
}]);
/*
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneB', { //app首页
            url: "/phones/B/:phoneId",
            templateUrl: "pages/phone/phone-details/B/phone-details.html",
            controller: "pProController"
        });
}]);*/

/*
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneC', { //app首页
            url: "/phones/C/:phoneId",
            templateUrl: "pages/phone/phone-details/C/phone-details.html",
            controller: "pProController"
        });
}]);*/

/*
"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phoneD', { //app首页
            url: "/phones/D/:phoneId",
            templateUrl: "pages/phone/phone-details/D/phone-details.html",
            controller: "pProController"
        });
}]);*/

"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('phone', { //app首页
            url: "/phones/:pageType/:phoneId",
            templateUrl: "pages/phone/phone-details/default/phone-details.html",
            controller: "pProController"
        });
}]).controller('pProController', ['$scope', '$rootScope', '$location', '$stateParams', '$http', 'Phone', function ($scope, $rootScope, $location, $stateParams, $http, Phone) {

    $scope.phone = Phone.get({
        phoneId: $stateParams.phoneId
    }, function (phone) {
        $scope.productId = phone.productId;

        $scope.appType = systemName + "_" + $stateParams.pageType + "_" + phone.phoneModel;
        //console.log($scope.appType);
        $scope.category = $scope.appType;
        writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
    });

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
        .state('product', { //app首页
            url: "/pd/product",
            templateUrl: "pages/phoneCard/phoneCard-details/default/phoneCard-details.html",
            controller: "pdProController"
        });
}]).controller('pdProController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    //$scope.pageTitle = "首页";
    //$scope.$root.title = $scope.pageTitle;

    $scope.appType = "feeV2";
    $scope.category = $scope.appType;
}]);