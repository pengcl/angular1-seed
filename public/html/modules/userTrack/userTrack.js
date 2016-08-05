'use strict';

app.directive("track", function () {
    return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attr) {
            var userEvent = attr.track;
            if (userEvent === 'change') {
                scope.$watch(attr.ngModel, function (v) {
                    if (v !== undefined) {
                        console.log('value changed, new value is: ' + v);
                    }
                });
            } else if (userEvent === 'click') {
                console.log("1");
            }
        }
    };
});