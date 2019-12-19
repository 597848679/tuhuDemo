import React from 'react';
import "@/style/shop/topToolbar.scss";
import {connect} from 'react-redux';
import {Icon} from 'antd-mobile';
import { CSSTransition} from 'react-transition-group';
import {getService} from '@/http/api.js';
class Top extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showCity:false,
            showType:false,
            showSort:false,
            showShop:false,
            activeLeft:0,
            typeList:[
                {
                    name:'途虎工厂店',
                    checked:false
                },{
                    name:'认证店',
                    checked:false
                },{
                    name:'星级保养店',
                    checked:false
                },{
                    name:'快修店',
                    checked:false
                },{
                    name:'维修厂',
                    checked:false
                },{
                    name:'4S店',
                    checked:false
                },
            ],
            sortList:[
                {
                    name:'默认排序',
                    type:'HuShi',
                    checked:true
                },{
                    name:'附近优先',
                    type:'',
                    checked:false
                },{
                    name:'累计安装',
                    type:'Install',
                    checked:false
                },{
                    name:'评分最高',
                    type:'Grade',
                    checked:false
                },
            ],
            shopList:[//门店类型的排序
                // {
                //     name:'全部门店',
                //     id:'0'
                // },{
                //     name:'美容门店',
                //     id:''
                // },{
                //     name:'轮胎门店',
                //     id:'1'
                // },{
                //     name:'保养门店',
                //     id:'2'
                // },{
                //     name:'安装门店',
                //     id:'4'
                // },{
                //     name:'改装门店',
                //     id:'6'
                // },
            ],
            shopListSecond:[
                
            ]
        }
    }
    async componentDidMount(){
        this.props.onRef(this);
        let cache=await getService();
        console.log(cache)
        this.setState({
            shopList:cache.Beautify
        })
    }
    toggleAlert(type){
        if(type=='city'){
            this.setState({
                showCity:!this.state.showCity,
                showSort:false,
                showType:false,
                showShop:false
            });
        }else if(type=='type'){
            this.setState({
                showType:!this.state.showType,
                showCity:false,
                showSort:false,
                showShop:false
            });
        }else if(type=='sort'){
            this.setState({
                showType:false,
                showCity:false,
                showSort:!this.state.showSort,
                showShop:false
            });
        }else if(type=='shop'){
            this.setState({
                showType:false,
                showCity:false,
                showSort:false,
                showShop:!this.state.showShop
            });
        }
    }
    async toggleSort(item){//改变排序方式
        this.props.setSort(item.type);//发射到redux
        this.props.getShopListWithData('sort',item.type)
        // this.props.toggleSort(item.type);
        this.toggleAlert('sort');//关闭alert
    }
    resetType(){
        var item=this.state.typeList;
        item.map((item,index)=>{
            item.checked=false
        })
        this.setState({
            typeList:item
        })
    }
    toggleChecked(index){
        var item=this.state.typeList.map((item,idx)=>{
            if(idx==index){
                item.checked=!item.checked;
            }
            return item
        });
        this.setState({
            typeList:item
        });
    }
    toggleShop(item,index){
        this.setState({
            activeLeft:index
        })
        if(item.Items!=null){
            //存在子项目
            this.setState({
                shopListSecond:item.Items
            });
        }else{
            this.setState({
                shopListSecond:[]
            });
            //redux改变
            this.props.setShopType(item);
            //发射到父组件
            this.props.getShopListWithData('shop',item);
        }
    }
    render(){
        let {sort}=this.props;
        const topCityAlert=()=>{
            if(this.state.showCity){
                return (
                <CSSTransition
                    in={this.state.showCity}
                    timeout ={1000}
                    classNames = 'fade'
                    appear={true}
                >
                    <div className='top-alert'>
                        <ul className='top-alert-region'>
                            {
                                this.props.Regions.map((item,index)=>{
                                    return (
                                        <li onClick={()=>this.props.getShopListWithData('region',item)} key={index} className='top-alert-region-item'>
                                            <span>{item.Region}</span>
                                            <span>{item.Count}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </CSSTransition>
                )
            }
        }
        const topTypeAlert=()=>{
            if(this.state.showType){
                return(
                    <CSSTransition
                    in={this.state.showType}
                    timeout ={1000}
                    classNames = 'fade'
                    appear={true}
                >
                    <div className='top-alert'>
                        <div className='top-alert-type'>
                            <div className='top-alert-type-head'>
                                <span>门店类型</span>
                            </div>
                            <div className='top-alert-type-body'>
                                <ul>
                                    {this.state.typeList.map((item,index)=>{
                                        return(
                                            <li key={item.name} onClick={()=>this.toggleChecked(index)} style={{background:item.checked?'#df3448':'#fff'}}>
                                                <span>{item.name}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='top-alert-type-foot'>
                                <div className='top-alert-type-foot-btn'>
                                    <div className='top-alert-type-foot-btn-left' onClick={this.resetType.bind(this)}>重置</div>
                                    {/* <div className='top-alert-type-foot-btn-right' onClick={()=>this.props.checkType(this.state.typeList)}>确认</div> */}
                                    <div className='top-alert-type-foot-btn-right' onClick={()=>this.props.getShopListWithData('type',this.state.typeList)}>确认</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CSSTransition>
                )
            }
        }
        const topSortAlert=()=>{
            if(this.state.showSort){
                return (
                    <div className='top-alert'>
                        <div className='top-alert-sort'>
                            <ul>
                                {
                                    this.state.sortList.map((item,index)=>{
                                        return(
                                            <li key={item.name} onClick={this.toggleSort.bind(this,item)}>
                                                <span style={{'color':item.type==sort?'red':'#000'}}>{item.name}</span>
                                                <Icon className='arrow' type={'check'} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        }
        const topShopAlert=()=>{
            if(this.state.showShop){
                return (
                    <CSSTransition
                        in={this.state.showShop}
                        timeout ={1000}
                        classNames = 'fade'
                        appear={true}
                    >
                        <div className='top-alert'>
                            <div className='top-alert-shop'>
                                <div className='top-alert-shop-left'>
                                    <ul>
                                        {
                                            this.state.shopList.map((item,index)=>{
                                                return (
                                                    <li className={this.state.activeLeft==index?'active':''} key={item.Name} onClick={this.toggleShop.bind(this,item,index)}>
                                                        <span>{item.Name}</span>
                                                        {item.Items!=null?<Icon className='arrow-right' type={'right'} />:''}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className='top-alert-shop-right'>
                                    <ul>
                                        {
                                            this.state.shopListSecond.map((item,index)=>{
                                                return (
                                                    <li key={item.ServiceId} onClick={this.toggleShop.bind(this,item)}>
                                                        <span>{item.Name}</span>
                                                    </li>
                                                )
                                            }) 
                                        }
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                )
            }
        }
        return(
            <div className='top'>
                <div className='top-item city' onClick={this.toggleAlert.bind(this,'city')}>
                    <span>{this.props.showRegion}</span>
                    <Icon className='arrow' type={this.state.showCity?'up':"down"} />
                </div>
                <div className='top-item shops' onClick={this.toggleAlert.bind(this,'shop')}>
                    <span>{this.props.checkShopType.Name}</span>
                    <Icon className='arrow' type={this.state.showCity?'up':"down"} />
                </div>
                <div className='top-item sort' onClick={this.toggleAlert.bind(this,'sort')}>
                    <span>{this.state.sortList.map((item)=>{
                        if(item.checked){
                            return item.name
                        }
                    })}}</span>
                    <Icon className='arrow' type={this.state.showSort?'up':"down"} />
                </div>
                <div className='top-item type' onClick={this.toggleAlert.bind(this,'type')}>
                    <span>筛选</span>
                    <Icon className='arrow' type="ellipsis" />
                </div>
                {
                    topCityAlert()
                }
                {
                    topTypeAlert()
                }
                {
                    topSortAlert()
                }
                {
                    topShopAlert()
                }
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Top);
function mapStateToProps(state) {
    return {
        initPlace:state.initPlace,
        sort:state.sort,
        checkShopType:state.checkShopType
    };
}
function mapDispatchToProps(dispatch) {
    return {
        setSort:(str)=>{
            dispatch({
                type:'setSort',
                str
            })
        },
        setShopType:(obj)=>{
            dispatch({
                type:'setShopType',
                obj
            })
        }
    };
}