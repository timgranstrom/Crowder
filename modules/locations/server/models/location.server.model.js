'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Location Schema
 */
var LocationSchema = new Schema({
    municipality: {
        type: String,
        trim: true,
        required: 'Please post content'
    },
    region: {
        type: String,
        trim: true,
        required: 'Please post content'
    },
    country: {
        type: String,
        trim: true,
        required: 'Please post content'
    },
    info: {
        type: String,
        trim: true
    },
    locationImageURL: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

LocationSchema.pre('save', function (next) {
    var self = this;
    self.constructor.find({municipality : self.municipality, region : self.region, country: self.country}, function (err, docs) {
        if (!docs.length){
            next();
        }else{
            next(new Error("Location exists!"));
        }
    });
}) ;

mongoose.model('Location', LocationSchema);
