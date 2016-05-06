// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Food = require('./app/models/food.js');//database
var apiRouter = express.Router(); //using express router
var autoIncrement = require('mongoose-auto-increment');
var Order = require('./app/models/order.js');


// configuration ===============================================================
mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use('/api', apiRouter); //appending api to all api url


//Create a food item
apiRouter.route('/food')

.get(function(req,res){

 Food.find(function(err, foods) {


 if (err) res.send(err);

 // return the users
 console.log(foods);
 res.json(foods);
 });

})

.post(function(req, res) {
	console.log("I m here inside post of forms");
 
 // create a new instance of the User model
var food = new Food();
console.log(req.body.text);

console.log(req.body.price);
 // set the users information (comes from the request)
food.nameVal=req.body.text;
food.price=req.body.price;

 // save the user and check for errors
 food.save(function(err) {
 	console.log("I m here inside save function");
 
 if (err) {
 	console.log("error here in /food.js");
 	console.log(err); 
 }
 console.log("SUCCESSFUL");
 res.json("records inserted successfuly");
 });

})


apiRouter.route('/food/:foodID')

.get(function(req,res){


 Food.find({"nameVal": req.params.foodID},function(err, foods) {


 if (err) res.send(err);

 // return the users
 console.log(foods);
 res.json(foods);
 });

})

.delete(function(req, res) {

	 Food.remove({
	 nameVal: req.params.foodID
	 }, function(err, user) {
	 if (err) return res.send(err);

	 res.json({ message: 'Successfully deleted' });
	 });
})


apiRouter.route('/total')

.get(function(req,res){
//Get Total of all food items
 Food.find(function(err, foods) {


 if (err) res.send(err);

 // return the users
 console.log(foods);
 var totalPrice=0;
 for(var i=0;i<foods.length;i++){
 	totalPrice+=foods[i].price;
 }
 totalPrice=Number((totalPrice).toFixed(3));
 res.json(totalPrice);
 });

})

apiRouter.route('/total/:orderNo')

.get(function(req,res){

//Calculate total for each order
 Food.find({"nameVal": req.params.nameVal},function(err, foods) {


 if (err) res.send(err);

 // return the users
 console.log(foods);
 res.json(foods);
 });

})



// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
