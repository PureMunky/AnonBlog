(function () {
  'use strict';
  
  angular
    .module('app')
    .directive('abPromote', PromoteDirective);
    
    function PromoteDirective () {
      var directive = {
        restrict: 'A',
        templateUrl: 'partials/directives/promote.html',
        scope: {
          post: '='
        },
        controller: PromoteController
      };
      
      PromoteController.$inject = ['$scope', 'Posts'];
      
      function PromoteController ($scope, Posts) {
        $scope.promoted = false;
  
        $scope.promote = _promote;
  
        function _promote() {
          Posts.Promote($scope.post._id).then(function (data) {
            console.log(data);
          });
        }
      }
  
      return directive;
    }
    
}());