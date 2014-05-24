'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    video: {
        type: String,
        default: '',
    },
    aName: {
        type: String,
        default: ''
    },
    bName: {
        type: String,
        default: ''
    },
    comments: [{
        text: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        voteA: [{
            type: Schema.ObjectId,
            ref: 'User',
        }],
        voteB: [{
            type: Schema.ObjectId,
            ref: 'User',
        }]

    }],

    voteA: [{
        type: Schema.ObjectId,
        ref: 'User',
    }],
    voteB: [{
        type: Schema.ObjectId,
        ref: 'User',
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ArticleSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
ArticleSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Article', ArticleSchema);