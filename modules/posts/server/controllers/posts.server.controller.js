'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * Internal function to check if user already exist within an array
 */
var userAlreadyExist = function (userId, array) {
    var userExist = false;
    array.forEach(function (arrayUserId) {
        if (arrayUserId.equals(userId)) {
            userExist = true;
            return;
        }
    });
    return userExist;
};

/**
 * Internal function to remove user from array if they exist.
 */
var removeUserFromArray = function (userId, array) {
    var newArray = array;
    var i = 0;
    array.forEach(function (arrayUserId) {
        if (arrayUserId.equals(userId)) {
            newArray.splice(i, 1);
        }
        i++;
    });
    return newArray;
};

/**
 *  Create a post
 */
exports.create = function (req, res) {
    console.log(req.user);
    var post = new Post(req.body);
    post.user = req.user;
    post.creator = req.user;
    post.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(post);
        }
    });
};

/**
 * List of posts sorted by creation
 */
exports.list = function (req, res) {

    Post.find(req.query).sort('-created').populate('creator', 'profileImageURL username _id').populate('location', '_id municipality').populate('upVoters', '_id').populate('downVoters', '_id').exec(function (err, posts) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(posts);
    });
};


/**
 * Show the current post
 */
exports.read = function (req, res) {
    res.json(req.model);
};

/**
 * Upvote the current post
 */
exports.upVote = function (req, res) {
    var post = req.model;
    if (userAlreadyExist(req.user._id, post.upVoters)) {
        post.upVoters = removeUserFromArray(req.user._id, post.upVoters);
    }
    else {
        post.upVoters.push(req.user._id);
    }

    if (userAlreadyExist(req.user._id, post.downVoters)) {
        post.downVoters = removeUserFromArray(req.user._id, post.downVoters);
    }

    Post.findByIdAndUpdate(post._id, post, {new: true}).populate('creator', 'profileImageURL username _id').populate('location', '_id municipality')
        .exec(function (err, updatedPost) {
            if (err) return console.log(err);
            return res.status(202).json(updatedPost);
        });
};

/**
 * Downvote the current post
 */
exports.downVote = function (req, res) {
    var post = req.model;
    if (userAlreadyExist(req.user._id, post.downVoters)) {
        post.downVoters = removeUserFromArray(req.user._id, post.downVoters);
    }
    else {
        post.downVoters.push(req.user._id);
    }

    if (userAlreadyExist(req.user._id, post.upVoters)) {
        post.upVoters = removeUserFromArray(req.user._id, post.upVoters);
    }

    Post.findByIdAndUpdate(post._id, post, {new: true}).populate('creator', 'profileImageURL username _id').populate('location', '_id municipality')
        .exec(function (err, updatedPost) {
            if (err) return console.log(err);
            return res.status(202).json(updatedPost);
        });
};


/**
 * Posts middleware
 */
exports.postByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Post is invalid'
        });
    }
    Post.findById(id).exec(function (err, post) {
        if (err) {
            return next(err);
        } else if (!post) {
            return next(new Error('Failed to load Post ' + id));
        }
        req.model = post;
        next();
    });
};

