import React from 'react';
import {modifyCard,selectCard,placeOrder, resetSelectedData} from '../actions/UserActions.js';
import {connect} from 'react-redux';
import CardHolder from './CardHolder.jsx';
import Address from './Address.jsx';
import AjaxHelper from '../utilities/ajaxHelper.js'

const mapStateToProps=(state)=>{
return{
    state:state.UserReducer
}
}

const mapDispatchToProps= (dispatch) =>{
  return {
      onHandleSubmitForm:(data)=>{
          dispatch(modifyCard(data));
      },
      onGetCard:()=>{
          dispatch({
              type:"GET_CARD"
          })
      },
      onPlaceOrder:(data)=>{
          dispatch(placeOrder(data));
      },
      onUnmountingPayment:()=>{
            dispatch(resetSelectedData());
      }
  }
}

class Payment extends React.Component{
    constructor(props){
        super(props);
        this.handlePlaceOrder=this.handlePlaceOrder.bind(this);
        this.state={
            cardValid:true,
            addressValid:true
        }
    }
    componentWillUnmount(){
        this.setState({cardValid:true,addressValid:true});
        this.props.onUnmountingPayment();
    }

    handlePlaceOrder(){
        if(this.props.state.selectedCard && this.props.state.selectedAddress){
            this.setState({addressValid:true});
            let expDate=this.props.state.selectedCard.expiration_date;
            let e_date=new Date();
            e_date.setFullYear(parseInt(expDate.year));
            e_date.setMonth(parseInt(expDate.month)-1);
            if(e_date-new Date()>=0)
            {
                this.setState({cardValid:true});
                let data={user_id:this.props.state._id,cart:this.props.state.cart,
                    address:this.props.state.address,
                    card_details:this.props.state.card_details,
                selectedCard:this.props.state.selectedCard,
            selectedAddress:this.props.state.selectedAddress}
                console.log(data);
                let order = AjaxHelper.placeOrder('/api/placeOrder',data);
                this.props.onPlaceOrder({data:data,order:order});
                this.props.history.push('/historypage');
            }
            else{
                this.setState({cardValid:false});
            }
        }
        else{
            this.setState({cardValid:false,addressValid:false});
        }
        this.props.onGetCard();
    }

    render(){
        var products=[];
        var totalPrice=0;
        if(this.props.state.cart.length>0){
            this.props.state.cart.map((item,index)=>{
                products.push(<div className="row" style={{borderBottom:"1px solid #cccccc",height:"150px",lineHeight:"150px"}} key={index}>
                <div className="col-sm-4"><img src={item.image_url} style={{width:"150px",height:"100px"}}></img></div>
                <div className="col-sm-3">{item.name}</div>
                <div className="col-sm-3">{item.quantity}</div>
                <div className="col-sm-2">Rs.{item.quantity*item.price}</div></div>)
                totalPrice+=parseInt(item.quantity*item.price);
            })
        }
        return(<div>
        <div className="container-fluid" style={{marginTop:"50px",marginLeft:"50px",fontFamily: '"Trebuchet MS", Helvetica, sans-serif'}}>
          <div className="row" style={{height:"40px"}}>
                <div className="col-sm-4"></div>
                <div className="col-sm-3">Name</div>
                <div className="col-sm-3">Quantity</div>
                <div className="col-sm-2">Price</div>
        
        </div>
            <div className="row">
                <div className="col-sm-12" style={{borderBottom:"1px solid #cccccc"}}></div>
            </div>
        {products}
        <div className="row" style={{marginTop:"30px"}}>
                <div className="col-sm-8"></div>
                <div className="col-sm-2">Total Price</div>
                <div className="col-sm-2">Rs.{totalPrice}</div>

        </div>
        </div>
        <div style={{marginLeft:"50px",marginTop:"50px"}}>
        <div><h3 className={'dealHead'} style={{float:"left"}}>Select Shipping Address</h3><span style={{marginLeft:"20px"}}><img src="./images/address.png" style={{marginTop:"15px"}} height="35px" width="35px"/></span></div><div style={{clear:"both"}}></div><Address showSelect={true}/>
        </div>
        <div style={{marginLeft:"50px",marginTop:"50px"}}>
        <div>
        <h3 className={'dealHead'} style={{float:"left"}}>Select Details</h3><span style={{marginLeft:"20px"}}><img src="./images/visa.png" style={{marginTop:"15px"}} height="35px" width="35px"/></span></div><div style={{clear:"both"}}></div><CardHolder showSelect={true}/></div>
        {(!this.state.cardValid || !this.state.addressValid)?<p style={{color:"red"}}>Please select a valid card and address!!!</p>:<span></span>}
        <center style={{marginTop:"5%"}}><input type="button" className="btn btn-success" style={{backgroundColor:"#3e8e3e"}} value="Place Order" onClick={this.handlePlaceOrder}/></center>
        </div>);
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Payment)