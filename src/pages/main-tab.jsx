import React, { Component } from 'react';
import {
    Redirect, Link
} from 'react-router-dom';
import { Layout, Spin, Tabs } from 'antd';
import Common from '../constant/common'
import StringTool from '../utils/string-tool'
import Fetch from '../utils/fetch'
import Api from '../constant/api'
import "../styles/main.css"
import MenuTree from '../components/menu-tree'
import MainHeader from '../components/main-header'
import TabPage from '../components/tab-page'

const TabPane = Tabs.TabPane;
const electron = window.require('electron');
const win = electron.remote.getCurrentWindow();
const { Header, Content, Sider } = Layout
let menus = []
let menuTops = []
export default class MainTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            tokenInfo: Api.getAuthInfo(),
            linkToLogin: StringTool.isEmpty(sessionStorage.getItem("tokenInfo")),
            collapsed: false,
            mode: 'inline',
            menuTops: [],
            menuTree: [],
            activeKey: "",
            pages: []
        };
        win.maximize()
    }

    componentDidMount() {
        this.getMenus();
    }

    componentWillUnmount() {
        menus = [];
        menuTops = [];
    }

    onCollapse(collapsed) {
        this.setState({
            collapsed: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }

    getMenus() {
        this.setState({ loading: true });
        Fetch.post(Api.getApi().menuTree, { token: this.state.tokenInfo.token, menuType: "menu" }, (result) => {
            if (result && "200" == result.resultCode) {
                menus = result.resultData.children;
                let menuTree = [];
                menus.map((item, index) => {
                    let menu = {
                        menuId: item.menuId,
                        menuName: item.menuName,
                        menuCode: item.menuCode,
                        icon: item.icon,
                    };
                    menuTops.push(menu);
                    if (index == 0) {
                        menuTree = item.children;
                    }
                });
                this.setState({ menuTops: menuTops, menuTree: menuTree });
            }
            this.setState({ loading: false });
        });
    }

    handleMenuTop(e) {
        let menuTree = [];
        for (var i = 0; i < menus.length; i++) {
            if (e.menuId == menus[i].menuId) {
                menuTree = menus[i].children;
                break;
            }
        }
        this.setState({ menuTree: menuTree });
    }

    handleLink() {
        this.setState({
            linkToLogin: true,
        });
    }

    renderTabPanes(pages) {
        let items = [];
        pages.map((item, index) => {
            let list = [];
            const pane = (<TabPane tab={item.menuName} key={"main-tab-" + item.pageId} closable={true}>
                <TabPage handleTabPage={this.handleTabPage.bind(this)} menu={item} />
            </TabPane>);
            items.push(pane);
        });
        return items;
    }

    handleTabPage(menu) {
        const pages = this.state.pages;
        let geted = false;
        for (var i = 0; i < pages.length; i++) {
            if (JSON.stringify(menu) === JSON.stringify(pages[i])) {
                geted = true;
                break;
            }
        }
        if (geted) {
            this.setState({ activeKey: "main-tab-" + menu.pageId });
            return;
        }
        pages.push(menu);
        this.setState({ pages, activeKey: "main-tab-" + menu.pageId });
    }

    render() {
        if (this.state.linkToLogin) {
            return (<Redirect to="/login" />);
        }
        return (<Spin wrapperClassName="main-spin" spinning={this.state.loading} tip={Common.message.pageLoading}>
            <Layout>
                <Sider
                    className="main-sider"
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={(collapsed) => { this.onCollapse(collapsed) }}
                    id="menu_sider"
                >
                    <Link to="/index/console">
                        <div className="logo">
                            <h1>
                                {Common.APPNMAE}
                            </h1>
                        </div>
                    </Link>
                    <MenuTree handleTabPage={this.handleTabPage.bind(this)} mode={this.state.mode}
                        menus={this.state.menuTree} collapsed={this.state.collapsed} />
                </Sider>
                <Layout>
                    <Header className="header">
                        <MainHeader userName={this.state.tokenInfo.userName} linkToLogin={this.handleLink.bind(this)}
                            menus={this.state.menuTops} handleMenuTop={this.handleMenuTop.bind(this)}
                            handleTabPage={this.handleTabPage.bind(this)} />
                    </Header>
                    <Content className="content">
                        <Tabs
                            hideAdd
                            type="editable-card"
                            onChange={(activeKey) => { this.setState({ activeKey }) }}
                            onEdit={this.onTabEdit}
                            activeKey={this.state.activeKey}
                            tabBarStyle={{margin:0}}
                        >
                            {this.renderTabPanes(this.state.pages)}
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        </Spin>)
    }
}