import React from 'react';
export default class LiItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <li key={this.props.text}>{this.props.text}</li>
            </div>
        )
    }
}