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