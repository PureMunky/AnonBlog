(function () {
  'use strict';
  
  angular
    .module('app')
    .directive('abComment', CommentDirective);
    
    function CommentDirective () {
      var directive = {
        restrict: 'A',
        templateUrl: 'partials/directives/comment.html',
        scope: {
          parent: '='
        },
        controller: CommentController
      };
        
      CommentController.$inject = ['$scope', 'Posts'];
        
      function CommentController ($scope, Posts) {
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
      }
  
      return directive;
    }
    
}());