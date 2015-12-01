'use strict';

module.exports = function (app) {
    // Post Routes
    var locations = require('../controllers/locations.server.controller');

    // Setting up the posts api
    app.route('/api/locations')
        .post(locations.create) //Create a post
        .get(locations.list);  //Get all posts
};
