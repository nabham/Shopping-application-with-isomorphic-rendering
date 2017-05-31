import {connect} from 'react-redux';
import React from 'react';

export default class Searching extends React.Component {
  constructor(props){
    super(props);
    this.state={products:[]};
  }
    

    
    
    render(){
        
        return(<div style={{paddingTop:"15%"}}>
            <div className={'loader'}></div>
            </div>);
    }
}