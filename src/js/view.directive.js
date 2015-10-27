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
        vm.PostBody = '';
        
        Posts.Get($routeParams.id).then(function (data) {
          console.log(data);
          vm.post = data.data; 
          vm.PostBody = textBodyService.parse(vm.post.Body);
        });
        
        Posts.GetComments($routeParams.id).then(function (data) {
          vm.form.comments = data.data;
        });
      }
      
      return directive;
    }
  
}());