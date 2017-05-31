var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id :String,
  name: String,
  mobile_no: Number,
  password:String,
  card_details:[
    {
      card_type:String,
      card_number:String,
      expiration_date:{
        month:Number,
        year:Number
      }
    }
  ],
  address:[
    {
        name:Number,
        phoneNumber:Number,
      line1:String,
      line2:String,
      city:String,
      state:String,
      zipcode:Number
    }
  ],
  wishlist:[
    {
      _id:String,
      name:String,
      description:String,
      categories:String,
      image_url:String,
        price:Number,
        quantity:Number
    }
  ],
  cart: [
    {
      _id:String,
      name:String,
      description:String,
      categories:String,
      image_url:String,
      price:Number,
      deals:[
        {
          deal_date:Date,
          deal_name:String,
          deal_discount:Number
        }
      ],
      quantity:Number
    }
  ],
  order_history: [
    {
      order_id:String,
      order_date:Date,
      order_status:String,
      shipping_address:{
        line1:String,
        line2:String,
        city:String,
        state:String,
        zipcode:Number,
        name:Number,
        phoneNumber:Number
      },
      payment_detail:{
        card_type:String,
        card_number:String,
        expiration_date:{
          month:Number,
          year:Number
        }
      },
      product_details:[
        {
          _id:String,
          name:String,
          description:String,
          categories:String,
          image_url:String,
          deals:[{
            deal_date:Date,
            deal_name:String,
            deal_discount:Number}
          ],
          quantity:Number,
          unit_price:Number
        }
      ]
    }
  ],
  notification:[
    {
      notification_id:String,
      notification_text:String,
      notification_seen:Boolean
    }
  ]
})

module.exports = mongoose.model("UserSchema",UserSchema,"users");
