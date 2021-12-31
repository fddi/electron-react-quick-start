import React, { Component, Fragment } from 'react';
import { Card, Button, Breadcrumb, Input, Space, Layout } from 'antd';
import Env from '../utils/Env'
import { Link } from 'react-router-dom';
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
            url: "https://www.bing.com",
            loading: false
        }
    }

    componentDidMount() {
        Prism.highlightAll()
    }

    onOpenNew = () => {
        const { url } = this.state;
        window.electron.openWindow(url);
    }

    render() {
        const { url } = this.state;
        return (
            <Fragment>
                <p>主进程icp.js实现打开窗口方法，并监听消息：</p>
                <pre className="line-numbers">
                    <code className="language-javascript">
                        {`const openWindow = (url) => {
    let win = new BrowserWindow({
        width: 1000, height: 800, webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.on('closed', () => {
        win = null
    })
    win.loadURL(url)
    win.setMenu(null)
}
ipcMain.handle('load-url', async (event, ...args) => {
    openWindow(args[0]);
    return true;
})`}
                    </code>
                </pre>
                <p>preload.js绑定方法：</p>
                <pre className="line-numbers">
                    <code className="language-javascript">
                        {`openWindow: (url) => ipcRenderer.invoke("load-url", url)`}
                    </code>
                </pre>
                <p>渲染进程调用：</p>
                <pre className="line-numbers">
                    <code className="language-javascript">
                        {`window.electron.openWindow(url);`}
                    </code>
                </pre>
                <Space direction='horizontal'>
                    <Input value={url} onChange={(e) => { this.setState({ url: e.target.value }) }} />
                    <Button disabled={this.state.isWeb} type="primary" onClick={this.onOpenNew}>打开窗口测试！</Button>
                </Space>
            </Fragment>
        );
    }
}