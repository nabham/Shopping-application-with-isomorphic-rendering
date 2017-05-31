var mongoose = require('mongoose');
var ProductSchema = require('./models/ProductSchema.js');
var UserSchema = require('./models/UserSchema.js');

mongoose.connect("mongodb://localhost/ekart",function(){
  console.log("db connected");
});

