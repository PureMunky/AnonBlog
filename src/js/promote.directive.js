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
        controllerAs: 'vm',
        bindToController: true,
        controller: PromoteController
      };
      
      PromoteController.$inject = ['$timeout', 'Posts'];
      
      function PromoteController ($timeout, Posts) {
        var vm = this;
        
        // Variables
        vm.promoted = false;
        vm.remainingTime = 1000;
  
        // Public Functions
        vm.promote = _promote;
        vm.getRemaining = _getRemainign;
        
        _tickRemaining();
  
        function _promote() {
          Posts.Promote(vm.post._id).then(function (data) {
            console.log(data);
          }).catch(function(err) {
            console.log(err);
          });
        }
        
        function _tickRemaining() {
          vm.remainingTime--;
          
          $timeout(_tickRemaining, 1000);
        }
        
        function _getRemainign() {
          return vm.remainingTime + ' Seconds';
        }
        
      }
  
      return directive;
    }
    
}());