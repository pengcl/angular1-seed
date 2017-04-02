'use strict';

app.directive("phoneCPackage", ['$http', '$stateParams', '$q', '$cookieStore', '$location', function ($http, $stateParams, $q, $cookieStore, $location) {
    return {
        restrict: 'E',
        templateUrl: "modules/phonePackage/c/d.html",
        controller: "numberCController",
        link: function (scope, element, attrs) {

            //模块标题
            scope.packageTitle = attrs.title;
            scope.packageSubTitle = attrs.subTitle;
            scope.packageType = attrs.type;
            scope.class = attrs.addClass;
            scope.visibility = attrs.visibility;

            var $container = $('.content-scrollable');

            scope.queryNumber = true;

            if (scope.visibility === "false") {
                $(element).addClass("hide");
            }

            //获取选择框尺码
            //scope.size = attrs.size;

            //获取timer值 布尔类型
            scope.showTime = attrs.showTime;

            scope.reChoose = function () {
                scope.queryNumber = true;
            };


            //选择号码 对象类型
            scope.setPhonePackage = function (event, pkg) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                /*if ($this.hasClass("curr")) {
                 return false;
                 }*/
                scope.package = pkg;
                $(".pick-panel").hide();
                scope.pickPanelShow = true;
                $this.siblings(".pick-number").find(".pick-panel").show();
                scope.queryNumber = true;

                writebdLog(scope.category, "_SelectPackage", "渠道号", scope.gh);//选择套餐
            };

            scope.showOverLay = function (targetId) {
                var targetHtml = $("#" + targetId).html();
                scope.$root.Overlay.open(targetHtml);
                writebdLog(scope.category, "_IsContractPackage", "渠道号", scope.gh);//合约套餐介绍
            };


            var $container = $('.content-scrollable');

            scope.$root.checkMainNumber = function () {
                if (!scope.checkoutForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#phonePackage');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.$root.checkMainProductId = function () {
                if (!scope.checkoutForm.mainProductId.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    var $scrollTo = $('#pickPackagePanel');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 50
                    });
                    return false;
                }
                return true;
            };

            scope.setMainNumber = function (event, numberItem) {
                event.preventDefault();
                var $this = $(event.currentTarget);

                if (checkSameNumber(numberItem.n, scope.subNumber)) {
                    scope.mainNumber = numberItem.n;
                    scope.queryNumber = false;
                    writebdLog(scope.category, "_mainSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }

            };

            scope.showMNumberPn = function (event) {
                if (!(attrs.noAnimate == "true")) {
                    $("#pickMainNumberPanel").slideToggle();
                    $(event.currentTarget).toggleClass("down");
                }
                writebdLog(scope.category, "_mainCuteNumber", "渠道号", scope.gh);//选择主卡靓号
            };

            scope.ok = function () {
                if (!scope.$root.checkMainProductId()) {
                    scope.$root.dialog.open('系统提示', '请选择套餐');
                }
                if (!scope.$root.checkMainNumber()) {
                    scope.$root.dialog.open('系统提示', '请选择手机号码');
                }

                $cookieStore.put('pkgAndNumber', {
                    pkg: scope.pkg,
                    number: scope.mainNumber
                });

                $location.path('/phs/sg/C/' + $stateParams.phoneId);
            }

        }
    };
}]).controller('numberCController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $scope.phoneSubData = new Array();

    $scope.phoneMainFilter = function (query) {//查询包含query的手机号码;
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
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.phoneSubFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneSubData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterSubData = _data;
        } else {
            $scope.filterSubData = $scope.phoneSubData;
        }
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query, type) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_' + type + 'InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp(cfApi.apiHost + '/wap/taokafanghaoNew/fetchLuckNumber.html?time=' + new Date().getTime() + '&callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码

        data = data.sort(function (a, b) {
            return b.s - a.s;
        });

        $.each(eval(data), function (i, k) {
            if (k.s <= 800) {
                $scope.phoneData.push(k);
                if (k.t == 0) {
                    $scope.phoneSubData.push(k);
                }
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
        $scope.filterSubData = $scope.phoneSubData;
        $scope.pageSize = 6;

        //设置数据源(分页)
        $scope.setData = function (type) {
            if (type == "main") {
                $scope.mainItems = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
            else {
                $scope.subItems = $scope.filterSubData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
        };

        //初始化数据
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page, type) {
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
            $scope.setData(type);
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function (type) {
            $scope.selectPage($scope.selPage - 1, type);
        };
        //下一页
        $scope.Next = function (type) {
            $scope.selectPage($scope.selPage + 1, type);
            writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);//换一批
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);