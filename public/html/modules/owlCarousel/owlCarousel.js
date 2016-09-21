'use strict';

app.directive("owlCarousel", ['$http','$compile', function ($http,$compile) {
    return {
        restrict: 'C',
        templateUrl: "modules/owlCarousel/owlCarousel.html",
        scope : {
            imgUrls : '='
        },
        link: function (scope, element, attrs) {
        }
    };
}]).directive("carouselItem", ['$http','$compile', function ($http,$compile) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if(scope.$last){
                console.log(scope.$last);
                $(element).parent().owlCarousel({
                    navigation : true, // Show next and prev buttons
                    slideSpeed : 300,
                    paginationSpeed : 400,
                    singleItem:true
                });
            }
        }
    };
}]);