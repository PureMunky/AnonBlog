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
        templateUrl: 'partials/view.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: PostViewController
      };
      
      PostViewController.$inject = ['Posts', '$scope'];
      
      function PostViewController(Posts, $scope) {
        var vm = this;
        
        vm.form = {
          comments: []
        };
        
        vm.Load = function () {
          Posts.GetComments(vm.post._id).then(function (data) {
            vm.form.comments = data.data;
          });
        }
      }
      
      return directive;
    }
  
}());