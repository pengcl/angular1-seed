'use strict';

app.directive("chooseNumber", ["$compile", function ($compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/chooseNumber/chooseNumber.html",
        controller: "chooseNumberController",
        link: function (scope, element) {
            //scope.pageClass = "hide-checkbox";
            $compile($(".number-list").clone().appendTo(".page"))(scope);
            $(".choose-number .number-list").remove();

            var $span = $("#number-select span");
            var $numberList = $(".number-list");
            var $table = $numberList.find("table");
            var curr;

            scope.selectNumber = function (k, e) {
                if ($(e.target).hasClass("active")) {
                    var j, numLast, number;
                    $span.eq(curr).attr("date-value", k);
                    $span.eq(curr).html(k);
                    $span.eq(curr).attr("class", "old");
                    $span.eq(curr + 1).attr("class", "curr");
                    if (curr < 10) {
                        scope.showPickNumberPanel(curr + 1);
                        $("#num-sure").removeClass("active");
                        $("#num-reset").removeClass("active");
                        return true;
                    }
                    if (curr == 10) {
                        numLast = "";
                        for (j = 0; j < 11; j++) {
                            numLast = numLast + $span.eq(j).attr("date-value");
                        }
                        number = numLast;
                        scope.mainPhoneNumber = number;

                        $("#num-sure").addClass("active");
                        $("#num-reset").addClass("active");
                        $numberList.slideUp();
                    }
                } else {
                    return false;
                }
            };

            scope.showPickNumberPanel = function (pos) {
                var i, numNow;
                numNow = "";
                curr = pos;

                $span.eq(pos).nextAll("span").attr("class", "future");
                $span.eq(pos - 1).nextAll("span").html("?");
                $span.eq(pos - 1).nextAll("span").attr("date-value", "");
                $table.find("td").find("a").attr("class", "");
                for (i = 0; i < pos; i++) {
                    numNow = numNow + $span.eq(i).attr("date-value");
                }
                var jsonDs = getNumArr(numNow, scope.phoneData);
                $table.find("td").find("a").removeClass("active");
                if ($span.eq(i - 1).attr("date-value") == "") {
                    return false;
                } else {
                    $span.eq(pos).attr("class", "curr");
                    $.each(eval(jsonDs), function (v, k) {
                        if (k == 0) {
                            $table.find("td").eq(10).find("a").attr("class", "active");
                        } else {
                            $table.find("td").eq(k - 1).find("a").attr("class", "active");
                        }
                    });
                    $numberList.slideDown();
                }
            };
            scope.$watch('phoneData', function (newVal, oldVal, scope) {
                if (newVal !== oldVal) {
                    //scope.showPickNumberPanel(3);
                }
            }, true);
        }
    };
}]).controller('chooseNumberController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $http.jsonp('http://m.gd189fq.com/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $.each(eval(data), function (i, k) {
            if (!k.t) {
                $scope.phoneData.push(k);
            }
        });
        //$scope.showPickNumberPanel(3);
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);