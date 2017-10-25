'use strict';

app.directive("autoNumber", ["$cookieStore", '$http', function ($cookieStore, $http) {
    return {
        restrict: 'E',
        templateUrl: "modules/autoNumber/autoNumber.html",
        link: function (scope, element, attrs) {

            scope.rechs = function (index, len) {
                var randIndex = parseInt(Math.random() * len);
                if (randIndex !== index && randIndex + 1 !== index) {
                    return randIndex;
                } else {
                    return rechs(index, len);
                }
            };

            $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
                var _data = [];
                var inputData1 = [];
                $.each(eval(data), function (i, k) {
                    if (k.s <= 800) {
                        if (k.t == 0) {
                            _data.push(k);
                        }
                    }
                });

                $.each(_data, function (i, k) {
                    if (k.fee == 0) {
                        inputData1.push(k);
                    }
                });

                scope.$watch('_mainNumber', function (n, o, scope) {
                    var index1 = scope.rechs(getIndex(inputData1, 'n', n), inputData1.length - 2);
                    var index2 = index1 + 1;
                    scope.subNumber = inputData1[index1].n;
                    scope.thirdNumber = inputData1[index2].n;
                    //console.log(scope.subNumber, scope.thirdNumber);
                })
            });
        }
    };
}]);