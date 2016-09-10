'use strict';

app.directive("dialog", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "html/modules/dialog/dialog.html",
        link: function (scope, element, attrs) {
            scope.dialogId = attrs.dialogId;
            scope.dialogTitle = attrs.title;
            scope.dialogContent = attrs.content;
            
            scope.dialogHide = function (dialogId) {
                $("#" + dialogId).hide();
            }
        }
    };
}]);