import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Routes
} from 'react-router-dom';
import asyncComponent from "./utils/AsyncComponent";
import moment from 'moment';
import { createHashHistory } from 'history';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.variable.min.css';
import './styles/main.css';

moment.locale('zh-cn');
const MainPage = asyncComponent(() => import('./pages/Main'));
const Page = asyncComponent(() => import('./pages/Page'));

class App extends Component {
  render() {
    return (
      <HashRouter history={createHashHistory}>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/p/*" element={<Page />} />
        </Routes>
      </HashRouter>
    );
  }
}

export default App;