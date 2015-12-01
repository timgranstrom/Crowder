'use strict';

var postsApp = angular.module('posts');

postsApp.controller('PostsController', ['$scope', '$state', 'Authentication', 'Posts',
    function ($scope, $state, Authentication, Posts) {

        $scope.authentication = Authentication;

        $scope.listPosts = function () {
            $scope.posts = Posts.query();
        };

        $scope.$on('updateGetPosts', function (event, args) {
            $scope.listPosts();
        });

    }]);

postsApp.controller('PostsCreateController', ['$scope', '$state', 'Authentication', 'Posts',
    function ($scope, $state, Authentication, Posts) {
        $scope.authentication = Authentication;
        $scope.left = function () {
            var content = $scope.content;
            if(content){
                return 150 - content.length;
            }
        };

        $scope.create = function () {
            var post = new Posts({
                content: this.content
            });

            //refetch the updated list of posts
            post.$create(function (response) {
                $scope.$root.$broadcast('updateGetPosts');
                $scope.content = '';
            }, function (errorResponse) {
                this.error = errorResponse.data.message;
            });

        };

    }]);
