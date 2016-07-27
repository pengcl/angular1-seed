'use strict';

app.directive("dropzone", function () {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {

            var config = {
                url: 'http://127.0.0.1:8082/uploadFile.html?decorator=blank',
                maxFilesize: 100,
                paramName: "uploadfile",
                maxThumbnailFilesize: 10,
                parallelUploads: 1,
                thumbnailWidth: 300,
                thumbnailHeight: 200,
                autoProcessQueue: true
            };

            var eventHandlers = {
                'addedfile': function(file) {
                    scope.file = file;
                    if (this.files[1]!=null) {
                        this.removeFile(this.files[0]);
                    }
                    scope.$apply(function() {
                        scope.fileAdded = true;
                    });
                },

                'success': function (file, response) {
                    var _input = $("#" + attrs.id + "-input");
                    _input.val(response);
                }

            };

            var dropzone = new Dropzone(element[0], config);

            angular.forEach(eventHandlers, function(handler, event) {
                dropzone.on(event, handler);
            });

            scope.processDropzone = function() {
                dropzone.processQueue();
            };

            scope.resetDropzone = function() {
                dropzone.removeAllFiles();
            }
        }
    }
});