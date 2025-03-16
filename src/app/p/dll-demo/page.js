"use client"
import React, { Fragment, useState, useEffect } from 'react';
import { Button, message, InputNumber, Modal } from 'antd';
import Env from '@/util/Env'
import { PreCode, code } from '@/config/preCode';
let isWeb = true
if (Env.isElectron()) {
    isWeb = false
}

export default function DllDemo(props) {
    const [a, setA] = useState();
    const [b, setB] = useState();

    const handleCalculate = () => {
        if (a == null || b == null) {
            return message.warning('请输入值');
        }
        const sum = window.electron.callTestDll(a, b);
        Modal.success({ content: `由DLL函数计算： ${a} + ${b} = ${sum}` });
    }
    return (
        <Fragment>
            <p>测试的dll-demo.dll实现了sum()方法。主进程call-dll.js调用核心实现：</p>
            <PreCode language='jsx' code={code.codeDll} />
            <p>preload.js绑定方法：</p>
            <PreCode language='jsx' code={code.codeDll1} />
            <p>渲染进程调用：</p>
            <PreCode language='jsx' code={code.codeDll2} />
            <InputNumber min={1} max={10000} value={a} onChange={(v) => { setA(v) }} /> <span> + </span>
            <InputNumber min={1} max={10000} value={b} onChange={(v) => { setB(v) }} />
            <Button disabled={!Env.isElectron()} type="primary" onClick={handleCalculate}>调用计算！</Button>
        </Fragment>
    );
}