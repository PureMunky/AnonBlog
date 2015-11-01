(function () {
  'use strict';
  
  angular
    .module('app')
    .service('Posts', PostsService);
    
    PostsService.$inject = ['$http'];
    
    function PostsService($http) {
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
        return $http.get('/post/' + postId).then(_ProcessPostData);
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
      
      function _ProcessPostData(data) {
        if (data.data instanceof Array) {
          data.data.map(function(e) {
            postCache[e._id] = e;
          })
        } else if (data.data._id) {
          postCache[data.data._id] = data.data;
        }
        
        console.log(postCache);
        return data.data;
      }
      
      function _ProcessPromoteData(data) {
        return data.data;
      }

    return service;
  } 
  
}());