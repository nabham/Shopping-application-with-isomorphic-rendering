import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Col, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Transition} from 'react-router';
import * as UserActions from '../actions/UserActions';
import * as ProductActions from '../actions/ProductActions';
import AjaxHelper from '../utilities/ajaxHelper';



 const mapStateToProps = (state) => {
    return {
        state:state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onhandleSignup : (data, history) => {
            dispatch(UserActions.register(data, history));
        }
    }

}
class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            match:true,
            invalid:false
        }
        this.handleSignup = this.handleSignup.bind(this);
        this.handleemail = this.handleemail.bind(this);
        this.handlepass = this.handlepass.bind(this);
    }

    handleemail(){
        this.setState({invalid:false});
    }
    handlepass(){
        this.setState({match:true});
    }

    handleSignup(e){
        e.preventDefault();
        this.setState({invalid:false}); if(this.refs.password.value!=this.refs.password2.value){
            this.setState({match:false});
        }
        else{
            this.setState({match:true});
        }
        let user = {
                    userName:this.refs.userName.value,
                    email:this.refs.email.value,
                    phone:this.refs.phone.value,
                    password:this.refs.password.value
                   };
        console.log(user);
        let findUser = AjaxHelper.finduser('/api/getUser?username='+user.email);
       if(findUser.length==0){
           this.props.onhandleSignup(AjaxHelper.registerUser('/api/registerUser', user));
            this.props.history.push('/login');
       }
            else{
                this.setState({invalid:true})
            }
        }

    render(){

        return(<div>
            <center><div style={{"width":"40%","paddingTop":"30px","marginTop":"40px"}} className={"panel panel-default"} >
      <strong>Register</strong>
      <div id="divLogin" className={"bgImage panel-body"} >
        <form onSubmit={this.handleSignup}  className="form-horizontal form-signin">
          <div className="form-group row">
            <label className="control-label col-sm-4">Username</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" ref="userName" pattern="[a-zA-z]+" required/>
            </div>
          </div>
          <div className="form-group row">
            <label className="control-label col-sm-4">Email Address</label>
            <div className="col-sm-8">
              <input type="email" onChange={this.handleemail} className="form-control" ref="email" required/>
            </div>
          </div>
          <div className="form-group row">
            <label className="control-label col-sm-4">Phone Number</label>
            <div className="col-sm-8">
              <input type="number" pattern="[0-9]{10}" className="form-control" ref="phone" required/>
            </div>
          </div>
          <div className="form-group row">
            <label className="control-label col-sm-4">Password</label>
            <div className="col-sm-8">
              <input type="password" className="form-control" ref="password" onChange={this.handlepass} pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required/>
            </div>
          </div>
            <div className="form-group row">
            <label className="control-label col-sm-4">Confirm Password</label>
            <div className="col-sm-8">
              <input type="password" ref="password2" onChange={this.handlepass} className="form-control" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required/>
            </div>
          </div>
               {this.state.match?null:<center><div>Password fields does not match</div></center>}
               {this.state.invalid?<center><div>Email is already registered please enter different</div></center>:null}
          <div className="form-group row">
            <button className="btn btn-primary" type="submit">Register</button>

            </div></form></div></div></center></div>)
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
