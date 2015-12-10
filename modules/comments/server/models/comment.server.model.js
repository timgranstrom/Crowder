'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//require(path.resolve('./modules/posts/server/models/post.server.model.js'));
//var PostSchema = mongoose.model('Post');


/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    content: {
        type: String,
        trim: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User',
        index: true
    },
    post: {
        type: Schema.ObjectId,
        ref: 'Post',
        index: true
    }
});

//CommentSchema.pre('save', function(next) {
//    PostSchema.findById({'_id': post.post}, {$inc: {karma: 1}},
//        function(error, post) {
//
//        }
//    );
//    next();
//});

mongoose.model('Comment', CommentSchema);
