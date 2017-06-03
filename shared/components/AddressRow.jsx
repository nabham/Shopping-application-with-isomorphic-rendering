import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return{
        name:state.UserReducer.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onGetCard:()=>{
          return dispatch({
              type:"GET_CARD"
          })
      }
    }
}

class AddressRow extends React.Component{
    constructor(props){
        super(props);
        this.deleteAddress=this.deleteAddress.bind(this);
        this.saveAddress=this.saveAddress.bind(this);
        this.showForm=this.showForm.bind(this);
        this.state={
            enableSave: false
        }
    }

  showForm(){
        this.setState({enableSave:!this.state.enableSave});
        this.props.onGetCard();
  }
  deleteAddress(){
      const oldAddress={
          name: this.props.name,
          line1:this.props.line1,
          line2:this.props.line2,
          city:this.props.city,
          state:this.props.state,
          zipcode:this.props.zipcode,
          phoneNumber: this.props.phoneNumber
        }
    var address={};
    this.props.onModifyAddress(address, oldAddress,"delete");
  }
  saveAddress(event){
      event.preventDefault();
      const oldAddress={
          name: this.props.name,
          line1:this.props.line1,
          line2:this.props.line2,
          city:this.props.city,
          state:this.props.state,
          zipcode:this.props.zipcode,
          phoneNumber: this.props.phoneNumber
        }
        const address={
          name: this.props.name,
          line1:this.refs.line1.value,
          line2:this.refs.line2.value,
          city:this.refs.city.value,
          state:this.refs.state.value,
          zipcode:this.refs.zipcode.value,
          phoneNumber: this.refs.phoneNumber.value
        }
      this.setState({enableSave:!this.state.enableSave});
      this.props.onModifyAddress(address, oldAddress,"edit")
    }

    render(){
        var states=[];
        this.props.statesOfIndia.map((state,index)=>{
            states.push(<option key={state} defaultValue={state}>{state}</option>);
        })
        return (
            <div>{this.state.enableSave?
            <form onSubmit={this.saveAddress} name={this.props.name}>
              <table style={{marginTop:"-25px"}}>
                <tbody className={'fieldShortner'} >
                  <tr>
                    <td>Line1: </td>
                    <td><input type="text" ref="line1" defaulValue={this.props.line1} /></td>
                  </tr>
                  <tr>
                    <td>Line2: </td>
                    <td><input type="text" ref="line2" defaulValue={this.props.line2} /></td>
                  </tr>
                  <tr>
                    <td>City: </td>
                    <td><input type="text" ref="city" defaulValue={this.props.city} required pattern="[^()/><\][\\\x22,;|]+"/></td>
                  </tr>
                  <tr>
                    <td>State: </td>
                    <td><select style={{width:"120px",border:"1px solid #cccccc",borderRadius:"3px",height:"24px"}} ref="state">{states}</select></td>
                  </tr>
                  <tr>
                    <td>Zipcode: </td>
                    <td><input type="text" ref="zipcode" defaulValue={this.props.zipcode} required pattern="[0-9]{6}" /></td>
                  </tr>
                  <tr>
                    <td>PhoneNumber: </td>
                    <td><input type="text" ref="phoneNumber" defaulValue={this.props.phoneNumber} required pattern="[0-9]{10}" /></td>
                  </tr>
                  <tr>
                    <td><input value="Save" type="submit"  className={"modButton"} style={{marginTop:"10px"}}/></td>
                    <td><input type="button"  className={"modButton"} style={{marginTop:"10px",marginLeft:"30px"}} value="Cancel" onClick={this.showForm}/></td>
                  </tr>
                  </tbody>
                </table>
            </form>:<table>
                <tbody>
                    <tr>
                        <td><b>{this.props.name}</b></td>
                    </tr>
                <tr>
                    <td>{this.props.line1}, {this.props.line2}</td>
                </tr>
                <tr>
                    <td>{this.props.city}</td>
                </tr>
                    <tr>
                    <td>{this.props.state}</td>
                </tr>
                    <tr>
                    <td>#{this.props.zipcode}</td>
                </tr>
                <tr>

                    <td>Phone: {this.props.phoneNumber}</td>
                </tr>
                <tr style={{marginTop:"20px"}}><td><input value="Modify" className={"modButton"} type="button" onClick={this.showForm}/></td><td><button className={"modButton"} value="Delete" onClick={this.deleteAddress}>Delete</button></td></tr>
                </tbody>
                </table>}
            </div>
        );
     }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddressRow);
