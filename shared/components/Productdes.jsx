import React from 'react';
import {connect} from 'react-redux';
import FeedBack from './Feedback';
import Rater from './Rater'
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import { addtocart,submitfeedback } from '../actions/ProductActions.js'
import {addtowishlist} from '../actions/UserActions.js';


const mapStateToProps = (state) => {
  return {
    state:state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
        addtocart : (data) => {
            dispatch(addtocart(data));
        },
        sbmitfeed : (data) => {
            dispatch(submitfeedback(data));
        },
      addtowish : (data) => {
          dispatch(addtowishlist(data));
      }
    }
  }

class ProductDes extends React.Component {

    constructor(props)
    {
      super(props)
      this.state = {
          url:'',
          price:'',
          name:'',
          rating:'5',
          quantity:1,
          latestFeedback:'',
          discount:0,
          dealName:'',
          customer:0
        }
        this.handlequantity = this.handlequantity.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handlewish = this.handlewish.bind(this); this.feedbackSubmitHandler=this.feedbackSubmitHandler.bind(this);
        this.handleFeedbackChange=this.handleFeedbackChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }
    
    componentWillMount(){
     this.props.state.ProductReducer.Products.forEach((item) =>{
       if(item._id == this.props.params.id){
           if(item.isDeal == 'true'){ this.setState({url:item.image_url,price:item.price,name:item.name,discount:item.deals.deal_discount,dealName:item.deals.deal_name,customer:item.feedback.length});
            }
           else{ 
               this.setState({url:item.image_url,price:item.price,name:item.name,discount:0,dealName:'',customer:item.feedback.length});
            }
            }
        })
    }
    
    handlequantity(e){
         this.setState({quantity:e.target.value})
     }
    
    handlewish(){
        let loggedIn = typeof sessionStorage == "object"?sessionStorage.getItem("userName")?sessionStorage.getItem('userName'):false:false;
        var Obj = {};
        if(loggedIn){
        this.props.state.ProductReducer.Products.forEach((item) =>{
       if(item._id == this.props.params.id){
            Obj = {_id:this.props.params.id,
                  name:item.name,
                   description:item.description,
                   categories:item.category,
                   image_url:item.image_url,
                   price:Math.round(this.state.price*(100-this.state.discount)/100),
                   deals:item.deals,
                   quantity:this.state.quantity
                  }
            }
        });
            this.props.addtowish({id:this.props.state.UserReducer._id,product:Obj})
        }
    }
    
    handleAdd(){
        
        let loggedIn = typeof sessionStorage == "object"?sessionStorage.getItem("userName")?sessionStorage.getItem('userName'):false:false;
        var Obj = {};
        var flag = true
        if(loggedIn){
        console.log("logged in")
        this.props.state.UserReducer.cart.forEach((item) => {
            if(item._id==this.props.params.id){
                console.log(parseInt(item.quantity)+parseInt(this.state.quantity));
                if((item.quantity+parseInt(this.state.quantity))>4){
                    
                    alert("you cannot add more than 4 items");
                    flag = false
                }
            }
        })
        }
        if(flag){
        this.props.state.ProductReducer.Products.forEach((item) =>{
       if(item._id == this.props.params.id){
            Obj = {_id:this.props.params.id,
                  name:item.name,
                   description:item.description,
                   categories:item.category,
                   image_url:item.image_url,
                   price:Math.round(this.state.price*(100-this.state.discount)/100),
                   deals:item.deals,
                   quantity:this.state.quantity
                  }
            }
        });
        
        if(loggedIn){ this.props.addtocart({id:this.props.state.UserReducer._id,product:Obj});
        }
        else{
            if(localStorage.getItem("cart")){
                var arr = JSON.parse(localStorage.getItem("cart"));
                var flag = true;
                arr.forEach((c,i)=>{
                    if(c._id==Obj._id){
                        if((parseInt(arr[i].quantity) + parseInt(Obj.quantity))>4){
                            arr[i].quantity = 4
                        }
                        else{
                        arr[i].quantity = parseInt(arr[i].quantity) + parseInt(Obj.quantity);
                        }
                        flag = false;
                    }
                })
                if(flag){
                arr.push(Obj);
                }
            }
            else{
                var arr = [Obj];
            }
            localStorage.setItem("cart",JSON.stringify(arr));
            window.emitter.emit('connection');
        }   
    }
    }
    
    handleFeedbackChange(e){
    this.setState({latestFeedback:e.target.value})
  }
  handleClick(rating){
    this.setState({rating:rating});
  }
  feedbackSubmitHandler(e){
    var Obj = {
        comment:this.state.latestFeedback,
        rating:this.state.rating,
        id:this.props.state.UserReducer._id,
        product:this.props.params.id
    }
    this.props.sbmitfeed(Obj);
    this.setState({latestFeedback:"",rating:"5"});
  }
    
