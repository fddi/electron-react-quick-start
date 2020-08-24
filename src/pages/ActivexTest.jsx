import React, { Component } from 'react';
import { Card, Button, message, Input } from 'antd';
import Env from '../utils/Env'
let remote = null
let isWeb = true
if (Env.isElectron()) {
     remote = window.require('electron').remote
     isWeb = false
}

export default class ActivexTest extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isWeb,
               v: "c:/test.txt",
          }
     }

     componentWillReceiveProps(props) {
     }

     handleCall = () => {
          const { v } = this.state;
          const callTestActivex = remote.require("./main-process/modules/CallTestActivex.js")
          if (callTestActivex.call(v)) {
               message.info("创建成功");
          } else {
               message.error("创建失败，检查路径是否存在");
          }
     }

     render() {
          const { v } = this.state;
          return (
               <Card style={{ marginTop: 16 }} >
                    <pre style={{ background: "#ececec", padding: 5 }}>
                         1、安装node-activex: npm install winax --msvs_version=2015 --save<br />
                         2、V8版本进行重建: npm rebuild winax --runtime=electron --target=9.2.1 --disturl=https://atom.io/download/atom-shell --build-from-source<br /><br />
                    </pre>
                    <pre style={{ background: "#ececec", padding: 5 }}>
                         测试: 调用Scripting.FileSystemObject 在所填目录下创建文件 <br />
                    </pre>
                    <label>目录及文件名称：<Input value={v} onChange={(e) => { this.setState({ v: e.target.value }) }} /></label>
                    <Button disabled={this.state.isWeb} type="primary" onClick={this.handleCall}>创建</Button>
               </Card>
          );
     }
}