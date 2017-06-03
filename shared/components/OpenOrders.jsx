import React from 'react';
import {connect} from 'react-redux';
import {modifyOrder} from '../actions/UserActions.js';

const mapStateToProps = (state) => {
  return {
    orderHistory: state.UserReducer.order_history || {},
    userId: state.UserReducer._id
  };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onModifyOrder: (order,operation,order_history,userId)=> {
        dispatch(modifyOrder(order,operation, order_history,userId));
      }
  }
}

class OpenOrders extends React.Component{
  constructor(props){
    super(props);
    this.handleOrder=this.handleOrder.bind(this);
    this.state={
        orders: []
    };
  }

  componentDidMount(){
      if(Object.keys(this.props.orderHistory).length>0){
          this.setState({orders:  this.props.orderHistory.filter((order)=>{
              return order.order_status=="open";
          })
      })
    }
  }

  componentDidUpdate(prevProps,prevState){
      if(prevProps!=this.props){
          if(Object.keys(this.props.orderHistory).length>0){
              this.setState({orders:  this.props.orderHistory.filter((order)=>{
                  return order.order_status=="open";
              })
          })
      }
    }
  }

  handleOrder(event){
      const order_id=event.target.value.split(',')[0];
      const operation=event.target.value.split(',')[1];
      let order=this.props.orderHistory.filter((order)=>{
          return order.order_id==order_id;
      });
      this.props.onModifyOrder(order[0],operation,this.props.orderHistory,this.props.userId);
      this.setState({
          orders:  this.props.orderHistory.filter((order)=>{
              return order.order_status=="open";})
          });
      }
      render(){
        var rows=[];
        if(this.state.orders.length>0){
        this.state.orders.map((order,index) => {
          if(order.order_status=="open"){
            let prodLength = order.product_details.length;
            let totalAmount = 0;
            let prodNames = [];
            order.product_details.forEach(function(eachProd){
              totalAmount += eachProd.quantity * eachProd.unit_price;
              prodNames.push(eachProd.name);
            })
        rows.push(
          <tr key={index}>
            <td>{order.order_id}</td>
            <td>{order.order_date}</td>
            <td>{order.order_status}</td>
            <td>{order.payment_detail.card_type}</td>
            <td>{prodNames.join()}</td>
            <td>
            <button className="btn btn-danger" value={[order.order_id,"cancelled"]} onClick={this.handleOrder}>Cancel</button>
            </td>
          </tr>
        );
      }
    });
}
    return(
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-sm-8"}>
          <table className={"table table-striped"}>
            <thead>
              <tr><th>Order Id</th>
              <th>Order Date</th>
              <th>Order Status</th>
              <th>Card Type</th>
              <th>Products</th>
              <th></th></tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OpenOrders);
