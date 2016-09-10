'use strict';

app.directive("phoneQuery", function () {
    return {
        restrict: 'E',
        templateUrl: "html/modules/phoneQuery/phoneQuery.html",
        controller: "phoneQueryController",
        link: function (scope, element, attrs) {

            //选择号码 对象类型
            scope.setNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');
                scope.numberItem = numberItem;
            };

            //监视号码数据变动
            scope.$watch('phoneData', function (newVal, oldVal, scope) {
                if (newVal !== oldVal) {
                    //console.log(newVal);
                }
            }, true);
        }
    };
}).controller('phoneQueryController', ['$scope', '$cookieStore', '$http', function ($scope, $cookieStore, $http) {
    $scope.phoneData = new Array();
    $http.jsonp('http://m.gd189fq.com/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $.each(eval(data), function (i, k) {
            if (k.t) {
                $scope.phoneData.push(k);
            }
        });
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });
}]);