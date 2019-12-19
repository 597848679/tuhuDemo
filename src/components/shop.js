import React from 'react';
import {Component} from 'react';
export default class Shop extends Component{
    constructor(props){
        super(props);
        this.state={
            arr:[
                {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
                {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
                {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
                {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
                {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
                {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
            ],
            keyword:''
        };
        this.searchGoods=this.searchGoods.bind(this);
    }
    searchGoods(e){
        this.setState({
            keyword:e.target.value
        })
    }
    render(){
        return(
            <div>
                <input value={this.state.keyword} onChange={this.searchGoods}></input>
                <p>name-price</p>
                <div>
                    <h3>Sporting Goods</h3>
                    {this.state.arr.map((ele,index)=>{
                        if(ele.category=='Sporting Goods'){
                            // return <p>{ele.name+'---'+ele.price}</p>
                            if(ele.name.indexOf(this.state.keyword)!=-1){
                                return <p key={index}>{ele.name+'---'+ele.price}</p>
                            }
                        }
                    })}
                </div>
                <div>
                <h3>Electronics Goods</h3>
                {this.state.arr.map((ele,index)=>{
                    if(ele.category=='Electronics'){
                        if(ele.name.indexOf(this.state.keyword)!=-1){
                            return <p key={index}>{ele.name+'---'+ele.price}</p>
                        }
                    }
                })}
                </div>
            </div>
        )
    }
}