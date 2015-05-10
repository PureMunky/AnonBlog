(function (AB) {
  AB.Directives = AB.Directives || {};

  AB.Directives.Comment = AB.App.directive('abComment', ['Posts', function (Posts) {
    var directive = {};

    directive.restrict = 'A';

    directive.templateUrl = 'app/partials/directives/comment.html';

    directive.scope = {
      parent: '='
    };

    directive.controller = ['$scope', function ($scope) {
      $scope.form = {
        display: false,
        body: ''
      };

      $scope.comment = function () {
        $scope.form.display = true;
      };

      $scope.save = function () {
        Posts.Write({ Body: $scope.form.body, Parent: $scope.parent });
      };
    }];

    return directive;
  }]);

  AB.Directives.PostComment = AB.App.directive('abPostComments', ['Posts', function (Posts) {
    var directive = {};

    directive.restrict = 'A';

    directive.templateUrl = 'app/partials/directives/postComments.html';

    directive.scope = {
      comments: '='
    };

    directive.controller = ['$scope', function ($scope) {

    }];

    return directive;
  }]);
}(AnonBlog));