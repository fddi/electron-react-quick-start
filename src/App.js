import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';
import asyncComponent from "./utils/AsyncComponent";
import moment from 'moment';
import { createHashHistory } from 'history';
import 'moment/locale/zh-cn';
import './styles/app.less';
import './styles/main.css';

moment.locale('zh-cn');
const MainPage = asyncComponent(() => import('./pages/Main'));
const MainTabPage = asyncComponent(() => import('./pages/MainTab'));
const Dll = asyncComponent(() => import('./pages/DllTest'));
const Activex = asyncComponent(() => import('./pages/ActivexTest'));
class App extends Component {
  render() {
    return (
        <HashRouter history={createHashHistory}>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/index" component={MainTabPage} />
            <Route path="/dll" component={Dll} />
            <Route path="/activex" component={Activex} />
          </Switch>
        </HashRouter>
    );
  }
}

export default App;