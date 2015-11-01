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
      
      FrontController.$inject = ['Posts', 'textBodyService'];
      
      function FrontController (Posts, textBodyService) {
        var vm = this;
        
        vm.parseBody = _parseBody;
        
        // Start directive load.
        _Load();
        
        // Loads the information needed for this directive.
        function _Load () {
          Posts.GetAll().then(function (data) {
            vm.posts = data;
          });
        }
        
        // Parses the body of the post to make it render correctly and safely.
        function _parseBody (input) {
          return textBodyService.parse(input);
        }
        
      }
      
      return directive;
    }

}());