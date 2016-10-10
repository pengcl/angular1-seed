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