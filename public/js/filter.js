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