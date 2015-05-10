(function (AB) {
  AB.Ctrls = AB.Ctrls || {};

  AB.Ctrls.Front = ['$scope', 'Posts', function ($scope, Posts) {
    $scope.test = 'hello';
    Posts.GetAll().then(function (data) {
      $scope.posts = data.data;
    });

  }];

  AB.Ctrls.Write = ['$scope', 'Posts', function ($scope, Posts) {
    $scope.post = {
      Title: '',
      Body: ''
    };

    $scope.write = function () {
      Posts.Write($scope.post).then(function (data) {
        console.log(data);
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
