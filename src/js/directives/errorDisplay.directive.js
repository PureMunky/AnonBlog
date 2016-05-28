(function () {
  'use strict';
  
  angular
    .module('app')
    .directive('abErrorDisplay', ErrorDisplayDirective);
    
  function ErrorDisplayDirective() {
    var directive = {
      restrict: 'A',
      scope: {},
      templateUrl: 'partials/directives/errorDisplay.html',
      controllerAs: 'vm',
      bindToController: true,
      controller: ErrorController
    };
    
    ErrorController.$inject = ['errorMessageSvc'];
    
    function ErrorController (errorMessageSvc) {
      var vm = this;
      
      vm.messages = [];
      
      function getMessage(msg) {
        vm.messages.push(msg);
      }
      
      function dismissMessage() {
        vm.messages.splice(0, 1);
      }
      
      errorMessageSvc.addReporter(getMessage);
      
      vm.dismissMessage = dismissMessage;
    }
    
    return directive;
  }
  
}());