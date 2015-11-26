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
]);
