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
      
      PromoteController.$inject = ['Posts'];
      
      function PromoteController (Posts) {
        var vm = this;
        
        vm.promoted = false;
  
        vm.promote = _promote;
  
        function _promote() {
          Posts.Promote(vm.post._id).then(function (data) {
            console.log(data);
          }).catch(function(err) {
            console.log(err);
          });
        }
      }
  
      return directive;
    }
    
}());