import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import CardHolder from './CardHolder.jsx';
import Address from './Address.jsx';
import {updateChanges} from '../actions/UserActions.js';
import AjaxHelper from '../utilities/ajaxHelper';

const mapStateToProps = (state) => {
   return{
       state:state.UserReducer
   }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onHandleChanges : (data)=>{
            dispatch(updateChanges(data));
        }
    }
}

class UserProfile extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            name:'',
            mobile:'',
            password:''
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.NameChange = this.NameChange.bind(this);
        this.MobileChange = this.MobileChange.bind(this);
        this.PasswordChange=this.PasswordChange.bind(this);
    }

    PasswordChange(event){
        this.setState({password:event.target.value});
    }

    componentDidMount(){
        if(Object.keys(this.props.state).length>0){
        const userdata = AjaxHelper.getUserProfile('/api/getProfile?username='+this.props.state._id);
        this.setState({password:userdata.password,mobile:userdata.mobile_no,name:userdata.name});
    }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps!=this.props){
        if(Object.keys(this.props.state).length>0){
        const userdata = AjaxHelper.getUserProfile('/api/getProfile?username='+this.props.state._id);
        this.setState({password:userdata.password,mobile:userdata.mobile_no,name:userdata.name})
    }
    }
    }

    handleChanges(event){
        event.preventDefault();
        let data = {'userId':this.props.state._id,'name':this.state.name, 'mobile_no':this.state.mobile,'password':this.state.password};
        this.props.onHandleChanges(data);
        this.props.history.push('/landingPage');
    }

    NameChange(event){
        this.setState({name:event.target.value});
    }

    MobileChange(event){
        this.setState({mobile:event.target.value});

    }

    handleCancel(){
        this.props.history.push('/landingPage');
    }

    render(){

        return(<div style={{marginLeft:"50px"}}>
                <div>
                <h3 className={'dealHead'} style={{float:"left"}}>User Details</h3><span style={{marginLeft:"20px"}}><img src="./images/boy.png" style={{marginTop:"15px"}} height="30px" width="30px"/></span></div><div style={{clear:"both"}}></div>
                <div style={{width:"500px"}}>
                <form onSubmit={this.handleChanges}>

                <div className="form-group userDetail">
                    <label className="control-label col-sm-4">Name:</label>
                    <div className="col-sm-8">
                    <input type="text" className="form-control" name="userName" onChange={this.NameChange} value={this.state.name} required/>
                    </div>
                </div>
                <div className="form-group userDetail">
                <label className="control-label col-sm-4">Password:</label>
                <div className="col-sm-8">
                <input type="password" className="form-control" onChange={this.PasswordChange} value={this.state.password} pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required/>
                    </div>
                </div>
                <div className="form-group userDetail">
                    <label className="control-label col-sm-4">Email:</label>
                    <div className="col-sm-8">
                        <input type="email" className="form-control" name="email" value={this.props.state._id} disabled /></div>
                </div>
                <div className="form-group userDetail">
                    <label className="control-label col-sm-4">Mobile No.:</label>
                    <div className="col-sm-8">
                    <input type="number" className="form-control" name="mobileNo" onChange={this.MobileChange} value={this.state.mobile} required/>
                    </div>
                </div>
                <div style={{marginTop:"20px",marginLeft:"50px",display:"block"}}>
                <input type="submit" className={'userButton'} value="Save Changes"></input>
                    <span style={{marginLeft:"20px"}}><button type="button" className={'userButton'} onClick={this.handleCancel}>Cancel</button></span>
                </div>
            </form>
                </div>
            <div>
            <br/><br/>
            <div><h3 className={'dealHead'} style={{float:"left"}}>Addresses </h3><span style={{marginLeft:"20px"}}><img src="./images/address.png" style={{marginTop:"10px"}} height="35px" width="35px"/></span></div><div style={{clear:"both"}}></div><Address showSelect={false}/>

            <br/><br/>
            <div>
            <h3 className={'dealHead'} style={{float:"left"}}>Card Details</h3>
                <span style={{marginLeft:"20px"}}><img src="./images/visa.png" style={{marginTop:"15px"}} height="35px" width="35px"/></span></div><div style={{clear:"both"}}></div>
            <CardHolder showSelect={false}/>
            </div></div>);

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);
