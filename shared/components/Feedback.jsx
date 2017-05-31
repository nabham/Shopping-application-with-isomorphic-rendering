import React from 'react';
import { connect } from 'react-redux';
import Rater from './Rater';

export default class FeedBack extends React.Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        
        return(<div style={{marginLeft:'5px',marginTop:'30px',borderTop:"1px solid #d9d9d9",paddingTop:"10px"}}>
                <Rater value={this.props.rating}/>
                <span style={{marginLeft:'20px'}}>{this.props.rating}/5</span><br/>
                <div>By <b>{this.props.username}</b></div>
                <div style={{marginTop:'20px'}}>{this.props.comment}</div>
            
            </div>);
    }
}