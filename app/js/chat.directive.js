(function () {
  'use strict';
  
  angular
    .module('app')
    .directive('abChat', ChatDirective);
    
    function ChatDirective () {
      var directive = {
        restrict: 'A',
        templateUrl: 'partials/directives/chat.html',
        scope: {
          post: '='
        },
        controller: ChatController
      };
      
      ChatController.$inject = ['$scope', 'Chat'];
      
      function ChatController ($scope, Chat) {
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
      }
  
      return directive;
    }
    
}());