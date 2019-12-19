import React from 'react';
// import {NavLink} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import IndexImg from '../../assets/img/nav/index.png';
import IndexImgActive from '../../assets/img/nav/indexActive.png'

import ShopImg from '../../assets/img/nav/shop.png';
import ShopImgActive from '../../assets/img/nav/shopAvtive.png'
import "@/style/components/nav.scss";

class Nav extends React.Component{
    constructor(props){
        super(props);
    }
    toPage(type){
        if(type==1){
            this.props.history.push('/');
        }else if(type==2){
            this.props.history.push('/shop');
        }
    }
    render(){
        const { match, location, history } = this.props;
        // console.log(location)
        return (
            <div className='nav'>
                <div className='nav-item' onClick={this.toPage.bind(this,1)}>
                        <img src={location.pathname=='/'?IndexImgActive:IndexImg} alt=""/>
                        <span>首页</span>
                </div>
                <div className='nav-item' onClick={this.toPage.bind(this,2)}>
                    <img src={location.pathname=='/shop'?ShopImgActive:ShopImg} alt=""/>
                    <span>门店</span>
                </div>
                <div className='nav-item'></div>
            </div>
        )
    }
}
export default withRouter(Nav);