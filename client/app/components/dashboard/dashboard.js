angular.module('App')
.component('dashboard', {
  templateUrl: '/client/app/components/dashboard/dashboard.html',
  controller: function(StockService) {
  	var vm = this;

    vm.$onInit = function() {
    	vm.symbols = StockService.get();

    	StockService.load(vm.symbols)
    	.then(function(stocks) {
    		vm.stocks = stocks;
    	});
    };
  }
});
