import React from 'react';
import '@/style/activity/home.scss';
import { Carousel} from 'antd-mobile';
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            raffleStatus:false,
            PackerInfo:[
                {
                    "PKID": 0,
                    "Name": "100减100元保养拼团券",
                    "Phone": "138****7124"
                }, {
                    "PKID": 0,
                    "Name": "指定朝阳500-50",
                    "Phone": "137****8612"
                }, {
                    "PKID": 0,
                    "Name": "300减30元朝阳指定轮胎券",
                    "Phone": "137****8612"
                }, {
                    "PKID": 0,
                    "Name": "300减30元普利司通指定轮胎券",
                    "Phone": "133****2077"
                }
            ],
            raffleBox:[
                {//0
                    url:'https://img3.tuhu.org/activity/image/FvBmqBjt57Ohq0JGAa8fbeVRzkKE_w213_h210.png@200h_99q.webp',
                    type:'raffle'
                },{//1
                    url:'https://img3.tuhu.org/activity/image/FsqQK3ppSk9ORZNC4fK78Ci_j68t_w213_h210.png@200h_99q.webp',
                    type:'raffle'
                },{//2
                    url:'https://img3.tuhu.org/activity/image/FgIW1jITH_57281b6dlZqypgs9X2_w213_h210.png@200h_99q.webp',
                    type:'raffle'
                },{//3
                    url:'https://img3.tuhu.org/activity/image/FvAYuS_7seK5H7eTAVNUuPcjGVle_w213_h210.png@200h_99q.webp',
                    type:'raffle'
                },{//4
                    url:'https://img3.tuhu.org/activity/image/FgWUu5WEN4bhe9pg2VB1vldPFPDY_w213_h210.png@200h_99q.webp',
                    type:'raffle'
                },{//5  btn
                    url:'',
                    type:'btn'
                },{//6
                    url:'https://img3.tuhu.org/activity/image/Fhs_6QKEnbxj_EkNktfSa1yOmOwO_w213_h210.png@200h_99q.webp',
                    type:'raffle'
                },{//7
                    url:'https://img3.tuhu.org/activity/image/FpOS07UPauW-BErxNI7n0Lgz_PlN_w213_h210.png@200h_99q.webp',
                    type:'raffle'
                },{//8
                    url:'https://img3.tuhu.org/activity/image/FmOf3l2VGRkiO7KSxepX-LjISFwv_w213_h210.png@200h_99q.webp',
                    type:'raffle'
                },{//9
                    url:'https://img3.tuhu.org/activity/image/FucDAl9cSVKHPDc8o9KJv8LEOHnl_w213_h210.png@200h_99q.webp',
                    type:'raffle'
                },{//10
                    url:'https://img3.tuhu.org/activity/image/FrEvvDZoUMz5yMA3XDPJ-Yij76-i_w213_h210.png@200h_99q.webp',
                    type:'raffle'
                }
            ]
        }
    }
    startRaffle(){
        this.state.raffleBox.map((item,index)=>{
            if(item.type=='raffle'){
                new Promise((resolve,reject)=>{
                    setTimeout(() => {
                        var raffleBox=this.state.raffleBox;
                        raffleBox[index].url='';
                        this.setState({
                            raffleBox
                        })
                        if(index==this.state.raffleBox.length-1){
                            resolve()
                        }
                    }, 150*index);
                }).then(()=>{
                    console.log('结束');
                    this.showraffleBox();
                },()=>{})
            }
        })
    }
    showraffleBox(){
        console.log('再开始吧')
        this.state.raffleBox.map((item,index)=>{
            new Promise((resolve)=>{
                setTimeout(() => {
                    var raffleBox=this.state.raffleBox;
                    raffleBox[index].url=require('@/assets/img/activity/fold.png');
                    this.setState({
                        raffleBox
                    })
                    if(index==this.state.raffleBox.length-1){
                        resolve()
                    }
                }, 150*index);
            }).then(()=>{
                console.log('可以开始点击了');
                this.setState({
                    raffleStatus:true
                })
            })
            
        })
    }
    choiceRallfe(index){
        if(this.state.raffleStatus){
            //通过http请求，获取抽奖结果
            var item=this.state.raffleBox;
            item[index].url='https://img3.tuhu.org/activity/image/FrEvvDZoUMz5yMA3XDPJ-Yij76-i_w213_h210.png@200h_99q.webp';
            this.setState({
                raffleBox:item,
                raffleStatus:false
            })
        }else{
            return false
        }
        
    }
    render(){
        return (
            <div className='home'>
                <div className='home-head'>
                    <img src={require('@/assets/img/activity/homeHead.png')}/>
                </div>
                <div className='home-body'>
                    <div className='home-body-main'>
                        <ul>
                            {
                                this.state.raffleBox.map((item,index)=>{
                                    if(item.type=='raffle'){
                                        if(index==4){
                                            return (
                                                <li key={index}>
                                                    <img src={this.state.raffleBox[10].url} alt=""/>
                                                </li>
                                            )
                                        }else if(index==6){
                                            return (
                                                <li key={index}>
                                                    <img src={this.state.raffleBox[4].url} alt=""/>
                                                </li>
                                            )
                                        }else if(index==7){
                                            return (
                                                <li key={index}>
                                                    <img src={this.state.raffleBox[9].url} alt=""/>
                                                </li>
                                            )
                                        }else if(index==8){
                                            return (
                                                <li key={index}>
                                                    <img src={this.state.raffleBox[8].url} alt=""/>
                                                </li>
                                            )
                                        }else if(index==9){
                                            return (
                                                <li key={index}>
                                                    <img src={this.state.raffleBox[7].url} alt=""/>
                                                </li>
                                            )
                                        }else if(index==10){
                                            return (
                                                <li key={index}>
                                                    <img src={this.state.raffleBox[6].url} alt=""/>
                                                </li>
                                            )
                                        }
                                        return (
                                            <li onClick={this.choiceRallfe.bind(this,index)} key={index}>
                                                <img src={item.url} alt=""/>
                                            </li>
                                        )
                                    }else{
                                        return (
                                            <li key={index} onClick={this.startRaffle.bind(this)} className='btn' style={{backgroundImage:`url(${require('@/assets/img/activity/btnBackground.png')})`}}>
                                                <span className='star'>开始</span>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                    <div className='home-body-winner' style={{backgroundImage:`url(${require('@/assets/img/activity/winnerBackground.png')})`}}>
                        <div className='home-body-winner-bg'  style={{backgroundImage:`url(${require('@/assets/img/activity/winnerMain.png')})`}}>
                        {/* <div className='home-body-winner-bg'> */}
                        <Carousel className="home-body-winner-bg-car"
                            vertical
                            dots={false}
                            dragging={false}
                            swiping={false}
                            autoplay
                            infinite
                        >
                            {
                                this.state.PackerInfo.map((item,index)=>{
                                    return (
                                        <div key={item.Name}>
                                            <div className='content'>
                                                <span>{item.Phone}</span>
                                                <span>抽中了</span>
                                                <span>{item.Name}</span>
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                        </div>
                    </div>
                </div>
                <div className='home-foot'>
                    <img src={require('@/assets/img/activity/activityDetail.jpeg')} />
                </div>
            </div>
        )
    }
}