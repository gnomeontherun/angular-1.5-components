angular.module('App').component('summary', {
	templateUrl: '/client/app/components/summary/summary.html',
	controller: function() {
    this.isNegative = function() {
    	return !(!this.stock || this.stock.change >= 0);
    };

    this.isPositive = function() {
    	return !(!this.stock || this.stock.change <= 0);
    };
  },
	bindings: {
    stock: '<'
  }
});
