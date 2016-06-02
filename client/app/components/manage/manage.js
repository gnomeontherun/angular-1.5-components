angular.module('App')
.component('manage', {
  templateUrl: '/client/app/components/manage/manage.html',
  controller: function(StockService) {
    var vm = this;

    vm.$onInit = function() {
    	vm.symbols = StockService.get();
      vm.stock = '';

      vm.add = function() {
      	vm.symbols.push(vm.stock.toUpperCase());
      	vm.stock = '';
      };

      vm.remove = function(symbol) {
      	vm.symbols = StockService.remove(symbol);
      };
    };
  }
});
