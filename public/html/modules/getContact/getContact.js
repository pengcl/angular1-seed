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
