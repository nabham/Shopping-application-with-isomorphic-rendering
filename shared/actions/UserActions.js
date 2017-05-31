import Constants from '../utilities/ActionConstants';
import ajaxHelper from '../utilities/ajaxHelper';

export function updateUserState(data){
  return{
    type: 'UPDATE_STATE',
    data
  }
}

export function Login(data) {
  return {
    type : 'LOGIN',
    data:data
  }
}

export function register(data){
// console.log(history);
//AjaxHelper.registerUser('/api/registerUser', data);
  return {
    type : 'REGISTER',
    data: data
  }
}

export function addWishlist(product) {
console.log("in addwish");
  console.log(product.userId);
  console.log(product.prodObj);
  ajaxHelper.addcart('/api/addToCart',{"userId":product.userId,"prodObj":product.prodObj});

  return {
    type : 'wishlistToCart',
    data : product.prodObj
  }
}

export function addtowishlist(data){
    console.log("adding to wish list",data);
    ajaxHelper.addtowishlis('/api/addToWishList',{"userId":data.id,"prodObj":data.product})
    return{
        type: 'ADD_TO_WISHLIST',
        data : data.product
    }
}

export function removefromWishlist(product,pid,uid) {
  console.log(pid);
  //var uid=sessionStorage.userName;
  var uid=uid;
  ajaxHelper.removeWishlist('/api/removeFromWishlist?userId='+uid+'&_id='+pid);
  return {
    type : 'wishlistRemove',
    data : product
  }
}

export function changeQuantityInCart(data){

ajaxHelper.updateCartQuantity('/api/updateCart',{"username":data.userid,"productId":data.id,"quantity":data.quantity});
  return{
    type:Constants.CHANGE_QUANTITY_IN_CART,
    data
  }
}

export function removeProductFromCart(data){
    ajaxHelper.removeFromCart('/api/removeFromCart',{"userId":data.UserId,"ProdId":data.ProdId});
  return{
    type: Constants.REMOVE_PRODUCT_FROM_CART,
    data:data
  }
}

export function selectedAddress(data){
  return{
    type: 'SELECT_ADDRESS',
    data
  }
}


export function modifyAddress(userId, addressState,operation, newAddress=null,oldAddress=null){
    if(operation=="add"){
        if(addressState==null)
          addressState=[];
        addressState.splice(addressState.length, 0, newAddress);
    }
    else if(operation=="edit"){
        var index = -1;
        var val = oldAddress.name;
        var index = addressState.findIndex(function(item, i){
          return item.name === val
        });
        if(index>-1)
            addressState.splice(index,1,newAddress);
    }
    else{
        var val = oldAddress.name;
        var index = addressState.findIndex(function(item, i){
          return item.name === val
        });
        if(index>-1)
            addressState.splice(index,1);
    }
    const data={
      address: addressState,
      userId: userId
    }
    ajaxHelper.modifyAddress('/api/modifyAddress',data);
    return{
      type: 'MODIFY_ADDRESS',
      data:addressState
    }
}


export function modifyOrder(order,operation, order_history,userId){
    order.order_status=operation;
    var val = order.order_id;
    var index = order_history.findIndex(function(item, i){
      return item.order_id === val
    });
    if(index>-1){
        order_history.splice(index,1,order);
    }
    let data={
      order_id: order.order_id,
      order_status: operation,
      userId:userId
    }
    ajaxHelper.updateOrder('/api/updateOrder',data);

    //notificatino
    	    let notifObj={
      notification_id: operation+"_"+order.order_id,
      notification_text:"Order was "+operation+" successfully for Order Id: "+order.order_id,
      notification_seen:false
    }
    let notifData={
      userId: userId,
      notifObj: notifObj
    }
    ajaxHelper.insertNotification('/api/insertNotification',notifData);
    let dataNew={
      order_history:order_history,
      notifObj: notifObj
    }

    return{
      type: 'MODIFY_ORDER',
      data:dataNew
    }
}

export function modifyCard(data){
    console.log("in modifyCard action");
    ajaxHelper.modifyCard('/api/modifyCard',data);
    return{
            type:"MODIFY_CARD",
            data:data
        };
}


export function selectCard(data){
    console.log("in selectCard action");
    return{
        type:"SELECT_CARD",
        data:data
    }
}

export function updateChanges(data){
    console.log("in update action");
    ajaxHelper.updatechanges('/api/updateUser',data);
    return{
            type:"UPDATE_CHANGES",
            data:data
        };
}

export function placeOrder(data){
    console.log("in placeOrder action");
    ajaxHelper.placeOrder('/api/placeOrder',data);

        let notifObj={
      notification_id: "OrderPlaced_"+data.order.order_id,
      notification_text:"Order was placed successfully. Your Id is: "+data.order.order_id,
      notification_seen:false
    }
    let notifData={
      userId: data.data.user_id,
      notifObj: notifObj
    }
    ajaxHelper.insertNotification('/api/insertNotification',notifData);
    let dataNew={
      data:data,
      notifObj: notifObj
    }
    return {
        type:"PLACE_ORDER",
        data:dataNew
    }
}

export function emptyState(){
    return {
        type:"EMPTY"
    }
}

export function modifyNotification(notification, notification_state,userId){
  var val = notification.notification_id;
  var index = notification_state.findIndex(function(item, i){
    return item.notification_id === val
  });
  if(index>-1){
    notification_state.splice(index,1,notification);
  }
  const data={
    notification_id: notification.notification_id,
    userId:userId
  }
    ajaxHelper.modifyNotifications('/api/modifyNotifications',data);
    return {
        type:"MODIFY_NOTIFICATION",
        data:notification_state
    }
}


export function resetSelectedData(){
    return{
      type: "RESET_ADDRESS_CARD"
    }
}
