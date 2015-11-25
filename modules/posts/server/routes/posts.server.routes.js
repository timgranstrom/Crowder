'use strict';

module.exports = function (app) {
  // Post Routes
  var posts = require('../controllers/posts.server.controller');

  // Setting up the posts api
  app.route('/api/posts')
      .post(posts.create) //Create a post
      .get(posts.list);  //Get all posts


  //app.route('/api/users').put(users.update);
  //app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  ////app.route('/api/users/password').post(users.changePassword); //Not used right now
  //app.route('/api/users/picture').post(users.changeProfilePicture);
  //app.route('/api/users').delete(users.delete);
  //// Finish by binding the user middleware
  //app.param('userId', users.userByID);
};
