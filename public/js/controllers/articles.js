'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles', '$http', '$upload',
    function($scope, $stateParams, $location, Global, Articles, $http, $upload) {
        $scope.global = Global;

        $scope.create = function() {
            var article = new Articles({
                title: this.title,
                content: this.content,
                video: this.youtube,
                aName: this.aName,
                bName: this.bName
            });
            $http.get('/api/mergeFiles/'+ this.aName+'/' + this.bName);
            article.$save(function(response) {
                $location.path('articles/' + response._id);
            });

            this.title = '';
            this.content = '';
            this.youtube = '';
            this.who = '';
            this.vsWho = '';
        };

        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove();
                $location.path('articles');
            }
        };

        $scope.update = function() {
            var article = $scope.article;
            if (!article.updated) {
                article.updated = [];
            }
            article.updated.push(new Date().getTime());

            article.$update(function() {
                $location.path('articles/' + article._id);
            });
        };
        $scope.vote = function(vote) {
            var article = $scope.article;
            if (!Global.user || !Global.user._id) {
                $scope.notLoggedIn = true;
                return;
            }
            for (var i = 0; i < article.voteA.length; i++) {
                if (article.voteA[i] === Global.user._id) {
                    $scope.alreadyVoted = true;
                    return;
                }
            }
            for (var j = 0; j < article.voteB.length; j++) {
                if (article.voteA[j] === Global.user._id) {
                    $scope.alreadyVoted = true;
                    return;
                }
            }
            if (vote === 'a') {
                article.voteA.push(Global.user._id);
            }
            if (vote === 'b') {
                article.voteB.push(Global.user._id);
            }
            article.$update();
        };
        $scope.voteComment = function(vote, id) {
            var article = $scope.article;
            if (!Global.user || !Global.user._id) {
                $scope.notLoggedIn = true;
                return;
            }
            for (var i = 0; i < article.comments.length; i++) {
                if (article.comments[i]._id === id) {
                    for (var k = 0; k < article.comments[i].voteA.length; k++) {
                        if (article.comments[i].voteA[k] === Global.user._id) {
                            return;
                        }
                    }
                    for (var l = 0; l < article.comments[i].voteB.length; l++) {
                        if (article.comments[i].voteB[l] === Global.user._id) {
                            return;
                        }
                    }
                    if (vote === 'a') {
                        article.comments[i].voteA.push(Global.user._id);
                    }
                    if (vote === 'b') {
                        article.comments[i].voteB.push(Global.user._id);
                    }
                }
            }
            article.$update();
        };
        $scope.comment = function() {
            if(!$scope.commentText){
                return;
            }
            var article = $scope.article;
            if (!Global.user || !Global.user._id) {
                $scope.notLoggedIn = true;
                return;
            }
            article.comments.push({
                text: $scope.commentText,
                user: Global.user._id,
                name: Global.user.name
            });
            article.$update();
            $scope.commentText = '';

        };
        $scope.find = function() {
            Articles.query(function(articles) {
                $scope.articles = articles;
            });
        };

        $scope.findOne = function() {
            Articles.get({
                articleId: $stateParams.articleId
            }, function(article) {
                $scope.article = article;
                console.log($scope.article);
            });
        };
         $scope.imageUploads = [];
        $scope.abort = function(index, model) {
            $scope.upload.abort();
            $scope.upload = null;
            if (model === 'a'){
                $scope.filesA = null;
            }
            else{
                $scope.filesB = null;
            }
        };
        $scope.wrongFileType = false;
        $scope.onFileSelect = function ($files, model) {
            $scope.upload = [];
            $scope.filesA=model==='a'?$files:null;
            $scope.filesB=model==='b'?$files:null;
                var file = $files[0];
                if (file.type !== 'video/mp4'){
                    file.wrongFileType = true;
                    console.log('Wrong');
                    return;
                }
                else {
                    file.wrongFileType = false;
                }
                file.progress = parseInt(0);
                (function (file) {
                    $http.get('/api/s3Policy?mimeType='+ file.type).success(function(response) {
                        var s3Params = response;
                        $scope.upload = $upload.upload({
                            url: 'https://toosentsvids.s3.amazonaws.com/',
                            method: 'POST',
                            data: {
                                'key' : 's3UploadExample/'+ Math.round(Math.random()*10000) + '$$' + file.name,
                                'acl' : 'public-read',
                                'Content-Type' : file.type,
                                'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                                'success_action_status' : '201',
                                'Policy' : s3Params.s3Policy,
                                'Signature' : s3Params.s3Signature
                            },
                            file: file,
                        }).then(function(response) {
                            file.progress = parseInt(100);
                            if (response.status === 201) {
                                var data = window.xml2json.parser(response.data),
                                parsedData;
                                parsedData = {
                                    location: data.postresponse.location,
                                    bucket: data.postresponse.bucket,
                                    key: data.postresponse.key,
                                    etag: data.postresponse.etag
                                };
                                console.log(file.name);
                                if (model==='a'){
                                    $scope.aName = file.name;
                                    console.log(parsedData.location);
                                }
                                else {
                                    $scope.bName = file.name;
                                }
                                


                            } else {
                                alert('Upload Failed');
                            }
                        }, null, function(evt) {
                            file.progress =  parseInt(100.0 * evt.loaded / evt.total);
                        });
                    });
                }(file));
        };
    }
]);