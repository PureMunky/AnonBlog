(function (){
  'use strict';
  
  angular
    .module('app')
    .directive('abFront', FrontDirective);
    
    function FrontDirective() {
      var directive = {
        restrict: 'A',
        scope: {},
        templateUrl: 'partials/directives/front.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: FrontController
      };
      
      FrontController.$inject = ['Posts'];
      
      function FrontController (Posts) {
        var vm = this;
        
        Posts.GetAll().then(function (data) {
          vm.posts = data.data;
        });
      }
      
      return directive;
    }

}());