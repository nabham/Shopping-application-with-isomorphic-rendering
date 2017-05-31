import React from 'react';
import { Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import * as ProductActions from '../actions/ProductActions';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

const mapStateToProps = (state) => {
  return {
    state : state
  };
}


class SearchBoxComponent extends React.Component{
    constructor(props){
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.onchange = this.onchange.bind(this);
    }
    onchange(){
        
        this.props.history.push('/searching');
    }
    
    onSearch(){
       console.log(this.refs.searchtext.value); this.props.history.push('/searchPage/'+this.refs.searchtext.value);
    }
    
    render(){
    return(<div className={'searchBox'}>
          <span style={{backgroundColor:"#ffffff"}}><input type="text" className={'inputBox'} ref="searchtext" placeholder="Search Product" onChange={this.onchange} />
        <Button type="button" style={{backgroundColor:"#0066cc",height:"32px",color:"#ffffff",border:"1px solid #0066cc",borderRadius:"0px 2px 2px 0px",marginTop:"-3px"}} onClick={this.onSearch}><span className="glyphicon glyphicon-search"></span></Button>
            </span></div>
    )
  }
}

export default connect(mapStateToProps)(SearchBoxComponent)