import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
class SubPage extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.location.query);
        console.log(this.props.location.state);
        console.log(this.props.location.search);
    }
    render(){
        let {publicnum}=this.props;
        return(
            <div>
                <h1>这里是SubPage子页面</h1>
                <p>目前的publicnum:</p>
                
            </div>
        )
    }
}

export default withRouter(connect((state)=>{
    return {publicnum:state.publicnum}
},()=>{return{}})(SubPage));