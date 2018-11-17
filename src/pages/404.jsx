import React, { Component } from 'react';
import { Icon } from 'antd';

export default class Redirect404 extends Component {
     constructor(props) {
          super(props);
     }

     componentWillReceiveProps(props) {
     }

     render() {
          return (
               <div style={{
                    paddingTop: 50, width: "100%", height: "100%",
                    backgroundColor: "#ececec", textAlign: "center"
               }}
               >
                    <Icon type="frown" theme="twoTone" style={{ fontSize: 180 }}
                         twoToneColor="#1DA57A" />
                    <h1 style={{color:"#1DA57A"}}>访问的网页不存在</h1>
               </div>
          );
     }
}
