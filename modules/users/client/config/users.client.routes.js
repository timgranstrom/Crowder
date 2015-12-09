'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
    function ($stateProvider) {
        // Users state routing
        $stateProvider
            .state('settings', {
                abstract: true,
                url: '/settings',
                templateUrl: 'modules/users/views/settings/settings.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('settings.profile', {
                url: '/profile',
                templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
            })

            .state('settings.accounts', {
                url: '/ownposts',
                templateUrl: 'modules/users/views/settings/own-posts.client.view.html'
            })

            .state('authentication', {
                url: '/authentication',
                templateUrl: 'modules/users/views/authentication/authentication.client.view.html'
            })
        .state('authentication.signin', {

        });
    }
]);
