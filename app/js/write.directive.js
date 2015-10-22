(function () {
  'use strict';
  
  angular
    .module('app')
    .directive('abWrite', writeDirective);
    
  function writeDirective() {
    
    var directive = {
      restrict: 'A',
      scope: {},
      templateUrl: 'partials/directives/write.html',
      controllerAs: 'vm',
      bindToController: true,
      controller: writeController
    };

    writeController.$inject = ['Posts'];
    
    function writeController (Posts) {
      var vm = this;
       
      vm.post = {
        Title: '',
        Body: ''
      }
           
      vm.write = function () {
        Posts.Write(vm.post).then(function (data) {
                  
        });
       }
    }
    
   return directive;
  }
  
}());