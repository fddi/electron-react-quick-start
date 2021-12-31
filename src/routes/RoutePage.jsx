import React, { Component } from 'react';
import {
    Route, Routes
} from 'react-router-dom';
import asyncComponent from "../utils/AsyncComponent";

const ConfDemoPage = asyncComponent(() => import('../pages/ConfDemo'));
const DllDemoPage = asyncComponent(() => import('../pages/DllDemo'));
const OpenDemoPage = asyncComponent(() => import('../pages/OpenDemo'));

class RoutePage extends Component {
    render() {
        return (
            <Routes>
                <Route path="conf-demo" element={<ConfDemoPage />} />
                <Route path={`dll-demo`} element={<DllDemoPage />} />
                <Route path={`open-demo`} element={<OpenDemoPage />} />
            </Routes>
        );
    }
}

export default RoutePage;