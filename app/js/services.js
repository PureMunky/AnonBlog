(function () {
  angular
    .module('app')
    .service('Posts', ['$http', function ($http) {
    var service = {
      Promote: _Promote,
      GetAll: _GetAll,
      Get: _Get,
      GetComments: _GetComments,
      Write: _Write
    };

    function _GetAll() {
      return $http.get('/post');
    }

    function _Get(postId) {
      return $http.get('/post/' + postId);
    }

    function _GetComments(postId) {
      return $http.get('/post/' + postId + '/comments');
    }

    function _Write (post) {
      return $http.post('/post', post);
    }

    function _Promote(postId) {
      return $http.post('/post/' + postId + '/promote');
    }

    return service;
  }]); 

  angular
    .module('app')
    .service('Chat', ['Posts', function (Posts) {
    var service = {
      onMessage: _onMessage,
      sendMessage: _sendMessage
    };

    var listeners = [],
      messages = [],
      count = 0;

    function _onMessage(postId, func) {
      if (!listeners[postId]) { listeners[postId] = []; }

      listeners[postId].push(func);
      _Listen(postId);
    }

    function _newMessage(postId, message) {
      var i = 0;

      if (listeners[postId]) {
        for (i = 0; i < listeners[postId].length; i++) {
          listeners[postId][i](message);
        }
      }
    }

    function _sendMessage(postId, message) {
      Posts.Write({
        Body: message,
        Parent: postId
      })
    }
    
    function _Listen(postId) {
      messages[postId] = [];

      setInterval(function () {
        Posts.GetComments(postId).then(function (data) {
          return _Diff(postId, data.data);
        }).then(function (newMessages) {
          var i = 0;

          for (i = 0; i < newMessages.length; i++) {
            (function (i) {
              _newMessage(postId, newMessages[i]);
            }(i));
          }
        });
      }, 5000);
    }

    function _Diff(postId, current) {
      var i = 0,
        j = 0,
        found = false,
        newMessages = [];
      for (i = 0; i < current.length; i++) {
        found = false;

        for (j = 0; j < messages[postId].length; j++) {
          if (messages[postId][j]._id === current[i]._id) { found = true; }
        }

        if (!found) {
          newMessages.push(current[i]);
          messages[postId].push(current[i]);
        }
      }

      return newMessages;
    }

    return service;
  }]);
}());