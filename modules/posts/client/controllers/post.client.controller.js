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
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        $scope.getPosts = function () {
            $scope.posts = Posts.query();
        };


    }]);
