(function () {
  'use strict';
  
  angular
    .module('app')
    .service('errorMessage', ErrorMessageService);
    
    ErrorMessageService.$inject = [];
    
    function ErrorMessageService() {
      var exports = {},
        reporters = [];
      
      function notifyReporters(msg) {
        var i = 0;
        
        for (i = 0; i < reporters.length; i++) {
          reporters[i](msg);
        }
      }
      
      function sendMessage(msg) {
        notifyReporters(msg);
      }
      
      function addReporter(reporter) {
        reporters.push(reporter);
      }
      
      exports.sendMessage = sendMessage;
      exports.addReporter = addReporter;
      
      return exports;
    }
}());