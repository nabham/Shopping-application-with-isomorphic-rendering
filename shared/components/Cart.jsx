import React from 'react';
import { changeQuantityInCart,removeProductFromCart } from '../actions/UserActions';
import { Link } from 'react-router';
import {connect} from 'react-redux';


let loggedIn;
let localStorageCart;

const mapStateToProps= (state) => {
    return {
        UserReducer:{cart:state.UserReducer.cart,_id:state.UserReducer._id}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatecart : (data) => {
            dispatch(changeQuantityInCart(data));
        },
        removerprod : (data) =>{
            dispatch(removeProductFromCart(data));
        }
    }
}

class Cart extends React.Component{

  constructor(props){
      super(props);
      this.state = {
          tprice:0,
          cartS: []
      }
      this.handleCheckOut=this.handleCheckOut.bind(this);
      this.handleAdd=this.handleAdd.bind(this);
      this.handleRemoveProduct=this.handleRemoveProduct.bind(this);
      this.handleSub = this.handleSub.bind(this);
  }

  handleCheckOut(){
    if(loggedIn){
        this.props.history.push('/makePayment');
    }
    else{
        this.props.history.push('/login');
    }
  }

  handleAdd(e){
      let quantity = e.target.value.split(',')[0];
      let id = e.target.value.split(',')[1];
      if(quantity<4){
          if(loggedIn){ this.props.updatecart({userid:this.props.UserReducer._id,id:id,quantity:parseInt(quantity)+1});
            this.setState({cartS:[]});
          }
      else{
          let cart=JSON.parse(localStorage.getItem('cart'));
          let newCart = [];
          cart.forEach(c=>{
          if(c._id!=id){
              newCart.push(c);
          }
          else{
                newCart.push(Object.assign({},c,{quantity:parseInt(quantity)+1}));
            }
        })
        this.setState({cartS:newCart});
		newCart = JSON.stringify(newCart);
        localStorage.setItem('cart',newCart);
      }
    }
  }

handleSub(e){
      let quantity = e.target.value.split(',')[0];
      let id = e.target.value.split(',')[1];
      if(quantity>1){
          if(loggedIn){ this.props.updatecart({userid:this.props.UserReducer._id,id:id,quantity:parseInt(quantity)-1});
            this.setState({cartS:[]});
            }
        else{
            let cart=JSON.parse(localStorage.getItem('cart'));
            let newCart = [];
            cart.forEach(c=>{
              if(c._id!=id){
                  newCart.push(c);
              }
              else{
                  newCart.push(Object.assign({},c,{quantity:parseInt(quantity)-1}));
              }
            })
            this.setState({cartS:newCart});
    		newCart = JSON.stringify(newCart);
            localStorage.setItem('cart',newCart);
        }
    }
  }

  handleRemoveProduct(e){
      let id = e.target.value;
      if(loggedIn){
          var ret = this.props.removerprod({UserId:this.props.UserReducer._id,ProdId:id});
          this.setState({cartS:[]});
      }
      else{
          let cart=JSON.parse(localStorage.getItem('cart'));
          let newCart = [];
          cart.forEach(c=>{
              if(c._id!=id){
                  newCart.push(c);
              }
          })
          this.setState({cartS:newCart});
	      newCart = JSON.stringify(newCart);
          localStorage.setItem('cart',newCart);
          window.emitter.emit('connection');
    }
  }

  componentDidMount(){
      loggedIn = typeof sessionStorage == "object"?sessionStorage.getItem("userName")?sessionStorage.getItem('userName'):false:false;
      localStorageCart = [];
      if(!loggedIn && localStorage.getItem('cart')){
          localStorageCart = JSON.parse(localStorage.getItem('cart'));
      }
      this.setState({cartS:localStorageCart})
  }

  render(){
    loggedIn = typeof sessionStorage ==  "object"?sessionStorage.getItem("userName")?sessionStorage.getItem('userName'):false:false;
    let cart = [];

    if (!loggedIn) {
        cart = this.state.cartS;
    }
    else if (loggedIn){
        if(this.props.UserReducer._id && this.props.UserReducer.cart.length>0){
            cart = this.props.UserReducer.cart;
        }
    }
    let rows=[];
    let tprice = 0;
    cart.forEach((c,i)=>{
        tprice += (c.price*c.quantity)
        rows.push(<tr key={i} className={'tableRow'}><td><img src={c.image_url} style={{width:'70px',height:'100px',margin:'5px'}}/></td><td style={{fontSize:'16px'}}><b>{c.name}</b></td><td>{c.categories}</td><td><button className={'incButton'} type='button' value={[c.quantity,c._id]} onClick={this.handleSub}>-</button><span>{c.quantity}</span><button className={'incButton'} style={{marginLeft:'10px'}} type='button' value={[c.quantity,c._id]} onClick={this.handleAdd}>+</button></td><td>{c.price*c.quantity}</td><td><button type='button' className={'removeButton'} value={c._id} onClick={this.handleRemoveProduct}>Remove Item</button></td></tr>);
    });
    let deliveryCharge = 100;
    if(tprice>1000){
        deliveryCharge = 0;
    }
    return(
      <div style={{padding:'20px',minHeight:'100%'}}>
        <h2>Shopping Cart</h2>
        <table className={'cartTable'}>
          <thead>
          <tr className={'cartHead'}>
            <th></th>
            <th></th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
          </tr>
          </thead>
        <tbody>
            {rows}
        </tbody>
        </table>
        <div style={{marginRight:'440px',marginTop:'20px'}}>
        <div><h4 style={{float:'right'}}>Total Amount: {tprice==0?<div></div>:tprice+deliveryCharge}</h4></div>
        <div><button type='button' className={tprice==0?'disabled-link':''} style={{border:'0',borderRadius:'1px',backgroundColor:'#5cb85c',height:'35px',width:'100px',fontSize:'18px',color:'#ffffff',clear:'both',float:'right'}} onClick={this.handleCheckOut}>Checkout</button></div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);
