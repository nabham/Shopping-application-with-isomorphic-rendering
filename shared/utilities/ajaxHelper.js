var $=require('jquery');

function SyncGetRequest(url){
  var data;
  $.ajax({
    url:url,
    type:'GET',
    async:false,
    success:function(retObj){
      data=retObj;
    },
    error:function(err){
      data=err;
    }
  });
  return data;
}

function SyncPostRequest(url,data){
  var data;
  $.ajax({
    url:url,
    type:'POST',
    async:false,
    data:data,
    success:function(retObj){
      data=retObj;
    },
    error:function(err){
      data=err;
    }
  });
  return data;
}


module.exports = {
    loadProducts: SyncGetRequest,
    getProductNames : SyncGetRequest,
    updateCartQuantity: SyncPostRequest,
    removeFromCart: SyncPostRequest,
    registerUser: SyncPostRequest,
    loginUser:SyncPostRequest,
    submitfeed:SyncPostRequest,
    addcart:SyncPostRequest,
    placeOrder:SyncPostRequest,
    updateState:SyncPostRequest,
    updatechanges:SyncPostRequest,
    mergecart:SyncPostRequest,
    finduser:SyncGetRequest,
    updateOrder:SyncPostRequest,
    removeWishlist:SyncGetRequest,
    addtowishlis:SyncPostRequest,
    modifyCard: SyncPostRequest,
    modifyAddress: SyncPostRequest,
    modifyNotifications: SyncPostRequest,
    insertNotification:SyncPostRequest,
    getUserProfile:SyncGetRequest,
    reloaddata:SyncPostRequest
};
