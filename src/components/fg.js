import React from 'react';
export default class Frag extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[0,1,2,3,4,5,6,7,8,9]
        }
    }
    componentDidMount(){
        console.log(this.props);
    }
    render(){
        return(
            <>
                <p>NO.1</p>
                <p>NO.2</p>
                <p>NO.3</p>
                {Object.keys(this.props).map((item,index)=>(
                    <p key={index}>{item+'---'+this.props[item]}</p>
                ))}
                {this.state.list.map(ele=>{
                    if(ele%2==0){
                        return ele
                    }else{
                        return ele*2
                    }
                })}
            </>
        )
    }
}