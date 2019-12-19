import React from 'react';
import formHoc from "../calc/FormInput";
import ctx,{Consumer} from '../../js/connectContext';
class Input extends React.Component {
    constructor(props){
        super(props);
    };
    componentDidMount(){
        console.log(this.context)
    }
    render() { 
        return ( 
            <div key={'666'}>
                {/* <Consumer> */}
                <h1>牛逼的高阶组件：!{this.context.text}</h1>
                {/* {({text,func})=>(<h1>牛逼的高阶组件+context：{text}</h1>)} */}
                {/* </Consumer> */}
                <button onClick={this.context.changeTheme}>{this.context.theme}</button>
                <input type='text' style={{'color':this.context.theme}}/>
            </div>
         );
    }
}
Input.contextType=ctx;//设置this.context
export default formHoc(Input);