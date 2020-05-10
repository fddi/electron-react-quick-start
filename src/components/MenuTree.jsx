import React, { Component } from 'react';
import { Menu, } from 'antd';
import StringUtils from '../utils/StringTool';
const SubMenu = Menu.SubMenu;

export default class MenuTree extends Component {

     constructor(props) {
          super(props);
          this.state = {
               defaultOpenKeys: [],
          }
     }

     componentDidMount() {
     }

     getItems(menus) {
          const items = [];
          for (var i = 0; menus != null && i < menus.length; i++) {
               items.push(this.getNode(menus[i]));
          }
          return items;
     }

     getNode(menu) {
          if (menu.type == "5") {
               return;
          }
          let menuTree = menu.children;
          if (StringUtils.isEmpty(menuTree) || menuTree.length === 0) {
               return (<Menu.Item key={"menu-tree-" + menu.key} menu={menu}>
                    <span className="nav-text">{menu.title}</span>
               </Menu.Item>);
          }
          return (<SubMenu key={"menu-tree-" + menu.key}
               title={<span>
                    <span className="nav-text">{menu.title}</span></span>}>
               {this.getItems(menuTree)}
          </SubMenu>
          );
     }

     render() {
          return (
               <Menu
                    theme="dark"
                    mode={this.props.mode}
                    onClick={this.props.menuClick}
               >
                    {this.getItems(this.props.menus)}
               </Menu>
          );
     }
}