import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {getTbDate} from '@/http/api.js';
class Num extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {val,up}=this.props;
        return (<div>
            <button onClick={up}>---</button>
            {val.map((item,index) => {
                    return <p key={index}>{item[0]}</p>
                })}
            <button onClick={up}>+++</button>
        </div>)
    }
}
function mapStatetoProps(state){
    return {
        val:state.publicnum
    }
}
function mapDispatchToProps(dispatch) {
    return {
        up:()=>dispatch(publicupMiddle())
    };
}
function publicupMiddle(){//类似于vue的action
    return async dispatch=>{
        let data=await getTbDate();
        if(data.result.length>0){
            console.log(data.result)
            dispatch({
                type:'publicup',
                list:data.result
            })
        }
    }
}
export default withRouter(connect(mapStatetoProps,mapDispatchToProps)(Num));