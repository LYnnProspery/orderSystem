angular.module('serviceModule', [])
.factory('productsDataService', ['$http', function($http) {
	var getData = function() {
		return JSON.parse(sessionStorage.getItem('productsData'));
	};
	return {
		get: getData
	};
}])
.factory('ordersDataService', ['$http', function($http) {
	var getData = function() {
		return JSON.parse(sessionStorage.getItem('ordersData'));
	};
	return {
		get: getData
	};
}])
.factory('logisticalDataService', ['$http', function($http) {
	var getData = function() {
		return JSON.parse(sessionStorage.getItem('logisticalData'));
	};
	return {
		get: getData
	};
}])
.factory('usersDataService', ['$http', function($http) {
	var getData = function() {
		return JSON.parse(sessionStorage.getItem('usersData'));
	};
	return {
		get: getData
	};
}])
.factory('Excel',function($window){
    var uri='data:application/vnd.ms-excel;base64,',
        template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
        format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
    return {
        tableToExcel:function(tableId,worksheetName){
            var table=$(tableId),
                ctx={worksheet:worksheetName,table:table.html()},
                href=uri+base64(format(template,ctx));
            return href;
        }
    };
});