'use strict';

var locationsApp = angular.module('locations',['ui.bootstrap','ngAnimate']);

locationsApp.controller('LocationController', ['$scope', '$state', 'Authentication', 'Locations',
    function ($scope, $state, Authentication, Locations) {

        $scope.authentication = Authentication;

        $scope.listLocation = function (inputMunicipality) {
            var municipality = inputMunicipality.charAt(0).toUpperCase()+inputMunicipality.slice(1);
            var location = Locations.query({municipality:municipality}).$promise;
              return location;
        };



        $scope.$on('updateGetLocation', function (event, args) {
            $scope.listLocation();
        });

        $scope.onSelect=function(place){
            console.log(place);
            $state.go('posts');

        };


    }]);

locationsApp.controller('LocationsCreateController', ['$scope', '$state', 'Authentication', 'Locations',
    function ($scope, $state, Authentication, Locations) {
        $scope.authentication = Authentication;

        $scope.create = function () {
            console.log('called');
            var location = new Locations({
                municipality: this.municipality,
                region: this.region,
                country: this.country

            });

            //refetch the updated list of locations
            location.$create(function (response) {
                $scope.$root.$broadcast('updateGetLocation');
            }, function (errorResponse) {
                this.error = errorResponse.data.message;
            });

        };

    }]);
