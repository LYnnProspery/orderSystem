angular.module('lApp', ['ui.router', 'controllerModule', 'directiveModule', 'serviceModule'])
.run(function($http, $rootScope, $location) {

	// $rootScope.$on('$routeChangeStart', function() {
	// 	console.log('$routeChangeStart' + $location.path());
	// });
	// $rootScope.$on('$routeChangeSuccess', function() {	
	// 	console.log('$routeChangeSuccess' + $location.path());
	// });
	// $rootScope.$on('$locationChangeStart', function() {
	// 	console.log('$locationChangeStart' + $location.path());
	// });
	// $rootScope.$on('$locationChangeSuccess', function() {
	// 	console.log('$locationChangeSuccess' + $location.path());
	// });

	if (!sessionStorage.getItem('ordersData') || !sessionStorage.getItem('productsData') || !sessionStorage.getItem('logisticalData') || 
		!sessionStorage.getItem('usersData')) {
		console.log('get json');
		$http.get('data/products_data.json')
		.then(function(res) {
			sessionStorage.setItem('productsData', JSON.stringify(res.data));
		});
		$http.get('data/orders_data.json')
		.then(function(res) {
			sessionStorage.setItem('ordersData', JSON.stringify(res.data));
		});

		$http.get('data/logistical_data.json')
		.then(function(res) {
			sessionStorage.setItem('logisticalData', JSON.stringify(res.data));
		});

		$http.get('data/users_data.json')
		.then(function(res) {
			sessionStorage.setItem('usersData', JSON.stringify(res.data));
		});
	}
})
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/index');

	$stateProvider
		.state('index', {
			url: '/index',
			views: {
				// 'top-bar': {
				// 	templateUrl: 'tpls/top-bar-tpl.html'
				// },
				// 'side-nav-bar': {
				// 	templateUrl: 'tpls/side-nav-bar-tpl.html'
				// },
				// 'info-main-box': {
				// 	templateUrl: 'tpls/info-main-box-tpl.html'
				// }
				'info-main-box': {
					templateUrl: 'tpls/index-tpl.html'
				}

			}
		})
		.state('products', {
			url: '/products',
			views: {
				// 'top-bar': {
				// 	templateUrl: 'tpls/top-bar-tpl.html'
				// },
				// 'main': {
				// 	templateUrl: 'tpls/main-tpl.html'
				// },
				'info-main-box': {
					templateUrl: 'tpls/products-tpl.html'
				}

			}
		})
		.state('orders', {
			url: '/orders',
			views: {
				// 'top-bar': {
				// 	templateUrl: 'tpls/top-bar-tpl.html'
				// },
				// 'main': {
				// 	templateUrl: 'tpls/main-tpl.html'
				// },
				'info-main-box': {
					templateUrl: 'tpls/orders-tpl.html'
				}

			}
		})
		.state('logistical', {
			url: '/logistical',
			views: {
				// 'top-bar': {
				// 	templateUrl: 'tpls/top-bar-tpl.html'
				// },
				// 'main': {
				// 	templateUrl: 'tpls/main-tpl.html'
				// },
				'info-main-box': {
					templateUrl: 'tpls/logistical-tpl.html'
				}

			}
		})
		.state('analysis', {
			url: '/analysis',
			views: {
				// 'top-bar': {
				// 	templateUrl: 'tpls/top-bar-tpl.html'
				// },
				// 'main': {
				// 	templateUrl: 'tpls/main-tpl.html'
				// },
				'info-main-box': {
					templateUrl: 'tpls/analysis-tpl.html'
				}

			}
		})
		.state('productDetail', {
			url: '/products/:id',
			views: {
				'info-main-box': {
					templateUrl: 'tpls/product-detail-tpl.html'
				}
			}
		})
		.state('productUpdate', {
			url: '/products/update/:id',
			views: {
				'info-main-box': {
					templateUrl: 'tpls/product-update-tpl.html'
				}
			}
		})
		.state('productAdd', {
			url: '/product/add',
			views: {
				'info-main-box': {
					templateUrl: 'tpls/product-add-tpl.html'
				}
			}
		})
		.state('orderDetail', {
			url: '/orders/:id',
			views: {
				'info-main-box': {
					templateUrl: 'tpls/order-detail-tpl.html'
				}
			}
		})
		.state('orderUpdate', {
			url: '/orders/update/:id',
			views: {
				'info-main-box': {
					templateUrl: 'tpls/order-update-tpl.html'
				}
			}
		})
		.state('logisticalUpdate', {
			url: '/logistical/update/:id',
			views: {
				'info-main-box': {
					templateUrl: 'tpls/logistical-update-tpl.html'
				}
			}
		})

}])
