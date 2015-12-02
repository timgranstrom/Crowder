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
                       // var city = data.results[5];
                      //  var region = data.results[6];
                       // var country = data.results[6];

                        var municipalityAndCountry  = data.results[5].formatted_address;
                        var region  = data.results[6].formatted_address;


                        $scope.municipality = municipalityAndCountry.split(',')[0];
                        $scope.region = region.split(',')[0];
                        $scope.country = region.split(',')[1];
                        $scope.$digest();




                       // window.location = '/cities/' + $scope.location;
                        //window.location.replace('/cities/' + $scope.location);
                        //if(confirm('Is '+ $scope.location + ' your current city?')){
                       // $state.go('city',{cityId: $scope.location});

                    //}
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
