'use strict';

app.directive("appModal", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/modal/modal.html",
        link: function (scope, element, attrs) {
            scope.modal = {
                show: false,
                title: '',
                body: '',
                buttons: [
                    {
                        show: false,
                        txt: '',
                        eventId: ''
                    },
                    {
                        show: false,
                        txt: '',
                        eventId: ''
                    }
                ],
                open: function (config) {
                    this.show = config.show;
                    this.title = config.title;
                    this.body = config.body;
                    this.buttons = config.buttons;
                },
                close: function (eventId) {
                    this.show = false;
                    scope.$emit('appModal', eventId);
                }
            };
        }
    };
}]);