import React from 'react';
import { BrowserRouter as Router, Route, Link,NavLink,Switch,Redirect } from "react-router-dom";

import Index from '../App';
// import SubPage from '../page/subPage';

import Nav from '../components/common/nav';
import ActivityHome from '../page/activity/home';
// import Base from '../page/base';
// import Htem from '../components/calc/Htem';
// import ReduxComponent from '../page/redux';
// import PublicNum from '../components/common/publicNum';
import Shop from '../page/shop';
// function ckEnter(nextState,replace){
//     // if(nextState.location.pathname=='/'){
//         // replace({pathname:'/index'})
//     // }
//     console.log('000')
// }
export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <div>
                    <Nav></Nav>
                    <Route exact path='/' component={Index} onEnter={()=>{console.log('22')}}></Route>
                    <Switch>
                        {/* <Route path="/index" component={Index}></Route> */}
                        <Route exact path='/shop' component={Shop}></Route>
                        <Route exact path='/activity/home' component={ActivityHome}></Route>
                        {/* <PrivateRoute exact path="/subpage" component={SubPage}></PrivateRoute>
                        <PrivateRoute exact path="/subpage/detail" component={Htem}></PrivateRoute> */}
                    </Switch>
                </div>
            </Router>
        )
    }
}
class PrivateRoute extends React.Component {
    render() {
        let { location, ...other } = this.props;
        let component = true ?
            <Route {...other} /> :
            <Redirect
                to={{
                    pathname: "/index"
                }}
            />

        return component;
    }
}