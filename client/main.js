angular.module('App', ['ui.router'])
.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

	$stateProvider
	.state('dashboard', {
    url: '/dashboard',
		component: 'dashboard'
	})
	.state('manage', {
    url: '/manage',
		component: 'manage'
	});

  $locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/dashboard');
});
