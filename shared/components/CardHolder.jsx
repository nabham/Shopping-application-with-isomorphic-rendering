import React from 'react';
import {modifyCard,selectCard} from '../actions/UserActions.js';
import {connect} from 'react-redux';
import Card from './Card.jsx';

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
      onHandleSelectCard:(data)=>{
          dispatch(selectCard(data));
      }
  }
}

class CardHolder extends React.Component{
constructor(props){
    super(props);
    this.handleToggleCard=this.handleToggleCard.bind(this);
    this.handleNumberChange=this.handleNumberChange.bind(this);
    this.handleMonthSelect=this.handleMonthSelect.bind(this);
    this.handleTypeSelect=this.handleTypeSelect.bind(this);
    this.handleSubmitForm=this.handleSubmitForm.bind(this);
    this.handleSelectCard=this.handleSelectCard.bind(this);
    this.state={
        add:false,
        number:0,
        type:"Debit",
        expiryMonth:"",
        expiryYear:""
    }
}

handleToggleCard(){
    this.setState({add:!this.state.add});
    this.props.onGetCard();
    }

handleNumberChange(event){
    this.setState({number:event.target.value});
    }

handleMonthSelect(event){
    let dateParts=event.target.value.split("-");
    if(this.isDateValid(dateParts[1],dateParts[0])){
    this.setState({expiryMonth:dateParts[1],expiryYear:dateParts[0]});
    }
    else{
        alert('Invalid expiry date');
        event.target.value=new Date().getFullYear()+"-"+(new Date().getMonth()+1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    }
}

isDateValid(month,year){
    let e_date=new Date();
    e_date.setFullYear(parseInt(year));
    e_date.setMonth(parseInt(month)-1);
    if(e_date-new Date()>=0) //address validation
        return true;
    else
        return false;
}

handleTypeSelect(event){
    this.setState({type:event.target.value});
}

handleSubmitForm(event){
    event.preventDefault();
    let dupCard=this.props.state.card_details.filter((card)=>{
        return card.card_number==this.state.number
    });
    if(dupCard && dupCard.length>0){
        alert("Card number should be unique");
    }
    else{
    let cardList=this.props.state.card_details;
    let newCard={card_type:this.state.type,card_number:this.state.number,expiration_date:{
        month:this.state.expiryMonth,
        year:this.state.expiryYear
    }}
    cardList.push(newCard);
    this.props.onHandleSubmitForm({user_id:this.props.state._id,card_details:cardList});
    this.setState({add:false,number:0,type:"Debit",expiryMonth:"",expiryYear:""});
    }
}

handleSelectCard(event){
    let cardDetails= this.props.state.card_details;

    let selectedCard=cardDetails.filter((card)=>{
        return card.card_number==event.target.value;
    })

    this.props.onHandleSelectCard(selectedCard[0]);
}

render(){
    var cardItems=[];
    if(Object.keys(this.props.state).length>0 && this.props.state.card_details.length>0){
    this.props.state.card_details.map((item,i)=>{
        if(this.props.showSelect){
        cardItems.push(<div key={i} className="col-sm-3 cardBox"><input type="radio" name="card" value={item.card_number} onChange={this.handleSelectCard}></input>
        <Card type={item.card_type} number={item.card_number} expDate={item.expiration_date.year+'-'+item.expiration_date.month}/></div>)}
        else{
            cardItems.push(<div key={i} className="col-sm-3 cardBox">
            <Card type={item.card_type} number={item.card_number} expDate={item.expiration_date.year+'-'+item.expiration_date.month}/></div>)
        }
    });
    }
    return(<div className="container-fluid" style={{marginLeft:"50px"}}>
        <div className="row">
            <div className="col-sm-3 cardBox">
        {this.state.add ?<form onSubmit={this.handleSubmitForm}>
            <table><tbody className={'fieldShortner'}><tr><td>
        Card Number:</td><td><input type="text" required onChange={this.handleNumberChange} value={this.state.number} pattern="[0-9]{16}"></input></td></tr>
        <tr><td>Expiry Date:</td><td> <input type="month" required onChange={this.handleMonthSelect} value={this.state.month}/></td></tr>
        <tr><td>Card Type:</td><td><select style={{width:"120px",border:"1px solid #cccccc",borderRadius:"3px"}} onChange={this.handleTypeSelect}><option value="Debit">Debit Card</option><option value="Credit">Credit Card</option></select></td></tr><tr><td><button type="submit" className={"modButton"}>Add</button></td><td>
        <button type="button" style={{marginLeft:"30px"}} className={"modButton"} onClick={this.handleToggleCard}>Cancel</button></td></tr></tbody></table>
        </form>:<input type="button" value="Add New Card" onClick={this.handleToggleCard} style={{width:"100%",height:"100%",backgroundColor:"inherit",border:"0",fontSize:"20px",fontWeight:"bold",color:"#cccccc"}}></input>}
            </div>
            {cardItems}
        </div>
    </div>);
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardHolder);
