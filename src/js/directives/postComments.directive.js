(function () {
  'use strict';
  
  angular
    .module('app')
    .directive('abPostComments', PostCommentsDirective);
    
    function PostCommentsDirective () {
      var directive = {
        restrict: 'A',
        templateUrl: 'partials/directives/postComments.html',
        scope: {
          comments: '='
        },
        controller: PostCommentsController
      };
      
      PostCommentsController.$inject = ['$scope', 'Posts'];
      
      function PostCommentsController ($scope, Posts) {
  
      }
  
      return directive;
    }
    
}());