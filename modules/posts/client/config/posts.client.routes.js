'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('posts', {
        url: '/posts',
        templateUrl: 'modules/posts/views/create.post.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
