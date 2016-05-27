(function (){
  angular
    .module('app')
    .service('textBodyService', textBodyService);
    
    textBodyService.$inject = ['$sce'];
    
    function textBodyService($sce) {
        var service = {
          parse: _parse
        }
        
        function _parse(input) {
          var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
          input = input.replace('\n', '<br/>');
          input = input ? input.replace(exp, "<a href='$1' target='_blank'>$1</a>") : '';
          return $sce.trustAsHtml(input);
        }
        
        return service;
    }
    
}());