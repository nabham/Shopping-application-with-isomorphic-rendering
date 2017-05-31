var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  _id: String,
  name: String,
  description: String,
  category: String,
  image_url: String,
  feedback: [{
    comment: String,
    rating: Number,
    user_name: String,
    added_date: Date
  }],
  deals:{
    deal_date: Date,
    deal_name: String,
    deal_discount: Number
  }
});

module.exports=mongoose.model("ProductSchema",ProductSchema,"products");
