import React from 'react';
import {modifyCard} from '../actions/UserActions.js';
import {connect} from 'react-redux';

const mapStateToProps=(state)=>{
    return{
        state:state.UserReducer
    }
}

const mapDispatchToProps= (dispatch) =>{
  return {
      onHandleModifyCard:(data)=>{
          return dispatch(modifyCard(data));
      },
        onGetCard:()=>{
          return dispatch({
              type:"GET_CARD"
          })
      },
      resetSelectedCard:()=>{
          return dispatch({
              type:"RESET_SELECTED_CARD"
          })
      }
  }
}

class Card extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteClick=this.handleDeleteClick.bind(this);
        this.handleModifyClick=this.handleModifyClick.bind(this);
        this.handleCancelClick=this.handleCancelClick.bind(this);
        this.handleTypeChange=this.handleTypeChange.bind(this);
        this.handleNumberChange=this.handleNumberChange.bind(this);
        this.handleMonthChange=this.handleMonthChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={
            modify:false,
            number:this.props.number,
            type:this.props.type,
            expiryMonth:this.props.expDate.split("-")[1],
            expiryYear:this.props.expDate.split("-")[0]
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            number:nextProps.number,
            type:nextProps.type,
            expiryMonth:nextProps.expDate.split("-")[1],
            expiryYear:nextProps.expDate.split("-")[0]
        });
    }

    handleMonthChange(event){
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

    handleNumberChange(event){
        this.setState({number:event.target.value});
    }

    handleTypeChange(event){
        this.setState({type:event.target.value});
    }

    handleDeleteClick(){
        let cardDetails=this.props.state.card_details;
        cardDetails=cardDetails.filter((x)=>{
           return x.card_number!=this.props.number;
        })
        if(cardDetails==null)
        cardDetails=[];
        this.props.onHandleModifyCard({user_id:this.props.state._id,card_details:cardDetails});
        if(this.props.state.selectedCard && this.props.number==this.props.state.selectedCard.card_number)
            this.props.resetSelectedCard();
    }

    handleModifyClick(){
        this.setState({modify:true});
        this.props.onGetCard();
    }

    handleCancelClick(){
        this.setState({modify:false});
        this.props.onGetCard();
    }

    handleSubmit(event){
        event.preventDefault();
        let currentCard=event.target.id;
        let dupCard=this.props.state.card_details.filter((card)=>{
        return card.card_number==this.state.number && card.card_number!=event.target.name
        });
        if(dupCard && dupCard.length>0){
            alert("Card number should be unique");
        }
        else{
        let cardDetails=this.props.state.card_details;
        cardDetails.map((card)=>{
            if(card.card_number==event.target.name){
                card.card_number=this.state.number;
                card.card_type=this.state.type;
                card.expiration_date={
                    month:this.state.expiryMonth,
                    year:this.state.expiryYear
                }
            }
        });
        this.props.onHandleModifyCard({user_id:this.props.state._id,card_details:cardDetails});
         this.setState({modify:false});
        }
    }

render(){
    return(<div>{this.state.modify?
            <form onSubmit={this.handleSubmit} name={this.props.number}>
            <table>
            <tbody className={'fieldShortner'}>
            <tr>
                <td>Card Type:</td>
                <td><select value={this.state.type} onChange={this.handleTypeChange}>
                    <option value="Debit">Debit</option><option value="Credit">Credit</option></select> </td>
            </tr>
            <tr>
                <td>Card Number:</td>
                <td><input type="text" value={this.state.number} onChange={this.handleNumberChange} pattern="[0-9]{16}"/></td>
            </tr>
              <tr>
                <td>Expirty Date:</td>
                <td><input type="month" value={this.state.expiryYear+"-"+this.state.expiryMonth} onChange={this.handleMonthChange}/></td>
            </tr>
            <tr>
                <td><input type="submit" className={"modButton"} value="Modify" value="Save" name={this.state.number} /></td>
                <td><input type="button" className={"modButton"} style={{marginLeft:"20px"}} value="Cancel" onClick={this.handleCancelClick}/></td>
            </tr>
            </tbody>
            </table></form>:<table>
            <tbody>
            <tr>
                <td>Card Type:</td>
                <td>{this.state.type}</td>
            </tr>
            <tr>
                <td>Card Number:</td>
                <td>{this.state.number}</td>
            </tr>
              <tr>
                <td>Expirty Date:</td>
                <td>{this.state.expiryMonth+"/"+this.state.expiryYear}</td>
            </tr>
            <tr>
                <td><input type="button" className={"modButton"} value="Modify" onClick={this.handleModifyClick}/></td>
                <td><input type="button" className={"modButton"} style={{marginLeft:"20px"}} value="Delete" onClick={this.handleDeleteClick}/></td>
            </tr>
            </tbody>
            </table>}
    </div>)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Card)
