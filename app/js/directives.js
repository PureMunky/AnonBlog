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

  AB.Directives.Chat = AB.App.directive('abChat', function () {
    var directive = {};

    directive.restrict = 'A';

    directive.templateUrl = 'app/partials/directives/chat.html';

    directive.scope = {
      post: '='
    };

    directive.controller = ['$scope', 'Chat', function ($scope, Chat) {
      $scope.messages = [];
      $scope.form = {
        message: ''
      };

      $scope.sendMessage = sendMessage;

      Chat.onMessage($scope.post._id, getMessage);

      function getMessage(message) {
        $scope.messages.push(message);
      }

      function sendMessage() {
        Chat.sendMessage($scope.post._id, $scope.form.message);
        $scope.form.message = '';
      }
    }];

    return directive;
  });

  AB.Directives.Promote = AB.App.directive('abPromote', function () {
    var directive = {};

    directive.restrict = 'A';

    directive.templateUrl = 'app/partials/directives/promote.html';

    directive.scope = {
      post: '='
    };

    directive.controller = ['$scope', 'Posts', function ($scope, Posts) {
      $scope.promoted = false;

      $scope.promote = _promote;

      function _promote() {
        Posts.Promote($scope.post._id).then(function (data) {
          console.log(data);
        });
      }
    }];

    return directive;
  });
}(AnonBlog));