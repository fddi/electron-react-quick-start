import React, { Component } from 'react';
import { Card } from 'antd';

export default class Redirect404 extends Component {
     constructor(props) {
          super(props);
     }

     componentWillReceiveProps(props) {
     }

     render() {
          return (
               <Card style={{width:500,height:200}}
                    title="错误"
               >
                    <p>Card content</p>
               </Card>
          );
     }
}
