import React, { Component } from 'react';
import { Row,Col } from 'antd';
const colStyle={
     height:200,
     borderRadius: "4px",
     textAlign: "center"

}
export default class Workbench extends Component {
     constructor(props) {
          super(props);
     }

     componentWillReceiveProps(props) {
     }

     render() {
          return (
               <Row style={{margin:"30px 15px"}}>
                    <Col style={{...colStyle,background:"#33CCCC"}} xs={{ span: 5, offset: 0 }} lg={{ span: 7, offset: 0 }}></Col>
                    <Col style={{...colStyle,background:"#1DA57A"}} xs={{ span: 8, offset: 1 }} lg={{ span: 7, offset: 1 }}></Col>
                    <Col style={{...colStyle,background:"#993300"}} xs={{ span: 8, offset: 1 }} lg={{ span: 7, offset: 1 }}></Col>
               </Row>
          );
     }
}
