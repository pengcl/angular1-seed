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