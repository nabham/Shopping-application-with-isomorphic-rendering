import React from 'react';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';

export default class Product extends React.Component{
  constructor(props){
    super(props);
    this.handleid = this.handleid.bind(this);
  }
    handleid(){
        this.props.history.push('/productdesc/'+this.props.id)
    }
  render(){
    return(
      <div className={'containerBig'}>
        {this.props.deal=='true'?<img className={'dis'} src='./images/discount.png' height="60px" width="60px" />:null}
        <div className={'container1'}>
        <center><img src={this.props.url} alt="..." className={'imgBox'} /></center>
        <div onClick={this.handleid} className={"caption"}>
          Know more
        </div>
        </div>
        <div className={'prodName'}>
        {this.props.proname}
        </div>
      </div>
  )}
}
