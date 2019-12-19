import React from 'react';
import ctx,{Consumer} from '../../js/connectContext';
export default class Ctem extends React.Component {
    constructor(props){
        super(props);
        
    }
    render(){
        console.log('context:'+this.context);
        console.log(this.context)
        return(
            <div>
                <p>摄氏度：</p>
                <Consumer>
                    {({text,func})=><span onClick={func}>{text}</span>}
                </Consumer>
                <input value={this.props.tem} onChange={this.props.changeInput}></input>
            </div>
        )
    }
};
Ctem.contextType=ctx;