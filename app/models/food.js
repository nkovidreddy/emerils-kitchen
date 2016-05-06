var mongoose = require('mongoose');


var Schema=mongoose.Schema;
  // user schema
var foodSchema = new Schema({
 //name: String,
        nameVal: String,
        price: Number
});

foodSchema.pre('save', function(next) {
 	console.log("In Save Function");
 	next();
 });

module.exports = mongoose.model('Food', foodSchema);
    