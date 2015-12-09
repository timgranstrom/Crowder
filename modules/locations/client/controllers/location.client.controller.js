'use strict';

var locationsApp = angular.module('locations', ['ui.bootstrap', 'ngAnimate']);

locationsApp.controller('LocationController', ['$scope', '$http', '$state', 'Authentication', 'Locations', 'Users',
    function ($scope, $http, $state, Authentication, Locations, Users) {
        $scope.onClicks = function ($item) {

            var locationDat = [];
            var municipality;
            var region;
            var country;
            if ($item.length > 2) {
                var maskMunicipality = $item.indexOf(',');
                municipality = $item.slice(0, maskMunicipality);

                var startMaskRegion = $item.indexOf(',');
                var stopMaskRegion = $item.lastIndexOf(',');
                region = $item.slice(startMaskRegion + 1, stopMaskRegion);

                var maskCountry = $item.lastIndexOf(',');
                country = $item.slice(maskCountry + 1, $item.length);
                locationDat.push({municipality: municipality, region: region, country: country});
                $scope.inputMunicipality = ''; //Clear form after search is executed
            }
            if ($item === 'No result found') {
                return;
            }
            $scope.$broadcast('setLocation', locationDat[0]);


        };

        $scope.authentication = Authentication;
        $scope.listMapsApiLocation = function (val) {

            return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false,
                    result_type: 'political',
                    key:'AIzaSyBOM-ShLWfVtNx6hovq3myRmEIcorBrR4c',
                    language:'sv'

                }
            }).then(function (response) {
                if (response.data.results) {
                    var result = {
                        location: []
                    };
                    response.data.results.forEach(function (locationObject) {
                        if (locationObject.address_components.length === 3||locationObject.address_components.length === 4||
                            locationObject.address_components.length === 5 ||locationObject.address_components.length === 6 ){
                            var formattedLocation;
                            var municipality;
                            var region;
                            var country;

                            //if (locationObject.address_components.length === 7) {
                            //    municipality = locationObject.address_components[3].long_name;
                            //    region = locationObject.address_components[4].long_name;
                            //    country = locationObject.address_components[5].long_name;
                            //    formattedLocation = municipality + ',' + region + ',' + country;
                            //}
                            if (locationObject.address_components.length === 6) {
                                municipality = locationObject.address_components[2].long_name;
                                region = locationObject.address_components[3].long_name;
                                country = locationObject.address_components[4].long_name;
                                formattedLocation = municipality + ',' + region + ',' + country;
                            }
                            if (locationObject.address_components.length === 5) {
                                municipality = locationObject.address_components[2].long_name;
                                region = locationObject.address_components[3].long_name;
                                country = locationObject.address_components[4].long_name;
                                formattedLocation = municipality + ',' + region + ',' + country;
                            }
                            if (locationObject.address_components.length === 4) {
                                municipality = locationObject.address_components[1].long_name;
                                region = locationObject.address_components[2].long_name;
                                country = locationObject.address_components[3].long_name;
                                formattedLocation = municipality + ',' + region + ',' + country;
                            }
                            if (locationObject.address_components.length === 3) {
                                municipality = locationObject.address_components[0].long_name;
                                region = locationObject.address_components[1].long_name;
                                country = locationObject.address_components[2].long_name;
                                formattedLocation = municipality + ',' + region + ',' + country;
                            }
                            result.location.push(formattedLocation);
                        }
                    });
                    if (result.location.length === 0) {
                        result.location.push('No result found');
                    }
                    console.log(result.location);

                    return result.location;
                }
            });
        };

        $scope.getGeoPosition = function () {
            function displayLocation(latitude, longitude) {
                return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {

                        latlng: latitude + ',' + longitude,
                        result_type: 'political',
                        key:'AIzaSyBOM-ShLWfVtNx6hovq3myRmEIcorBrR4c',
                        language:'sv'

                    }
                }).then(function (response) {
                    console.log('MAPS RESPONSE:');
                    console.log(response);
                    if (response.data.results) {
                        var locationData = [];
                        var locationObject = response.data.results[1];
                        //var locationObjectReg = response.data.results[0];
                        //var locationObjectCou = response.data.results[0];
                        var municipality;
                        var region;
                        var country;

                        if (locationObject.address_components.length === 3 || locationObject.address_components.length === 4 ||
                            locationObject.address_components.length === 5 || locationObject.address_components.length === 6||
                            locationObject.address_components.length === 7) {

                            if (locationObject.address_components.length === 7) {
                                municipality = locationObject.address_components[3].long_name;
                                region = locationObject.address_components[4].long_name;
                                country = locationObject.address_components[5].long_name;
                            }
                            if (locationObject.address_components.length === 6) {
                                municipality = locationObject.address_components[3].long_name;
                                region = locationObject.address_components[4].long_name;
                                country = locationObject.address_components[5].long_name;
                            }
                            if (locationObject.address_components.length === 5) {
                                municipality = locationObject.address_components[2].long_name;
                                region = locationObject.address_components[3].long_name;
                                country = locationObject.address_components[4].long_name;
                            }
                            if (locationObject.address_components.length === 4) {
                                municipality = locationObject.address_components[1].long_name;
                                region = locationObject.address_components[2].long_name;
                                country = locationObject.address_components[3].long_name;
                            }
                            if (locationObject.address_components.length === 3) {
                                municipality = locationObject.address_components[0].long_name;
                                region = locationObject.address_components[1].long_name;
                                country = locationObject.address_components[2].long_name;
                            }


                            locationData.push({municipality: municipality, region: region, country: country});
                            console.log('FORMATTED MAPS RESPONSE:');
                            console.log(locationData);
                            $scope.inputMunicipality = '';
                            $scope.$broadcast('setLocation', locationData[0]);
                        }

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

            Locations.query(locationData, function (result) {
                if (result.length === 0) {
                    $scope.$root.$broadcast('createLocation', locationData);
                    console.log('calling');
                } else {
                    //console.log('USER MODEL:');
                    //console.log(Authentication.user);
                    //console.log(result[0]);

                    Authentication.user.activeLocation = result[0]._id;
                    Users.update(Authentication.user);

                    $state.go('home', {}, {reload: true});



                }
            });

        };

        $scope.getLocationById = function(locationId){
            $scope.locationCity = Locations.query({'_id':locationId});
        };

        $scope.$on('setLocation', function (event, args) {
            console.log('SETLOCATION');


            $scope.getLocation(args);
        });

    }]);

locationsApp.controller('LocationsCreateController', ['$scope', '$state', 'Users', 'Authentication', 'Locations',
    function ($scope, $state, Users, Authentication, Locations) {
        $scope.authentication = Authentication;

        $scope.create = function (locationData) {
            console.log('create');
            //console.log('CREATE FROM PASSED LOCATIONDATA:');
            //console.log(locationData);
            var location = new Locations({
                municipality: locationData.municipality,
                region: locationData.region,
                country: locationData.country

            });

            //refetch the updated list of locations
            location.$create(function (response) {
                Authentication.user.activeLocation = response._id;
                Users.update(Authentication.user);
                $state.go('home', {}, {reload: true});
            }, function (errorResponse) {
                this.error = errorResponse.data.message;
            });


        };

        $scope.$on('createLocation', function (event, args) {
            console.log('creating');
            $scope.create(args);
        });
    }]);
