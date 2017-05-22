'use strict';

app.directive("appDialog", [function () {
    return {
        restrict: 'E',
        scope: {
            btnType: '='
        },
        templateUrl: "modules/appDialog/dialog.html",
        link: function (scope, element, attrs) {
            scope.$root.appDialog = {
                open: function (title, content) {
                    scope.dialogTitle = title;
                    scope.dialogContent = content;
                    //console.log($("#js-dialog").html());
                    $(element).find(".js_dialog").show();
                }
            };

            scope.close = function (type) {
                $(element).find(".js_dialog").hide();
                scope.btnType = type;
            }
        }
    };
}]);