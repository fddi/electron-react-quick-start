import React from 'react';
import {
  HashRouter,
  Route,
  Routes
} from 'react-router-dom';
import LoadPage from "./util/LoadPage";
import moment from 'moment';
import { createHashHistory } from 'history';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.variable.min.css';
import './style/main.css';

moment.locale('zh-cn');
const MainPage = LoadPage(() => import('./page/Main'));
const Page = LoadPage(() => import('./page/Page'));

export default function App(props) {
  return (
    <HashRouter history={createHashHistory}>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/p/*" element={<Page />} />
      </Routes>
    </HashRouter>
  );
}