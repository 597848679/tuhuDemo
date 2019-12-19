import {withRouter} from "react-router-dom";
import React from 'react';
import {getLocalShops} from "@/http/api";
import "@/style/shop/shop.scss";
import ShopItem from "@/components/shop/shopItem.js";
import TopBar from "@/components/shop/topToolbar.js";
import { Area } from "../assets/js/city";
import {connect} from 'react-redux';
import {getRegion} from '@/http/api.js';
import ReactPullLoad, { STATS } from "react-pullload";
class Shop extends  React.Component{
    constructor(props){
        super(props);
        const {initPlace}=this.props;
        this.state={
            shopsList:[],
            checkRegion:initPlace.City,
            Regions:[],
            action: STATS.init,
            hasMore:true,//下拉加载，是否还存在更多
            pageIndex:1
        }
    }
    getLocation(){
        let that=this;
        let {setInitPlace} =this.props;
        const AMap = window.AMap;
        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
              // 是否使用高精度定位，默认：true
              enableHighAccuracy: true,
              // 设置定位超时时间，默认：无穷大
              timeout: 10000,
              // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
              buttonOffset: new AMap.Pixel(10, 20),
              //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              zoomToAccuracy: true,     
              //  定位按钮的排放位置,  RB表示右下
              buttonPosition: 'RB'
            })
            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete);
          
            async function onComplete (data) {
                // data是具体的定位信息
                console.log(data)
                let result=await getLocalShops({
                    lat:data.position.lat,
                    lng:data.position.lng,
                    dis:data.addressComponent.city
                });
                localStorage.setItem('position',{
                    lat:data.position.lat,
                    lng:data.position.lng,
                    dis:data.addressComponent.city
                })
                that.setState({
                    shopsList:result.Shops,
                    hasMore:result.TotalPage>10?true:false
                });
                //左上角部分
                Object.keys(Area).map((item,index)=>{
                    Area[item].map(async (itm,idx)=>{
                        if(itm.City==data.addressComponent.city){
                            // console.log(itm);
                            //修改redux中的相关数值
                            setInitPlace(itm);
                            let result=await getRegion({
                                city:itm.City
                            });
                            that.setState({
                                Regions:result.Areas,
                                checkRegion:result.Areas[0].Region
                            })
                            return ;
                        }
                    })
                })
            }
        })
    }
    componentDidMount(){
        this.getLocation();
    }
    async getRegionHttp(){//获取当前定位所在城市的区名list
        const {initPlace} =this.props;
        let result=await getRegion({
            city:initPlace.City
        });
        this.setState({
            Regions:result.Areas,
            checkRegion:result.Areas[0].Region
        })
    }
    async getShopListWithData(type,item){//替代以前散乱的方法
        //region需要item，包含新的区名
        //type需要list，包含选中的项目
        //sort需要sort.type,包含以哪种方式排序
        if(type=='region'){
            //改变市区信息，请求新的shoplist
            this.setState({
                shopsList:[],
                checkRegion:item.Region
            });
            this.child.toggleAlert('city');//关闭子组件的alert
            let {serviceType,sort,checkShopType}=this.props;//redux中此时可靠的数据
            let cache=await getLocalShops({
                lat:localStorage.getItem('position').lat,
                lng:localStorage.getItem('position').lng,
                dis:item.Region,
                serviceType,sort,shop:checkShopType.setShopType
            })
            this.setState({
                shopsList:cache.Shops
            })
        }else if(type=='sort'){
            const {checkShopType,serviceType}=this.props;
            let cache=await getLocalShops({
                lat:localStorage.getItem('position').lat,
                lng:localStorage.getItem('position').lng,
                dis:this.state.checkRegion,
                serviceType,sort:item,shop:checkShopType.setShopType
            })
            this.setState({
                shopsList:cache.Shops
            })
        }else if(type=='type'){
            let {sort,setServiceType,checkShopType}=this.props;
            this.child.toggleAlert('type');
            var str=[];
            item.map((item,index)=>{
                if(item.checked){
                    str.push(item.name)
                }
            })
            let serviceType=str.length>0?str.join('%3B'):'0';
            //改变redux
            setServiceType(serviceType);
            let cache=await getLocalShops({
                lat:localStorage.getItem('position').lat,
                lng:localStorage.getItem('position').lng,
                dis:this.state.checkRegion,
                serviceType,sort,shop:checkShopType.setShopType
            })
            this.setState({
                shopsList:cache.Shops
            })
        }else if(type=='shop'){
            setTimeout(() => {
                this.child.toggleAlert('shop');//关闭弹窗
            }, 150);
            
            let {sort,serviceType}=this.props;
            let cache=await getLocalShops({
                lat:localStorage.getItem('position').lat,
                lng:localStorage.getItem('position').lng,
                dis:this.state.checkRegion,
                serviceType,sort,shop:item.ServersType
            })
            this.setState({
                shopsList:cache.Shops
            })
        }else if(type='loadmore'){
            if(this.state.hasMore){
                this.setState({
                    hasMore:false,
                    pageIndex:this.state.pageIndex+1
                })
                let {serviceType,sort,checkShopType}=this.props;
                let cache=await getLocalShops({
                    lat:localStorage.getItem('position').lat,
                    lng:localStorage.getItem('position').lng,
                    dis:this.state.checkRegion,
                    serviceType,
                    sort,
                    shop:checkShopType.setShopType,
                    pageIndex:this.state.pageIndex
                });
                //请求完毕后关闭
                this.setState({
                    hasMore:Math.ceil(cache.TotalPage/10)==this.state.pageIndex?false:true,
                    shopsList:this.state.shopsList.concat(cache.Shops)
                })
            }else{
                return false
            }
            
        }
    }
    async checkRegion(item){
        this.setState({
            shopsList:[],
            checkRegion:item.Region
        })
        this.child.toggleAlert('city');
        let {serviceType,sort}=this.props;
        let cache=await getLocalShops({
            lat:localStorage.getItem('position').lat,
            lng:localStorage.getItem('position').lng,
            dis:item.Region,
            serviceType,sort
        })
        this.setState({
            shopsList:cache.Shops
        })
    }
    async checkType(typeList){//筛选
        let {sort,setServiceType}=this.props;
        this.child.toggleAlert('type');
        var str=[];
        typeList.map((item,index)=>{
            if(item.checked){
                str.push(item.name)
            }
        })
        let serviceType=str.length>0?str.join('%3B'):'0';
        setServiceType(serviceType);
        let cache=await getLocalShops({
            lat:localStorage.getItem('position').lat,
            lng:localStorage.getItem('position').lng,
            dis:this.state.checkRegion,
            serviceType,sort
        })
        this.setState({
            shopsList:cache.Shops
        })
    }
    async toggleSort(sort){//排序
        let {serviceType}=this.props;
        let cache=await getLocalShops({
            lat:localStorage.getItem('position').lat,
            lng:localStorage.getItem('position').lng,
            dis:this.state.checkRegion,
            serviceType,sort
        })
        this.setState({
            shopsList:cache.Shops
        })
    }
    onRef(ref){
        this.child=ref;
    }
    handleAction = action => {
        //new action must do not equel to old action
        if (action === this.state.action) {
            console.log('0')
            return false;
        }
    
        if (action === STATS.refreshing) {
            //刷新
            console.log('0');
            //   this.handRefreshing();
        } else if (action === STATS.loading) {
            //加载更多
            console.log('0')
            this.getShopListWithData('loadmore');
        } else {
            //DO NOT modify below code
            console.log('0')
            this.setState({
                action: action
            });
        }
    };
    render(){
        return(
            <div className='shopList'>
            <TopBar getShopListWithData={this.getShopListWithData.bind(this)} showRegion={this.state.checkRegion} onRef={this.onRef.bind(this)} Regions={this.state.Regions}></TopBar>
                <ReactPullLoad
                    downEnough={150}
                    action={this.state.action}
                    handleAction={this.handleAction}
                    hasMore={true}
                    distanceBottom={1000}
                >
                    <div className='shopList-content'>
                        {/* <Spin spinning={this.state.shopsList.length<=0} delay={0}> */}
                            {
                                this.state.shopsList.map((item,index)=>{
                                    return (
                                        <ShopItem key={item.ShopId} data={item}></ShopItem>
                                    )
                                })
                            }
                        {/* </Spin> */}
                    </div>
                </ReactPullLoad>
            </div>
            
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setInitPlace:(obj)=>{
            dispatch({
                type:'setInitPlace',
                obj:obj
            })
        },
        setServiceType:(str)=>{
            dispatch({
                type:'setServiceType',
                str
            })
        }
    };
}
function mapStateToProps(state) {
    return {
        initPlace:state.initPlace,
        serviceType:state.serviceType,
        sort:state.sort,
        checkShopType:state.checkShopType
    };
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Shop));