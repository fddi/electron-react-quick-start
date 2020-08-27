import React, { Component } from 'react';
import { Card, Button, message, Breadcrumb } from 'antd';
import Env from '../utils/Env'
import { Link } from 'react-router-dom';
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
          const {remote,ipcRenderer} = window.require('electron');
          const callTestDll = remote.require("./main-process/modules/CallTestDll.js")
          callTestDll.call()
          ipcRenderer.once('dll-test', (e, args) => {
               console.log(e)
               if (args) {
                    message.info(args)
               }
          })
     }

     render() {
          return (
               <Card bordered={false} loading={this.state.loading}>
                    <Breadcrumb style={{ margin: 15, }}>
                         <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                         <Breadcrumb.Item>dll</Breadcrumb.Item>
                    </Breadcrumb>
                    <pre style={{ background: "#ececec", padding: 5 }}>
                         1、安装vs编译打包工具 $npm  --vs2015  install --global windows-build-tools<br />
                         2、设置镜像地址方便快速下载
                              [node 环境变量]set ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/<br />
                         3、安装ffi-napi 使用$npm install ffi-napi --save <br />
                         4、重新编译$.\node_modules\.bin\electron-rebuild .\node_modules\ffi\ <br />
                    </pre>
                    <pre style={{ background: "#ececec", padding: 5 }}>
                         测试使用/publc/addon下test-ai32.dll,调用弹出窗口；本机编译环境需要nodejs为32位。 <br />
                    </pre>
                    <Button disabled={this.state.isWeb} type="primary" onClick={this.handleCallDll}>异步调用DLL函数</Button>
               </Card>
          );
     }
}