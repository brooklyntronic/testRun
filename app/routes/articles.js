'use strict';

// Articles routes use articles controller
var articles = require('../controllers/articles');
var authorization = require('./middlewares/authorization');
var api = require('../../config/api'),
    aws = require('../../config/aws');
// var ffmpeg = require('fluent-ffmpeg');


// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};
var hasAuthorizationVote = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/articles', articles.all);
    app.post('/articles', authorization.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', authorization.requiresLogin, hasAuthorizationVote, articles.update);
    app.del('/articles/:articleId', authorization.requiresLogin, hasAuthorization, articles.destroy);
    // app.get('/video/:filename', function(req, res) {
    //     res.contentType('flv');
    //     // make sure you set the correct path to your video file storage
    //     var pathToMovie = '/public/' + req.params.filename;
    //     var proc = new ffmpeg({
    //         source: pathToMovie,
    //         nolog: true
    //     });
    //     // use the 'flashvideo' preset (located in /lib/presets/flashvideo.js)
    //     proc.usingPreset('flashvideo')
    //     // setup event handlers
    //     .on('end', function() {
    //         console.log('file has been converted succesfully');
    //     })
    //         .on('error', function(err) {
    //             console.log('an error happened: ' + err.message);
    //         })
    //     // save to stream
    //     .writeToStream(res, {
    //         end: true
    //     });
    // });
    // app.post('/video/who/:filename', authorization.requiresLogin, function(res) {
    //         var fileReq= client.putFile('/test/' + res.params.filename + '.mp4', function(res, req){
    //             console.log(res);
    //             console.log(req);
    //         });
    // });
    // Finish with setting up the articleId paramsram

    app.get('/api/config',authorization.requiresLogin, api.getClientConfig);
    app.get('/api/s3Policy',authorization.requiresLogin, aws.getS3Policy);

    // All undefined api routes should return a 404
    app.get('/api/*', function(req, res) {
        res.send(404);
    });
    app.param('articleId', articles.article);

};