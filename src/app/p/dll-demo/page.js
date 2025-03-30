"use client"
import React, { Fragment, useState, useEffect } from 'react';
import { Button, App, InputNumber } from 'antd';
import Env from '@/util/Env'
import { PreCode, code } from '@/config/preCode';
let isWeb = true
if (Env.isElectron()) {
    isWeb = false
}

export default function DllDemo(props) {
    const [a, setA] = useState();
    const [b, setB] = useState();
    const { message, modal } = App.useApp();

    const handleCalculate = () => {
        if (a == null || b == null) {
            return message.warning('请输入值');
        }
        window.electron.callTestDll(a, b).then((result) => {
            modal.success({ content: `由DLL函数计算： ${a} + ${b} = ${result}` });
        }).catch((err) => {
            message.error(error)
        });
    }
    return (
        <Fragment>
            <p>测试的dll-demo.dll实现了sum()方法。主进程call-dll.js调用核心实现：</p>
            <PreCode language='javascript' code={code.codeDll} />
            <InputNumber min={1} max={10000} value={a} onChange={(v) => { setA(v) }} /> <span> + </span>
            <InputNumber min={1} max={10000} value={b} onChange={(v) => { setB(v) }} />
            <Button disabled={!Env.isElectron()} type="primary" onClick={handleCalculate}>调用计算！</Button>
        </Fragment>
    );
}