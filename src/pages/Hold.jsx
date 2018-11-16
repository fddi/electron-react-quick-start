import React, { Component } from 'react'
import { Spin } from 'antd'
import Common from '../constant/common'

export default class Workbench extends Component {
     constructor(props) {
          super(props);
          this.state = {
               spinning: true
          }
     }

     render() {
          return (
               <Spin spinning={this.state.spinning} size="large"
                    tip={Common.message.pageLoading} 
                    style={{ marginTop:80,width:"100%",height: "60%" }} />
          );
     }
}