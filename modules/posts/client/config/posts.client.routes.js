'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('createPost', {
        url: '/createPost',
        templateUrl: 'modules/posts/views/create.post.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
