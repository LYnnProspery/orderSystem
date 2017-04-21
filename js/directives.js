angular.module('directiveModule', ['serviceModule'])
.directive('sideNav', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'tpls/side-nav-bar-tpl.html',
		controller: 'SideBarController'
	};
})
.directive('topBar', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'tpls/top-bar-tpl.html',
		// controller: 'TopBarController'
	};
})
.directive('breadNavDivider', function() {
	return {
		restrict: 'E',
		// replace: true,
		scope: {
			title: '@content'
		},
		templateUrl: 'tpls/bread-divider-tpl.html',
		controller: 'BreadNavDividerController'
		// link: function(scope, ele, attrs) {
		// 	console.log(attrs.content);
		// 	scope.title = attrs.content;
		// }
	};
})
.directive('detailBreadNavDivider', ['productsDataService', function(productsDataService) {
	return {
		restrict: 'E',
		// scope: {
		// 	product: '@'
		// },
		templateUrl: 'tpls/detail-bread-divider-tpl.html',
		// controller: 'ProductDetailController',
		link: function(scope, ele, attrs) {
		}
	};
}])
.directive('orderBreadNavDivider', function() {
	return {
		restrict: 'E',
		templateUrl: 'tpls/order-bread-divider-tpl.html'
	};
})
.directive('logisticalBreadNavDivider', function() {
	return {
		restrict: 'E',
		templateUrl: 'tpls/logistical-bread-divider-tpl.html'
	};
})
.directive('updateBreadNavDivider', ['productsDataService', function(productsDataService) {
	return {
		restrict: 'E',
		// scope: {
		// 	product: '@'
		// },
		templateUrl: 'tpls/update-bread-divider-tpl.html',
		// controller: 'ProductUpdateController',
		link: function(scope, ele, attrs) {
		}
	};
}])
.directive('addBreadNavDivider', ['productsDataService', function(productsDataService) {
	return {
		restrict: 'E',
		// scope: {
		// 	product: '@'
		// },
		templateUrl: 'tpls/add-bread-divider-tpl.html',
		// controller: 'ProductUpdateController',
		link: function(scope, ele, attrs) {
		}
	};
}])
// .directive('confirmDelete', function() {
// 	return {
// 		restrict: 'E',
// 		templateUrl: 'tpls/confirm-delete-tpl.html'
// 	};
// })
.directive('confirmUpdate', function() {
	return {
		restrict: 'E',
		templateUrl: 'tpls/confirm-update-tpl.html'
	};
})
.directive('confirmAdd', function() {
	return {
		restrict: 'E',
		templateUrl: 'tpls/confirm-add-tpl.html'
	};
})
.directive('confirmModal', function() {
	return {
		restrict: 'E',
		scope: {
			modalTitle: '@title',
			modalContent: '@content',
			modalId: '@modalid',
			data: '=datapart',
			index: '@index'
		},
		templateUrl: 'tpls/confirm-tpl.html',
		controller: ['$scope', '$rootScope', function($scope, $rootScope) {
			$scope.toDeleteFn = function() {
				// console.log($scope.data)
				$scope.data.splice($scope.index, 1);
				if ($scope.modalId == 'deleteProductModal') {
					sessionStorage.setItem('productsData', JSON.stringify($scope.data));
					$rootScope.$broadcast('productsUpdate');
				}
				$('#' + $scope.modalId).modal('hide');
			};

		}]
	};
})
.directive('updateAddForm', function() {
	return {
		restrict: 'E',
		templateUrl: 'tpls/update-add-form-tpl.html'
	};
})
.directive('addLogistic', function() {
	return {
		restrict: 'E',
		templateUrl: 'tpls/add-logistic-tpl.html'
	};
})
