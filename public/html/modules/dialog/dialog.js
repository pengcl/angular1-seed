'use strict';

app.directive("jsDialog", [function () {
    return {
        restrict: 'E',
        templateUrl: "modules/dialog/dialog.html",
        link: function (scope, element, attrs) {
            scope.$root.dialog = {
                open: function (title, content) {
                    scope.dialogTitle = title;
                    scope.dialogContent = content;
                    //console.log($("#js-dialog").html());
                    $(element).find(".js_dialog").show();
                },
                close: function (url) {
                    $(element).find(".js_dialog").hide();
                }
            };
        }
    };
}]);