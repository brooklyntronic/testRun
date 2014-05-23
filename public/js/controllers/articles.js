'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles',
    function($scope, $stateParams, $location, Global, Articles) {
        $scope.global = Global;

        $scope.create = function() {
            var article = new Articles({
                title: this.title,
                content: this.content,
                video: this.youtube,
                aName: this.who,
                bName: this.vsWho
            });
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
        // $scope.onFileSelect = function($files) {
        //     //$files: an array of files selected, each file has name, size, and type.
        //     for (var i = 0; i < $files.length; i++) {
        //       var file = $files[i];
        //       $scope.upload = $upload.upload({
        //         url: 'server/upload/url', //upload.php script, node.js route, or servlet url
        //         // method: 'POST' or 'PUT',
        //         // headers: {'header-key': 'header-value'},
        //         // withCredentials: true,
        //         data: {myObj: $scope.myModelObj},
        //         file: file, // or list of files: $files for html5 only
        //         /* set the file formData name ('Content-Desposition'). Default is 'file' */
        //         //fileFormDataName: myFile, //or a list of names for multiple files (html5).
        //         /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
        //         //formDataAppender: function(formData, key, val){}
        //       }).progress(function(evt) {
        //         console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        //       }).success(function(data, status, headers, config) {
        //         // file is uploaded successfully
        //         console.log(data);
        //       });
        //       //.error(...)
        //       //.then(success, error, progress); 
        //       //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
        //     }
        //     /* alternative way of uploading, send the file binary with the file's content-type.
        //        Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
        //        It could also be used to monitor the progress of a normal http post/put request with large data*/
        //     // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
        //   };

    }
]);