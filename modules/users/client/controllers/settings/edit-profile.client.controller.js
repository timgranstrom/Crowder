'use strict';

angular.module('users').controller('EditProfileController', ['$scope','$state', '$http', '$location', 'Users', 'Authentication',
  function ($scope,$state, $http, $location, Users, Authentication) {
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
     // if (confirm('Are you sure you want to delete you from the site?')) {
        //if (user) {
        var user = new Users($scope.user);
        user.$remove();
       // alert('Your account have been removed!');
        window.location.href='/api/auth/signout';




          //$state.go('home');
    //      //$scope.users.splice($scope.users.indexOf(user), 1);
    //    //} else {
    //      //$scope.user.$delete(function () {
    //      //  $state.go('home');
    //      //});
        //}
   //   }
    };
  }
]);
