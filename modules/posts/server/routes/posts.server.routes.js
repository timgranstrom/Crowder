'use strict';

module.exports = function (app) {
    // Post Routes
    var posts = require('../controllers/posts.server.controller');

    // Setting up the posts api
    app.route('/api/posts')
        .post(posts.create) //Create a post
        .get(posts.list);  //Get all posts


    //app.route('/api/posts/:postId')
    //    .get(posts.read);  //Get specific post

    //Upvote
    app.route('/api/posts/:postId/upvote')
        .put(posts.upVote);  //Upvote post

    //Downvote
    app.route('/api/posts/:postId/downvote')
        .put(posts.downVote);  //Downvote post

    // Finish by binding the user middleware
    app.param('postId', posts.postByID);
};
