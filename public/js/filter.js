'use strict';

/* Filters */
var appFilters = angular.module('appFilters', []);

appFilters.filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

appFilters.filter('MB', function () {
    return function (kb) {
        var m = 1024,
            //sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(kb) / Math.log(m));
        return (kb / m);
    };
});

appFilters.filter('GB', function () {
    return function (kb) {
        var m = 1024,
            g = 1024;
        //sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        //i = Math.floor(Math.log(kb) / Math.log(m));
        return ((kb / m) / g);
    };
});

appFilters.filter('replaceS', function () {
    return function (input, key) {
        if (key != undefined || key != null || key != "") {
            return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
        } else {

        }
    };
});

appFilters.filter('flowCoupon', function () {
    return function (number) {
        if (number <= 30) {
            return Math.floor(number);
        } else {
            return 30;
        }
    }
});

appFilters.filter('feeCoupon', function () {
    return function (price, max) {
        for (var i = 0; i <= max / 5; i++) {
            if (i * 50 == price) {
                return i * 5;
            }
            if (i * 50 > price) {
                return (i - 1) * 5;
            }
            if (i * 50 < price && i * 5 >= max) {
                return max;
            }
        }
    }
});

appFilters.filter('phoneNumber', function () {
    return function (number) {
        if (number) {
            var value = number;
            value = value.replace(/\s*/g, "");
            var result = [];
            for (var i = 0; i < value.length; i++) {
                if (i == 3 || i == 7) {
                    result.push(" " + value.charAt(i));
                }
                else {
                    result.push(value.charAt(i));
                }
            }
            return result.join("");
        }
    }
});

appFilters.filter('replaceInput', function () {
    return function (input, key) {
        if (key != undefined && key != "") {
            return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
        } else {
            return input;
        }
    };
});

appFilters.filter('onlyNumber', function () {
    return function (input) {
        return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
    };
});

appFilters.filter('formatMoney', function () {
    return function (input, lastindex) {
        if (input != undefined) {
            return input.slice(0, lastindex) + "<sub style='font-size:75%'>" + input.substr(lastindex) + "</sub>";
        }
    };
});

appFilters.filter('formatPhone', function () {
    return function (input) {
        var lastVar = input.slice(0, -4) + " " + input.substr(-4);
        return lastVar.slice(0, 3) + " " + lastVar.substr(3);
        //return lastVar;
    };
});

appFilters.filter('doubleName', function () {
    return function (input, key) {
        input = input.split(" + ");
        if (key == 1) {
            return input[1];
        } else {
            return input[0];
        }
    };
});

/*appFilters.filter('replaceImgSrc', ['$sce', function ($sce) {
    return function (input) {
        console.log(String(input).replace(/src=/g, 'class="lazy" data-original='));
        return $sce.trustAsHtml(String(input).replace(/src=/g, 'class="lazy" data-original='));
    };
}]);*/

appFilters.filter('range', function () {
    return function (data, start, end) {
        if (angular.isArray(data) && angular.isNumber(start) && angular.isNumber(end)) {
            if (data.length < start) {
                return data;
            }
            else {
                return data.slice(start, end);
            }
        }
    }
});

appFilters.filter('jm', function () {
    return function (price, max) {
        for (var i = 0; i <= max / 5; i++) {
            if (i * 100 == price) {
                return i * 5;
            }
            if (i * 100 > price) {
                return (i - 1) * 5;
            }
            if (i * 100 < price && i * 5 >= max) {
                return max;
            }
        }
    }
});

appFilters.filter('mx', function () {
    return function (price) {

        if (price > 7680) {
            return 768;
        } else {
            return Math.round(price * 0.1);
        }
    }
});

appFilters.filter('numberUp', function () {
    return function (price) {

        return Math.ceil(price);
    }
});

appFilters.filter('numberDown', function () {
    return function (price) {

        return Math.floor(price);
    }
});

appFilters.filter('mp', function () {
    return function (price) {

        if (price == 0) {
            return "&mp=0"
        } else {
            return ""
        }
    }
});

appFilters.filter('phoneFilter', function () {
    return function (price) {

        return price.substr(0, 4) + "****" + price.substr(8, 11);
    }
});

appFilters.filter('flowSalesPrice', function () {
    return function (data) {
        var price = data[0].salesPrice;
        $.each(data, function (i, k) {
            if(k.salesPrice < price){
                price = k.salesPrice;
            }
        });
        return price;
    }
});