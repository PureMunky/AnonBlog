(function () {
  angular
    .module('app')
    .directive('abComment', ['Posts', function (Posts) {
    var directive = {};

    directive.restrict = 'A';

    directive.templateUrl = 'partials/directives/comment.html';

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

  angular
    .module('app')
    .directive('abPostComments', ['Posts', function (Posts) {
    var directive = {};

    directive.restrict = 'A';

    directive.templateUrl = 'partials/directives/postComments.html';

    directive.scope = {
      comments: '='
    };

    directive.controller = ['$scope', function ($scope) {

    }];

    return directive;
  }]);

  angular
    .module('app')
    .directive('abChat', function () {
    var directive = {};

    directive.restrict = 'A';

    directive.templateUrl = 'partials/directives/chat.html';

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

  angular
    .module('app')
    .directive('abPromote', function () {
    var directive = {};

    directive.restrict = 'A';

    directive.templateUrl = 'partials/directives/promote.html';

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
  
  angular
    .module('app')
    .directive('abFront', function () {
    var directive = {};
    
    directive.restrict = 'A';
    directive.scope = {};
    directive.templateUrl = 'partials/directives/front.html';
    
    directive.controllerAs = 'vm';
    directive.bindToController = true;
    
    directive.controller = ['Posts', function (Posts) {
      var vm = this;
     vm.test = 'front'; 
      Posts.GetAll().then(function (data) {
        vm.posts = data.data;
      });
    }];
    
    return directive;
  });

}());