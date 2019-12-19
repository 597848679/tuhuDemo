import React from 'react';
export default class Dialog extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={{'border':'1px red solid'}}>
                <p>我的child部分</p>
                {this.props.children}
            </div>
        )
    }
}