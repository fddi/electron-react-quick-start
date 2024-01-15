import React, { useState, useEffect } from 'react'
import { ConfigProvider, Spin, Layout, Card, Row, Button, theme } from 'antd'
import { HomeOutlined, WindowsOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Env from '../util/Env'
import logoReact from '../asset/react.svg'
import logoElectron from '../asset/electron256.png'
import LogoAnt from '../asset/antdesign.svg'
import { CirclePicker } from 'react-color';
const logoStyle = {
     textAlign: "center",
     height: 80,
     width: 80
}
const antdUrl = "https://ant-design.gitee.io/index-cn";
const electronUrl = "https://www.electronjs.org";
const reactUrl = "https://reactjs.org";
export default function Main(props) {
     const defaultType = localStorage.getItem("themeType") || "0";
     const [loading, setLoading] = useState(false)
     const [themeType, setThemeType] = useState(defaultType)

     const onChangeComplete = (color, event) => {
          if (color.hex == '#000000') {
               setThemeType('1')
               localStorage.setItem("themeType", "1");
          } else {
               setThemeType('0')
               localStorage.setItem("themeType", "0");
          }
     }

     const onOpenNew = (url) => {
          if (Env.isElectron()) {
               window.electron.openWindow(url);
          } else {
               window.open(url)
          }
     }

     return (
          <ConfigProvider
               theme={{
                    algorithm: themeType == '1' ? theme.darkAlgorithm : theme.defaultAlgorithm,
               }}
          >
               <Layout className="layout-main" >
                    <Spin spinning={loading}>
                         <Layout.Content className="tool-content">
                              <Row justify="center" style={{ padding: 8 }}>
                                   <CirclePicker width={80} colors={["#ffffff", "#000000"]}
                                        onChangeComplete={onChangeComplete} circleSize={15} circleSpacing={8} />
                              </Row>
                              <Card className="grid-card">
                                   <Card.Grid className="grid-item">
                                        <Link to={
                                             {
                                                  pathname: "/p/conf-demo",
                                                  state: { title: '读取本地配置文件' },
                                             }
                                        } className="grid-link">
                                             <HomeOutlined className="grid-icon" />
                                             <p>读取本地配置文件</p></Link>
                                   </Card.Grid>
                                   <Card.Grid className="grid-item">
                                        <Link to="/p/dll-demo" className="grid-link">
                                             <AppstoreOutlined className="grid-icon" />
                                             <p>调用DLL动态库</p></Link>
                                   </Card.Grid>
                                   <Card.Grid className="grid-item">
                                        <Link to="/p/open-demo" className="grid-link">
                                             <WindowsOutlined className="grid-icon" />
                                             <p>打开新窗口</p></Link>
                                   </Card.Grid>
                                   <Card.Grid className="grid-item" onClick={() => onOpenNew(reactUrl)}>
                                        <img src={logoReact} style={logoStyle} alt="logo" />
                                        <Card.Meta
                                             title="React 文档"
                                             description={reactUrl}
                                        />
                                   </Card.Grid>
                                   <Card.Grid className="grid-item" onClick={() => onOpenNew(electronUrl)}>
                                        <img src={logoElectron} style={logoStyle} alt="logo" />
                                        <Card.Meta
                                             title="Electron 文档"
                                             description={electronUrl}
                                        />
                                   </Card.Grid>
                                   <Card.Grid className="grid-item" onClick={() => onOpenNew(antdUrl)}>
                                        <img src={LogoAnt} style={logoStyle} alt="logo" />
                                        <Card.Meta
                                             title="Ant-Design 文档"
                                             description={antdUrl}
                                        />
                                   </Card.Grid>
                              </Card>
                         </Layout.Content>
                    </Spin>
               </Layout>
          </ConfigProvider>
     )
}