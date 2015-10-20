var AnonBlog = {};
/* Angular App */
AnonBlog.App = angular.module('AnonBlog', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/frontpage.html',
        controller: AnonBlog.Ctrls.Front
    }).when('/write', {
        templateUrl: 'partials/write.html',
        controller: AnonBlog.Ctrls.Write
    }).when('/:PostId', {
      templateUrl: 'partials/view.html',
      controller: AnonBlog.Ctrls.View
    }).otherwise({
        redirectTo: '/'
    });
}]);