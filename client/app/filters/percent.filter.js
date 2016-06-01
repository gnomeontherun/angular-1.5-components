angular.module('App')
.filter('percent', function ($filter) {
	var numberFilter = $filter('number');
	return function (num) {
		if (typeof num === 'number')
		return numberFilter(num * 100) + '%';
	};
});
