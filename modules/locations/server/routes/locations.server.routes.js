'use strict';

module.exports = function (app) {
    // Location Routes
    var locations = require('../controllers/locations.server.controller');

    // Setting up the location api
    app.route('/api/locations')
        .post(locations.create) //Create a post
        .get(locations.list);  //Get all posts
};
