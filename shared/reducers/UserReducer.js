

export default function UserReducer(state={}, action){
  switch (action.type) {
    case 'UPDATE_STATE':
        return Object.assign({},state,{...action.data});
        break;
    case 'REGISTER':
      return state;
      break;
    case 'LOGIN':
      sessionStorage.setItem('userName',action.data._id);
      return Object.assign({},state,{...action.data});
      break;
    case "CHANGE_QUANTITY_IN_CART":
      let newCart = [];
      state.cart.forEach(function(cartItem){
        if(cartItem._id == action.data.id){
          newCart.push(Object.assign({},cartItem,{quantity:action.data.quantity}));
        }
        else {
          newCart.push(cartItem);
        }
      });
    return Object.assign({},state,{cart:newCart});
      break;
    case "REMOVE_PRODUCT_FROM_CART":

      let newCartRemCart = [];
      state.cart.forEach(function(cartItem){
        if(cartItem._id != action.data.ProdId){
          newCartRemCart.push(cartItem);
        }
      });
      return Object.assign({},state,{cart:newCartRemCart});
      break;
    case 'ADD_TO_CART':
      var cp = Object.assign({},state);
      var flag = true;
      console.log(cp["cart"]);
      if(cp["cart"].length>0){
          cp["cart"].forEach((item,i)=>{
              if(action.data._id==item._id){
                  cp["cart"][i]["quantity"] += parseInt(action.data.quantity);
                  flag=false;
              }
          })
        }
        if(flag){
        cp.cart.push(action.data);
        }
          return cp;
    case 'MERGE_TO_CART':
        var cp = Object.assign({},state);
        var flag = true;
        if(cp["cart"].length>0){
            cp["cart"].forEach((item,i) => {
                if(action.data._id==item._id){
                    if(cp["cart"][i]["quantity"]+parseInt(action.data.quantity)>4){
                        cp["cart"][i]["quantity"] = 4;
                    }
                    else{
                        cp["cart"][i]["quantity"] += parseInt(action.data.quantity);
                    }
                    flag = false;
                }
            })
            if(flag){
                if(parseInt(action.data.quantity)>4){
                action.data.quantity = 4
                }
                cp.cart.push(action.data);
                }
        }
        else{
            if(parseInt(action.data.quantity)>4){
                action.data.quantity = 4
            }
            cp.cart.push(action.data);
        }
        return cp
    case 'ADD_TO_WISHLIST':
        var flag = true;
        var cp = Object.assign({},state);
        if(cp["wishlist"].length>0){
            cp["wishlist"].forEach((item)=>{
                if(action.data._id==item._id){
                    flag=false;
                }
            })
            if(flag){
                cp.wishlist.push(action.data);
            }
        }
        else{
            cp.wishlist.push(action.data);
        }
        return cp
    case 'wishlistToCart':
      var cp = Object.assign({},state);
      var flag = true;
      console.log("in reducer wish");
        console.log(action.data);
      if(cp["cart"].length>0){
      cp["cart"].forEach((item,i)=>{
          if(action.data._id==item._id){
              if(cp["cart"][i]["quantity"]<4){
              cp["cart"][i]["quantity"] = parseInt(action.data.quantity)+1;
              }
              flag=false;
          }
        })
      if(flag){
          cp.cart.push(action.data)
      }
      }
    else{
        cp.cart.push(action.data)
    }
    return cp
    case 'wishlistRemove':

        return Object.assign({},state,{wishlist:action.data});
    case 'MODIFY_ORDER':
        var cp = Object.assign({},state,{order_history:action.data.order_history});
        cp.notification.push(action.data.notifObj);
        if(cp.refreshOrderHistory!=null)
            cp.refreshOrderHistory=!cp.refreshOrderHistory;
        else
            cp.refreshOrderHistory=true;
        return cp;
    case 'MODIFY_ADDRESS':
        console.log("inside modify address");
        console.log(action.data);
        return Object.assign({},state,{address:action.data});
    case 'SELECT_ADDRESS':
        console.log("inside select address");
        return Object.assign({},state,{selectedAddress:action.data});
    case "MODIFY_CARD":
        return Object.assign({},state,{card_details:action.data.card_details});
    case "GET_CARD":
        console.log("in reducer");
        return state;
    case "SELECT_CARD":
        console.log("in reducer");
        return Object.assign({},state,{selectedCard:action.data});
    case "RESET_SELECTED_CARD":
        return Object.assign({},state,{selectedCard:{}});
    case "PLACE_ORDER":
        var cp = Object.assign({},state,{address:action.data.data.data.address,card_details:action.data.data.data.card_details,cart:[]});
        cp.order_history.push(action.data.data.order);
        cp.notification.push(action.data.notifObj);
        return cp;
    case 'UPDATE_CHANGES':
        return Object.assign({},state,{name:action.data.name,mobile_no:action.data.mobile_no});
    case 'EMPTY':
        var cp = Object.assign({},state);
        cp = {};
        return cp;
    case 'MODIFY_NOTIFICATION':
          return Object.assign({},state,{notification:action.data});
    case 'RESET_ADDRESS_CARD':
        return Object.assign({},state,{selectedCard:null,selectedAddress:null});
    default:
      return state;
  }
}
