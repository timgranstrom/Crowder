'use strict';

angular.module('core')

    .controller('MapController',['$scope','$http','$state', function($scope,$http, $state) {



        $scope.getPosition = function () {
            function displayLocation(latitude, longitude) {
                return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        sensor: false,
                        latlng: latitude+','+longitude
                    }
                }).then(function (response) {
                    console.log(response);
                    if (response.data.results) {
                        var locationObject = response.data.results[1];
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
                        locationData.push({municipality:municipality,region:region,country:country});
                            //$scope.$digest();
                        $scope.$root.$broadcast('setLocation',locationData);

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
                //document.write(errorMessage);
            };

            var options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

        };

    }]);
