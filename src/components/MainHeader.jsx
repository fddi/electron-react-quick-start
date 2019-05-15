import React, { Component } from 'react';
import { Menu, Icon, message, Modal, Progress, Badge, Popover } from 'antd';
import Constant from '../common/Constant'
import Env from '../utils/Env'
const { SubMenu } = Menu
let ipcRenderer = null
if (Env.isElectron()) {
     ipcRenderer = window.require('electron').ipcRenderer
}

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
          if (Env.isElectron()) {
               ipcRenderer.on('topic-update-step', (event, msgCode) => {
                    switch (msgCode) {
                         case 502:
                              message.destroy()
                              message.error(Constant.message.updateError)
                              this.setState({ downLoadStatus: false, visible: false })
                              break
                         case 0:
                              message.destroy()
                              message.info(Constant.message.updateIsNew)
                              break
                         case 1:
                              message.destroy()
                              this.setState({ downLoadStatus: true, visible: true })
                    }
               })
               ipcRenderer.on('topic-update-loading', (event, progressObj) => {
                    if (this.state.downLoadStatus) {
                         this.setState({ percent: progressObj.percent })
                    }
               })
          }
     }

     componentWillUnmount() {
          if (Env.isElectron()) {
               ipcRenderer.removeAllListeners("topic-update-step")
               ipcRenderer.removeAllListeners("topic-update-loading")
          }
     }

     componentWillReceiveProps(props) {
          if (this.state.menus.length <= 0 && props.menus.length > 0) {
               let selectedKeys = []
               selectedKeys = [props.menus[0].menuId + ""]
               this.setState({ menus: props.menus, userName: props.userName, selectedKeys });
          }
     }

     checkUpdate() {
          if (!Env.isElectron()) {
               message.info("无须更新")
               return
          }
          if (this.state.downLoadStatus) {
               this.setState({ visible: true })
          } else {
               message.loading(Constant.message.updateCheck, 0)
               ipcRenderer.send('topic-update-check')
          }
     }

     handleMenuClick(e) {
          switch (parseInt(e.key)) {
               case 101:
                    this.checkUpdate()
                    this.setState({ selectedKeys: [] })
                    break;
               case 102:
                    this.props.linkToLogin();
                    this.setState({ selectedKeys: [] })
                    break;
               case 103:
                    break;
               default:
                    this.props.handleMenuTop(e)
                    break;
          }
     }

     handleMenuSelect(e) {
          switch (parseInt(e.key)) {
               case 101:
                    this.setState({ selectedKeys: [] })
                    break;
               case 102:
                    this.setState({ selectedKeys: [] })
                    break;
               case 103:
                    this.setState({ selectedKeys: [] })
                    break;
               default:
                    this.setState({ selectedKeys: e.selectedKeys })
                    break;
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
          const text = <span>消息(3)</span>
          const content = (<div><p>消息内容</p></div>)
          return (
               <div>
                    <Menu
                         key="menu-header-1"
                         theme="light"
                         mode="horizontal"
                         style={{ lineHeight: '65px' }}
                         onClick={(e) => { this.handleMenuClick(e) }}
                         selectedKeys={this.state.selectedKeys}
                         onSelect={(e) => { this.handleMenuSelect(e) }}
                    >
                         {this.buildItems(this.state.menus)}
                         <SubMenu key="header-sm-1" style={{ float: 'right' }}
                              title={<span><Icon type="user" />{this.state.userName}</span>}>
                              <Menu.Item key="101"><Icon type="cloud-download" />系统更新</Menu.Item>
                              <Menu.Item key="102"><Icon type="poweroff" />退出登录</Menu.Item>
                         </SubMenu>
                         <Menu.Item style={{ float: 'right' }} key="103">
                              <Popover placement="bottom" title={text} content={content} trigger="click">
                                   <Badge count={9}>
                                        <Icon type="message" />
                                   </Badge>
                              </Popover>
                         </Menu.Item>
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