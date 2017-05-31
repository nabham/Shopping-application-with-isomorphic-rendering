import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import * as ProductActions from '../actions/ProductActions';
import {connect} from 'react-redux';
import AjaxHelper from '../utilities/ajaxHelper';

const mapStateToProps = (state) => {
  return {
    state:state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMount : (data) => {
      dispatch(ProductActions.loadProducts(data));
    }
  }
}


class App extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
    this.props.onMount(AjaxHelper.loadProducts('/api/initialProducts'));
  }

    render(){
        return(<div>
                <Header history={this.props.history} />
                <div style={{minHeight:"300px"}}>
                    {this.props.children}
                </div>
                <Footer/>
            </div>);

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
