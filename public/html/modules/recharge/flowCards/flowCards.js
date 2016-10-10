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