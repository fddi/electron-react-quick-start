import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
let menus = [];

export default class MenuTree extends Component {
     constructor(props) {
          super(props);
          const keys = [];
          menus = props.menus;
          menus.map((item, index) => {
               keys.push(item.menuId + "");
          });
          const openKeys = props.collapsed ? [] : keys;
          this.state = {
               openKeys: openKeys,
          }
     }

     componentWillReceiveProps(props) {
          const keys = [];
          if (props.menus == null) {
               return;
          }
          props.menus.map((item, index) => {
               keys.push(item.menuId + "");
          });
          if (props.collapsed) {
               this.setState({ openKeys: [] });
          } else {
               if (props.menus.length > 0 && (menus.length == 0 || menus[0].menuId != props.menus[0].menuId)) {
                    menus = props.menus;
                    this.setState({ openKeys: keys });
               }
          }
     }

     getItems(menus) {
          const items = [];
          for (var i = 0; menus != null && i < menus.length; i++) {
               items.push(this.getNode(menus[i]));
          }
          return items;
     }

     getNode(menu) {
          let menuTree = menu.children;
          if (menuTree == null || menuTree.length == 0) {
               return (<Menu.Item key={menu.menuId}>
                    <a onClick={() => { this.props.handleTabPage(menu) }}><Icon type={menu.icon} />
                         <span className="nav-text">{menu.menuName}</span></a>
               </Menu.Item>);
          }
          return (<SubMenu key={menu.menuId}
               title={<span><Icon type={menu.icon} />
                    <span className="nav-text">{menu.menuName}</span></span>}>
               {this.getItems(menuTree)}
          </SubMenu>
          );
     }

     render() {
          return (
               <Menu
                    theme="dark"
                    mode={this.props.mode}
                    openKeys={this.state.openKeys}
                    onOpenChange={(openKeys) => { this.setState({ openKeys }) }}
               >
                    {this.getItems(this.props.menus)}
               </Menu>
          );
     }
}