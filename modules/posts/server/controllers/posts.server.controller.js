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
        if (array.length > 0) {
            for (var i in array) {
                if (array[i].equals(userId)) {
                    return true;
                }
            }
        }
    return false;
};

/**
 * Internal function to remove user from array if they exist.
 */
var removeUserFromArray = function (userId, array) {
    var newArray = array;
    if (array.length > 0) {
        for (var i in array) {
            if (array[i].equals(userId)) {
                newArray.splice(i, 1);
                break;
            }
        }
    }
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
<<<<<<< HEAD
    Post.find(req.query).sort('-created').populate('creator', 'profileImageURL username _id').populate('location','_id municipality').exec(function (err, posts) {
=======
    Post.find(req.query).sort('-created').populate('creator', 'profileImageURL username _id').populate('location', '_id').populate('upVoters','_id').populate('downVoters','_id').exec(function (err, posts) {
>>>>>>> refs/remotes/origin/sprint
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

    Post.findByIdAndUpdate(post._id, post,
        function (err, updatedPost) {
            if (err) return console.log(err);
            return res.sendStatus(202);
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

    Post.findByIdAndUpdate(post._id, post,
        function (err, updatedPost) {
            if (err) return console.log(err);
            return res.sendStatus(202);
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
        //return res.send(post);
        req.model = post;
        next();
    });
};

