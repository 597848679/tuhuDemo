import React from 'react';
import {Suspense} from 'react'
// const Ctem =React.lazy(()=>import('../components/calc/Ctem'));
import Ctem from '../components/calc/Ctem';
import Htem from '../components/calc/Htem';
export default class Calc extends React.Component{
    constructor(props){
        super(props);
        
        // this.changeInput=this.changeInput.bind(this);
        this.state={
            tem:0,
            src:'s'
        };
        
        this.changeC=this.changeC.bind(this);
        this.changeH=this.changeH.bind(this);
    }
    changeC(e){
        var evals=e.target.value;
        this.setState(
            {
                tem:evals,
                src:'c'
            }
        )
    }
    changeH(e){
        this.setState({
            tem:e.target.value,
            src:'h'
        })
    }
    render(){
        return(
            <div>
                <Suspense fallback={<div>loading</div>}>
                    <Ctem changeInput={this.changeC} tem={this.state.src=='c'?this.state.tem:(this.state.tem*2)}></Ctem>
                    <Htem changeInput={this.changeH} tem={this.state.src=='h'?this.state.tem:(this.state.tem/2)}></Htem>
                </Suspense>
            </div>
        )
    }
}