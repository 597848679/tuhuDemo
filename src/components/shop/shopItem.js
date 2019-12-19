import {withRouter} from "react-router-dom";
import React from 'react';
import "@/style/components/shopItem.scss";
class ShopItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var shopType=(type)=>{
            if(type==0){
                //个体自营
                return (
                    <div className='shop-right-info-type person'>
                        快修店
                    </div>
                )
            }else{
                //自营店
                return (
                    <div className='shop-right-info-type factory'>
                        工厂店
                    </div>
                )
            }
        }
        var honorList=(data)=>{
            var list=[];
            Object.keys(data).map((item,index)=>{
                if(item=='IsStarShop'&&data['IsStarShop']){
                    list.push(<span key={index}>星级门店</span>)
                }else if(item=='InstallNow'&&data['InstallNow']){
                    list.push(<span key={index}>途虎直送</span>)
                }else if(item=='IsOpenLive'&&data['IsOpenLive']){
                    list.push(<span key={index}>虎式服务</span>)
                }
            })
            return list
        }
        var freeList=(data)=>{
            var list=data.ShopLabel;
            var result=[];
            if(list.length>0){
                list.map((item,index)=>{
                    result.push(
                        <div key={index} className='shop-right-free-label'>
                            {item.Type=='Check'?<div><span>检</span><span>华晨中华授权</span></div>:''}
                            {item.Type=='Authentication'?<div><span>证</span><span>华晨中华授权</span></div>:''}
                            {item.Type=='SalesPromotion'?<div><span>惠</span><span>华晨中华授权</span></div>:''}
                        </div>
                    )
                })
                return <div className='shop-right-free'>
                            {result}
                        </div>
            }else{
                return null
            }
            
        }
        return (
            <div className='shop'>
                <div className='shop-left'>
                    <img src={this.props.data.Images[0]} alt=""/>
                </div>
                <div className='shop-right'>
                    <div className='shop-right-name'>
                        {this.props.data.CarparName}
                    </div>
                    <div className='shop-right-info'>
                        <div className='shop-right-info-rate'>
                            总评分 <span style={{color:'red'}}>{ this.props.data.CommentRate}</span>
                        </div>
                        {/* <i className='shop-right-info-line'>|</i> */}
                        <div className='shop-right-info-num'>
                            总订单 <span style={{color:'red'}}>{ this.props.data.InstallQuantity}</span>
                        </div>
                        {shopType(this.props.data.ShopCertification)}
                    </div>
                    <div className='shop-right-address'>
                        <span>{this.props.data.Address}</span>
                        <span>{this.props.data.Distance.toFixed(2)}KM</span>
                    </div>
                    <div className='shop-right-honor'>
                        {honorList(this.props.data)}
                    </div>
                    {freeList(this.props.data)}
                </div>
            </div>
        )
    }

}
export default withRouter(ShopItem); 