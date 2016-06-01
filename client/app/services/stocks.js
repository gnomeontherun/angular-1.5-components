var symbols = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR'];

angular.module('App')
.factory('StockService', function($http) {

  return {
    get: function() {
    	return symbols;
    },
    add: function(stock) {
    	symbols.push(stock);
    	return this.get();
    },
    remove: function(stock) {
    	symbols.splice(symbols.indexOf(stock), 1);
    	return this.get();
    },
    load: function() {
    	return $http.get('/api/snapshot?symbols=' + symbols.join())
    	.then(function (stocks) {
    		return stocks.data;
    	});
    }
  };
});
