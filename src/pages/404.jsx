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
               <Card
                    title="工作台"
               >
                    <p>Card content</p>
               </Card>
          );
     }
}
