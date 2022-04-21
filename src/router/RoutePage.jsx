import React from 'react';
import {
    Route, Routes
} from 'react-router-dom';
import LoadPage from '../util/LoadPage';

const ConfDemoPage = LoadPage(() => import('../page/ConfDemo'));
const DllDemoPage = LoadPage(() => import('../page/DllDemo'));
const OpenDemoPage = LoadPage(() => import('../page/OpenDemo'));

export default function RoutePage(props) {
    return (
        <Routes>
            <Route path="conf-demo" element={<ConfDemoPage />} />
            <Route path={`dll-demo`} element={<DllDemoPage />} />
            <Route path={`open-demo`} element={<OpenDemoPage />} />
        </Routes>
    );
}