     render(){
         var BreakException = {};
         let loggedin = typeof sessionStorage == "object"?sessionStorage.getItem("userName")?sessionStorage.getItem('userName'):false:false;
         try {
         if(this.props.state.UserReducer.order_history.length>0){
            this.props.state.UserReducer.order_history.map((item) => {
                let datestr = Date.parse(item.order_date);
                let orderdate = new Date(datestr);
                let today = new Date();
                if((today.getFullYear()==orderdate.getFullYear()) && (today.getMonth()-orderdate.getMonth())<=1){
                item.product_details.map((pro) => {
                    if(pro._id==this.props.params.id){
                        if(item.order_status!='open'){
                            loggedin = false;
                        }
                        else{
                            loggedin = true;
                            throw BreakException;
                        }
                    }
                    else{
                        loggedin = false;
                    }
                })
                }
                else{
                   loggedin = false;  
                }
            });
        }
        else{
            loggedin = false;
        }
         }
         catch (e) {
             //intentional catch
              //console.log(e)
         }
        
         
         
         var avg1 = 0;
         var feedbacks = []
        this.props.state.ProductReducer.Products.forEach((item) =>{
       if(item._id == this.props.params.id && item.feedback.length>0){
            var avgrate = 0;
           item.feedback.forEach((feed,i) => {
               feedbacks.push(<div key={i}> <FeedBack rating={feed.rating} username={feed.user_name} comment={feed.comment} /></div>);
               avgrate += parseInt(feed.rating);
           })
           avg1 =  Math.round((avgrate/item.feedback.length)*100)/100;
       }
   })
        let loggedIn = typeof sessionStorage == "object"?sessionStorage.getItem("userName")?sessionStorage.getItem('userName'):false:false;
       return(
         <div>
            <div style={{height:"50px",width:"100%"}}></div>
            <div className={'imgBox1'}>
            <img src={this.state.url} className={'imgBox2'} />
            </div>
            <div className={'descBox'}>
                <ul>
                <li className={'nameHead'}>{this.state.name}</li><br/><Rater value={avg1}/><b>{'  '}</b><span style={{marginLeft:'20px'}}>{this.state.customer} Customer reviewed</span>
                    <li style={{borderBottom:'1px solid #cccccc',marginTop:'5px'}}></li>
                {this.state.discount==0?<div className={'priceList'} style={{marginTop:'20px',marginLeft:'20px'}}><li>Price: {this.state.price}</li></div>:<div className={'priceList'} style={{marginTop:'20px',marginLeft:'20px'}}><li>M.R.P.: <strike>{this.state.price}</strike></li><li>Price: &nbsp;{Math.round(this.state.price*(100-this.state.discount)/100)}</li><li>{"You Save: "}{this.state.discount}%</li><li>{"Deal Name: "}{this.state.dealName}</li></div>}
                </ul>
                <div style={{color:'#3e8e3e',fontSize:'19px'}}>In Stock</div><br/>
                <span style={{fontFamily:'"Trebuchet MS", Helvetica, sans-serif'}}>Quantity: </span><select className={'selectBox'} onChange={this.handlequantity}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                </select>
                <br/><br/>
                <button className={'cartButton'} type="button" onClick={this.handleAdd}>Add to cart</button>
                <br/><br/>
           <button type="button" onClick={this.handlewish}  className={loggedIn?'cartButton':'disabled-wish'}>Add to Wishlist</button>
                
            </div>
            <div style={{height:"20px",clear:"both"}}></div>
            <div className={'feedbackBox'}>
               <h4 style={{color:'#e69900'}}>Customer Reviews</h4>
               <Rater value={avg1}/><br/>
               <div>{avg1} out of 5 stars</div>
            {feedbacks}
               
            <br/><br/>
                {loggedin?<div><div className="form-group">
          <textarea className="form-control" rows="5" cols="12" value={this.state.latestFeedback} name="username" onChange={this.handleFeedbackChange} ref="username" ></textarea>
        </div>
        <div><Rater value={this.state.rating} maxlength="6" onSelected={this.handleClick}/>&nbsp;&nbsp;
        <span style={{"fontSize":"9px"}}>{this.state.rating}/5</span></div><br/>
        <FormGroup>
          <Col sm={8}>
              <Button bsStyle="primary" onClick={this.feedbackSubmitHandler} >
                Submit Feedback
              </Button>
          </Col>
        </FormGroup>
            </div>:null}
        </div>
        </div>
       );
     }

}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDes);