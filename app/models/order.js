var mongoose = require('mongoose');


var Schema=mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://localhost/meanstacktutorials');
autoIncrement.initialize(connection);

  // user schema
var orderSchema = new Schema({
 //name: String,
 text: {
        nameVal: String,
        orderID:Number
    }
});


orderSchema.pre('save', function(next) {
 	console.log("In Save Function");
 	next();
 });

orderSchema.plugin(autoIncrement.plugin, 'Order');
module.exports = mongoose.model('Order', orderSchema);
    