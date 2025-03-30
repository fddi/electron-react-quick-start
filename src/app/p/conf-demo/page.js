"use client"

import React, { Fragment, useState } from 'react';
import { Button, App, Input, Space } from 'antd';
import Env from '@/util/Env'
import { PreCode, code } from '@/config/preCode';
let isWeb = true
if (Env.isElectron()) {
    isWeb = false
}

export default function ConfDemo(props) {
    const [key, setKey] = useState('param-one')
    const { message, } = App.useApp();

    const handleGetAppConfig = () => {
        if (key == null) {
            message.warn("请输入key");
            return;
        }
        window.electron.getAppConfig(key).then((result) => {
            message.info(`配置项${key} 值 :${result}`);
        }).catch((err) => {
            message.error(err)
        });;
    }

    return (
        <Fragment>
            <p>读取项目根目录下config.json配置信息：</p>
            <PreCode language='javascript' code={code.codeGetConfig} />
            <p>修改根目录文件config.json里的键值，读取测试</p>
            <Space direction='horizontal'>
                <Input placeholder='输入配置key' value={key} onChange={(e) => { setKey(e.target.value) }} />
                <Button disabled={!Env.isElectron()} type="primary" onClick={handleGetAppConfig}>读取测试！</Button>
            </Space>
        </Fragment>
    );
}