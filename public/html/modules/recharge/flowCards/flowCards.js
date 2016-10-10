'use strict';

app.directive("flowCards", ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: "modules/recharge/flowCards/flowCards.html",
        link: function (scope, element, attrs) {
            scope.getFlowCard = function (event, card) {
                event.preventDefault();
                scope.flowCard = card;
            };
            scope.$watch("receiverMobile", function (nv, ov, scope) {
                if (nv != ov) {
                    var url = "http://127.0.0.1:3099/api/getUserFlowCards/" + nv;
                    $http.get(url).success(function (data) {
                        scope.flowCards = data;
                    });
                }
            });
        }
    };
}]);