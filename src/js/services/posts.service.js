(function () {
  'use strict';
  
  angular
    .module('app')
    .service('Posts', PostsService);
    
    PostsService.$inject = ['$http', '$q', 'errorMessageSvc'];
    
    function PostsService($http, $q, errorMessageSvc) {
      var service = {
        Promote: _Promote,
        GetAll: _GetAll,
        Get: _Get,
        GetComments: _GetComments,
        Write: _Write,
        GetPromoteTime: _GetPromoteTime
      };
      
      var postCache = {};

      function _GetAll() {
        return $http.get('/post').then(_ProcessPostData);
      }
  
      function _Get(postId) {
        var deferred = $q.defer();
        
        if(postCache[postId]) {
          deferred.resolve(postCache[postId]);
        } else {
          $http.get('/post/' + postId)
            .then(_ProcessPostData)
            .then(function (data) {
              deferred.resolve(data);
            });
        }
        
        return deferred.promise;
      }
  
      function _GetComments(postId) {
        return $http.get('/post/' + postId + '/comments').then(_ProcessPostData);
      }
  
      function _Write (post) {
        return $http.post('/post', post).then(_ProcessPostData);
      }
  
      function _Promote(postId) {
        return $http.post('/post/' + postId + '/promote').then(_ProcessPromoteData);
      }
      
      function _GetPromoteTime(postId) {
        return $http.get('/post/' + postId + '/promote').then(_ProcessPromoteData);
      }
      
      function _ProcessPostData(response) {
        var i = 0,
          data = response.data;
        
        if(data.success) {
          if (data.data instanceof Array) {
            for(i = 0; i < data.data.length; i++) {
              postCache[data.data[i]._id] = data.data[i];
            }
          } else if (data.data._id) {
            postCache[data.data._id] = data.data;
          }
        } else {
          errorMessageSvc.sendMessage(data.message + ': Error getting post data.');
        }
        
        return data.data;
      }
      
      function _ProcessPromoteData(response) {
        var data = response.data;
        
        if(!data.success) {
          errorMessageSvc.sendMessage(data.message || ': Error getting promotion data.');
        }
        return data.data;
      }

    return service;
  } 
  
}());