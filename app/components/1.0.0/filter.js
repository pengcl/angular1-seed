'use strict';

/* Filters */
appFilters.filter('trustHtml', function ($sce) {
  return function (text) {
    return $sce.trustAsHtml(text);
  };
});

appFilters.filter('MB', function () {
  return function (kb) {
    var m = 1024;
    //sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    //i = Math.floor(Math.log(kb) / Math.log(m));
    return (kb / m);
  };
});

appFilters.filter('replaceS', function () {
  return function (input,key) {
    if(key != undefined || key !=null || key !=""){
      return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
    }else{

    }
  };
});

appFilters.filter('replaceInput', function () {
  return function (input,key) {
    if(key != undefined && key !=""){
      return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
    }else{
      return input;
    }
  };
});

appFilters.filter('onlyNumber', function () {
  return function (input) {
    return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
  };
});
