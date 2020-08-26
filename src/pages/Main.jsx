import React, { Component } from 'react'
import { Spin, Layout, Card, Button, } from 'antd'
import { LinkOutlined, HomeOutlined, WindowsOutlined, AppstoreOutlined, IeOutlined } from '@ant-design/icons';
import '../styles/main.css'
import { Link } from 'react-router-dom';
import Env from '../utils/Env'

export default class Main extends Component {
     constructor(props) {
          super(props)
          this.state = {
               loading: false
          }
     }

     onJump = () => {
          if (Env.isElectron()) {
               const electron = window.require('electron');
               const win = electron.remote.getCurrentWindow();
               win.loadURL("https://www.electronjs.org/");
          }
     }

     onOpenNew = () => {
          if (Env.isElectron()) {
               try {
                    const { BrowserWindow } = window.require('electron').remote
                    let win = new BrowserWindow({
                         width: 1000, height: 800, webPreferences: {
                              webSecurity: false
                         }
                    })
                    win.on('closed', () => {
                         win = null
                    })
                    win.loadURL("https://www.electronjs.org/")
                    win.setMenu(null)
               } catch (error) {
                    console.log(error);
               }
          }
     }
     render() {
          return (
               <Layout className="layout-main" >
                    <Spin spinning={this.state.loading}>
                         <Layout.Content className="tool-content">
                              <p style={{ color: '#fff' }}></p>
                              <br />
                              <Card className="grid-card">
                                   <Card.Grid className="grid-item">
                                        <Link to="/index" className="grid-link">
                                             <HomeOutlined className="grid-icon" />
                                             <p>管理界面示例</p></Link>
                                   </Card.Grid>
                                   <Card.Grid className="grid-item">
                                        <Link to="/dll" className="grid-link">
                                             <AppstoreOutlined className="grid-icon" />
                                             <p>调用动态库DLL示例</p></Link>
                                   </Card.Grid>
                                   <Card.Grid className="grid-item">
                                        <Link to="/activex" className="grid-link">
                                             <IeOutlined className="grid-icon" />
                                             <p>调用Activex控件示例</p></Link>
                                   </Card.Grid>
                                   <Card.Grid className="grid-item">
                                        <Button type="link" onClick={this.onJump}>
                                             <LinkOutlined className="grid-icon" />
                                             <p style={{ color: "#000" }}>当前窗口跳转</p></Button>
                                   </Card.Grid>
                                   <Card.Grid className="grid-item">
                                        <Button type="link" onClick={this.onOpenNew} >
                                             <WindowsOutlined className="grid-icon" />
                                             <p style={{ color: "#000" }}>打开新窗口</p></Button>
                                   </Card.Grid>
                              </Card>
                         </Layout.Content>
                    </Spin>
               </Layout>
          )
     }
}