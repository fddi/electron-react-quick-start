import React, { Component } from 'react';
import { Card, Button } from 'antd';

export default class Workbench extends Component {
     constructor(props) {
          super(props);
          this.state={
               loading:false
          }
     }

     componentWillReceiveProps(props) {
     }

     render() {
          return (
               <Card style={{ marginTop: 16 }} loading={this.state.loading}>
               <pre style={{background:"#ececec",padding:5}}>
                    1、安装.netframwork4.5及以上版本。<br/>
                    2、安装vs编译打包工具 $npm install --global windows-build-tools<br/>
                    3、设置镜像地址方便快速下载[node 环境变量]set ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/<br/>
                    4、安装ffi 使用$npm install https://github.com/node-ffi/node-ffi.git --save <br/>
                    5、有些时候需要手工安装node-gyp  $npm install -g node-gyp<br/>
                    6、重新编译$.\node_modules\.bin\electron-rebuild .\node_modules\ffi\ <br/>
               </pre>

               <pre style={{background:"#ececec",padding:5}}>
                   /publc/addon 下test-ai32.dll 需要nodejs为32位。 <br/>
               </pre>
               <Button type="primary" icon="thunderbolt" size="large">调用dll函数</Button>
               </Card>
          );
     }
}