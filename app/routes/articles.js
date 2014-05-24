'use strict';

// Articles routes use articles controller
var articles = require('../controllers/articles');
var authorization = require('./middlewares/authorization');
var ffmpeg = require('fluent-ffmpeg');
var knox = require('knox');
var client = knox.createClient({
    key: 'AKIAIGA2C2IZIWOYPCWQ',
    secret: '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',
    bucket: 'toosentsvids'
});
var fs = require('fs');


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
    app.get('/video/:filename', function(req, res) {
        res.contentType('flv');
        // make sure you set the correct path to your video file storage
        var pathToMovie = '/public/' + req.params.filename;
        var proc = new ffmpeg({
            source: pathToMovie,
            nolog: true
        });
        // use the 'flashvideo' preset (located in /lib/presets/flashvideo.js)
        proc.usingPreset('flashvideo')
        // setup event handlers
        .on('end', function() {
            console.log('file has been converted succesfully');
        })
            .on('error', function(err) {
                console.log('an error happened: ' + err.message);
            })
        // save to stream
        .writeToStream(res, {
            end: true
        });
    });
    app.post('/video/who', authorization.requiresLogin, function(res) {
        fs.readFile('file.mp4', function(err, buf) {
            var fileReq= client.put('/test/' + res.user.name + '.mp4', {
                'Content-Type': 'video/mp4'
            });
            fileReq.on('response', function(result) {
                if (200 === result.statusCode) {
                    console.log('saved to %s', fileReq.url);
                }
            });
            fileReq.end(buf);
        });
    });
    // Finish with setting up the articleId paramsram
    app.param('articleId', articles.article);

};