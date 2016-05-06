angular.module('foodService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Foods', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/food');
			},
			create : function(foodData) {
				console.log("In Create Function Foods.js")
				console.log(foodData);
				return $http.post('/api/food', foodData);
			},
			delete : function(id) {
				return $http.delete('/api/food/' + id);
			}
		}
	}])

	.factory('Totals', ['$http',function($http) {
		return {
			get : function() {
				console.log("Calling /api/total function")
				return $http.get('/api/total');
			}
		}
	}])

	.factory('TotalOrderValue', ['$http',function($http) {
		return {
			get : function(id) {
				return $http.get('/api/total/'+ id);
			}
		}
	}])