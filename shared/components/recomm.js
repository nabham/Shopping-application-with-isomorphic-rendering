import React from 'react';
import { connect }            from 'react-redux';
import * as UserActions from '../actions/UserActions';
import AjaxHelper from '../utilities/ajaxHelper';
import Product from './Product';

const mapStateToProps = (state) => {
    console.log("in recomm");
    console.log(state);
  return {
    state:state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin : (data) =>
     { dispatch(UserActions.Login(AjaxHelper.loginUser('/api/loginUser', data)));
    }
  }
}

class Recommendations extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.onLogin(data);
  }



  render() {
        let loggedIn = typeof sessionStorage == "object"?sessionStorage.getItem("userName")?sessionStorage.getItem('userName'):false:false;
            let localStorageCart = [];
        if(typeof localStorage == "object"){
        localStorageCart = JSON.parse(localStorage.getItem('cart'));
        }
      let cart = [];
        if(localStorageCart && loggedIn){
          let dbCart = []
          if(this.props.UserReducer){
            if(this.props.UserReducer.cart){
              dbCart = this.props.UserReducer.cart;
            }
          }

          localStorageCart.forEach(function(eachItem){
            dbCart.forEach(function(eachDbItem){
              if(eachDbItem._id == localStorageCart._id){
                eachDbItem.quantity += localStorageCart.quantity;
              }
            })
          })
          cart = dbCart;

        }

    let rows = []
    let history = this.props.history;
    let distinc = [];
    if(this.props.state.UserReducer.order_history.length>0){
        rows = [];
        distinc = [];
        var self = this;
        this.props.state.UserReducer.order_history.map((item) => {
            let datestr = Date.parse(item.order_date);
            let orderdate = new Date(datestr);
            let today = new Date();
            if((today.getFullYear()==orderdate.getFullYear()) && (today.getMonth()-orderdate.getMonth())<=1){
            item.product_details.map((pro) => {
                if(distinc.indexOf(pro._id) == -1){
                distinc.push(pro._id);
                let ideal = 'false';
                self.props.state.ProductReducer.Products.forEach((item2) =>{
                    if(item2._id==pro._id){
                        ideal = item2.isDeal;
                    }
                })
                rows.push(<div><Product id={pro._id} deal={ideal} url={pro.image_url} proname={pro.name} history = {history}/></div>)
                }
            })
            }
        });
    }
    else{
        rows = [];
        rows.push(<div>You Havent purchased anything from us. Please Chekout the amazing deals</div>)
    }

    return (
    <div style={{marginLeft:"50px",marginTop:"50px"}}>
        <div className={'dealHead'}><h3>Recommended products</h3></div>
      {rows}
      </div>
    )
  }
}


 export default connect(mapStateToProps,mapDispatchToProps)(Recommendations);
