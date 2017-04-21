var arr = [];
for (var i = 5; i < 112; i++) {
	var tempRan = Math.floor(Math.random() * 3);
	var obj = {
		_id: i + 1,
		status: tempRan,
		logisticalInfo: tempRan == 0 ? [] : [{
			"content": "Shanghai logistics operation center"
		}, {
			"content": "Xian logistics transshipment center"
		}],
		order_id: i + 1
	}
	arr.push(obj)
}

console.log(JSON.stringify(arr))
