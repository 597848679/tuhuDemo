import React from 'react';
import hComponent from '../common/high/highComponent';
// class FancyButton extends React.Component{
//     render(){
//         return (
//             <input/>
//         )
//     }
// }
// export default hComponent(FancyButton);
const FancyButton=React.forwardRef((props,ref)=>{
    return <div style={{border:'1px solid red',padding:'20px'}}><input ref={ref} /></div>
})
export default FancyButton;