import React, { Component, Fragment } from 'react';
import { Button, message, InputNumber, Modal } from 'antd';
import Env from '../utils/Env'
import Prism from 'prismjs';
let isWeb = true
if (Env.isElectron()) {
    isWeb = false
}

export default class DllDemo extends Component {
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

    handleCalculate = () => {
        const { a, b } = this.state;
        if (a == null || b == null) {
            return message.warn('请输入值');
        }
        const sum = window.electron.callTestDll(a, b);
        Modal.success({ content: `由DLL函数计算： ${a} + ${b} = ${sum}` });
    }

    render() {
        const { a, b } = this.state;
        return (
            <Fragment>
                <p>测试的dll-demo.dll实现了sum()方法。首先在主进程call-dll.js实现：</p>
                <pre className="line-numbers">
                    <code className="language-javascript">
                        {`function callTestDll(a, b) {
    const logger = require('./logger.js')
    const ffi = require('ffi-napi')
    const path = require('path')
    //加载dll文件
    const ioPath = path.resolve('addon/dll-test.dll')
    const dllTest = ffi.Library(ioPath, {
            'sum': ['int', ['int', 'int']]
    })
    //调用dll方法
    const sum = dllTest.sum(a, b);
    logger.info("dll-test.dll sum() result" + sum);
    console.log("dll-test.dll sum() result" + sum);
}`}
                    </code>
                </pre>
                <p>preload.js绑定方法：</p>
                <pre className="line-numbers">
                    <code className="language-javascript">
                        {`callTestDll: (a, b) => {
    const callDll = require("./main-process/modules/call-dll.js")
    callDll.callTestDll(a, b)
}
`}
                    </code>
                </pre>
                <p>渲染进程调用：</p>
                <pre className="line-numbers">
                    <code className="language-javascript">
                        {`  window.electron.callTestDll(a, b);
`}
                    </code>
                </pre>
                <InputNumber min={1} max={10000} value={a} onChange={(v) => { this.setState({ a: v }) }} /> <span> + </span>
                <InputNumber min={1} max={10000} value={b} onChange={(v) => { this.setState({ b: v }) }} />
                <Button disabled={this.state.isWeb} type="primary" onClick={this.handleCalculate}>调用计算！</Button>
            </Fragment>
        );
    }
}