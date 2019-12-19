import React from 'react';
const formHoc=(Input)=>class HocInput extends React.Component{
        constructor(props){
            super(props);
            this.state={
                style:{
                    color:'blue'
                }
            }
        }
        render(){
            return (<Input {...this.props} {...this.state.style}></Input>)
        }
}
export default formHoc;