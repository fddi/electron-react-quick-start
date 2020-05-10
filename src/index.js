import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ConfigProvider  locale={zhCN}><App /></ConfigProvider >,
    document.getElementById('root'));
registerServiceWorker();