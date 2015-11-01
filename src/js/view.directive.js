(function () {
  'use strict';
  
  angular
    .module('app')
    .directive('abPostView', PostViewDirective);
    
    function PostViewDirective() {
      var directive = {
        restrict: 'A',
        scope: {
          post: '='
        },
        templateUrl: 'partials/directives/view.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: PostViewController
      };
      
      PostViewController.$inject = ['Posts', '$scope', '$routeParams', '$sce', 'textBodyService'];
      
      function PostViewController(Posts, $scope, $routeParams, $sce, textBodyService) {
        var vm = this;
        
        vm.form = {
          comments: []
        };
        vm.PostBody = _PostBody;
        
        _Load();
        
        function _PostBody() {
          return textBodyService.parse(vm.post.Body);
        }
        
        function _Load () {
          
          // Load the post from the service.
          Posts.Get($routeParams.id).then(function (data) {
            console.log(data);
            vm.post = data; 
          });
          
          // Load the current comments from the server.
          Posts.GetComments($routeParams.id).then(function (data) {
            vm.form.comments = data;
          });
          
        }
      }
      
      return directive;
    }
  
}());