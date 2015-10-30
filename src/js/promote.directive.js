(function () {
  'use strict';
  
  angular
    .module('app')
    .directive('abPromote', PromoteDirective);
    
    function PromoteDirective () {
      var directive = {
        restrict: 'A',
        templateUrl: 'partials/directives/promote.html',
        scope: {
          post: '='
        },
        controllerAs: 'vm',
        bindToController: true,
        controller: PromoteController
      };
      
      PromoteController.$inject = ['$timeout', 'Posts'];
      
      function PromoteController ($timeout, Posts) {
        // ViewModel Definition
        var vm = this;
        
        // Public Variables
        vm.promoted = false;
  
        // Public Functions
        vm.promote = _promote;
        vm.getRemaining = _getRemaining;
        
        // Private Variables
        var timer,
          remainingSeconds;
        
        // Directive Initial Load
        _Load();
        function _Load() {
          Posts.GetPromoteTime(vm.post._id).then(function (data) {
            if(data) {
              remainingSeconds = Math.round(data.data.remainingTime / 1000);
            }
          });
        }
  
        // Promote the current post.
        function _promote() {
          Posts.Promote(vm.post._id).then(function (data) {
            _resetPromote(data.remainingTime);
          }).catch(function(err) {
            console.log(err);
          });
        }
        
        // Updates the seconds remaining until the post can be promoted again.
        function _tickRemaining() {
          remainingSeconds--;
          
          if(timer && !_canPromote()) {
            $timeout.cancel(timer);
          }
          
          if (!_canPromote()) {
            timer = $timeout(_tickRemaining, 1000);
          }
        }
        
        // Gets the current text for the promoted ui.
        function _getRemaining() {
          var remainingTime = 'Promote me!';
          
          if (!_canPromote()) {
            switch (true) {
              case remainingSeconds > 60:
                var min = Math.round(remainingSeconds/60);
                remainingTime = min + (min === 1 ? ' Minute' : ' Minutes');
                break;
              default:
                remainingTime = '<1 Minute';  
            }
          }
          
          return remainingTime;
        }
        
        // bool - returns if the post can currently be promoted.
        function _canPromote() {
          return (remainingSeconds < 0);
        }
        
        // Resets the timer with a new remaining time value.
        function _resetPromote(remainingTime) {
          remainingSeconds = remainingTime;
          _tickRemaining();
        }
        
      }
  
      return directive;
    }
    
}());