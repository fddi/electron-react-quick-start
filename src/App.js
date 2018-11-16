import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import asyncComponent from "./utils/AsyncComponent";
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const Login = asyncComponent(() => import('./pages/Login'));
const MainTabPage = asyncComponent(() => import('./pages/MainTab'));

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/index" component={MainTabPage} />
          </Switch>
        </Router>
    );
  }
}

export default App;