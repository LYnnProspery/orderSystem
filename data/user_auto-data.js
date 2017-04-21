var arr = [];
var id = 1;
for (var j = 1; j <= 12; j++) {
	var num = Math.floor(Math.random() * (500 - 100) + 100);
//	console.log(num);
	for(var i = 1; i <= num; i++) {
		if (j >= 6) {
			var obj = {
				"_id": id,
				"name": "Lynn" + id,
				"add": "Xi An University",
				"tel": "13259733984",
				"time": "2016-" + j + "-" +  Math.floor(Math.random() * 28 + 1)
			};

		} else {
			var obj = {
				"_id": id,
				"name": "Lynn" + id,
				"add": "Xi An University",
				"tel": "13259733984",
				"time": "2017-" + j + "-" +  Math.floor(Math.random() * 28 + 1)
			};

		}
		arr.push(obj);
		id ++;
	}
}
console.log(JSON.stringify(arr));

