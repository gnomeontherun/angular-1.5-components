angular.module('App')
.component('dashboard', {
  templateUrl: '/client/app/components/dashboard/dashboard.html',
  controller: function(StockService) {
  	var self = this;

  	this.symbols = StockService.get();

  	StockService.load(this.symbols)
  	.then(function(stocks) {
  		self.stocks = stocks;
  	});
  }
});
