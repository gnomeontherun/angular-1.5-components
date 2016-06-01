angular.module('App')
.component('manage', {
  templateUrl: '/client/app/components/manage/manage.html',
  controller: function(StockService) {
    this.service = StockService;
  	this.symbols = this.service.get();
    this.stock = '';

    this.add = function() {
    	this.symbols.push(this.stock.toUpperCase());
    	this.stock = '';
    };

    this.remove = function(symbol) {
    	this.symbols = this.service.remove(symbol);
    };
  }
});
