import React, { Component } from 'react';
import {
     Link
} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import "../styles/main.css";
const { SubMenu } = Menu;

class HeaderView extends Component {
     constructor(props) {
          super(props);
          this.state = {
               userName: "",
               menus: [],
               selectedKeys: []
          };
     }

     componentWillReceiveProps(props) {
          if (this.state.menus.length <= 0 && props.menus.length > 0) {
               let selectedKeys = []
               selectedKeys = [props.menus[0].menuId + ""]
               this.setState({ menus: props.menus, userName: props.userName, selectedKeys });
          }
     }

     onMenuClick(e) {
          switch (parseInt(e.key)) {
               case 102:
                    this.props.linkToLogin();
                    break;
               default:
                    return;
          }
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
                         style={{ float: "left", lineHeight: '64px',minWidth:300 }}
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
                    >
                         <SubMenu key="header-sm-1" title={<span><Icon type="user" />{this.state.userName}</span>}>
                              <Menu.Item key="101"><Icon type="logout" />系统更新</Menu.Item>
                              <Menu.Item key="102"><Icon type="logout" />退出登录</Menu.Item>
                         </SubMenu>
                    </Menu>
               </div>
          );
     }
}

export default HeaderView;