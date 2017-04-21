Array.prototype.random = function () {
	var idx = Math.floor((Math.random()*this.length));
	var n = this.splice(idx,1)[0];
	return n;
}
var orderArr = [];
var orderId = 1;
for (var j = 1; j <= 12; j++) {
	var ranNum = Math.floor(Math.random() * 20 + 1);
//	if (j >= 6) {
		for (var i = 1; i < ranNum; i++) {
			var productIdArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
			var productNum = Math.floor(Math.random() * 13 + 1);
//			console.log(productNum);
			var ranProArr = [];
			var k = 0;
			while (k++ < productNum) {
				ranProArr.push({
					product_id: productIdArr.random(),
					quantity: Math.floor(Math.random() * 5 + 1)
				})
			}
			
			var obj = {
				_id: orderId,
				owner_id: Math.floor(Math.random() * 3747 + 1),
				content: ranProArr,
				time: (i >= 6 ? '2016-' : '2017-') + j + '-' + Math.floor(Math.random() * 28 + 1)
			}
			orderArr.push(obj);
			orderId++;
		}
//	} else {
//		
//	}
}
//console.log(orderArr.length);
console.log(JSON.stringify(orderArr));
//1-13物品id	

//for (var i = 0; i < 1000; i++) {
//	var obj = {
//		_id: i,
//		owner_id: Math.random() * (1 + 7050) + 1,
//		content: []
//	}
//}

