import React from 'react';
export default function hComponent(Low,another){
    class HComponent extends React.Component{
        constructor(props){
            super(props);
        }
        componentDidMount(){
            console.log('props')
            console.log(this.props)
        }
        render(){
            return (<Low {...this.props} {...another}></Low>)
        }
    }
    return HComponent
}