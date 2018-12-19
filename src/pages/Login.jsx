import React, { Component } from 'react'
import {
  Redirect
} from 'react-router-dom'
import { Button, Row, Form, Input, Spin, Alert,message } from 'antd'
import '../styles/login.css'
import Common from '../constant/common'
import Api from '../constant/api'
import Fetch from '../utils/Fetch'

// const {Menu} = window.require('electron').remote
//Menu.setApplicationMenu(null)

const FormItem = Form.Item;
class Login extends Component {
  constructor(props) {
    super(props);
    let linkToIndex = false;
    this.state = {
      username: "",
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
            localStorage.setItem("username", tokenInfo.username);
            this.setState({ loading: false, linkToIndex: true });
          } else if (result) {
            this.setState({ loading: false, errorShow: true, errorMsg: result.resultMsg });
          } else {
            this.setState({ loading: false, errorShow: true, errorMsg: Common.message.errorNetwork });
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
      <div className="login-div">
        <div className="login-main">
          <div className="logo">
            <span>{Common.APPNMAE}</span>
          </div>
          <div className="form">
            <Spin spinning={this.state.loading} tip={Common.message.infoLoading}>
              <form onSubmit={(e) => { this.handleSubmit(e) }} style={{ padding: 36 }}>
                <FormItem hasFeedback>
                  {getFieldDecorator('username', {
                    initialValue: this.state.username,
                    rules: [
                      {
                        required: true,
                        pattern:/^[A-Za-z0-9]{4,16}/,
                        message: Common.message.alertRequireUsername
                      },
                    ],
                  })(<Input autoFocus size="large" placeholder="用户名" onPressEnter={this.handlePressEnter} />)}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: Common.message.alertRequirePwd
                      },
                    ]
                  })(<Input ref={(input) => { this.inputRef = input }} size="large" type="password" placeholder="密码" />)}
                </FormItem>
                {loginAlert}
                <Row>
                  <Button type="primary" size="large" htmlType="submit" style={{ width: "100%" }} >
                    登录
                  </Button>
                </Row>
              </form>
            </Spin>
          </div>
        </div>
      </div>
    );
  }
}

const LoginView = Form.create()(Login);
export default LoginView;
