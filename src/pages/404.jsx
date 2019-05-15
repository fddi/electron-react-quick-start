import React, { Component } from 'react';
import { Layout } from 'antd'
import Icon404 from '../assets/404.svg'
import Constant from '../common/Constant'

export default class Redirect404 extends Component {
     constructor(props) {
          super(props);
     }

     componentWillReceiveProps(props) {
     }

     render() {
          return (
                    <div style={{ paddingTop: 100, textAlign: "center", height: "100%" }}>
                         <img alt="" src={Icon404} />
                         <br />
                         <br />
                         <p style={{ fontSize: 20, fontWeight: "bold" }}>{Constant.message.loadFail}</p>
                    </div>
          );
     }
}
