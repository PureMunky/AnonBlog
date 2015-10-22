(function () {
  
  angular
    .module('app')
    .controller('View', ViewController);
  
  ViewController.$inject = ['Posts'];
  
  function ViewController(Posts) {
    var vm = this;
    
    vm.form = {
      comments: []
    };

/*
    Posts.Get(PostId).then(function (data) {
      $scope.post = data.data;
    });

    Posts.GetComments($routeParams.PostId).then(function (data) {
      $scope.form.comments = data.data;
    });
    */
  }

}());
