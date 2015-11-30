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
            return 150 - $scope.content.length;
        };

        $scope.create = function () {
            var post = new Posts({
                content: this.content
            });

            //refetch the updated list of posts
            post.$create(function (response) {
                $scope.$root.$broadcast('updateGetPosts');
            }, function (errorResponse) {
                this.error = errorResponse.data.message;
            });

        };

    }]);

postsApp.run(['$anchorScroll', function ($anchorScroll) {
        $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
    }])
    .controller('headerCtrl', ['$anchorScroll', '$location', '$scope',
        function ($anchorScroll, $location, $scope) {
            $scope.gotoAnchor = function (x) {
                var newHash = 'anchor' + x;
                if ($location.hash() !== newHash) {
                    // set the $location.hash to `newHash` and
                    // $anchorScroll will automatically scroll to it
                    $location.hash('anchor' + x);
                } else {
                    // call $anchorScroll() explicitly,
                    // since $location.hash hasn't changed
                    $anchorScroll();
                }
            };
        }
    ]);
