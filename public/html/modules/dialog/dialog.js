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
                    $(".js_dialog").show();
                },
                close: function (url) {
                    $(".js_dialog").hide();
                }
            };
        }
    };
}]);