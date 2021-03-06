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
            var $lastNumberSpan = $("#number-select span:last-child");

            scope.currNumberIndex = 3;

            scope.closeNumberList = function () {
                $numberList.slideUp();
            };

            scope.selectNumber = function (k, e) {
                if ($(e.target).hasClass("active")) {
                    var j, numLast, number;
                    $span.eq(scope.currNumberIndex).attr("date-value", k);
                    $span.eq(scope.currNumberIndex).html(k);
                    $span.eq(scope.currNumberIndex).attr("class", "old");
                    $span.eq(scope.currNumberIndex + 1).attr("class", "curr");
                    if (scope.currNumberIndex < 10) {
                        scope.showPickNumberPanel(scope.currNumberIndex + 1, 'selectNumber');
                        $("#num-sure").removeClass("active");
                        $("#num-reset").removeClass("active");
                        return true;
                    }
                    if (scope.currNumberIndex == 10) {
                        numLast = "";
                        for (j = 0; j < 11; j++) {
                            numLast = numLast + $span.eq(j).attr("date-value");
                        }
                        number = numLast;
                        scope.phoneNumber = number;

                        $("#num-sure").addClass("active");
                        $("#num-reset").addClass("active");
                        $numberList.slideUp();
                    }
                } else {
                    return false;
                }

            };

            scope.showPickNumberPanel = function (pos, isWrite) {
                var i, numNow;
                numNow = "";
                scope.currNumberIndex = pos;

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
                    //如果是输入号码，不需要记录行为 
                    if (isWrite != 'selectNumber') {
                        writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
                    }
                }
            };

            scope.checkPhone = function () {
                if (!$lastNumberSpan.hasClass("old")) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    //console.log(scope.currNumberIndex);
                    scope.showPickNumberPanel(scope.currNumberIndex);
                    return false;
                }
                return true;
            };

            scope.reChooseNumber = function () {
                scope.showPickNumberPanel(3, 'selectNumber');
                writebdLog(scope.category, "_AgainNumber", "渠道号", scope.gh);//重新选号
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
    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {
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