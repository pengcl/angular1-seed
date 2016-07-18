'use strict';

app.directive("reciverAddress", function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "html/modules/address/address.html"
    };
}).controller("addressController", function ($scope) {

    console.log($scope.receiver.name);

});