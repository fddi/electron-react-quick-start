import React, { Component } from 'react'
import { ConfigProvider, Spin, Layout, Card, Row } from 'antd'
import { HomeOutlined, WindowsOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logoReact from '../assets/react.svg'
import logoElectron from '../assets/electron256.png'
import LogoAnt from '../assets/antdesign.svg'
import { CirclePicker } from 'react-color';
const logoStyle = {
     textAlign: "center",
     height: 80,
     width: 80
}
const antdUrl = "https://ant-design.gitee.io/index-cn";
const electronUrl = "https://electronjs.org";
const reactUrl = "https://reactjs.org";
export default class Main extends Component {
     constructor(props) {
          super(props)
          const primaryColor = localStorage.getItem("primaryColor") || "#3f51b5";
          this.state = {
               loading: false,
               primaryColor
          }
     }

     componentDidMount() {
          const { primaryColor } = this.state;
          primaryColor && ConfigProvider.config({
               theme: {
                    primaryColor
               },
          });
     }

     onChangeComplete = (color, event) => {
          this.setState({ primaryColor: color.hex });
          ConfigProvider.config({
               theme: {
                    primaryColor: color.hex
               },
          });
          localStorage.setItem("primaryColor", color.hex);
     }

     onOpenNew = (url) => {
          window.electron.openWindow(url);
     }

     render() {
          return (
               <Layout className="layout-main" >
                    <Spin spinning={this.state.loading}>
                         <Layout.Content className="tool-content">
                              <Row justify="center" style={{ padding: 8 }}>
                                   <CirclePicker width={80} colors={["#3f51b5", "#2196f3", "#fa541c"]}
                                        onChangeComplete={this.onChangeComplete} circleSize={15} circleSpacing={8} />
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
                                   <Card.Grid className="grid-item" onClick={() => this.onOpenNew(reactUrl)}>
                                        <img src={logoReact} style={logoStyle} alt="logo" />
                                        <Card.Meta
                                             title="React 文档"
                                             description={reactUrl}
                                        />
                                   </Card.Grid>
                                   <Card.Grid className="grid-item" onClick={() => this.onOpenNew(electronUrl)}>
                                        <img src={logoElectron} style={logoStyle} alt="logo" />
                                        <Card.Meta
                                             title="Electron 文档"
                                             description={electronUrl}
                                        />
                                   </Card.Grid>
                                   <Card.Grid className="grid-item" onClick={() => this.onOpenNew(antdUrl)}>
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
          )
     }
}