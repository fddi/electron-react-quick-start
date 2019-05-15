import React, { Component } from 'react'
import {
  Redirect
} from 'react-router-dom'
import { Button, Row, Col, Form, Input, Spin, Alert, Checkbox } from 'antd'
import '../styles/login.css'
import Constant from '../common/Constant'
import StringTool from '../utils/StringTool'
import Api from '../common/Api'
import Fetch from '../utils/Fetch'
const backgroundImage = require('../assets/sea.jpg')

const FormItem = Form.Item;
class Login extends Component {
  constructor(props) {
    super(props);
    let linkToIndex = false
    let rememberUser = true
    let userName = localStorage.getItem("userName")
    if (StringTool.isEmpty(userName)) {
      userName = ""
      rememberUser = false
    }
    this.state = {
      userName,
      rememberUser,
      loading: false,
      errorMsg: "",
      errorShow: false,
      linkToIndex: linkToIndex
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true, errorShow: false });
        Fetch.post(Api.getApi().login, values, (result) => {
          if (result && "200" == result.resultCode) {
            let tokenInfo = result.resultData;
            sessionStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
            if (this.state.rememberUser) {
              localStorage.setItem("userName", tokenInfo.userName);
            } else {
              localStorage.removeItem("userName")
            }
            this.setState({ loading: false, linkToIndex: true });
          } else if (result) {
            this.setState({ loading: false, errorShow: true, errorMsg: result.resultMsg });
          } else {
            this.setState({ loading: false, errorShow: true, errorMsg: Constant.message.errorNetwork });
          }
        });
      }
    });
  }

  handlePressEnter = (e) => {
    e.preventDefault()
    const { input } = this.inputRef;
    input.focus();
    input.select();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const loginAlert = this.state.errorShow ? (<Alert banner message={this.state.errorMsg} type="error" showIcon />) : (<div />);
    if (this.state.linkToIndex) {
      return (<Redirect to="/index" />);
    }
    return (
      <div style={{ height: '100vh', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundSize: 'cover',
          backgroundImage: `url(${backgroundImage})`
        }}>
          <Row className="content-wrapper">
            <Col xs={0} sm={12}>
              <h2 className="slogan">
                欢迎使用<br />{Constant.APPNMAE}
              </h2>
            </Col>
            <Col className="form" span="12">
              <Spin spinning={this.state.loading} tip={Constant.message.infoLoading}>
                <form onSubmit={(e) => { this.handleSubmit(e) }} style={{ padding: 30 }}>
                  <div className="logo">
                    <span>{Constant.APPNMAE}</span>
                  </div>
                  <FormItem hasFeedback>
                    {getFieldDecorator('userName', {
                      initialValue: this.state.userName,
                      rules: [
                        {
                          required: true,
                          pattern: /^[A-Za-z0-9]{4,16}/,
                          message: Constant.message.alertRequireUsername
                        },
                      ],
                    })(<Input autoFocus size="large" placeholder="用户名:test" onPressEnter={this.handlePressEnter} />)}
                  </FormItem>
                  <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: Constant.message.alertRequirePwd
                        },
                      ]
                    })(<Input ref={(input) => { this.inputRef = input }} size="large" type="password" placeholder="密码:1" />)}
                  </FormItem>
                  <Row style={{ padding: 10 }}>
                    <Checkbox checked={this.state.rememberUser}
                      onChange={(e) => { this.setState({ rememberUser: e.target.checked }) }}>记住账号</Checkbox>
                  </Row>
                  {loginAlert}
                  <Row>
                    <Button type="primary" shape="round" size="large" htmlType="submit" style={{ width: "100%" }} >
                      登录
                  </Button>
                  </Row>
                  <Row style={{ padding: 10, color: "#888" }}>
                    <a href="/" style={{ color: "#888" }}>
                      立即注册
                  </a>
                    <span style={{ marginLeft: 3, marginRight: 3 }}>|</span>
                    <a href="/" style={{ color: "#888" }}>
                      忘记密码
                  </a>
                  </Row>
                </form>
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const LoginView = Form.create()(Login);
export default LoginView;
