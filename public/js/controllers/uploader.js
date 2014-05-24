angular.module('mean.articles')

    // The example of the full functionality
    .controller('UploadController', ['$scope', '$fileUploader', function ($scope, $fileUploader) {
            'use strict';
            $scope.showFile = false;
            // create a uploader with options
            var item = {};
            var uploader = $scope.uploader = $fileUploader.create({
                scope: $scope,                          // to automatically update the html. Default: $rootScope
                url: '/video/who/',
                formData: [
                    { key: 'value' }
                ],
                filters: [
                    function () {                    // first user filter
                        console.info('filter1');
                        return true;
                    }
                ]
            });
            console.log(uploader);
            // FAQ #1
            
            item.remove = function() {
                uploader.removeFromQueue(this);
            };
    
    
            // ADDING FILTERS
    
            uploader.filters.push(function () { // second user filter
                console.info('filter2');
                return true;
            });
    
            // REGISTER HANDLERS
    
            uploader.bind('afteraddingfile', function (event, item) {
                $scope.showFile = true;
                console.info('After adding a file', uploader);
            });
    
            uploader.bind('whenaddingfilefailed', function (event, item) {
                console.info('When adding a file failed', item);
            });
    
            uploader.bind('afteraddingall', function (event, items) {
                console.info('After adding all files', items);
            });
    
            uploader.bind('beforeupload', function (event, item) {
                console.info('Before upload', item);
            });
    
            uploader.bind('progress', function (event, item, progress) {
                console.info('Progress: ' + progress, item);
            });
    
            uploader.bind('success', function (event, xhr, item, response) {
                console.info('Success', xhr, item, response);
            });
    
            uploader.bind('cancel', function (event, xhr, item) {
                console.info('Cancel', xhr, item);
            });
    
            uploader.bind('error', function (event, xhr, item, response) {
                console.info('Error', xhr, item, response);
            });
    
            uploader.bind('complete', function (event, xhr, item, response) {
                console.info('Complete', xhr, item, response);
            });
    
            uploader.bind('progressall', function (event, progress) {
                console.info('Total progress: ' + progress);
            });
    
            uploader.bind('completeall', function (event, items) {
                console.info('Complete all', items);
            });
    
        }]);