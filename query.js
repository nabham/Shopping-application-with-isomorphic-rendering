var express = require('express');
var dbconnect = require('./DB/dbconnect.js');
var router = express.Router();
var ProductSchema = require('./DB/models/ProductSchema.js');
var UserSchema = require('./DB/models/UserSchema.js');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';


function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

router.get('/initialProducts',function(req,res) {
  ProductSchema.find(function(err, data){
    res.json(data);
  })
});

router.post('/updatestate',function(req,res){
    let userId = req.body.userId;
    UserSchema.find(function(err,data){
        res.json(data);
    })
})

router.get('/getUser',function(req,res){
    let userId = req.query.username;
    UserSchema.find({"_id":userId},function(err,data){
        if(err){
            res.json(err);
        }
        else{
            res.json(data)
        }
    })
})

router.get('/getProfile',function(req,res){
    let userId = req.query.username;
    UserSchema.find({"_id":userId},function(err,data){
        if(err){
            res.json(err);
        }
        else{
            let passw = decrypt(data[0].password);
            data[0].password = passw;
            res.json(data[0]);
        }
    })
})


router.post('/updateCart', function(req, res){
  let userId = req.body.username;
  let productId = req.body.productId;
  let newQuantity = req.body.quantity;
  UserSchema.update({"_id":userId, "cart._id": productId}, {'$set': {'cart.$.quantity':newQuantity}}, function(err, raw){
    if(err){
      console.log("Error returned "+err);
    }
  });
res.end();
})

router.get('/getProductByNames', function(req, res){
  let searchText = '^'+req.query.searchText;
    console.log('searching');
    console.log(searchText);
  ProductSchema.find({'name': new RegExp(searchText, "i")}, function(err, data){
    console.log(data);
    res.json(data);
  })
})

router.post('/addToCart', function(req, res){
  let userId = req.body.userId;
  let prodObj = req.body.prodObj;
  let prodId = prodObj._id;
  let quant = parseInt(prodObj.quantity);
   let already_quant = 0;
    let set_quant = 0; UserSchema.find({"_id":userId,"cart._id":prodId},function(err,data){
        console.log("outside data");
        console.log(data);
        if(data.length!=0){
            UserSchema.find({"_id":userId,"cart._id":prodId},{"cart":{"$elemMatch":{'_id':prodId}}},function(err,data){
               if(err){
                   console.log(err)
               }
               else{
                   console.log("logging");
                   already_quant = data[0].cart[0].quantity;

                   if((already_quant+quant)>4){
                       set_quant = 4;
                   }
                   else{
                       set_quant = already_quant+quant;
                   }

                   UserSchema.update({"_id":userId,"cart._id":prodId},{'$set':{'cart.$.quantity':set_quant}},function(err,data){
                        if(err){
                          console.log(err);
                        }
                        else{
                          console.log(data);
                    }
                    })
               }
            })
        }
      else{
          console.log('in data null');
          UserSchema.update({"_id":userId},{"$push":{'cart':prodObj}}, function(err, data){
            if(err){
              console.log(err);
            }
            else{
              console.log(data);
            }
  });
      }
    })
  res.end();
});

router.post('/mergeToCart',function(req,res){
    let userId = req.body.userId;
    let prodObj = req.body.prodObj;
    let prodId = prodObj._id;
    let quant = parseInt(prodObj.quantity);
    let already_quant = 0;
    let set_quant = 0;
    console.log(userId,prodId,quant);
    UserSchema.find({"_id":userId,"cart._id":prodId},function(err,data){
        console.log("outside data");
        console.log(data);
        if(data.length!=0){
            console.log("inside data",data);
            console.log(data[0].cart.quantity);
            
            UserSchema.find({"_id":userId,"cart._id":prodId},{"cart":{"$elemMatch":{'_id':prodId}}},function(err,data){
               if(err){
                   console.log(err)
               }
               else{
                   console.log("logging");
                   already_quant = data[0].cart[0].quantity;

                   if((already_quant+quant)>4){
                       set_quant = 4;
                   }
                   else{
                       set_quant = already_quant+quant;
                   }

                   UserSchema.update({"_id":userId,"cart._id":prodId},{'$set':{'cart.$.quantity':set_quant}},function(err,data){
                        if(err){
                          console.log(err);
                        }
                        else{
                          console.log(data);
                    }
                    })
               }
            })
        }             
      else{
          if(quant>4){
              prodObj.quantity = 4;
          }
          UserSchema.update({"_id":userId},{"$push":{'cart':prodObj}}, function(err, data){
            if(err){
              console.log(err);
            }
            else{
              console.log(data);
            }
          });
        }
    })
    res.end(); 
});

router.post('/removeFromCart', function(req,res){
  let userId = req.body.userId;
  let prodId = req.body.ProdId;
    console.log(userId,prodId);
  UserSchema.update({'_id':userId},{"$pull":{'cart': {'_id':prodId}}}, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      console.log(data);
    }
    res.end();
  });
})

