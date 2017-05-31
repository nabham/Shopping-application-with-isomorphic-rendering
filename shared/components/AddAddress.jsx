import React from 'react';

class AddAddress extends React.Component{
  constructor(props){
    super(props);
    this.addAddress=this.addAddress.bind(this);   
/*    this.handleLine1Change=this.handleLine1Change.bind(this);
    this.handleLine2Change=this.handleLine2Change.bind(this);
    this.handleCityChange=this.handleCityChange.bind(this);
    this.handleStateChange=this.handleStateChange.bind(this);
    this.handleZipcodeChange=this.handleZipcodeChange.bind(this);
    this.handlePhoneNumberChange=this.handlePhoneNumberChange.bind(this);*/
    this.toggleAddress=this.toggleAddress.bind(this);
    this.state={
/*      line1:this.props.line1,
      line2:this.props.line2,
      city:this.props.city,
      state:this.props.state,
      zipcode:this.props.zipcode,
      phoneNumber: this.props.phoneNumber,*/
      enableSave: false
    }
  }
  addAddress(event){
    event.preventDefault();
    const address={
      line1:this.refs.line1.value,
      line2:this.refs.line2.value,
      city:this.refs.city.value,
      state:this.refs.state.value,
      zipcode:this.refs.zipcode.value,
      phoneNumber: this.refs.phoneNumber.value
    };
    this.props.onAddAddress(address);
  }
  toggleAddress(){
    this.props.onToggleAddress();
  }
  
  render(){
    var states=[];
    this.props.statesOfIndia.map((state,index)=>{
        states.push(<option key={state} defaultValue={state}>{state}</option>);
    })
    return (
        
        <form onSubmit={this.addAddress}>
        <table ><tbody className={'fieldShortner'} >
        <tr><td>Line1:</td><td><input type="text" ref="line1" defaultValue={this.props.line1} onChange={this.handleLine1Change} /></td></tr>
        <tr><td>Line2:</td><td><input type="text" ref="line2" defaultValue={this.props.line2} onChange={this.handleLine2Change} /></td></tr>
        <tr><td>City:</td><td><input type="text" ref="city" defaultValue={this.props.city} onChange={this.handleCityChange} required pattern="[^()/><\][\\\x22,;|]+"/></td></tr>
        <tr><td>State: </td><td><select style={{width:"120px",border:"1px solid #cccccc",borderRadius:"3px",height:"24px"}} ref="state" onChange={this.handleStateChange}>{states}</select></td></tr>
        <tr><td>Zipcode:</td><td><input type="text" ref="zipcode" defaultValue={this.props.zipcode} onChange={this.handleZipcodeChange} required pattern="[0-9]{6}" /></td></tr>
        <tr><td>PhoneNumber:</td><td><input type="text" ref="phoneNumber" defaultValue={this.props.phoneNumber} onChange={this.handlePhoneNumberChange} required pattern="[0-9]{10}" /></td></tr>
        <tr><td><input className={"modButton"} style={{marginTop:"10px"}} value="Save" type="submit"/></td>
        <td><input type="button" className={"modButton"} style={{marginTop:"10px",marginLeft:"30px"}} value="Cancel" onClick={this.toggleAddress}/></td></tr>
        </tbody></table>
        </form>

    );
  }
}

export default AddAddress;
