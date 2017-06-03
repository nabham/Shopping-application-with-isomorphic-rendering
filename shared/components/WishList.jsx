import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addWishlist}  from '../actions/UserActions';
import {removefromWishlist}  from '../actions/UserActions';
import AjaxHelper from '../utilities/ajaxHelper';
import Product from './Product';

const mapStateToProps = (state) => {
    return {
        state:state.UserReducer,
        productarray:state.ProductReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        wishlisttocart : (data) =>{
            dispatch(addWishlist(data));
        },
        removewishlist : (user,pid,uid) =>{
            dispatch(removefromWishlist(user,pid,uid));
        }
    }
}

class Wishlist extends Component {
    constructor(){
        super();
        this.addtocart=this.addtocart.bind(this);
        this.removewishlist=this.removewishlist.bind(this);
    }

    addtocart(e){
        var cart=this.props.state.cart;
        var data={};
        var Obj={};
        var p='';
        var quantity=0;
        this.props.productarray.Products.forEach((item)=>{
            if(e.target.value==item._id){
                var discount = 0;
                if(item.isDeal == 'true'){
                    discount = item.deals.deal_discount
                }
                Obj = {
                    _id:item._id,
                    name:item.name,
                    description:item.description,
                    categories:item.category,
                    image_url:item.image_url,
                    price:Math.round(item.price*(100-discount)/100),
                    deals:item.deals,
                    quantity:1
                };
            }
        });

        data={
            'userId':this.props.state._id,
            'prodObj':Obj,
            'quantity':quantity
        }
        this.props.wishlisttocart(data);
    }

    removewishlist(e){
        var wishlist=this.props.state.wishlist;
        var new_wish=[];
        wishlist.map((item)=>{if(item._id!=e.target.value){
            new_wish.push(item);
        }})
        this.props.removewishlist(new_wish,e.target.value,this.props.state._id);
     }

	render() {
    let history = this.props.history;
    var obj=this;
    var products=[];
    if(Object.keys(this.props.state).length>0){
        this.props.state.wishlist.forEach(function(item,i){
            products.push(<div key={i} style={{width:'300px',float:'left'}} ><Product id={item._id} url={item.image_url} proname={item.name} history = {history}/><br/>
        <center>
        <button className='btn btn-info' style={{borderRadius:"0px"}} value={item._id} onClick={obj.addtocart}>Move to Cart</button>
        <button className='btn btn-info' style={{borderRadius:"0px"}} value={item._id} onClick={obj.removewishlist}>Remove</button>
        </center>
        </div>);
        })
    };
	return(
		<div className="container">
			<div className="page-header">
			  <h1><small>Your favourites</small></h1>
			</div>
			{products}
		</div>
		);
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(Wishlist);
