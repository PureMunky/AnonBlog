AnonBlog.Ctrls = {};

AnonBlog.Ctrls.Front = ['$scope', 'Posts', function ($scope, Posts) {
  $scope.test = 'hello';

  $scope.test = Posts.Test();
}];