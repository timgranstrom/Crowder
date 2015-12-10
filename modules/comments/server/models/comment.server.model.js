'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

require(path.resolve('./modules/posts/server/models/post.server.model.js'));
var PostSchema = mongoose.model('Post');


/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    content: {
        type: String,
        maxlength: 100,
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

/**
 * Pre-hook, only proceed to create comment if a post matching the comments post-id actually exist
 */
CommentSchema.pre('save', function (next) {
    PostSchema.findById(this.post,
        function (error, post) {
            if (error) {
                var err = new Error('Parent post was not found');
                next(err);
            }
        }
    );
    next();
});

/**
 * Post save() -hook to add the new comment to it's matching post.
 * NOTE: A post save() -hook is only triggered when a doc is created, it is not triggered when an update occurs.
 */
CommentSchema.post('save', function (comment) {
    PostSchema.findByIdAndUpdate({'_id': comment.post}, {$push: {comments: {_id: comment._id}}},
        {safe: true, upsert: true, new: true},
        function (error, post) {
        }
    );
});

mongoose.model('Comment', CommentSchema);
