import React from 'react';
export default class Ctem extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <p>华氏度：</p>
                <input value={this.props.tem} onChange={this.props.changeInput}></input>
            </div>
        )
    }
}