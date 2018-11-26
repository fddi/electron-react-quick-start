import React, { Component } from 'react';
import {
     Link
} from 'react-router-dom';
import { Menu, Icon, message, Modal, Progress } from 'antd';
import "../styles/main.css";
import Common from '../constant/common'
const { SubMenu } = Menu;
const { ipcRenderer } = window.require('electron')

class HeaderView extends Component {
     constructor(props) {
          super(props);
          this.state = {
               userName: "",
               menus: [],
               selectedKeys: [],
               downLoadStatus: false,
               visible: false,
               percent: 1000
          };
     }

     componentDidMount() {
          ipcRenderer.on('topic-update-step', (event, msgCode) => {
               switch (msgCode) {
                    case 502:
                         message.destroy()
                         message.error(Common.message.updateError)
                         this.setState({ downLoadStatus: false, visible: false })
                         break
                    case 0:
                         message.destroy()
                         message.info(Common.message.updateIsNew)
                         break
                    case 1:
                         message.destroy()
                         this.setState({ downLoadStatus: true, visible: true })
               }
          })
          ipcRenderer.on('topic-update-loading',(event, progressObj) => {
               if(this.state.downLoadStatus){
                    this.setState({percent:progressObj.percent})
               }
          })
     }

     componentWillUnmount(){
          ipcRenderer.removeAllListeners("topic-update-message")
          ipcRenderer.removeAllListeners("topic-update-loading")
     }

     componentWillReceiveProps(props) {
          if (this.state.menus.length <= 0 && props.menus.length > 0) {
               let selectedKeys = []
               selectedKeys = [props.menus[0].menuId + ""]
               this.setState({ menus: props.menus, userName: props.userName, selectedKeys });
          }
     }

     checkUpdate() {
          if (this.state.downLoadStatus) {
               this.setState({ visible: true })
          } else {
               message.loading(Common.message.updateCheck, 0)
               ipcRenderer.send('topic-update-check')
          }
     }

     onMenuClick(e) {
          switch (parseInt(e.key)) {
               case 102:
                    this.props.linkToLogin();
                    break;
               default:
                    this.checkUpdate()
                    return;
          }
     }

     handleCancel() {
          this.setState({ visible: false })
     }

     buildItems(menus) {
          const items = [];
          if (menus == null || menus.length == 0) {
               return items;
          }
          for (var i = 0; i < menus.length; i++) {
               items.push(this.getItem(menus[i]));
          }
          return items;
     }

     getItem(menu) {
          return (<Menu.Item key={menu.menuId}><a onClick={() => { this.props.handleTabPage(menu) }}>
               {menu.menuName}</a></Menu.Item>);
     }

     render() {
          return (
               <div>
                    <Menu
                         key="menu-header-1"
                         theme="dark"
                         mode="horizontal"
                         style={{ float: "left", lineHeight: '64px', minWidth: 300 }}
                         onClick={(e) => { this.props.handleMenuTop(e) }}
                         selectedKeys={this.state.selectedKeys}
                         onSelect={(e) => { console.log(e); this.setState({ selectedKeys: e.selectedKeys }) }}
                    >
                         {this.buildItems(this.state.menus)}
                    </Menu>
                    <Menu
                         key="menu-header-2"
                         theme="dark"
                         mode="horizontal"
                         style={{ float: 'right', lineHeight: '64px', marginRight: 10 }}
                         onClick={(e) => { this.onMenuClick(e) }}
                         selectable={false}
                    >
                         <SubMenu key="header-sm-1" title={<span><Icon type="user" />{this.state.userName}</span>}>
                              <Menu.Item key="101"><Icon type="logout" />系统更新</Menu.Item>
                              <Menu.Item key="102"><Icon type="logout" />退出登录</Menu.Item>
                         </SubMenu>
                    </Menu>
                    <Modal
                         visible={this.state.visible}
                         onCancel={this.handleCancel.bind(this)}
                         footer={null}
                         maskClosable={false}
                         bodyStyle={{ padding: 15 }}
                    >
                         <p>新版本下载中...</p>
                         <Progress percent={this.state.percent} status="active" />
                    </Modal>
               </div>
          );
     }
}

export default HeaderView;