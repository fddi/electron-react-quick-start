"use client"
import React, { Fragment, useState, useEffect } from 'react';
import { Button, Input, Space } from 'antd';
import Env from '@/util/Env'
import { PreCode, code } from '@/config/preCode';

let envWeb = true
if (Env.isElectron()) {
    envWeb = false
}

export default function OpenDemo(props) {
    const [url, setUrl] = useState("https://www.bing.com");

    const onOpenNew = () => {
        window.electron.openWindow(url);
    }

    return (
        <Fragment>
            <p>主进程icp.js实现打开窗口方法，并监听消息：</p>
            <PreCode language='jsx' code={code.codeOpen} />
            <p>preload.js绑定方法：</p>
            <PreCode language='jsx' code={code.codeOpen1} />
            <p>渲染进程调用：</p>
            <PreCode language='jsx' code={code.codeOpen2} />
            <Space direction='horizontal'>
                <Input value={url} onChange={(e) => { setUrl(e.target.value) }} />
                <Button disabled={envWeb} type="primary" onClick={onOpenNew}>打开窗口测试！</Button>
            </Space>
        </Fragment>
    );
}