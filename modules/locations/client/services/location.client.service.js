'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('locations').factory('Locations', ['$resource',
    function ($resource) {
        return $resource('api/locations', {}, {
            create: {
                method: 'POST'
            }
        });
    }
]);
