'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Location = mongoose.model('Location'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 *  Create a location
 */
exports.create = function (req, res) {
    var location = new Location(req.body);
    location.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(location);
        }
    });
};

/**
 * List of locations sorted by creation date
 */
exports.list = function (req, res) {
    Location.find(req.query).sort('-created').exec(function (err, locations) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(locations);
    });
};
