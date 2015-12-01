'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
    }
});

mongoose.model('Post', PostSchema);
