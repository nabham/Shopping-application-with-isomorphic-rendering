import React from 'react';
import {connect} from 'react-redux';
import {modifyNotification} from '../actions/UserActions.js';

const mapStateToProps = (state) => {
  return {
    notifications: state.UserReducer.notification,
    userId: state.UserReducer._id
  };

}
const mapDispatchToProps = (dispatch) => {
    return {
        onModifyNotification: (notification, notification_state,userId)=> {
        dispatch(modifyNotification(notification, notification_state,userId));
      }
  }
}

class Notify extends React.Component{
  constructor(props){
    super(props);
    this.handleNotification=this.handleNotification.bind(this);
    this.state={
      reloadToggle:true
    }
  }
  handleNotification(event){
    let notification={
      notification_id:event.target.value.split(',')[0],
      notification_text:event.target.value.split(',')[1],
      notification_seen:true
    }
  this.props.onModifyNotification(notification, this.props.notifications,this.props.userId);
  this.setState({reloadToggle: !this.state.reloadToggle});
  }
  render(){
    var rows=[];
    if(this.props.notifications)
    this.props.notifications.map((notification,index) => {
      if(!notification.notification_seen){
        rows.push(
          <tr key={index}>
            <td>{notification.notification_id}</td>
            <td>{notification.notification_text}</td>
            <td>
            <button className="btn btn-danger" value={[notification.notification_id, notification.notification_text]} onClick={this.handleNotification}>Mark As Read</button>
            </td>
          </tr>
        );
      }
    });
    return(
      <div className={"container"} style={{marginTop:"50px",marginLeft:"50px"}}>
        <div className={"row"}>
          <div className={"col-sm-8"}>
          <table className={"table table-striped"}>
            <thead>
              <tr><th>Notification Order Id</th>
              <th>Notification Text</th></tr>
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
export default connect(mapStateToProps, mapDispatchToProps)(Notify);
