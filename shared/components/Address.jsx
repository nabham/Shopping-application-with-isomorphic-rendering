import React from 'react';
import AddressRow from './AddressRow.jsx';
import AddAddress from './AddAddress.jsx';
import {modifyAddress, selectedAddress} from '../actions/UserActions.js';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        address:state.UserReducer.address,
        userId: state.UserReducer._id
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onModifyAddress: (userId,addressState,operation,newAddress, oldAddress)=> {
        dispatch(modifyAddress(userId,addressState,operation, newAddress, oldAddress));
      },
      onHandleSelectAddress: (data)=>{
        dispatch(selectedAddress(data));
      },
      onGetCard:()=>{
          return dispatch({
              type:"GET_CARD"
          })
      }
    }
}

class Address extends React.Component{
    constructor(props){
        super(props);
        this.modifyAddress=this.modifyAddress.bind(this);
        this.showAddAddress=this.showAddAddress.bind(this);
        this.AddAddress=this.AddAddress.bind(this);
        this.handleSelectAddress=this.handleSelectAddress.bind(this);
        this.state={
            statesOfIndia:["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Pondicherry","Rajasthan","Sikkim","Tamil Nadu","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"],
            displayAdd:false,
            reloadToggle:true
        };
      }

  modifyAddress(address={}, oldAddress ,operation){
      this.props.onModifyAddress(this.props.userId,this.props.address,operation,address, oldAddress);
      this.setState({reloadToggle:!this.state.reloadToggle});
  }

  showAddAddress(){
      this.setState({displayAdd: !this.state.displayAdd});
  }

  AddAddress(address){
      var addressNumber = 0;
      if(this.props.address != null){
          if(this.props.address.length != 0){
            addressNumber = Math.max.apply(Math,this.props.address.map(function(o){return o.name;}));
            addressNumber = addressNumber + 1;
          }
      }
      else{
          addressNumber=1;
      }
      this.setState({displayAdd: !this.state.displayAdd});
    const addressNew={
          name:addressNumber,
          line1:address.line1,
          line2:address.line2,
          city:address.city,
          state:address.state,
          zipcode:address.zipcode,
          phoneNumber: address.phoneNumber
        }
    this.props.onModifyAddress(this.props.userId, this.props.address,"add",addressNew);
  }

  handleSelectAddress(event){
      let addressDetails= this.props.address;
      let selectedAddress=addressDetails.filter((address)=>{
          return address.name==event.target.value;
      });
      this.props.onHandleSelectAddress(selectedAddress[0]);
  }

  render(){
        var rows=[];
        var self=this;
        if(this.props.address)
            this.props.address.map((address,index) => {
                  rows.push(<div key={index} className="col-xs-3 addressBox">{self.props.showSelect?<div><input type="radio" name="address" value={address.name} onChange={this.handleSelectAddress}/></div>:null}
                  <AddressRow {...address} onModifyAddress={this.modifyAddress} statesOfIndia={this.state.statesOfIndia} /></div>);
          });
        return (
          <div className={"container-fluid"} style={{marginLeft:"50px"}} >
          <div className={"row"}>
              <div className="col-xs-3 addressBox" style={{paddingTop:"5px",paddingBottom:"0px"}}>
                {this.state.displayAdd?
                <AddAddress onAddAddress={this.AddAddress} onToggleAddress={this.showAddAddress} statesOfIndia={this.state.statesOfIndia}/>
                :<input type="button" value="Add New Address" onClick={this.showAddAddress} style={{height:"100%",width:"100%",backgroundColor:"inherit",border:"0",fontSize:"20px",fontWeight:"bold",color:"#cccccc"}}/>}
              </div>
                {rows}
            </div>
          </div>
        );
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Address);
