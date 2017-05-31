import React from 'react';
import { Link } from 'react-router';
import SearchBoxComponent from './Search.jsx'
import {connect} from 'react-redux';
import {emptyState} from '../actions/UserActions.js';
import { FormGroup, Glyphicon,FormControl, Button ,Badge} from 'react-bootstrap';
var EventEmitter = require('eventemitter2').EventEmitter2
//var events = require('events');
//var eventEmitter = new events.EventEmitter();
if(typeof window != 'undefined'){
window.emitter = new EventEmitter;
}
let numItems = 0;

const mapStateToProps = (state) => {
  return {
    UserReducer:state.UserReducer
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
        emptystate : () => {
            dispatch(emptyState());
        }
    }
}

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            numIt:0
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.listner1 = this.listner1.bind(this);
        window.emitter.on('connection', this.listner1);
    }

    handleLogout(){

        sessionStorage.clear();
        this.props.emptystate();
        this.props.history.push('/landingPage');
    }

    listner1() {
        console.log('in here');
        if(localStorage.getItem("cart")){
       let ar =JSON.parse(localStorage.getItem("cart"));
        this.setState({numIt:ar.length});
        }
        else{
            this.setState({numIt:0});
        }
    }

    componentDidMount(){
        console.log('hihihiih');
    }

    componentWillUnmount(){
        window.emitter.off('connection', this.listner1);
    }

    render(){
        numItems = this.state.numIt;
        let loggedIn = typeof sessionStorage == "object"?sessionStorage.getItem("userName")?sessionStorage.getItem('userName'):false:false;
        var rows = [];
        var notif = 0;
       if(Object.keys(this.props.UserReducer).length > 0){  this.props.UserReducer.notification.forEach((x) =>  {
        if(x.notification_seen==false){
               notif += 1
           }});
         }
        if(loggedIn){
            numItems = this.props.UserReducer.cart.length;
            rows.push(<span><Link to="/profile" style={{ textDecoration: 'none' }}><li><span><Glyphicon glyph="user" /></span> Profile</li></Link><Link to="/historypage" style={{ textDecoration: 'none' }}><li><span><Glyphicon glyph="book" /></span> My Orders</li></Link><Link to="/wishlist" style={{ textDecoration: 'none' }}><li><span><Glyphicon glyph="heart" /></span> Wishlist</li></Link><Link to="/notify" style={{ textDecoration: 'none' }}><li><span><Glyphicon glyph="tags" /></span> Notification {notif>0?<Badge>{notif}</Badge>:null}</li></Link><li><button type="button" onClick={this.handleLogout} className={'logoutButton'}><span><Glyphicon glyph="log-out" /></span> Logout</button></li></span>)
        }
        else{


            if(typeof(Storage) !== "undefined"){
            if(localStorage.getItem("cart")){
                let cart=JSON.parse(localStorage.getItem("cart"));
                numItems=cart.length;
                }
            }

            rows.push(<span><Link to="/login" style={{ textDecoration: 'none' }}><li><span><Glyphicon glyph="log-in" /></span>   Login</li></Link>
              <Link to="/signup" style={{ textDecoration: 'none' }}><li><span><Glyphicon glyph="user" /></span> Signup</li></Link></span>)
        }


        return(
        <div>
        <nav className={"navbar1"}>
            <div><span className={'navbar1header'}><img src='./images/logo.png' height="46px"/></span><span><SearchBoxComponent history={this.props.history}/></span></div>
            <div>
            <ul className="nav1ul">
                <Link to='/landingPage' > <li ><span><Glyphicon glyph="home" /></span> Home</li></Link>


              {rows}
                <Link to="/cart" className={numItems==0?'disabled-link':''}style={{ textDecoration: 'none' }}><li><span><Glyphicon glyph="shopping-cart" /></span> Cart <Badge>{numItems} </Badge></li></Link>


            </ul>
            </div>
        </nav>
        </div>
        );

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);
