'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('posts').factory('Posts', ['$resource',
    function ($resource) {
        return $resource('api/posts', {
            postId: '@postId'
        }, {
            create: {
                method: 'POST'
            },
            upVote: {method: 'PUT', url: 'api/posts/:postId/upvote'}
        });
    }
])
    .factory('Post', ['$resource',
    function ($resource) {
        return $resource('api/posts/:postId', {
            postId: '@postId'
        }, {
            upVote: {method: 'PUT', url: 'api/posts/:postId/upvote'},
            downVote: {method: 'PUT', url: 'api/posts/:postId/downvote'}
        });
    }
]);
