(function (AB) {
  AB.Ctrls = AB.Ctrls || {};

  AB.Ctrls.Front = ['$scope', 'Posts', function ($scope, Posts) {
  }];

  AB.Ctrls.Write = ['$scope', '$location', 'Posts', function ($scope, $location, Posts) {
    $scope.post = {
      Title: '',
      Body: ''
    };

    $scope.write = function () {
      Posts.Write($scope.post).then(function (data) {
        $location.hash('/');
      });
    };
  }];

  AB.Ctrls.View = ['$scope', '$routeParams', 'Posts', function ($scope, $routeParams, Posts) {
    $scope.form = {
      comments: []
    };

    Posts.Get($routeParams.PostId).then(function (data) {
      $scope.post = data.data;
    });

    Posts.GetComments($routeParams.PostId).then(function (data) {
      $scope.form.comments = data.data;
    });
  }];

}(AnonBlog));
