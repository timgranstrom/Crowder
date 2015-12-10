'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('posts').factory('Posts', ['$resource',
        function ($resource) {
            return $resource('api/posts', {}, {
                create: {
                    method: 'POST'
                }
            });
        }
    ])
    .factory('Post', ['$resource',
        function ($resource) {
            return $resource('api/posts/:postId', {
                postId: '@postId'
            }, {
                upVote: {method: 'PUT', url: 'api/posts/:postId/upvote'},
                downVote: {method: 'PUT', url: 'api/posts/:postId/downvote'},
                comments: {method: 'GET', url: 'api/posts/:postId/comments',isArray: true}
            });
        }
    ]);
