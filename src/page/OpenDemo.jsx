import React, { Fragment, useState, useEffect } from 'react';
import { Button, Input, Space } from 'antd';
import Env from '../util/Env'
import Prism from 'prismjs';
let envWeb = true
if (Env.isElectron()) {
    envWeb = false
}

export default function OpenDemo(props) {
    const [url, setUrl] = useState("https://www.bing.com");

    useEffect(() => {
        Prism.highlightAll()
    }, [])

    const onOpenNew = () => {
        window.electron.openWindow(url);
    }

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
                <Input value={url} onChange={(e) => { setUrl(e.target.value) }} />
                <Button disabled={envWeb} type="primary" onClick={onOpenNew}>打开窗口测试！</Button>
            </Space>
        </Fragment>
    );
}