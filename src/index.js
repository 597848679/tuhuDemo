import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/router'; //路由配置
import * as serviceWorker from './serviceWorker';
import { Provider} from 'react-redux';
import store from './redux/index';
import "@/assets/js/flexble.js";
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less';

ReactDOM.render(<Provider store={store}><AppRouter /></Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
