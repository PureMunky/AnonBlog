var AnonBlog = {};
/* Angular App */
AnonBlog.App = angular.module('AnonBlog', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/partials/frontpage.html',
        controller: AnonBlog.Ctrls.Front
    }).when('/:PostID', {
        templateUrl: 'partials/view.html',
        controller: AnonBlog.Ctrls.View
    }).when('/write', {
        templateUrl: 'partials/write.html',
        controller: AnonBlog.Ctrls.Write
    }).otherwise({
        redirectTo: '/'
    });
}]);