'use strict';

var commentsApp = angular.module('comments');

commentsApp.controller('CommentsController', ['$scope', '$state', 'Authentication', 'Comments', 'Post',
    function ($scope, $state, Authentication, Comments, Post) {
        $scope.user = Authentication.user;
        $scope.authentication = Authentication;

        $scope.create = function () {
            var comment = new Comments({
                content: this.comment,
                post: this.post._id
            });
            console.log(this.post);
//
            //refetch the updated list of posts
            comment.$create(function (response) {
                for (var i in $scope.posts) {
                    if ($scope.posts[i]._id === response.post) {
                        $scope.posts[i].comments.push(response);
                        break;
                    }
                }
                $scope.comment = '';
            }, function (errorResponse) {
                this.error = errorResponse.data.message;
            });

        };

        $scope.listCommentsOfPost = function (postId, commentLimit) {
            var comments = Post.comments({postId: postId, limit: commentLimit});
            return comments;
        };

    }]);
