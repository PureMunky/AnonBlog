/* Angular App */
(function () {
  angular
    .module('app', ['ngRoute'])
    .config(config);
    
  config.$inject = ['$routeProvider'];
  
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/frontpage.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: 'MainCtrl'
      })
      .when('/write', {
        template: '<div ab-write></div>'
      })
      .when('/:id', {
        templateUrl: 'partials/view.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
}());