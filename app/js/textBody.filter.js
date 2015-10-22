(function(){
  'use strict';
  
  angular
      .module('app')
      .filter('textBody', textBodyFilter);
      
    function textBodyFilter () {
      return function (input) {
        return input.replace('\n', '<br/>');
      };
    }
    
}());

