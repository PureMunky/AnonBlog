/* Angular App */
(function () {
  angular
    .module('app', ['ngRoute'])
    .config(config);
    
  config.$inject = ['$routeProvider'];
  
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<div ab-front></div>'
      })
      .when('/write', {
        template: '<div ab-write></div>'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
}());