(function () {
  'use strict';
  
  angular
    .module('app')
    .service('globalTimerSvc', GlobalTimerService);
    
    GlobalTimerService.$inject = ['$timeout'];
    
    function GlobalTimerService($timeout) {
      var exports = {},
        tickers = [];
      
      function addTicker(func, interval) {
        tickers.push({
          func: func,
          interval: interval,
          sinceLast: 0
        });
        
        tick();
      }
      
      function smallestInterval() {
        var i = 0,
          currInterval,
          rtnInterval;
        
        for (i = 0; i < tickers.length; i++) {
          currInterval = tickers[i].interval - tickers[i].sinceLast;
          
          if(currInterval < rtnInterval || rtnInterval === undefined){
            rtnInterval = currInterval;
          }
        }
        
        return rtnInterval;
      }
      
      function tick() {
        var i = 0;
        
        for (i = 0; i < tickers.length; i++) {
          if (tickers[i].sinceLast > tickers[i].interval) {
            tickers[i].sinceLast = 0;
            tickers.func();
          }
        }
        
        $timeout(tick, smallestInterval());
      }
      
      exports.addTicker = addTicker;
      
      return exports;
    }
}());