import React, { Component } from 'react';
import { Card } from 'antd';
let PageConent = null;
export default class TabPage extends Component {
     constructor(props) {
          super(props);
          this.state = {
               menu: {}
          }
          if (PageConent == null) {
               PageConent = require("../pages/404")
          }
     }

     componentWillReceiveProps(props) {
          console.log("22222222222222222222222222222222222222222")
          if (props.menu != null && JSON.stringify(props.menu) != JSON.stringify(this.state.menu)) {
               this.setState({ menu: props.menu })
               try {
                    PageConent = require("../pages/" + props.menu.pageId)
               } catch (error) {
                    PageConent = require("../pages/404")
               }
          }
     }

     render() {
          console.log(this.props.menu)
          console.log(PageConent)
          return (
               <PageConent handleTabPage={this.props.handleTabPage} menu={this.props.menu} />
          );
     }
}
