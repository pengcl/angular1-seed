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