angular.module('foodController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Foods','Totals', function($scope, $http, Foods,Totals) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Foods.get()
			.success(function(data) {
				$scope.foods = data;
				console.log($scope.foods);
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function() {
			console.log("In Create Food Method");
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			console.log($scope.formData.text);
			console.log($scope.formData.price);
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Foods.create($scope.formData)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
								Foods.get()
					.success(function(data) {
						$scope.foods = data;
						console.log($scope.foods);
						$scope.loading = false;
					});
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.foods = data; // assign our new list of foods
						$scope.getTotal();
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Foods.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					Foods.get()
			.success(function(data) {
				$scope.foods = data;
				console.log($scope.foods);
				$scope.loading = false;
			});
					$scope.loading = false;
					$scope.foods = data; // assign our new list of foods
					$scope.getTotal();

				});
		};

		$scope.getTotal = function() {
			console.log("In GetTotal Function");
			$scope.loading = true;

			Totals.get()
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					console.log(data);
					$scope.totalValue = data;
				});
		};
	}]);