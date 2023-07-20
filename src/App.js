import React from 'react';
import {
  HashRouter,
  Route,
  Routes
} from 'react-router-dom';
import LoadPage from "./util/LoadPage";
import { createHashHistory } from 'history';
import './style/main.css';

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