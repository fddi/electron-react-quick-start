import React, { Component, Fragment } from 'react';
import { Button, message, Input, Space } from 'antd';
import Env from '../utils/Env'
import Prism from 'prismjs';
let isWeb = true
if (Env.isElectron()) {
    isWeb = false
}

export default class ConfDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWeb,
            loading: false
        }
    }

    componentDidMount() {
        Prism.highlightAll()
    }

    handleGetAppConfig = () => {
        const { key } = this.state;
        if (key == null) {
            message.warn("请输入key");
            return;
        }
        const param = window.electron.getAppConfig(key);
        message.info(`配置项${key} 值 :${param}`);
    }

    render() {
        const { key } = this.state;
        return (
            <Fragment>
                <p>读取项目根目录下config.json配置信息：</p>
                <p>在preload.js绑定方法：</p>
                <pre className="line-numbers">
                    <code className="language-javascript">
                        {`getAppConfig: (key) => {
    const configPath = path.resolve('config.json');
    const config = require('nconf').file(configPath);
    return config.get(key);
}`}
                    </code>
                </pre>
                <p>渲染进程调用：</p>
                <pre className="line-numbers">
                    <code className="language-javascript">
                        {` window.electron.getAppConfig("param-one"); `}
                    </code>
                </pre>
                <p>修改根目录文件config.json里的键值，读取测试</p>
                <Space direction='horizontal'>
                    <Input placeholder='输入配置key' value={key} onChange={(e) => { this.setState({ key: e.target.value }) }} />
                    <Button disabled={this.state.isWeb} type="primary" onClick={this.handleGetAppConfig}>读取测试！</Button>
                </Space>
            </Fragment>
        );
    }
}