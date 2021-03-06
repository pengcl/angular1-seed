'use strict';

app.directive("appNumber", ["$cookieStore", '$timeout', function ($cookieStore, $timeout) {
    return {
        restrict: 'E',
        scope: {
            inputData: '=',
            outputData: '=',
            selectedData: '=',
            autoSelect: '='
        },
        templateUrl: "modules/common/phoneQuery/number/number.html",
        link: function (scope, element, attrs) {

            scope.pageSize = 6;

            scope.numberType = attrs.numberType;

            scope.setNumber = function (event, numberType, number) {
                var $this = $(event.currentTarget);
                if ($this.hasClass('disabled')) {
                    return false;
                }
                scope.outputData = {
                    numberType: numberType,
                    number: number
                };
                scope.thisNumber = {
                    numberType: numberType,
                    number: number
                };
            };

            scope.dataInit = function () {
                scope.selPage = 1;
                scope.pages = Math.ceil(scope.numbers.length / scope.pageSize); //分页数
                scope.items = scope.numbers.slice(0, scope.pageSize);

                //console.log(scope.outputData);
            };

            scope.setData = function () {
                scope.items = scope.numbers.slice((scope.pageSize * (scope.selPage - 1)), (scope.selPage * scope.pageSize));
            };

            scope.selectPage = function (page) {
                //不能小于1大于最大
                if (page < 1 || page > scope.pages) return;

                scope.selPage = page;
                scope.setData();
            };

            //上一页
            scope.Previous = function () {
                scope.selectPage(scope.selPage - 1);
            };
            //下一页
            scope.Next = function () {
                scope.selectPage(scope.selPage + 1);
            };

            scope.$watch('inputData', function (n, o, scope) {
                if (n !== o && n !== undefined) {
                    scope.numbers = n;
                    scope.dataInit();

                    var randIndex = parseInt(Math.random() * n.length);

                    if (scope.autoSelect) {
                        if (scope.numberType === 'mainNumber') {
                            scope.outputData = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                        }
                        $timeout(function () {
                            if (scope.numberType === 'subNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                            }
                        });
                        $timeout(function () {
                            if (scope.numberType === 'thirdNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                            }
                        });
                    }

                }
            }, true);

            scope.$watch('autoSelect', function (n, o, scope) {
                if (n !== o && n !== undefined) {
                    if (n) {

                        var randIndex = parseInt(Math.random() * n.length);
                        if (scope.numberType === 'mainNumber') {
                            scope.outputData = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                        }
                        if (scope.numberType === 'subNumber') {
                            scope.outputData = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType,
                                number: scope.numbers[randIndex]
                            };
                        }
                        $timeout(function () {
                            if (scope.numberType === 'thirdNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType,
                                    number: scope.numbers[randIndex]
                                };
                            }
                        });
                    } else {
                        if (scope.numberType === 'mainNumber') {
                            scope.outputData = {
                                numberType: scope.numberType
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType
                            };
                        }
                        if (scope.numberType === 'subNumber') {
                            scope.outputData = {
                                numberType: scope.numberType
                            };
                            scope.thisNumber = {
                                numberType: scope.numberType
                            };
                        }
                        $timeout(function () {
                            if (scope.numberType === 'thirdNumber') {
                                scope.outputData = {
                                    numberType: scope.numberType
                                };
                                scope.thisNumber = {
                                    numberType: scope.numberType
                                };
                            }
                        });
                    }
                }
            });
        }
    };
}]);