angular.module('controllerModule', ['serviceModule'])
.controller('SideBarController', ['$scope', 'productsDataService', 'ordersDataService', 'logisticalDataService',
	function($scope, productsDataService, ordersDataService, logisticalDataService) {
	// productsDataService.get()
	// .then(function(res) {
	// 	$scope.productsNum = res.data.length;
	// });
	$scope.productsNum = productsDataService.get().length;
	$scope.ordersNum = ordersDataService.get().length;
	$scope.logisticalNum = logisticalDataService.get().length;

	// console.log('a');
	$scope.links = ['index', 'products', 'orders', 'logistical', 'analysis'];
	// $scope.activeLink = 'index';
	currentUrlArr = window.location.href.split('/');
	// console.log(currentUrlArr);

	if (currentUrlArr[currentUrlArr.length - 2] == 'products' && typeof parseInt(currentUrlArr.pop()) == 'number') {
		// console.log(currentUrlArr);
		// console.log('detail page');
		// console.log(currentUrlArr);
		$scope.activeLink = currentUrlArr[currentUrlArr.length - 1];
	} else if (currentUrlArr[currentUrlArr.length - 2] == 'update' && typeof parseInt(currentUrlArr.pop()) == 'number') {
		// console.log('update page');
		// console.log(currentUrlArr);
		$scope.activeLink = currentUrlArr[currentUrlArr.length - 2];
	} else {
		// console.log('nav page');
		$scope.activeLink = window.location.href.split('/').pop();
	}

	$scope.linkToFn = function(link) {
		$scope.activeLink = link;
		// console.log(window.location.href.split('/').pop());
	};

	$scope.$on('to-home', function() {
		$scope.activeLink = 'index';
	});

	$scope.$on('productsUpdate', function() {
		console.log(productsDataService.get().length);
		$scope.productsNum = productsDataService.get().length;
	});

	$scope.$on('logisticalUpdate', function() {
		$scope.logisticalNum = logisticalDataService.get().length;
	});

}])
.controller('ProductsListController', ['$scope', 'productsDataService', '$location', '$rootScope', 'Excel', '$timeout',
	function($scope, productsDataService, $location, $rootScope, Excel, $timeout) {

	$scope.productsListData = productsDataService.get();
	// console.log(productsDataService.get());

	// $scope.productsListData = productsDataService.get();
	$scope.buttonArray = [];
	for (var i = 0; i < Math.ceil($scope.productsListData.length / 7); i++) {
		$scope.buttonArray.push(i);
	}

	$scope.currentIndex = 0;

	$scope.toCurrentIndex = function(index) {
		$scope.currentIndex = index;
	};

	$scope.deleteItemFn = function(index) {
		// console.log(document.getElementById('deleteModal'))
		// $(document.getElementById('deleteModal')).modal('fast');
		$('#deleteProductModal').modal();
		$scope.deletePartInfo = $scope.productsListData;
		$scope.deleteIndex = index;

		//更新sidebar列表
		
		// $scope.toDeleteFn = function() {
		// 	console.log('a');
		// 	// $scope.productsListData.splice(index, 1);
		// 	// $('#deleteModal').modal('hide');
		// };
	};

	$scope.addNewProduct = function() {
		$location.path('/product/add');
	};

	// $scope.$on('dataUpdate', function(ev, data) {
	// 	console.log(data);
	// 	var tempData = data;
	// 	angular.forEach($scope.productsListData, function(item, index) {
	// 		if (item._id == tempData._id) {
	// 			console.log('update');
	// 			$scope.$apply(function() {
	// 				$scope.productsListData[index] = tempData;
	// 			});
	// 			console.log($scope.productsListData[index]);
	// 		}
	// 	});
	// });
}])
.controller('ProductDetailController', ['$scope', 'productsDataService', '$rootScope', '$location', 
	function($scope, productsDataService, $rootScope, $location) {
	// productsDataService.get()
	// .then(function(res) {
	// 	$scope.productId = window.location.href.split('/').pop();
	// 	console.log('begin get data');
	// 	$scope.productsList = res.data;
	// 	console.log(res);

	// 	angular.forEach($scope.productsList, function(item, index) {
	// 		if (item._id == $scope.productId) {
	// 			 $scope.productData = itagem;
	// 		}
	// 	});
	// 	$scope.imgStyle = {
	// 		height: '350px',
	// 		margin: '30px',
	// 		background: 'no-repeat center url("' + $scope.productData.img + '")',
	// 		backgroundSize: 'contain'
	// 	};

	// });

	// setTimeout(function() {
		$rootScope.$on('$routeChangeStart', function() {
			console.log('$routeChangeStart');
		});
		$rootScope.$on('$routeChangeSuccess', function() {	
			console.log('$routeChangeSuccess');
		});
		$rootScope.$on('$locationChangeStart', function() {
			console.log('$locationChangeStart');
		});
		$rootScope.$on('$locationChangeSuccess', function() {
			console.log('$locationChangeSuccess');
		});
		$scope.productId = $location.path().split('/').pop();
		$scope.productsList = productsDataService.get();

		angular.forEach($scope.productsList, function(item, index) {
			if (item._id == $scope.productId) {
				 console.log(item._id);
				 $scope.productData = item;
				 if (item._id == 11) {
				 	$('.info-main-box').css({
				 		'background': '#fff'
				 	});
				 } else if (item._id >= 8) {
				 	console.log('watch serise2');
				 	$('.info-main-box').css({
				 		'background': '#f2f2f2'
				 	});
				 }

			}
		});

	 	$scope.imgStyle = {
			height: '350px',
			margin: '30px',
			background: 'no-repeat center url("' + $scope.productData.img + '")',
			backgroundSize: 'contain'
		};
	// }, 100);

	// var urlArr =  window.location.href.split('/');
	// $scope.productId = urlArr[urlArr.length - 1];


	$scope.formInvalidateStyle = {

	};

	$scope.toHomeFn = function() {
		$scope.$emit('to-home');
	};

}])
.controller('ProductUpdateController', ['$scope', '$rootScope', 'productsDataService', '$location', function($scope, $rootScope, productsDataService, $location) {
	// productsDataService.get()
	// .then(function(res) {
	// 	$scope.productId = window.location.href.split('/').pop();
	// 	$scope.productsList = res.data;
	// 	angular.forEach($scope.productsList, function(item, index) {
	// 		if (item._id == $scope.productId) {
	// 			 $scope.productData = item;
	// 		}
	// 	});
	// });

	$scope.productId = $location.path().split('/').pop();
	$scope.productsList = productsDataService.get();
	angular.forEach($scope.productsList, function(item, index) {
		if (item._id == $scope.productId) {
			 $scope.productData = item;
		}
	});
	$scope.isModalShow = false;

	$scope.addThingsFn = function() {
		$scope.productData.techspecs.inthebox.push({
			content: ''
		});
		
	};

	$scope.addPackageFn = function() {
		$scope.productData.packages.push({
			content: ''
		});
	};

	$scope.addInfoFn = function() {
		$scope.productData.techspecs.sizeweight.push({
			content: ''
		});
	};

	$scope.submitFormFn = function() {
		$('#updateModal').modal();
		console.log($scope.isModalShow);
	};

	$scope.removeFn = function(whichPart, index) {
		$('#deleteUpdateInfo').modal();
		$scope.deleteIndex = index;
		if (whichPart === 'package') {
			$scope.deletePartInfo = $scope.productData.packages;
		} else {
			$scope.deletePartInfo = $scope.productData.techspecs[whichPart];
		}

	};

	$scope.toUpdateFn = function() {
		// $scope.$emit('dataUpdate', $scope.productData);
		$scope.isModalShow = true;
		console.log($scope.productsList);
		sessionStorage.setItem('productsData', JSON.stringify($scope.productsList));
		$('#updateModal').modal('hide');
		$location.path('/products');
		// setTimeout(function() {
		// 	$rootScope.$broadcast('dataUpdate', $scope.productData);
		// }, 100);
		// $location.path('/products');

	};

	// $rootScope.$on('$stateChangeStart', function(event) {
	// 	console.log('change')
	// });


	$scope.$watch('isModalShow', function(newV, oldV) {
		console.log(newV);
	});
	$scope.$on('$locationChangeStart', function(event) {
		// console.log('locationschangestart');
		console.log($location.path());
		var urlArr = $location.path().split('/');
		console.log($scope.isModalShow);
		if ( urlArr[urlArr.length - 2] !== 'update' && !$scope.isModalShow ) {
			if (confirm('Are you sure to leave without submit?')) {

			} else {
				event.preventDefault();
			}
		}
	});
}])
.controller('ProductAddController', ['$scope', 'productsDataService', '$location', '$rootScope', 
	function($scope, productsDataService, $location, $rootScope) {
		$scope.productData = {
			_id: undefined,
			name: undefined,
			price: undefined,
			quantity: undefined,
			measurement: undefined,
			packages: [],
			img: undefined,
			description: undefined,
			techspecs: {
				sizeweight: [],
				inthebox: []
			}
		};
		$scope.isModalShow = false;

		$scope.addThingsFn = function() {
			$scope.productData.techspecs.inthebox.push({
				content: ''
			});
		};

		$scope.addPackageFn = function() {
			console.log($scope.productData.packages)
			$scope.productData.packages.push({
				content: ''
			});
		};

		$scope.addInfoFn = function() {
			$scope.productData.techspecs.sizeweight.push({
				content: ''
			});
		};

		$scope.submitFormFn = function() {
			$('#addModal').modal();
			console.log($scope.productData);
		};

		$scope.toAddFn = function() {
			// $scope.$emit('dataUpdate', $scope.productData);
			// console.log($scope.productsList);
			$scope.isModalShow = true;
			var temp = productsDataService.get();
			$scope.productData._id = temp.length + 1;
			temp.push($scope.productData);

			sessionStorage.setItem('productsData', JSON.stringify(temp));

			$rootScope.$broadcast('productsUpdate');

			$('#addModal').modal('hide');
			$location.path('/products');


		};

		$scope.removeFn = function(whichPart, index) {
			$('#deleteUpdateInfo').modal();
			$scope.deleteIndex = index;
			if (whichPart === 'package') {
				$scope.deletePartInfo = $scope.productData.packages;
			} else {
				$scope.deletePartInfo = $scope.productData.techspecs[whichPart];
			}
		};

		$scope.$on('$locationChangeStart', function(event) {
			console.log('locationschangestart');
			console.log($location.path());
			var urlArr = $location.path().split('/');
			if ( urlArr[urlArr.length - 1] !== 'add' && !$scope.isModalShow) {
				if (confirm('Are you sure to leave without submit?')) {

				} else {
					event.preventDefault();
				}
			}
		});
}])
.controller('BreadNavDividerController', ['$scope', function($scope) {
	$scope.toHomeFn = function() {
		$scope.$emit('to-home');
	};
}])
.controller('OrdersListController', ['$scope', 'ordersDataService', 'productsDataService', 'usersDataService',
	function($scope, ordersDataService, productsDataService, usersDataService) {
		$scope.productsData = productsDataService.get();
		$scope.ordersData = ordersDataService.get();
		$scope.usersData = usersDataService.get();

		var tempLen = $scope.productsData.length;

		$scope.buttonArray = [];
		for (var i = 0; i < Math.ceil($scope.ordersData.length / 7); i++) {
			$scope.buttonArray.push(i);
		}

		$scope.currentIndex = 0;

		$scope.toCurrentIndex = function(index) {
			$scope.currentIndex = index;
		};

		$scope.prePage = function() {
			$scope.currentIndex --;
		};
		$scope.nextPage = function() {
			$scope.currentIndex ++;
		};
		$scope.toFirstPage = function() {
			$scope.currentIndex = 0;
		};
		$scope.toLastPage = function() {
			$scope.currentIndex = $scope.buttonArray.length - 1;
		};
		$scope.ordersList = [];
		angular.forEach($scope.ordersData, function(item, index) {
			var orderObj = {
				owner: '',
				time: item.time,
				content: [],
				total: 0,
				_id: item._id
			};

			angular.forEach($scope.usersData, function(user, index) {
				// console.log(user._id + '|' + item.owner_id);
				if (user._id === item.owner_id) {
					orderObj.owner = user.name;

				}
			});
			angular.forEach(item.content, function(products, _index) {
				for(var i = 0; i < tempLen; i++) {
					if (products.product_id == $scope.productsData[i]._id) {
						orderObj.content.push({
							productId: $scope.productsData[i]._id,
							productName: $scope.productsData[i].name,
							productPrice: $scope.productsData[i].price,
							quantity: products.quantity
						});
						orderObj.total += products.quantity * $scope.productsData[i].price;
						break;
					}
				}
			});

			$scope.ordersList.push(orderObj);
		});
		$scope.ordersListTemp = $scope.ordersList.slice(0);

		$scope.orderListOrder = '_id';
		$scope.orderProperty = '_id';
		$scope.isOrderReverse = false;
		$scope.orderByFn = function(property) {
			if (property !== 'time') {
				// console.log($scope.orderProperty, property)
				if ($scope.orderProperty == property) {
				// console.log($scope.isOrderReverse)
					if (!$scope.isOrderReverse) {
						$scope.orderListOrder = '-' + $scope.orderListOrder;
					} else {
						$scope.orderListOrder = property;
					}
 					$scope.isOrderReverse = !$scope.isOrderReverse;
					
				} else {
					$scope.orderListOrder = property;
					$scope.orderProperty = property;
					$scope.isOrderReverse = false;
				}
			} else {
				if ($scope.orderProperty == 'time') {
					console.log('1')
					if (!$scope.isOrderReverse) {
						$scope.orderListOrder = function(item) {
							return -new Date(item.time.replace(/-/g, '/'));
						};
					} else {
						$scope.orderListOrder = function(item) {
							return new Date(item.time.replace(/-/g, '/'));
						};
					}
					$scope.isOrderReverse = !$scope.isOrderReverse;
					
				} else {
					$scope.orderProperty = property;
					$scope.isOrderReverse = false;
					$scope.orderListOrder = function(item) {
						
						return new Date(item.time.replace(/-/g, '/'));
					};
				}
				
			}
		};

		$scope.$watch('orderListOrder', function(newV, oldV) {
			console.log(newV);
		});

		$scope.timePreYear = 'Select Year';
		$scope.timePreMon = 'Select Month';
		$scope.timeNextYear = 'Select Year';
		$scope.timeNextMon = 'Select Month';
		$scope.showTimePicker = function() {
			console.log('1');
			$('#timePicker').modal();
		};

		$scope.toPick = function() {
			var isRight = true;
			if (Number($scope.timePreYear) > Number($scope.timeNextYear)) {
				console.log(Number($scope.timePreYear) + '|' + Number($scope.timeNextYear));
				isRight = false;
			} else if (Number($scope.timePreYear) == Number($scope.timeNextYear)) {
				console.log('year ==');
				if (Number($scope.timePreMon) > Number($scope.timeNextMon)) {
					console.log('mon over');
					isRight = false;
				}
			}
			if (!isRight) {
				alert('Mistake! Please check the date again');
			} else {

				$scope.ordersList = $scope.ordersListTemp.slice(0);
				$scope.ordersNewArr = [];
				$scope.ordersList.forEach(function(item, index) {
					if (Number(item.time.split('-')[0]) >= Number($scope.timePreYear) && Number(item.time.split('-')[0]) <= Number($scope.timeNextYear)) {
						console.log(item.time);
						console.log($scope.timePreYear, $scope.timePreMon, $scope.timeNextYear, $scope.timeNextMon);
						if (Number(item.time.split('-')[0]) == Number($scope.timePreYear) && Number(item.time.split('-')[0]) != Number($scope.timeNextYear) && Number(item.time.split('-')[1]) >=  Number($scope.timePreMon)) {
							$scope.ordersNewArr.push(item);
						} else if (Number(item.time.split('-')[0]) == Number($scope.timeNextYear) && Number(item.time.split('-')[0]) != Number($scope.timePreYear) && Number(item.time.split('-')[1]) <=  Number($scope.timeNextMon)) {
							console.log('2')
							$scope.ordersNewArr.push(item);
						} else if ($scope.timeNextYear == $scope.timePreYear && Number(item.time.split('-')[1]) <= Number($scope.timeNextMon) && Number(item.time.split('-')[1]) >= Number($scope.timePreMon))  {
							$scope.ordersNewArr.push(item);
						}
					}
				});
				// console.log($scope.ordersNewArr)
				$scope.ordersList = $scope.ordersNewArr;
				$('#timePicker').modal('hide');
			}
		};
		$scope.toShowAll = function() {
			$scope.ordersList = $scope.ordersListTemp.slice(0);
			$('#timePicker').modal('hide');
		};
		// console.log($scope.ordersList);
}])
.controller('OrderDetailController', ['$scope', 'ordersDataService', 'productsDataService', '$location', 'usersDataService',
	function($scope, ordersDataService, productsDataService, $location, usersDataService) {
		$scope.productsData = productsDataService.get();
		$scope.ordersData = ordersDataService.get();
		$scope.usersData = usersDataService.get();


		var tempLen = $scope.productsData.length;

		$scope.orderData = {
			content: [],
			total: 0
		};
		$scope.orderId = $location.path().split('/').pop();
		angular.forEach($scope.ordersData, function(item, index) {
			console.log($scope.orderId);
			if (item._id == $scope.orderId) {
				// console.log('a');
				angular.forEach($scope.usersData, function(user, index) {
					// console.log(user._id + '|' + item.owner_id);
					if (user._id === item.owner_id) {
						$scope.orderData.owner = user.name;
					}
				});
				$scope.orderData.time = item.time;
				$scope.orderData.id = item._id;
				//循环 content 匹配出 Product信息 在写入orderData
				angular.forEach(item.content, function(product, _index) {
					for(var i = 0; i < tempLen; i++) {
						if (product.product_id == $scope.productsData[i]._id) {
							$scope.orderData.content.push({
								productId: $scope.productsData[i]._id,
								productName: $scope.productsData[i].name,
								productPrice: $scope.productsData[i].price,
								quantity: product.quantity
							});
							$scope.orderData.total += product.quantity * $scope.productsData[i].price;
							break;
						}
					}	
				});
			}
		});
		console.log($scope.orderData);

}])
.controller('OrderUpdateController', ['$scope', 'ordersDataService', 'productsDataService', '$location', 'usersDataService',
	function($scope, ordersDataService, productsDataService, $location, usersDataService) {
		$scope.productsData = productsDataService.get();
		$scope.ordersData = ordersDataService.get();
		$scope.usersData = usersDataService.get();
		$scope.isModalShow = false;
		var tempLen = $scope.productsData.length;

		$scope.orderData = {
			content: [],
			total: 0
		};


		$scope.orderId = $location.path().split('/').pop();
		angular.forEach($scope.ordersData, function(item, index) {
			if (item._id == $scope.orderId) {

				angular.forEach($scope.usersData, function(user, index) {
					if (user._id === item.owner_id) {
						$scope.orderData.owner = user.name;
						$scope.orderData.owner_id = user._id;
						// $scope.orderData.owner = item.owner;
						// console.log(item.name)
					}
				});
				$scope.orderData.time = item.time;
				//循环 content 匹配出 Product信息 在写入orderData
				angular.forEach(item.content, function(product, _index) {
					for(var i = 0; i < tempLen; i++) {
						if (product.product_id == $scope.productsData[i]._id) {
							$scope.orderData.content.push({
								productId: $scope.productsData[i]._id,
								productName: $scope.productsData[i].name,
								productPrice: $scope.productsData[i].price,
								quantity: product.quantity
							});
							$scope.orderData.total += product.quantity * $scope.productsData[i].price;
							break;
						}
					}	
				});
			}
		});
		// console.log($scope.orderData);
		$scope.$watch('orderData.content', function(newValue, oldValue) {
			var temp = 0;
			// angular.forEach($scope.orderData.content, function(item, index) {
			// 	console.log(typeof parseInt(item.quantity))
			// 	$scope.orderData.content[index].quantity = parseInt(item.quantity);
			// 	temp += item.productPrice * parseInt(item.quantity);
			// });
			// console.log(oldValue);
			
			for(var index = 0; index < $scope.orderData.content.length; index++) {
				if ($scope.orderData.content[index].quantity <= 0) {
					if (confirm('Do you wanna delete this product?')) {
						 $scope.orderData.content.splice(index, 1);
					} else {
						// $scope.orderData.content[index].quantity = 1;
						$scope.orderData.content[index].quantity = $scope.ordersData[$scope.orderId - 1].content[index].quantity;
					}
				}
				$scope.orderData.content[index].quantity = parseInt($scope.orderData.content[index].quantity);
				temp += $scope.orderData.content[index].productPrice * $scope.orderData.content[index].quantity;
			}
			// if $scope.order.content[i].quantity
			$scope.orderData.total = temp;
			
		}, true);

		$scope.submitFn = function() {
			if (confirm('Do you sure to submit?')) {
				$scope.isModalShow = true;
				console.log($scope.orderData);
				//吧更新数据 渲染到 order格式
				// sessionStorage.setItem('data', JSON.stringify($scope.productsList));
				// $('#updateModal').modal('hide');
				// $location.path('/products');
				var tempObj = {};

				angular.forEach($scope.usersData, function(user, index) {
					if (user._id === $scope.orderData.owner_id) {
						$scope.usersData[index].name = $scope.orderData.owner;
						sessionStorage.setItem('usersData', JSON.stringify($scope.usersData));
					}
				});

				angular.forEach($scope.ordersData, function(item, index) {
					if (item._id == $scope.orderId) {
						tempObj =  {
							_id: $scope.orderId,
							owner_id: $scope.orderData.owner_id,
							content: $scope.orderData.content,
							time: $scope.orderData.time
						};
						for (var i = 0; i < tempObj.content.length; i++) {
							tempObj.content[i].product_id = tempObj.content[i].productId;
							delete tempObj.content[i].productId;
							delete tempObj.content[i].productName;
							delete tempObj.content[i].productPrice;
							delete tempObj.content[i].owner;
							delete tempObj.content[i].$$hashKey;
						}
						$scope.ordersData[index] = tempObj;
					}
				});

				// console.log(tempObj);
				console.log($scope.ordersData);
				sessionStorage.setItem('ordersData', JSON.stringify($scope.ordersData));
				$location.path('/orders');
			} else {

				return;
			}
		};

		$scope.$on('$locationChangeStart', function(event) {
			console.log('locationschangestart');
			console.log($location.path());
			var urlArr = $location.path().split('/');
			if ( urlArr[urlArr.length - 2] !== 'update' && !$scope.isModalShow) {
				if (confirm('Are you sure to leave without submit?')) {

				} else {
					event.preventDefault();
				}
			}
		});
}])
.controller('LogisticalListController', ['$scope', 'productsDataService', 'ordersDataService', 'logisticalDataService', 'usersDataService', '$location',
	function($scope, productsDataService, ordersDataService, logisticalDataService, usersDataService, $location) {
		$scope.productsData = productsDataService.get();
		$scope.ordersData = ordersDataService.get();
		$scope.logisticalData = logisticalDataService.get();
		$scope.usersData = usersDataService.get();


		$scope.buttonArray = [];
		for (var i = 0; i < Math.ceil($scope.logisticalData.length / 7); i++) {
			$scope.buttonArray.push(i);
		}

		$scope.currentIndex = 0;

		$scope.toCurrentIndex = function(index) {
			$scope.currentIndex = index;
		};

		$scope.prePage = function() {
			$scope.currentIndex --;
		};
		$scope.nextPage = function() {
			$scope.currentIndex ++;
		};
		$scope.toFirstPage = function() {
			$scope.currentIndex = 0;
		};
		$scope.toLastPage = function() {
			$scope.currentIndex = $scope.buttonArray.length - 1;
		};
		$scope.logisticalList = [];
		angular.forEach($scope.logisticalData, function(item, index) {
			for (var i = 0; i < $scope.ordersData.length; i++) {
				if (item.order_id == $scope.ordersData[i]._id) {
					var tempStatus;
					if (item.status === 0) {
						tempStatus = 'Undelivered Order';
					} else if (item.status === 1) {	
						tempStatus = 'Delivering Order';
					} else {
						tempStatus = 'Signed Order';
					}
					angular.forEach($scope.usersData, function(user, index) {
					if (user._id === $scope.ordersData[i].owner_id) {
						// console.log(user.tel + '|' + $scope.ordersData[i].owner_id)
						$scope.logisticalList.push({
							_id: item._id,
							owner: user.name,
							time: $scope.ordersData[i].time,
							status: tempStatus,
							logisticalInfo: item.logisticalInfo,
							tel: user.tel,
							order_id: item.order_id
						});
					}
						
					});

				}
			} 
		});
		$scope.logisticalTemp = $scope.logisticalList.slice(0);
		// console.log($scope.logisticalList);
		$scope.newLogisticArr = [{content: ''}];
		$scope.addNewLogistic = function() {
			console.log('a');
			$('#addLogistic').modal();
			// $('.add-logistical-info-input').focus();
		};


		$scope.toAddFn = function() {
			$scope.newLogisticArr.push({content: ''});
		};

		$scope.removeFn = function(index) {
			if ($scope.newLogisticArr.length <= 1) {
				alert('It\'s the last Order!');
			} else {
				if(confirm('Are you sure to delete this Order logistical information?')) {
					$scope.newLogisticArr.splice(index, 1);
				} else {
					return;
				}	
			}
		};
		$scope.hasSame = false;
		$scope.isExist = false;
		$scope.notHasOrderIndexArr = [];
		$scope.$watch('newLogisticArr', function(newValue, oldValue) {
			// $scope.newLogisticArr.forEach(function(item, index) {
			$scope.hasSame = false;
			$scope.isExist = false;
			// console.log($scope.newLogisticArr);
			// console.log($scope.hasSame + 'be');x
			for (var j = 0; j < $scope.newLogisticArr.length - 1; j++) {
				for (var i = 1; i < $scope.newLogisticArr.length; i++) {
					if ($scope.newLogisticArr[j].content === $scope.newLogisticArr[i].content && $scope.newLogisticArr[j].content.trim().length !== 0 && $scope.newLogisticArr[j].content.trim() !== undefined &&
						$scope.newLogisticArr[i].content.trim().length !== 0 && $scope.newLogisticArr[i].content.trim() !== undefined && j !== i) {
						// console.log($scope.newLogisticArr[j].content + '|' + $scope.newLogisticArr[i].content)
						$scope.hasSame = true;
					}
				}
			}

			angular.forEach($scope.logisticalData, function(item, index) {
				for (var j = 0; j < $scope.newLogisticArr.length; j++) {
					if ($scope.newLogisticArr[j].content == item.order_id) {
						$scope.isExist = true;
						$scope.isExistIndex = j;
					}
				}
			});

			$scope.hasOrder = false;
			for (var j = 0; j < $scope.newLogisticArr.length; j++) {
				$scope.hasOrder = false;
				$scope.newLogisticArr[j].hasOrderId = false;
				for (var i = 0; i < $scope.ordersData.length; i++) {
					// console.log($scope.newLogisticArr[j].content + '|' + $scope.ordersData[i]._id);
					if ($scope.newLogisticArr[j].content == $scope.ordersData[i]._id) {
						$scope.hasOrder = true;
						$scope.newLogisticArr[j].hasOrderId = true;
						console.log($scope.newLogisticArr[j]);
					}
				}
			}

		}, true);

		$scope.submitFn = function() {
			console.log($scope.logisticalData)
			if (confirm('Do you sure to submit?')) {
				var tempLen = $scope.logisticalData.length;
				angular.forEach($scope.newLogisticArr, function(item, index) {
					$scope.newLogisticArr[index]._id = tempLen + index + 1;
					$scope.newLogisticArr[index].status = 	0;
					$scope.newLogisticArr[index].logisticalInfo = [];
					$scope.newLogisticArr[index].order_id = parseInt($scope.newLogisticArr[index].content);

					delete $scope.newLogisticArr[index].$$hashKey;
					delete $scope.newLogisticArr[index].content;
				});
				$scope.logisticalData = $scope.logisticalData.concat($scope.newLogisticArr);
				console.log($scope.logisticalData);
				sessionStorage.setItem('logisticalData', JSON.stringify($scope.logisticalData));
				$('#addLogistic').modal('hide');
				location.reload();
			} else {
				return;
			}

		};

		$scope.orderListOrder = 'order_id';
		$scope.orderProperty = 'order_id';
		$scope.isOrderReverse = false;
		$scope.orderByFn = function(property) {
			if (property !== 'time') {
				// console.log($scope.orderProperty, property)
				if ($scope.orderProperty == property) {
				// console.log($scope.isOrderReverse)
					if (!$scope.isOrderReverse) {
						$scope.orderListOrder = '-' + $scope.orderListOrder;
					} else {
						$scope.orderListOrder = property;
					}
						$scope.isOrderReverse = !$scope.isOrderReverse;
					
				} else {
					$scope.orderListOrder = property;
					$scope.orderProperty = property;
					$scope.isOrderReverse = false;
				}
			} else {
				if ($scope.orderProperty == 'time') {
					if (!$scope.isOrderReverse) {
						$scope.orderListOrder = function(item) {
							return -new Date(item.time.replace(/-/g, '/'));
						};
					} else {
						$scope.orderListOrder = function(item) {
							return new Date(item.time.replace(/-/g, '/'));
						};
					}
					$scope.isOrderReverse = !$scope.isOrderReverse;
					
				} else {
					$scope.orderProperty = property;
					$scope.isOrderReverse = false;
					$scope.orderListOrder = function(item) {
						
						return new Date(item.time.replace(/-/g, '/'));
					};
				}
				
			}
		}

		$scope.timePreYear = 'Select Year';
		$scope.timePreMon = 'Select Month';
		$scope.timeNextYear = 'Select Year';
		$scope.timeNextMon = 'Select Month';
		$scope.showTimePicker = function() {
			console.log('1');
			$('#logisticTimePicker').modal();
		};

		$scope.toPick = function() {
			var isRight = true;
			if (isNaN(parseInt($scope.timePreYear)) || isNaN(parseInt($scope.timePreMon)) || isNaN(parseInt($scope.timeNextYear)) || isNaN(parseInt($scope.timeNextMon))) {
				isRight = false;
			}
			if (Number($scope.timePreYear) > Number($scope.timeNextYear)) {
				console.log(Number($scope.timePreYear) + '|' + Number($scope.timeNextYear));
				isRight = false;
			} else if (Number($scope.timePreYear) == Number($scope.timeNextYear)) {
				console.log('year ==');
				if (Number($scope.timePreMon) > Number($scope.timeNextMon)) {
					console.log('mon over');
					isRight = false;
				}
			}
			if (!isRight) {
				alert('Mistake! Please check the date again');
			} else {
				$scope.logisticalList = $scope.logisticalTemp.slice(0);
				$scope.ordersNewArr = [];
				$scope.logisticalList.forEach(function(item, index) {
					if (Number(item.time.split('-')[0]) >= Number($scope.timePreYear) && Number(item.time.split('-')[0]) <= Number($scope.timeNextYear)) {
						console.log(item.time);
						console.log($scope.timePreYear, $scope.timePreMon, $scope.timeNextYear, $scope.timeNextMon);
						if (Number(item.time.split('-')[0]) == Number($scope.timePreYear) && Number(item.time.split('-')[0]) != Number($scope.timeNextYear) && Number(item.time.split('-')[1]) >=  Number($scope.timePreMon)) {
							$scope.ordersNewArr.push(item);
						} else if (Number(item.time.split('-')[0]) == Number($scope.timeNextYear) && Number(item.time.split('-')[0]) != Number($scope.timePreYear) && Number(item.time.split('-')[1]) <=  Number($scope.timeNextMon)) {
							console.log('2')
							$scope.ordersNewArr.push(item);
						} else if ($scope.timeNextYear == $scope.timePreYear && Number(item.time.split('-')[1]) <= Number($scope.timeNextMon) && Number(item.time.split('-')[1]) >= Number($scope.timePreMon))  {
							$scope.ordersNewArr.push(item);
						}
					}
				});
				// console.log($scope.ordersNewArr)
				$scope.logisticalList = $scope.ordersNewArr;
				$('#logisticTimePicker').modal('hide');
			}
		};
		$scope.toShowAll = function() {
			$scope.ordersList = $scope.ordersListTemp.slice(0);
			$('#timePicker').modal('hide');
		};
}])
.controller('LogisticalUpdateController', ['$scope', 'ordersDataService', 'logisticalDataService', '$location', 'usersDataService',
	function($scope, ordersDataService, logisticalDataService, $location, usersDataService) {
		$scope.ordersData = ordersDataService.get();
		$scope.logisticalList = logisticalDataService.get();
		$scope.usersData = usersDataService.get();
		$scope.isModalShow = false;

		$scope.logisticalData = {};
		$scope.logisticalId = $location.path().split('/').pop();

		angular.forEach($scope.logisticalList, function(item, index) {
			if (item._id == $scope.logisticalId) {
				$scope.logisticalData._id = item._id;
				$scope.logisticalData.status = item.status;
				if (item.status === 0) {
					$scope.logisticalData.statusInfo = 'Undelivered';
				} else if (item.status === 1) {
					$scope.logisticalData.statusInfo = 'Delivering';
				} else {
					$scope.logisticalData.statusInfo = 'Signed';
				}
				$scope.logisticalData.logisticalInfo = item.logisticalInfo;
				$scope.logisticalData.order_id = item.order_id;

				


				angular.forEach($scope.ordersData, function(order, _index) {
					if (order._id == $scope.logisticalData.order_id) {
						$scope.logisticalData.time = order.time;

						angular.forEach($scope.usersData, function(user, index) {
							if (user._id === order.owner_id) {
								$scope.logisticalData.owner_id = user._id;
								$scope.logisticalData.owner = user.name;
								$scope.logisticalData.add = user.add;
								$scope.logisticalData.tel = user.tel;
							}
						});
					}
				});
			}
		});
		console.log($scope.logisticalData);

		$scope.submitFormFn = function() {
			console.log($scope.logisticalData);
			if ( confirm('Do you sure to submit this update?')) {
				// delete $scope.logisticalData.statusInfo;
				// delete $scope.logisticalData.time;
				// delete $scope.logisticalData.owner;
				$scope.isModalShow = true;
				angular.forEach($scope.usersData, function(user, index) {
					if (user._id === $scope.logisticalData.owner_id) {
						$scope.usersData[index].name = $scope.logisticalData.owner;
						$scope.usersData[index].add = $scope.logisticalData.add;
						$scope.usersData[index].tel = $scope.logisticalData.tel;
					}
				});
				sessionStorage.setItem('usersData', JSON.stringify($scope.usersData));
				// $scope.logisticalList[$scope.logisticalId - 1] = $scope.logisticalData;
				// sessionStorage.setItem('logisticalData', JSON.stringify($scope.logisticalList))
				$location.path('/logistical');

			} else {
				return;
			}
		};

		$scope.$on('$locationChangeStart', function(event) {
			console.log('locationschangestart');
			console.log($location.path());
			var urlArr = $location.path().split('/');
			if ( urlArr[urlArr.length - 2] !== 'update' && !$scope.isModalShow) {
				if (confirm('Are you sure to leave without submit?')) {

				} else {
					event.preventDefault();
				}
			}
		});







		// $scope.removeFn = function(index) {
		// 	if (confirm('Are you sure to delete this logistical info?')) {
		// 		$scope.logisticalData.logisticalInfo.splice(index, 1);
		// 	} else {
		// 		return;
		// 	}
		// };

}])
.controller('HomeController', ['$scope', 'productsDataService', 'ordersDataService', 'logisticalDataService', 'usersDataService',
	function($scope, productsDataService, ordersDataService, logisticalDataService, usersDataService) {
		$scope.productsData = productsDataService.get();
		$scope.ordersData = ordersDataService.get();
		$scope.logisticalData = logisticalDataService.get();
		$scope.usersData = usersDataService.get();

		$scope.productsNum = $scope.productsData.length;
		$scope.ordersNum = $scope.ordersData.length;
		$scope.logisticsNum = $scope.logisticalData.length;
		$scope.usersNum = $scope.usersData.length;

		var salseInit = false;
		var ordersInit = false;
		var logisticInit = false;

		
		$scope.currentChart = undefined;
		$scope.toSelectChartFn = function(chart) {
			$scope.currentChart = chart;
		};


		$scope.ordersList = [];
		var tempLen = $scope.productsData.length;
		angular.forEach($scope.ordersData, function(item, index) {
			var orderObj = {
				owner: '',
				time: item.time,
				content: [],
				total: 0,
				_id: item._id
			};

			angular.forEach($scope.usersData, function(user, index) {
				// console.log(user._id + '|' + item.owner_id);
				if (user._id === item.owner_id) {
					orderObj.owner = user.name;

				}
			});
			angular.forEach(item.content, function(products, _index) {
				for(var i = 0; i < tempLen; i++) {
					if (products.product_id == $scope.productsData[i]._id) {
						orderObj.content.push({
							productId: $scope.productsData[i]._id,
							productName: $scope.productsData[i].name,
							productPrice: $scope.productsData[i].price,
							quantity: products.quantity
						});
						orderObj.total += products.quantity * $scope.productsData[i].price;
						break;
					}
				}
			});

			$scope.ordersList.push(orderObj);
		});

		$scope.logisticalList = [];
		angular.forEach($scope.logisticalData, function(item, index) {
			for (var i = 0; i < $scope.ordersData.length; i++) {
				if (item.order_id == $scope.ordersData[i]._id) {
					var tempStatus;
					if (item.status === 0) {
						tempStatus = 'Undelivered Order';
					} else if (item.status === 1) {	
						tempStatus = 'Delivering Order';
					} else {
						tempStatus = 'Signed Order';
					}
					angular.forEach($scope.usersData, function(user, index) {
					if (user._id === $scope.ordersData[i].owner_id) {
						// console.log(user.tel + '|' + $scope.ordersData[i].owner_id)
						$scope.logisticalList.push({
							_id: item._id,
							owner: user.name,
							time: $scope.ordersData[i].time,
							status: tempStatus,
							logisticalInfo: item.logisticalInfo,
							tel: user.tel,
							order_id: item.order_id
						});
					}
						
					});

				}
			} 
		});

		$scope.toExcelFn = function(chart) {
			if (confirm('Export this chart to excel?')) {
				// var tempId = '#' + chart + 'ToExcel';
				// var tempObj = $('#' + chart + 'ToExcel')
				$('#' + chart + 'ToExcel').table2excel({
					exclude: ".noExl",
					name: "Excel Document Name",
					filename: "charts",
					exclude_img: true,
					exclude_links: true,
					exclude_inputs: true
				});
			} else {
				return;
			}
		};








		$('[data-toggle="tooltip"]').tooltip();

		$('#dashboardNavTab a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});

		var currentMonth = new Date().getMonth();
		var monthArr = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var lastSixMonArr;
		var lastSixMonNumArr;
		var lastSixMonOrderNumArr;
		var monthNumArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var monthOrderNumArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


		//实现输出 当月用户数量数组

		angular.forEach($scope.usersData, function(item, index) {
			if (item.time.match(/\-\d+\-/)[0][1]) {
				// console.log(-parseInt(item.time.match(/\-\d+\-/)[0]));
				var tempMonth = -parseInt(item.time.match(/\-\d+\-/)[0]) - 1;
				monthNumArr[tempMonth]++;
			}
			// if (/\d{4}\-1\-28/g.test(item.time)) {
			// 	monthNumArr[0] = monthNumArr[0] + 1;
			// }
		});

		angular.forEach($scope.ordersData, function(item, index) {
			if (item.time.match(/\-\d+\-/)[0][1]) {
				// console.log(-parseInt(item.time.match(/\-\d+\-/)[0]));
				var tempMonth = -parseInt(item.time.match(/\-\d+\-/)[0]) - 1;
				monthOrderNumArr[tempMonth]++;

			}
		});
		console.log(monthOrderNumArr);

		if (currentMonth <= 5) {
			lastSixMonArr = monthArr.slice(currentMonth + 7).concat(monthArr.slice(0, currentMonth + 1));
			lastSixMonNumArr = monthNumArr.slice(currentMonth + 7).concat(monthNumArr.slice(0, currentMonth + 1));
			lastSixMonOrderNumArr = monthOrderNumArr.slice(currentMonth + 7).concat(monthOrderNumArr.slice(0, currentMonth + 1));
		} else {
			lastSixMonArr = monthArr.slice(currentMonth - 6, currentMonth);
			lastSixMonNumArr = monthNumArr.slice(currentMonth - 6, currentMonth);
			lastSixMonOrderNumArr = monthOrderNumArr.slice(currentMonth - 6, currentMonth);
		}

		// console.log(lastSixMonOrderNumArr);
		lastSixMonArr[lastSixMonArr.length - 1] = lastSixMonArr[lastSixMonArr.length - 1] + '(the current month)';
		$scope.lastSixMonNumArr = lastSixMonNumArr;
		$scope.lastSixMonOrderNumArr = lastSixMonOrderNumArr;

		// console.log(lastSixMonOrderNumArr)
		var userChart = new Highcharts.Chart('userChart', {
			credits: {
				enabled: false
			},
			chart: {
				backgroundColor: '#fafafa'
			},
		    title: {
		        text: 'Last six months user registration trends',
		        x: -20
		    },
		    xAxis: {
		        categories: lastSixMonArr
		    },
		    yAxis: {
		        title: {
		            text: 'Numbers'
		        },
		        plotLines: [{
		            value: 0,
		            width: 1,
		            color: '#808080'
		        }],
		        max: 500,
		        tickInterval: 50,
		        allowDecimals: false,
		    },
		    tooltip: {
		        valueSuffix: 'people'
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'right',
		        verticalAlign: 'middle',
		        borderWidth: 0
		    },
		    series: [{
		        name: 'user registed',
		        data: lastSixMonNumArr,
		        color: '#000'
		    }]
		});

		var orderChart = new Highcharts.Chart('orderChart', {
			credits: {
				enabled: false
			},
			chart: {
				backgroundColor: '#fafafa'
			},
		    title: {
		        text: 'Last six months orders trends',
		        x: -20
		    },
		    xAxis: {
		        categories: lastSixMonArr
		    },
		    yAxis: {
		        title: {
		            text: 'Numbers'
		        },
		        plotLines: [{
		            value: 0,
		            width: 1,
		            color: '#808080'
		        }],
		        max: 50,
		        tickInterval: 10,
		        allowDecimals: false,
		    },
		    tooltip: {
		        valueSuffix: 'orders'
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'right',
		        verticalAlign: 'middle',
		        borderWidth: 0
		    },
		    series: [{
		        name: 'order ordered',
		        data: lastSixMonOrderNumArr,
		        color: '#000'
		    }]
		});

		var logisticsInfoArr = {
			0: 0,
			1: 0,
			2: 0
		};
		angular.forEach($scope.logisticalData, function(item, index) {
			logisticsInfoArr[item.status] ++;
		});
		console.log(logisticsInfoArr);

	    $('#logisticButton').on('click', function() {
	    	if (!logisticInit) 	{
	    		var logisticsChart = new Highcharts.Chart('logisticsChart', {
					credits: {
						enabled: false
					},
					chart: {
				            type: 'pie',
				            // options3d: {
				            //     enabled: true,
				            //     alpha: 45,
				            //     beta: 0
				            // },
				            backgroundColor: '#fafafa'
			        },
			        colors: [
			        	'#444',
			        	'#b94a48',
			        	'#84b12c'
			        ],
			        title: {
			            text: 'Total Informaiton Of All Logistics'
			        },
			        tooltip: {
			            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                depth: 35,
			                dataLabels: {
			                    enabled: true,
			                    format: '{point.name}'
			                }
			            }
			        },
			        series: [{
			            type: 'pie',
			            name: 'The scale in all logistics',
			            data: [
			                ['Delivering Logistics', logisticsInfoArr[1]/(logisticsInfoArr[0] + logisticsInfoArr[1] + logisticsInfoArr[2]).toFixed(3)],
			                ['Undelivered Logistics', logisticsInfoArr[0]/(logisticsInfoArr[0] + logisticsInfoArr[1] + logisticsInfoArr[2]).toFixed(3)],
			                {
			                    name: 'Signed Logistics',
			                    y: logisticsInfoArr[2]/(logisticsInfoArr[0] + logisticsInfoArr[1] + logisticsInfoArr[2]).toFixed(3),
			                    sliced: true,
			                    selected: true
			                }
			            ]
			        }]
			    });

			    logisticInit = true;
	    	}
	    });

		var productsDataArr= [];
	    var productsNameArr = [];
	    var productsSalesArr= [];
	    var productsObj = {};
	    angular.forEach($scope.productsData, function(item, index) {
	    	productsObj[item.name] = {
	    		num: 0,
	    		price: 0
	    	};
	    });

	    angular.forEach($scope.ordersData, function(order, index) {
	    	angular.forEach(order.content, function(orderProduct, _index) {
	    		angular.forEach($scope.productsData, function(product, inner_index) {
	    			if (product._id == orderProduct.product_id) {
	    				productsObj[product.name].num += Number(orderProduct.quantity);
	    				productsObj[product.name].price = Number(product.price);
	    			}
	    		});
	    	});
	    });

	    $scope.bestSalesProduct = {name: '', num: 0};
	    $scope.worstSalesProduct = {name: '', num: 10000};
	    $scope.mostProfitableProduct = {name: '', num: 0, income: 0};
	    $scope.worstProfitableProduct = {name: '', num: 0, income: 1000000};
	    
	    angular.forEach(productsObj, function(item, index) {
	    	// console.log(index)
	    	if (item.num * item.price > $scope.mostProfitableProduct.income) {
	    		$scope.mostProfitableProduct.name = index;
	    		$scope.mostProfitableProduct.num = item.num;
	    		$scope.mostProfitableProduct.income = item.num * item.price;
	    	}

	    	if (item.num * item.price < $scope.worstProfitableProduct.income) {
	    		$scope.worstProfitableProduct.name = index;
	    		$scope.worstProfitableProduct.num = item.num;
	    		$scope.worstProfitableProduct.income = item.num * item.price;
	    	}
	    	if (item.num > $scope.bestSalesProduct.num) {
	    		$scope.bestSalesProduct.name = index;
	    		$scope.bestSalesProduct.num = item.num;
	    	}
	    	if (item.num < $scope.worstSalesProduct.num) {
	    		$scope.worstSalesProduct.name = index;
	    		$scope.worstSalesProduct.num = item.num;
	    	}
	    	productsNameArr.push(index);
	    	productsSalesArr.push(item.num);
	    });


	    console.log(productsNameArr);
	    console.log(productsSalesArr);

		$('#salesButton').on('click', function() {
			if (!salseInit) {
				var salesChart = new Highcharts.Chart('salesChart', {
			    	credits: {
						enabled: false
					},
					chart: {
						backgroundColor: '#fafafa'
					},
				    title: {
				        text: 'Last six months products sales trends',
				        x: -20
				    },
				    xAxis: {
				        categories: productsNameArr
				    },
				    yAxis: {
				        title: {
				            text: 'Numbers'
				        },
				        plotLines: [{
				            value: 0,
				            width: 1,
				            color: '#808080'
				        }],
				        max: 200,
				        tickInterval: 10,
				        allowDecimals: false,
				    },
				    tooltip: {
				        valueSuffix: 'sets'
				    },
				    legend: {
				        layout: 'vertical',
				        align: 'right',
				        verticalAlign: 'middle',
				        borderWidth: 0
				    },
				    series: [{
				        name: 'saled',
				        data: productsSalesArr,
				        color: '#000'
				    }]
			    });
			    salseInit = true;
			}
		});

		$scope.showChartsModal = function() {
			$('#chartsModal').modal();
		};
}]);





