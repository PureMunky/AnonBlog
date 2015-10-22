(function () {
    angular
        .module('app')
        .directive('abWrite', function () {
       var directive = {
           restrict: 'A',
           scope: {},
           templateUrl: 'partials/directives/write.html',
           controllerAs: 'vm',
           bindToController: true,
           controller: ['Posts', function(Posts) {
           var vm = this;
           
           vm.test = 'write';
           vm.post = {
              Title: '',
              Body: ''
           }
           
           vm.write = function () {
              Posts.Write(vm.post).then(function (data) {
                  console.log('saved');
              });
           }
       }]};
       
       return directive;
    });
    
}());