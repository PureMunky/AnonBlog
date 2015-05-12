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

  AB.Services.Chat = AB.App.service('Chat', ['$http', function ($http) {
    var service = {
      onMessage: _onMessage
    };

    var listeners = [],
      count = 0;

    function _onMessage(postId, func) {
      if (!listeners[postId]) { listeners[postId] = []; }

      listeners[postId].push(func);
      _test(postId);
    }

    function _newMessage(postId, message) {
      var i = 0;

      if (listeners[postId]) {
        for (i = 0; i < listeners[postId].length; i++) {
          listeners[postId][i](message);
        }
      }
    }

    function _test(postId) {
      setInterval(function () {
        _newMessage(postId, { person: 'tester' + (count % 2), message: 'message' + count });
        count++;
      }, 2000);
    }

    return service;
  }]);
}(AnonBlog));