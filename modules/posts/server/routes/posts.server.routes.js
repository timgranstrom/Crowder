'use strict';

module.exports = function (app) {
    // Post Routes
    var posts = require('../controllers/posts.server.controller');

    // Setting up the posts api
    app.route('/api/posts')
        .post(posts.create) //Create a post
        .get(posts.list);  //Get all posts
};
