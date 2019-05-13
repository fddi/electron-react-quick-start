import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LocaleProvider locale={zhCN}><App /></LocaleProvider>,
    document.getElementById('root'));
registerServiceWorker();