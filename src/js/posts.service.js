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
      
      function _GetPromoteTime(postId) {
        return $http.get('/post/' + postId + '/promote');
      }

    return service;
  } 
  
}());