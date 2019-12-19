import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
// import {Consumer } from '../js/connectContext'
// const BatteryContext =createContext();
export default class Mine extends Component{
    constructor(props){
        super(props);
        this.state={
            showQr:111
        };
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick=()=>{
        this.setState({
            showQr:this.state.showQr+this.props.age
        });
        console.log('取反')
    }
    // static getDerivedStateFromProps(props,state){
    //     console.log(props);
    //     return props
    // }
    noJump(num,e){
        e.preventDefault();
        // console.log('不用去百度了');
        console.log(num);
        console.log(e);
    }
    noHref(a,b,e){
        e.preventDefault();
        console.log(a,b)
    }
    static propTypes={
        changeMyAge:PropTypes.func
    }
    render(){
        let text;
        if(this.state.showQr==555){
            text=<p>这是555</p>
        }else{
            text=<p>{this.state.showQr}才是</p>
        }
        return(
            <div>
                {
                    (true)?(<div>我爱你中国</div>):(
                        <div>
                    <span onClick={this.handleClick}>{this.state.showQr}</span>
                    <a href='https://www.baidu.com' onClick={this.noJump.bind(this,'555')}>送我去百度</a>
                    <a href='https://www.tmall.com' onClick={(e)=>{this.noHref('555','666',e)}}>送我去天猫</a></div>)
                }
                {text}
            </div>
        )
        // if(typeof this.state.showQr==Number){
        //     return(
        //         <div>我爱你中国</div>
        //     )
        // }else{
        //     return(
        //         <div>
        //             <span onClick={this.handleClick}>{this.state.showQr}</span>
        //             <a href='https://www.baidu.com' onClick={this.noJump.bind(this,'555')}>送我去百度</a>
        //             <a href='https://www.tmall.com' onClick={(e)=>{this.noHref('555','666',e)}}>送我去天猫</a>
        //             {/* 将function作为props传入
        //             <input onChange={this.props.changeMyAge}/>
        //             {/* 二维码功能部分 */}
        //             {/* <button className="qr" onClick={this.handleClick}>二维码</button> */}
        //                 {/* <button className="qr" onClick={this.handleClick}>
        //                     二维码
        //                     <Consumer>
        //                     {value=><span>{value}</span>}
        //                     </Consumer>
        //                 </button>
        //             <div className='qrcode' style={{display:this.state.showQr?'block':'none'}}>
        //                 <img src={require('../assets/img/qrcode.jpg')} alt='qr'/>
        //             </div> */}
        //         </div>
        //     )
        // }
        
    }
}