'use strict';

module.exports = function (app) {
    var path = require('path');
    // Post Routes
    var posts = require('../controllers/posts.server.controller');
    var comments = require('../../../comments/server/controllers/comments.server.controller');

    // Setting up the posts api
    app.route('/api/posts')
        .post(posts.create) //Create a post
        .get(posts.list);  //Get all posts


    app.route('/api/posts/:postId')
        .get(posts.read);  //Get specific post

    //Upvote
    app.route('/api/posts/:postId/upvote')
        .put(posts.upVote);  //Upvote post

    //Downvote
    app.route('/api/posts/:postId/downvote')
        .put(posts.downVote);  //Downvote post

    app.route('/api/posts/:postId/comments')
        .get(comments.listCommentsForPost);  //Get comments for specific post

    // Finish by binding the user middleware
    app.param('postId', posts.postByID);
};
