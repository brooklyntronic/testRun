// // 'use strict';

// // angular.module('mean.articles')

// // // The example of the full functionality
// // .controller('UploadController', ['$scope', '$upload',
// //     function($scope, $upload) {
// //         $scope.onFileSelect = function($files) {
// //             //$files: an array of files selected, each file has name, size, and type.
// //                 var file = $files[0];
// //                 $scope.upload = $upload.upload({
// //                     url: 'server/upload/url', //upload.php script, node.js route, or servlet url
// //                     // method: 'POST' or 'PUT',
// //                     // headers: {'header-key': 'header-value'},
// //                     // withCredentials: true,
// //                     data: {
// //                         myObj: $scope.myModelObj
// //                     },
// //                     file: file, // or list of files: $files for html5 only
// //                     /* set the file formData name ('Content-Desposition'). Default is 'file' */
// //                     //fileFormDataName: myFile, //or a list of names for multiple files (html5).
// //                      customize how data is added to formData. See #40#issuecomment-28612000 for sample code 
// //                     //formDataAppender: function(formData, key, val){}
// //                 }).progress(function(evt) {
// //                     console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
// //                 }).success(function(data) { //, status, headers, config
// //                     // file is uploaded successfully
// //                     console.log(data);
// //                 });
// //                 //.error(...)
// //                 //.then(success, error, progress); 
// //                 //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
// //             /* alternative way of uploading, send the file binary with the file's content-type.
// //        Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
// //        It could also be used to monitor the progress of a normal http post/put request with large data*/
// //             // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
// //         };

// //     }
// // ]);
// // angular.module('app', ['angularFileUpload'])

// //     // The example of the full functionality
// //     .controller('TestController', function ($scope, $fileUploader) {
// //         'use strict';

// //         // create a uploader with options
// //         var uploader = $scope.uploader = $fileUploader.create({
// //             scope: $scope,                          // to automatically update the html. Default: $rootScope
// //             url: 'upload.php',
// //             formData: [
// //                 { key: 'value' }
// //             ],
// //             filters: [
// //                 function (item) {                    // first user filter
// //                     console.info('filter1');
// //                     return true;
// //                 }
// //             ]
// //         });

// //
// //         // FAQ #1
// //         var item = {
// //             file: {
// //                 name: 'Previously uploaded file',
// //                 size: 1e6
// //             },
// //             progress: 100,
// //             isUploaded: true,
// //             isSuccess: true
// //         };
// //         item.remove = function() {
// //             uploader.removeFromQueue(this);
// //         };
// //         uploader.queue.push(item);
// //         uploader.progress = 100;

// //          item.uploadAWS = function(){
// //              
// //          };
// //         // ADDING FILTERS

// //         uploader.filters.push(function (item) { // second user filter
// //             console.info('filter2');
// //             return true;
// //         });

// //         // REGISTER HANDLERS

// //         uploader.bind('afteraddingfile', function (event, item) {
// //             console.info('After adding a file', item);
// //         });

// //         uploader.bind('whenaddingfilefailed', function (event, item) {
// //             console.info('When adding a file failed', item);
// //         });

// //         uploader.bind('afteraddingall', function (event, items) {
// //             console.info('After adding all files', items);
// //         });

// //         uploader.bind('beforeupload', function (event, item) {
// //             console.info('Before upload', item);
// //         });

// //         uploader.bind('progress', function (event, item, progress) {
// //             console.info('Progress: ' + progress, item);
// //         });

// //         uploader.bind('success', function (event, xhr, item, response) {
// //             console.info('Success', xhr, item, response);
// //         });

// //         uploader.bind('cancel', function (event, xhr, item) {
// //             console.info('Cancel', xhr, item);
// //         });

// //         uploader.bind('error', function (event, xhr, item, response) {
// //             console.info('Error', xhr, item, response);
// //         });

// //         uploader.bind('complete', function (event, xhr, item, response) {
// //             console.info('Complete', xhr, item, response);
// //         });

// //         uploader.bind('progressall', function (event, progress) {
// //             console.info('Total progress: ' + progress);
// //         });

// //         uploader.bind('completeall', function (event, items) {
// //             console.info('Complete all', items);
// //         });

// //     });
// 'use strict';

// angular.module('mean.articles')
//     .controller('UploadController', function ($scope, $http, $location, $upload, $rootScope) {
//         $scope.imageUploads = [];
//         $scope.abort = function(index) {
//             $scope.upload[index].abort();
//             $scope.upload[index] = null;
//         };
//         $scope.wrongFileType = false;
//         $scope.onFileSelect = function ($files) {
//             console.log($scope.$parent);
//             $scope.filesA = $filesA;
//             $scope.filesB = $filesB;
//                 var file = model==='a'?$filesA[0]:$filesB[0];
//                 if (file.type !== 'video/mp4'){
//                     if (model === 'a')
//                         file.wrongFileTypeA = true;
//                     else
//                         file.wrongFileTypeB = true;
//                     console.log('Wrong');
//                     return;
//                 }
//                 else {
//                     file.wrongFileTypeA = false;
//                     file.wrongFileTypeB = false;
//                 }
//                 file.progress = parseInt(0);
//                 (function (file) {
//                     $http.get('/api/s3Policy?mimeType='+ file.type).success(function(response) {
//                         var s3Params = response;
//                         $scope.upload = $upload.upload({
//                             url: 'https://toosentsvids.s3.amazonaws.com/',
//                             method: 'POST',
//                             data: {
//                                 'key' : 's3UploadExample/'+ Math.round(Math.random()*10000) + '$$' + file.name,
//                                 'acl' : 'public-read',
//                                 'Content-Type' : file.type,
//                                 'AWSAccessKeyId': s3Params.AWSAccessKeyId,
//                                 'success_action_status' : '201',
//                                 'Policy' : s3Params.s3Policy,
//                                 'Signature' : s3Params.s3Signature
//                             },
//                             file: file,
//                         }).then(function(response) {
//                             file.progress = parseInt(100);
//                             if (response.status === 201) {
//                                 var data = window.xml2json.parser(response.data),
//                                 parsedData;
//                                 parsedData = {
//                                     location: data.postresponse.location,
//                                     bucket: data.postresponse.bucket,
//                                     key: data.postresponse.key,
//                                     etag: data.postresponse.etag
//                                 };
//                                 console.log(file.name);
//                                 $rootScope.videoLocation=parsedData.key;


//                             } else {
//                                 alert('Upload Failed');
//                             }
//                         }, null, function(evt) {
//                             file.progress =  parseInt(100.0 * evt.loaded / evt.total);
//                         });
//                     });
//                 }(file));
//         };
//     });
