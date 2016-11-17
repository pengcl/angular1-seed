'use strict';

app.directive("mainNumber", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'E',
        templateUrl: "modules/common/phoneQuery/mainNumber/n.html",
        controller: "numberController",
        link: function (scope, element, attrs) {

            /*$container = $("#container");*/

            scope.checkPhone = function () {
                if (!scope.checkoutForm.phoneNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    return false;
                }
                return true;
            };

            scope.setMainNumber = function (event, numberItem) {
                event.preventDefault();
                scope.mainNumber = numberItem.n;

                var $this = $(event.currentTarget);

                $this.parent().siblings().children().removeClass('curr');
                $this.addClass('curr');

                writebdLog(scope.category, "_SelectNumber", "渠道号", scope.gh);//选择号码
            };

            /*scope.getNumber = function () {
                if (scope.checkPhone()) {
                    scope.npHide();
                    var $scrollTo = $('#phoneQuery');
                    var $container = $(".content-scrollable");
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });

                    writebdLog(scope.category, "_ConfirmNumber", "渠道号", scope.gh);//确认号码
                } else {
                    scope.$root.dialog.open("", "请您选择号码！");
                }
            }*/
        }
    };
}]).controller('numberController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();

    $scope.phoneFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.items = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp('http://m.gd189fq.com/wap/taokafanghaoNew/fetchNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码
        $.each(eval(data), function (i, k) {
            if (!k.t) {
                $scope.phoneData.push(k);
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.pageSize = 10;
        //$scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数

        //$scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        //$scope.pageList = [];
        //$scope.selPage = 1;

        //设置数据源(分页)
        $scope.setData = function () {
            $scope.items = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
        };

        $scope.items = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        };
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
            writebdLog($scope.category, "_ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);