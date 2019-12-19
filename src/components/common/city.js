import React from 'react';
import {getProvince} from '@/http/api.js';
import {HotCities,CityListSort} from "@/assets/js/city.js";
import {connect} from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import '@/style/components/alertCity.scss'
import { setTimeout } from 'timers';
class Dialog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hotlist:[{
                first:'hot',
                cityData:[{
                    "name": "热门城市",
                    "first": "热"
                }]
            }],
            allList:[]
        }
    }
    async getCityList(){
        let result =await getProvince();
        this.setState(()=>{return {
            hotlist:result.HotCities,
            allList:result.Area
        }})
    }
    componentDidMount(){
        this.getCityList();
    }
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if(anchorElement) { anchorElement.scrollIntoView(); }
        }
    }
    changeCity(item){
        let {commitCity} =this.props;
        commitCity({...item});
    }
    render(){
        return (
            <>
            <CSSTransition
                in={this.props.show}
                timeout ={1000}
                classNames = 'fade'
                appear={true}
            >
            <div className='alert'>
                <div className='alert-box' id='hot'>
                    <div className='alert-box-title'>
                        <span>热门城市</span>
                    </div>
                    <div className='alert-box-hotitems'>
                        {
                            HotCities.map((item,index) => {
                                return  <div onClick={this.changeCity.bind(this,item)} key={item.CityId} className='alert-box-hotitems-item'>
                                            <span>{item.City}</span>
                                        </div>
                            })
                        }
                    </div>
                </div>
                {   
                    Object.keys(CityListSort).map((i,n)=>{
                        return (
                            <div key={n} className='alert-box' id={i}>
                                <div className='alert-box-title'>
                                    <span>{i}</span>
                                </div>
                                <div className='alert-box-content'>
                                    {
                                        CityListSort[i].map((itm,idx)=>{
                                            return (
                                                <div onClick={this.changeCity.bind(this,itm)} key={itm.CityId} className='alert-box-content-item'>
                                                    <span>{itm.City}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                })}
            </div>
            </CSSTransition>
            <CSSTransition
                in={this.props.show}
                timeout ={1000}
                classNames = 'fade'
                appear={true}>
            <div className='right'>
                {Object.keys(CityListSort).map((item,index)=>{
                    return (<div key={index} className='alert-right-item'><a onClick={()=>this.scrollToAnchor(item)}>
                        {item.first=='hot'?'热':item}
                    </a></div>)
                })}
            </div>
            </CSSTransition>
            </>  
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        commitCity: (item)=>dispatch(function(){
            setTimeout(() => {
                dispatch({type:'changecity',item})
            }, 100);
        })
    };
}
export default connect(()=>{
    return {

    }
},mapDispatchToProps)(Dialog)