import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import asyncComponent from "./utils/async-component";
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const login = asyncComponent(() => import('./pages/login'));
const mainTabPage = asyncComponent(() => import('./pages/main-tab'));

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={login} />
            <Route path="/login" component={login} />
            <Route path="/index" component={mainTabPage} />
          </Switch>
        </Router>
    );
  }
}

export default App;