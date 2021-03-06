import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import logoReact from '../assets/react.svg'
import logoElectron from '../assets/electron256.png'
import LogoAnt from '../assets/antdesign.svg'
import Env from '../utils/Env';
const colStyle = {
     borderRadius: "4px",
     textAlign: "center"
}

const logoStyle = {
     textAlign: "center",
     height: 150,
     width: 150
}

export default class Workbench extends Component {
     constructor(props) {
          super(props);
     }

     componentWillReceiveProps(props) {
     }

     handleCardClick(url) {
          if (Env.isElectron()) {
               const { shell } = window.require('electron')
               shell.openExternal(url)
          }
     }

     render() {
          return (
               <Row style={{ margin: "30px 15px" }} gutter={15}>
                    <Col style={{ ...colStyle,}}
                         xs={{ span: 8 }}>
                         <Card
                              style={{ height: 280 }}
                              hoverable
                              onClick={(e) => { this.handleCardClick("https://reactjs.org/docs/getting-started.html") }}
                         >
                              <img src={logoReact} style={logoStyle} alt="logo" />
                              <Card.Meta
                                   title="React 文档"
                                   description="https://reactjs.org/docs/getting-started.html"
                              />
                         </Card>
                    </Col>
                    <Col style={{ ...colStyle, }}
                         xs={{ span: 8 }}>
                         <Card
                              style={{ height: 280 }}
                              hoverable
                              onClick={(e) => { this.handleCardClick("https://electronjs.org/docs") }}
                         >
                              <img src={logoElectron} style={logoStyle} alt="logo" />
                              <Card.Meta
                                   title="Electron 文档"
                                   description="https://electronjs.org/docs"
                              />
                         </Card>
                    </Col>
                    <Col style={{ ...colStyle,}}
                         xs={{ span: 8, }}>
                         <Card
                              style={{ height: 280 }}
                              hoverable
                              onClick={(e) => { this.handleCardClick("https://ant.design/docs/react/introduce-cn") }}
                         >
                              <img src={LogoAnt} style={logoStyle} alt="logo" />
                              <Card.Meta
                                   title="Ant-Design 文档"
                                   description="https://ant.design/docs/react/introduce-cn"
                              />
                         </Card>
                    </Col>
               </Row>
          );
     }
}
