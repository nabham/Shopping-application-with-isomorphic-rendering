import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

const mapStateToProps = (state) => {
  return {
    orderHistory: state.UserReducer.order_history,
    refreshOrderHistory: state.UserReducer.refreshOrderHistory
  };
}

class OrderHistory extends React.Component{
  constructor(props){
    super(props);
  }
      componentWillMount(){
    let openOrders=0;
    let closedOrders=0;
    let cancelledOrders=0;
    let returnedOrders=0;
    if(this.props.orderHistory)
    this.props.orderHistory.map((order,index) => {
      if(order.order_status=="open")
        openOrders+=1;
      else if(order.order_status=="delivered")
        closedOrders+=1;
      else if(order.order_status=="cancelled")
        cancelledOrders+=1;
      else if(order.order_status=="returned")
        returnedOrders+=1;
    });
    this.setState({
        openOrders:openOrders,
        closedOrders:closedOrders,
        cancelledOrders:cancelledOrders,
        returnedOrders:returnedOrders
    })
  }

  componentWillReceiveProps(nextProps){
      if(this.props!=this.nextProps){
            let openOrders=0;
    let closedOrders=0;
    let cancelledOrders=0;
    let returnedOrders=0;
    if(this.props.orderHistory)
    this.props.orderHistory.map((order,index) => {
      if(order.order_status=="open")
        openOrders+=1;
      else if(order.order_status=="delivered")
        closedOrders+=1;
      else if(order.order_status=="cancelled")
        cancelledOrders+=1;
      else if(order.order_status=="returned")
        returnedOrders+=1;
    });
    this.setState({
        openOrders:openOrders,
        closedOrders:closedOrders,
        cancelledOrders:cancelledOrders,
        returnedOrders:returnedOrders
    })
      }
  }

  render(){
    return(
        <div className="container" style={{marginTop:"50px",marginLeft:"50px"}}>
        <div className="row">
        <div className="col-sm-12">
        <ul className="nav nav-tabs">
            <li><Link to="/openOrders" className={this.state.openOrders==0?'disabled-link':null}>OpenOrders</Link></li>
            <li><Link to="/closedOrders" className={this.state.closedOrders==0?'disabled-link':null}>Closed Orders</Link></li>
            <li><Link to="/cancelledOrders" className={this.state.cancelledOrders==0?'disabled-link':null}>Cancelled Orders</Link></li>
            <li><Link to="/returnedOrders" className={this.state.returnedOrders==0?'disabled-link':null}>Returned Orders</Link></li>
            </ul></div></div>
        <div className={"row"} style={{marginTop:"50px"}}>
             {this.props.children}
        </div>
        </div>
    )
  }
}
export default connect(mapStateToProps, null)(OrderHistory);