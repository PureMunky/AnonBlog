(function (AB) {
  AB.Services = AB.Services || {};

  AB.Services.Posts = AB.App.service('Posts', [function () {
    var service = {};

    service.Test = function () {
      return 'service message';
    }

    return service;
  }]); 
}(AnonBlog));