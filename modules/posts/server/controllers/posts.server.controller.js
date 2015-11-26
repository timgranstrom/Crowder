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
 *  Create a post
 */
exports.create = function(req,res){
  var post = new Post(req.body);
  post.user = req.user;
  post.creator = req.user;
  console.log(post);
  post.save(function(err){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else{
      res.jsonp(post);
    }
  });
};

/**
 * List of posts sorted by creation
 */
exports.list = function (req, res) {
  Post.find().sort('-created').populate('creator', 'displayName').exec(function (err, posts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(posts);
  });
};

/**
 * Delete a user
 */
//exports.delete = function (req, res) {
//  var user = req.user;
//
//    if (!user) {
//        return res.status(401).json({
//            message: 'User is not authenticated'
//        });
//    }
//
//  user.remove(function (err) {
//    if (err) {
//      return res.status(400).send({
//        message: errorHandler.getErrorMessage(err)
//      });
//    }
//
//    res.json(user);
//  });
//};
