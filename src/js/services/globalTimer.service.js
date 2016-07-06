(function () {
  'use strict';
  
  angular
    .module('app')
    .service('globalTimerSvc', GlobalTimerService);
    
    GlobalTimerService.$inject = [];
    
    function GlobalTimerService() {
      var exports = {},
        tickers = [];
      
      function addTicker(func, interval) {
        tickers.push({
          func: func,
          interval: interval,
          sinceLast: 0
        });
      }
      
      function tick() {
        var i = 0;
        
        for (i = 0; i < tickers.length; i++) {
          if (tickers[i].sinceLast > tickers[i].interval) {
            tickers[i].sinceLast = 0;
            tickers.func();
          }
        }
      }
      
      exports.addTicker = addTicker;
      
      return exports;
    }
}());