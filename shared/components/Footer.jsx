import React from 'react';

export default class Footer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style={{backgroundColor:"#121921",width:"100%",height:"120px",marginTop:"200px",clear:"both",bottom:"0"}}>
            <ul className={'footerul'}>
            <li>Get To Know us</li>
            <li>Connect with Us</li>
            <li>Let Us Help You</li>
            </ul>
            </div>
            );

    }
}
