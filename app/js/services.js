(function (AB) {
  AB.Services = AB.Services || {};

  AB.Services.Posts = AB.App.service('Posts', ['$http', function ($http) {
    var service = {};

    service.GetAll = function () {
      return $http.get('/post');
    };

    service.Get = function (postId) {
      return $http.get('/post/' + postId);
    };

    service.GetComments = function (postId) {
      return $http.get('/post/' + postId + '/comments');
    };

    service.Write = function (post) {
      return $http.post('/post', post);
    };

    return service;
  }]); 
}(AnonBlog));