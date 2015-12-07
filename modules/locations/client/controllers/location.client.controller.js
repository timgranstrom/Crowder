'use strict';

var locationsApp = angular.module('locations', ['ui.bootstrap', 'ngAnimate']);

locationsApp.controller('LocationController', ['$scope', '$http', '$rootScope','$state', 'Authentication', 'Locations',
    function ($scope, $http, $rootScope,$state, Authentication, Locations) {

        $scope.authentication = Authentication;
        $scope.listMapsApiLocation = function (val) {

            return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false
                }
            }).then(function (response) {
                if (response.data.results) {
                    var result = {
                        location: []
                    };
                    response.data.results.forEach(function (locationObject) {
                        if (locationObject.address_components.length === 4 || locationObject.address_components.length === 6) {
                            var formattedLocation;
                            var municipality;
                            var region;
                            var country;
                            if (locationObject.address_components.length === 6) {
                                municipality = locationObject.address_components[2].long_name;
                                region = locationObject.address_components[3].long_name;
                                country = locationObject.address_components[4].long_name;
                                formattedLocation = municipality + ' ' + region + ' ' + country;
                            }
                            if (locationObject.address_components.length === 4) {
                                municipality = locationObject.address_components[1].long_name;
                                region = locationObject.address_components[2].long_name;
                                country = locationObject.address_components[3].long_name;
                                formattedLocation = municipality + ' ' + region + ' ' + country;
                            }
                            result.location.push(formattedLocation);
                        }
                    });
                    if (result.location.length === 0) {
                        result.location.push('No result found');
                    }
                    return result.location;
                }
            });
        };

        $scope.getGeoPosition = function () {
            function displayLocation(latitude, longitude) {
                return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        sensor: false,
                        latlng: latitude + ',' + longitude
                    }
                }).then(function (response) {
                    console.log('MAPS RESPONSE:');
                    console.log(response);
                    if (response.data.results) {
                        var locationObject = response.data.results[1];
                        //var formattedLocation;//
                        var municipality;
                        var region;
                        var country;
                        municipality = locationObject.address_components[2].long_name;
                        region = locationObject.address_components[3].long_name;
                        country = locationObject.address_components[4].long_name;
                        $scope.municipality = municipality;
                        $scope.region = region;
                        $scope.country = country;
                        var locationData = [];
                        locationData.push({municipality: municipality, region: region, country: country});
                        console.log('FORMATTED MAPS RESPONSE:');
                        console.log(locationData);
                        $scope.getLocation(locationData[0]);
                    }
                });
            }

            var successCallback = function (position) {
                var x = position.coords.latitude;
                var y = position.coords.longitude;
                displayLocation(x, y);
            };

            var errorCallback = function (error) {
                var errorMessage = 'Unknown error';
                switch (error.code) {
                    case 1:
                        errorMessage = 'Permission denied';
                        break;
                    case 2:
                        errorMessage = 'Position unavailable';
                        break;
                    case 3:
                        errorMessage = 'Timeout';
                        break;
                }
            };

            var options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

        };


        $scope.getLocation = function (locationData) {
            console.log('QUERY DATA');
            console.log(locationData);
            Locations.query(locationData, function (result) {
                if (result.length === 0) {
                    $scope.$root.$emit('createLocation', locationData);
                }else{
                    console.log('USER MODEL:');
                    console.log(Authentication.user);
                    console.log(result[0]);

                    Authentication.activeLocation = result[0]._id;

                    $rootScope.$emit('updateUser');
                }
                console.log('LOCATION FROM DB:');
                console.log(result[0]);
            });

        };

        $scope.$on('setLocation', function (event, args) {

            $scope.getLocation(args);
        });

    }]);

locationsApp.controller('LocationsCreateController', ['$scope', '$state','Users', 'Authentication', 'Locations',
    function ($scope, $state,Users, Authentication, Locations) {
        $scope.authentication = Authentication;

        $scope.create = function (locationData) {
            console.log('CREATE FROM PASSED LOCATIONDATA:');
            console.log(locationData);
            var location = new Locations({
                municipality: locationData.municipality,
                region: locationData.region,
                country: locationData.country

            });

            //refetch the updated list of locations
            location.$create(function (response) {
                $scope.user.activeLocation = response._id;
                //$scope.$root.$broadcast('updateUser');
                Users.update();
            }, function (errorResponse) {
                this.error = errorResponse.data.message;
            });

        };

        $scope.$on('createLocation', function (event, args) {
            $scope.create(args);
        });
    }]);
