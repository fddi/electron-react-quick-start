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

moment.locale('zh-cn');
const Login = asyncComponent(() => import('./pages/Login'));
const MainTabPage = asyncComponent(() => import('./pages/MainTab'));
class App extends Component {
  render() {
    return (
        <HashRouter history={createHashHistory}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/index" component={MainTabPage} />
          </Switch>
        </HashRouter>
    );
  }
}

export default App;