"use client"

import React, { Fragment, useState } from 'react';
import { Button, message, Input, Space } from 'antd';
import Env from '@/util/Env'
import { PreCode, code } from '@/config/preCode';
let isWeb = true
if (Env.isElectron()) {
    isWeb = false
}

export default function ConfDemo(props) {
    const [key, setKey] = useState('param-one')

    const handleGetAppConfig = () => {
        if (key == null) {
            message.warn("请输入key");
            return;
        }
        const param = window.electron.getAppConfig(key);
        message.info(`配置项${key} 值 :${param}`);
    }

    return (
        <Fragment>
            <p>读取项目根目录下config.json配置信息：</p>
            <p>在preload.js绑定方法：</p>
            <PreCode language='jsx' code={code.codeGetConfig} />
            <p>渲染进程调用：</p>
            <PreCode language='jsx' code={code.codeGetConfig1} />
            <p>修改根目录文件config.json里的键值，读取测试</p>
            <Space direction='horizontal'>
                <Input placeholder='输入配置key' value={key} onChange={(e) => { setKey(e.target.value) }} />
                <Button disabled={!Env.isElectron()} type="primary" onClick={handleGetAppConfig}>读取测试！</Button>
            </Space>
        </Fragment>
    );
}