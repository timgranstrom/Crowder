'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('comments').factory('Comments', ['$resource',
        function ($resource) {
            return $resource('api/comments',{}, {
                create: {
                    method: 'POST'
                }
            });
        }
    ]);
