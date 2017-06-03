import {connect} from 'react-redux';
import React from 'react';
import Product from './Product';
import ajaxHelper from '../utilities/ajaxHelper';

export default class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.state={products:[]};
    }

    componentDidMount(){
        this.setState({products:ajaxHelper.getProductNames('/api/getProductByNames?searchText='+this.props.params.searchtext)});
    }

    render(){
        let history = this.props.history;
        var rows = []
        if(this.state.products.length>0){
            rows = []
            this.state.products.forEach((item,i)=>{
                rows.push(<div key={i}><Product id={item._id} url={item.image_url} proname={item.name} history= {history}/></div>)
            })
        }
        else{
            rows = []
            rows.push(<div><center>No Product found</center></div>)
        }
        
        return(<div style={{padding:"20px",marginTop:"50px"}}>
                <div className={'resultFound'}>{this.state.products.length} Results Found</div>
                <div style={{borderBottom:'1px solid #cccccc',height:'20px',width:"100%"}}></div>
                {rows}
            </div>);
    }
}
