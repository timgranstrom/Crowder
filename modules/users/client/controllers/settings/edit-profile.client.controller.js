'use strict';

angular.module('users').controller('EditProfileController', ['$scope','$rootScope' ,'$state', '$http','Users','Authentication',
    function ($scope, $rootScope, $state, $http, Users, Authentication) {
        $scope.user = Authentication.user;

        // Update a user profile
        $scope.updateUserProfile = function (isValid) {
            if (isValid) {
                $scope.user.profileImageURL = Authentication.user.profileImageURL; //Do this again because of possiblility of user object changed

                $scope.success = $scope.error = null;
                var user = new Users($scope.user);
                user.$update(function (response) {
                    $scope.success = true;
                    Authentication.user = response;
                }, function (response) {
                    $scope.error = response.data.message;
                });
            } else {
                $scope.submitted = true;
            }
        };


        $scope.removeUser = function () {
            var user = new Users($scope.user);
            user.$remove();
            window.location.href = '/api/auth/signout';


        };

    }
]);
