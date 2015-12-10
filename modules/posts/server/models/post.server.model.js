'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

require(path.resolve('./modules/users/server/models/user.server.model.js'));
var UserSchema = mongoose.model('User');

/**
 * Post Schema
 */
var PostSchema = new Schema({
    content: {
        type: String,
        required: 'Please post content'
    },
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User',
        // required: 'No user is linked to this post'  //Uncommented for now in order to not crash the application
    },
    location: {
        type: Schema.ObjectId,
        ref: 'Location',
        //required: 'Please select a location' //Uncommented for now in order to not crash the application
    },
    upVoters: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    downVoters: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.ObjectId,
        ref: 'User'
    }]
});

/**
 * Post save() -hook to give the user +1 in karma after a new post has been created.
 * NOTE: A post save() -hook is only triggered when a doc is created, it is not triggered when an update occurs.
 */
PostSchema.post('save', function (post) {
    UserSchema.findByIdAndUpdate({'_id': post.creator._id}, {$inc: {karma: 1}},
        function(error, user) {
        }
    );
});

mongoose.model('Post', PostSchema);
