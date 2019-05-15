import React, { Component } from 'react';
import { Card, Button, message } from 'antd';
import Env from '../utils/Env'
let remote = null
let isWeb = true
if (Env.isElectron()) {
     remote = window.require('electron').remote
     isWeb = false
}

export default class DllTest extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isWeb,
               loading: false
          }
     }

     componentWillReceiveProps(props) {
     }

     handleCallDll() {
          const callTestDll = remote.require("./main-process/modules/CallTestDll.js")
          const v = callTestDll.call(true)
          if (v) {
               const result = JSON.parse(v)
               message.info(result.resultMsg)
          }
     }

     handleCallDllAsync() {
          const callTestDll = remote.require("./main-process/modules/CallTestDll.js")
          callTestDll.call(false, (v) => {
               if (v) {
                    const result = JSON.parse(v)
                    message.info(result.resultMsg)
               }
          })

     }

     render() {
          return (
               <Card style={{ marginTop: 16 }} loading={this.state.loading}>
                    <pre style={{ background: "#ececec", padding: 5 }}>
                         1、安装.netframwork4.7。<br />
                         2、安装vs编译打包工具 $npm  --vs2015  install --global windows-build-tools<br />
                         3、设置镜像地址方便快速下载[node 环境变量]set ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/<br />
                         4、安装ffi-napi 使用$npm install ffi-napi --save <br />
                         5、重新编译$.\node_modules\.bin\electron-rebuild .\node_modules\ffi\ <br />
                    </pre>

                    <pre style={{ background: "#ececec", padding: 5 }}>
                         测试时 /publc/addon 下test-ai32.dll 需要nodejs为32位。 <br />
                    </pre>
                    <Button disabled={this.state.isWeb} type="primary" icon="thunderbolt" onClick={this.handleCallDll}>同步调用dll函数</Button>
                    <Button disabled={this.state.isWeb} type="primary" icon="thunderbolt" style={{ marginLeft: 5 }} onClick={this.handleCallDllAsync}>异步调用dll函数</Button>
               </Card>
          );
     }
}