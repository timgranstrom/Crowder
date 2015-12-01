'use strict';

var postsApp = angular.module('locations');

postsApp.controller('LocationController', ['$scope', '$state', 'Authentication', 'Locations',
    function ($scope, $state, Authentication, Locations) {

        $scope.authentication = Authentication;

        $scope.listLocation = function () {
            $scope.location = Locations.query();
        };

        $scope.$on('updateGetLocation', function (event, args) {
            $scope.listLocation();
        });

    }]);

postsApp.controller('PostsCreateController', ['$scope', '$state', 'Authentication', 'Locations',
    function ($scope, $state, Authentication, Locations) {
        $scope.authentication = Authentication;

        $scope.create = function () {
            var location = new Locations({
                municipality: this.municipality,
                region: this.region,
                country: this.country

            });

            //refetch the updated list of posts
            location.$create(function (response) {
                $scope.$root.$broadcast('updateGetLocation');
            }, function (errorResponse) {
                this.error = errorResponse.data.message;
            });

        };

    }]);
