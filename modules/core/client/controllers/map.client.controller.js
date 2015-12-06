'use strict';

angular.module('core')

    .controller('MapController',['$scope','$state', function($scope,$state) {



        $scope.getPosition = function () {

            function displayLocation(latitude, longitude) {
                var request = new XMLHttpRequest();

                var method = 'GET';
                var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
                var async = true;


                request.open(method, url, async);
                request.onreadystatechange = function (string) {
                    if (request.readyState === 4 && request.status === 200) {
                        var data = JSON.parse(request.responseText);

                        var foundMunicipalityAndCountry  = data.results[5].formatted_address;
                        var foundRegion  = data.results[6].formatted_address;

                        var municipality = foundMunicipalityAndCountry.split(',')[0];
                        var region = foundRegion.split(',')[0];
                        var country = foundMunicipalityAndCountry.split(',')[1];
                        $scope.municipality = municipality;
                        $scope.region = region;
                        $scope.country = country;


                        $scope.ready=true;
                        $scope.$digest();
                        $scope.ready=false;
                        $scope.$digest();
                    }
                };
                request.send();
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
