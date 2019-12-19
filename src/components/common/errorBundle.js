import React from 'react';
export default class ErrorBundle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hasError:false
        }
    };
    static getDerivedStateFromError(err){
        return {hasError:true}
    };
    render(){
        if(this.state.hasError){
            return <h1>报错了，还不快去改!</h1>
        }else{
            return this.props.children;//返回正确的子组件
        }
    }
}