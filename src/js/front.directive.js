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
        
        vm.posts = [];
        
        vm.parseBody = _parseBody;
        
        // Start directive load.
        _Load().then(function (data) {
            var i = 0;
            
            for(i = 0; i < data.length;i ++) {
              vm.posts.push(_TranslatePost((data[i])));
            }
          });
        
        // Loads the information needed for this directive.
        function _Load () {
          return Posts.GetAll();
        }
        
        function _TranslatePost(post) {
          return post;
        }
        
        // Parses the body of the post to make it render correctly and safely.
        function _parseBody (input) {
          var output = input;
          if(input.length > 300) {
            input = input.substring(0, 300) + '...';
          }
          return textBodyService.parse(input);
        }
        
      }
      
      return directive;
    }

}());