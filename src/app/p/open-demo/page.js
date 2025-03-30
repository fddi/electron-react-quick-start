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
            <p>打开窗口：</p>
            <PreCode language='javascript' code={code.codeOpen} />
            <Space direction='horizontal'>
                <Input value={url} onChange={(e) => { setUrl(e.target.value) }} />
                <Button disabled={envWeb} type="primary" onClick={onOpenNew}>打开窗口测试！</Button>
            </Space>
        </Fragment>
    );
}