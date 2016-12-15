'use strict';

app.directive("cardPkg", ['$http', '$stateParams', '$q', function ($http, $stateParams, $q) {
    return {
        restrict: 'C',
        scope:{
            ssDd:"="
        },
        templateUrl: "modules/cardPackage/cardPkg.html",
        link: function (scope, element, attrs) {
            console.log(scope.ssDd);
                scope.openCardPkg=function(){
                    $(".card-pkg .card-p").show();
            }
                scope.closeCardPkg=function(){
                    console.log("t");
                    $(".card-pkg .card-p").hide();
                }
        }
    };

}]);