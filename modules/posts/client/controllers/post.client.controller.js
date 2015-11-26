'use strict';

angular.module('posts').controller('PostsController', ['$scope', '$state', 'Authentication', 'Posts',
  function ($scope, $state, Authentication, Posts) {
      $scope.authentication = Authentication;

      $scope.create = function () {
          var post = new Posts({
              content: this.content
          });

          //Redirect after save
          post.$create(function (response) {
              $scope.getPosts();
              //$scope.$apply();
              //$state.go('createPost');
          }, function (errorResponse) {
              $scope.error = errorResponse.data.message;
          });

      };

      $scope.getPosts = function(){
          $scope.posts = Posts.query();
      };


  }]);
    //$scope.remove = function (user) {
    //
    //    if (user) {
    //      user.$remove();
    //
    //      $scope.users.splice($scope.users.indexOf(user), 1);
    //    } else {
    //      $scope.user.$remove(function () {
    //        $state.go('admin.users');
    //      });
    //
    //  }
    //};

    //$scope.update = function () {
    //  var user = $scope.user;
    //
    //  user.$update
    //  (function () {
    //    $state.go('admin.user', {
    //      userId: user._id
    //    });
    //  }, function (errorResponse) {
    //    $scope.error = errorResponse.data.message;
    //  });
    //};
 // }
//]);
