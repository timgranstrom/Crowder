'use strict';

module.exports = function (app) {
    // Comments Routes
    var comments = require('../controllers/comments.server.controller.js');

    // Setting up the comments api
    app.route('/api/comments')
        .post(comments.create) //Create a comment
        .get(comments.list);  //Get all comments
};
