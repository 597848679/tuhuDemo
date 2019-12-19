import '@/style/index/index.scss';
import {withRouter} from "react-router-dom";
import React from 'react';
// import PropTypes from 'prop-types';
import TopDownImg from '@/assets/img/index/download.png';
import KeFuImg from '@/assets/img/index/kefu.png';
import { Carousel,Icon } from 'antd-mobile';
import AlertCity from '@/components/common/city.js';//组件
// import {Area,HotCities} from "@/assets/js/city.js";
import ctx from '../js/connectContext';
import { connect } from 'react-redux';
import store from '@/redux/index';
// import hComponent from '../components/common/high/highComponent';
// import Frag from '../components/fg';
// const HComponentE=hComponent(Frag,{sex:1,lol:'黑铁'});
store.subscribe(function(prev,next){
    // console.log(prev)
})
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showCityAlert:false,
            mainbussiness:[
                {
                    name:'轮胎',
                    desc:'包安装',
                    pathname:'luntai.png'
                },{
                    name:'保养',
                    desc:'精准匹配',
                    pathname:'baoyang.png'
                },{
                    name:'洗车',
                    desc:'优质服务',
                    pathname:'xiche.png'
                },{
                    name:'领红包',
                    desc:'百分百中奖',
                    pathname:'hongbao.png'
                }
            ],
            lessbussiness:[
                {
                    name:'充值卡',
                    pathname:'chongzhika.png'
                },{
                    name:'充值卡',
                    pathname:'chongzhika.png'
                },{
                    name:'充值卡',
                    pathname:'chongzhika.png'
                },{
                    name:'充值卡',
                    pathname:'chongzhika.png'
                },{
                    name:'充值卡',
                    pathname:'chongzhika.png'
                },{
                    name:'充值卡',
                    pathname:'chongzhika.png'
                },
            ]
        }
    }
    // toggleAlert(type){
    //     if(type==1){
    //         //城市选择
    //         this.setState(()=>{
    //             return {
    //                 showCityAlert:!this.state.showCityAlert
    //             }
    //         })
    //     }
    // }
    toPage(){
        // this.props.history.push('/subpage')
        this.props.history.push({
            pathname:'/subpage',
            query:{
                a:'1'
            },
            state:{
                b:'2'
            },
            search:'666'
        })
    }
    render(){
        let {initPlace,showCityAlert,toggleShowCityAlert}=this.props;
        var userfulList=()=>{
            var les=[]
            for(let i=1;i<=10;i++){
                les.push(<li key={i}>
                    <img  src={require("@/assets/img/index/item"+i+'.png')} alt=""/>
                </li>)
            }
            return les
        }
        return(
            <div className='content'>
                {showCityAlert?<AlertCity show={this.props.showCityAlert}/>:''}
                <div className='content-header'>
                    <div className='content-header-top'>
                        <img src={TopDownImg} alt=""/>
                    </div>
                    <div className='content-header-wrap'>
                        <div className='content-header-wrap-city' onClick={toggleShowCityAlert}>
                            <span>{initPlace.City}</span>
                            <div>
                                <Icon className='arrow' type="down" size={'xxs'}/>
                            </div>
                        </div>
                        <div className='content-header-wrap-search'>
                            <Icon className='content-header-wrap-search-btn arrow' type="search" />
                            <span>大屏导66航799元送油卡和记录仪 免费安装</span>
                        </div>
                        <div className='content-header-wrap-kf'>
                            <img src={KeFuImg} alt=""/>
                        </div>
                    </div>
                </div>
                <div className='content-main'>
                    <div className='content-main-hascar'>
                        <div className='content-main-hascar-brand'>
                            <div className='content-main-hascar-brand-logo'>
                                <img src="https://img1.tuhu.org/Images/Logo/xiandai.png" alt=""/>
                            </div>
                            <span>标致</span>
                            <span>301</span>
                        </div>
                        <div className='content-main-hascar-runway'>
                            <span>行驶里程 0KM</span>
                        </div>
                    </div>
                    <div className='content-main-mainbussiness'>
                        <ul>
                            {
                                this.state.mainbussiness.map((item,index)=>{
                                    return (
                                        <li key={index}>
                                            <img src={require("@/assets/img/index/"+item.pathname)} alt=""/>
                                            <span>{item.name}</span>
                                            <span>{item.desc}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='content-main-lessbussiness'>
                        <ul>
                            {
                                this.state.lessbussiness.map((item,index)=>{
                                    return (
                                        <li key={index}>
                                            <img src={require("@/assets/img/index/"+item.pathname)} alt=""/>
                                            <span>{item.name}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='content-main-banner'>
                        <Carousel infinite={true} autoplayInterval={1800} autoplay={true} effect="fade">
                            <div className='content-main-banner-item'>
                                <img src="https://img1.tuhu.org/activity/image/FngWvuQQFCT5BSxBbIBB2DdE4DMH_w750_h250.png@250h_99q.webp" alt=""/>
                            </div>
                            <div className='content-main-banner-item'>
                                <img src="https://img1.tuhu.org/activity/image/FngWvuQQFCT5BSxBbIBB2DdE4DMH_w750_h250.png@250h_99q.webp" alt=""/>
                            </div>
                        </Carousel>
                    </div>
                    <div className='content-main-userful'>
                        <ul>
                            {
                               userfulList()
                            }
                        </ul>
                    </div>
                </div>
            </div>
            // 通过 contextType将class的context设为defaultValue
            // <Provider value={this.state}>
            // <div>
            //     {/* <button onClick={this.toPage}>去subpage页面</button> */}
            //     {/* <h2>这是来自{this.state.place+'de'}<span style={{'color':'red'}}>{this.props.userName}</span>写的第一个组件</h2>
            //     <p onClick={this.addAge}>过了一年,如今我{this.state.age}</p>
            //     <p>现在时间{new Date().valueOf()}</p>
            //     <Mine age={this.state.age} changeMyAge={this.changeMyAge.bind(this)}></Mine> */}
            //     {/* <ul>
            //         {this.state.cars.map((car)=>(
            //             // <ErrorBundle>
            //                 <LiItem text={car}></LiItem>
            //             // </ErrorBundle>
            //         ))}
            //     </ul> */}
            //     {/* <textarea value={this.state.place}></textarea> */}
            //     {/* <form>
            //         <select onChange={this.handleSelect}>
            //             {this.state.cars.map((car)=>(
            //                 <option key={car} value={car}>{car}</option>
            //             ))}
            //         </select>
            //         <label name='checkInput'>
            //             <input name='checkInput' checked={this.state.checkInput} type='checkbox' onChange={this.handleLabel}/>
            //             <span>舒慨到此一游</span>
            //         </label>
            //         <label name='textInput'>
            //             <input ref='firstRef' name='textInput' value={this.state.textInput} type='text' onChange={this.handleLabel}/>
            //         </label>
            //         <input value='hi'/>
            //     </form> */}
            //     {/* <Calc></Calc> */}
            //     {/* <Shop></Shop> */}
            //     {/* <h1>高阶部分----context</h1>
            //     <Input></Input>
            //     <h1>高阶部分----组合</h1>
            //     <DialogIndex></DialogIndex>
            //     <h1>高阶部分----ref</h1>
            //     <FancyButton ref={this.ref1}></FancyButton>
            //     <h1>高阶部分----Fragments</h1>
            //     <div style={{border:'1px solid red'}}>
            //         <Frag></Frag>
            //     </div>
            //     <h1>高阶部分----高阶组件</h1>
            //     <HComponentE></HComponentE> */}
            // </div>
            // </Provider>
        )
    }
};
function mapStateToProps(state) {
    return{
        initPlace:state.initPlace,
        showCityAlert:state.showCityAlert
    } ;
}
function mapDispatchToProps(dispatch) {
    return {
        toggleShowCityAlert:()=>{
            dispatch({type:'toggleshowcityalert'})
        }
    }
  }
Main.contextType=ctx;
const App=connect(mapStateToProps,mapDispatchToProps)(Main)
export default withRouter(App);