router.post('/addToWishlist', function(req, res){
  let userId = req.body.userId;
  let prodObj = req.body.prodObj;
    let prodId = prodObj._id;
 console.log(userId,prodId); UserSchema.find({"_id":userId,"wishlist._id":prodId},function(err,data){
      if(data.length==0){
          UserSchema.update({"_id":userId},{"$push":{'wishlist':prodObj}},function(err,data){
              if(err){
                  console.log(err);
                }
                else{
                  console.log(data);
                }
          });
          
      }
      res.end();
  })
});

router.get('/removeFromWishlist', function(req,res){
  let userId = req.query.userId;
  let prodId = req.query._id;
  UserSchema.update({'_id':userId},{'$pull':{'wishlist' :{'_id':prodId}}}, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      console.log(data);
    }
    res.end();
  });
})

router.post('/addRating', function(req,res){
  let prodId = req.body.prodId;
  let userId = req.body.userId;
  let rating = parseFloat(req.body.rating);
  let comment = req.body.comment;
  ProductSchema.update({'_id':prodId},{'$push':{'feedback':{'comment':comment, 'rating': rating, 'user_name': userId}}}, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      console.log(data);
    }
    res.end();
  });
})

router.post('/updateUser',function(req,res){
    let userId = req.body.userId;
    let name = req.body.name;
    let mobile_no = req.body.mobile_no;
    let encPass = encrypt(req.body.password);
    UserSchema.update({'_id':userId},{'$set':{'name':name,'mobile_no':mobile_no,'password':encPass}},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    res.end();
    });
    
});

router.post('/registerUser',function(req,res) {
  console.log("in registerUser API")
  var user = req.body;
  console.log(user);
  console.log(user.password);
  var encPass = encrypt(user.password);
  user.password=encPass;
  console.log(user.data);
  const userobj = {
                "_id":user.email,
                "name":user.userName,
                "mobile_no":user.phone,
                "password":user.password
              }
              console.log(userobj);
    new UserSchema(userobj).save(function(err,data){
      if(err){
        console.log(err);
          res.end('');
      }
      else {
        res.json(data);
      }
    });
});

router.post('/updateOrder',function(req,res){
    console.log("body recieved: ");
    console.log(req.body);
    let order_id = req.body.order_id;
    console.log("order ID recieved: "+ order_id);
    let user_id=req.body.userId;
    let order_status = req.body.order_status;
    UserSchema.update({"_id":user_id,"order_history.order_id":order_id},{'$set':{'order_history.$.order_status':order_status}},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    res.end();
    });
    
});

router.post('/loginUser',function(req,res) {
  console.log("in loginUser API");
  var user=req.body;
  console.log(user);
  var encPass = encrypt(user.password);
  user.password=encPass;
  UserSchema.findOne(user,function (err,data) {
    console.log(err);
    console.log(data);

    if(data){
      res.json(data);
    }
    else {
      res.json(err);
    }
  })
});

router.post('/placeOrder',function(req,res){
    console.log("request data is: ",req.body);
    let cart=req.body.cart;
    let card_details=req.body.card_details;
    let address=req.body.address;
    let selectedAddress=req.body.selectedAddress;
    let selectedCard=req.body.selectedCard;
    let order_id=req.body.user_id+new Date().getTime();
    let order_history={
        order_id:order_id,
        order_date:new Date(),
        order_status:"open",
        shipping_address:selectedAddress,
        payment_detail:selectedCard,
        product_details:cart
    }
    
    UserSchema.update({_id:req.body.user_id},{'$set':{'cart':[],'card_details':card_details,'address':address},'$push':{'order_history':order_history}},function(err,doc){
        if (err) {
            console.log("some error",err);
            return res.send(500, { error: err });
        }
        
    });
    res.json(order_history);
});


router.post('/modifyCard',function(req,res){
   console.log("card data ",req.body) ;
    UserSchema.update({_id:req.body.user_id},{'$set':{card_details:req.body.card_details}},function(err,doc){
       if(err){
           console.log("some error",err);
           return res.send(500,{error:err});
       }
    });
    res.end();
});



router.post('/modifyAddress',function(req,res){
    UserSchema.update({_id:req.body.userId},{'$set':{address:req.body.address}},function(err,doc){
       if(err){
           console.log("some error",err);
           return res.send(500,{error:err});
       }
    });
    res.end();
});



router.post('/modifyNotifications',function(req,res){
    var notif_id=req.body.notification_id;
    UserSchema.update({"_id":req.body.userId,"notification.notification_id":notif_id},{'$set':{'notification.$.notification_seen':true}},function(err,doc){
       if(err){
           console.log("some error",err);
           return res.send(500,{error:err});
       }
    });
    res.end();
});


router.post('/insertNotification', function(req, res){
  let userId = req.body.userId;
  let notifObj = req.body.notifObj;
  UserSchema.find({"_id":userId},function(err,data){
      UserSchema.update({"_id":userId},{"$push":{'notification':notifObj}},function(err,data){
          if(err){
              console.log(err);
            }
            else{
              console.log(data);
            }
      });
      res.end();
  })
});

export default router;
