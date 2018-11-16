import React, { Component } from 'react';
import {
    Redirect, Link
} from 'react-router-dom';
import { Layout, Spin, Tabs } from 'antd';
import Loadable from 'react-loadable'
import Common from '../constant/common'
import StringTool from '../utils/StringTool'
import Fetch from '../utils/Fetch'
import Api from '../constant/api'
import "../styles/main.css"
import MenuTree from '../components/MenuTree'
import MainHeader from '../components/MainHeader'
import Workbench from './Workbench'
import Hold from '../pages/Hold'
import Page404 from '../pages/404'
import Routes from '../constant/routes'

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
            activeKey: "tab-main-default",
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
            if (e.key == menus[i].menuId) {
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
            const TabPage = this.findRoute(item)
            const pane = (<TabPane tab={item.menuName} key={"tab-main-" + item.menuId} closable={true}
                style={{ height: "100%", overflow: "auto" }}>
                <TabPage handleTabPage={this.handleTabPage.bind(this)} />
            </TabPane>);
            items.push(pane);
        });
        return items;
    }

    findRoute(menu) {
        let LoadableComponent = (null)
        let component = null
        if (!StringTool.isEmpty(menu)) {
            for (let index = 0; index < Routes.routes.length; index++) {
                const route = Routes.routes[index]
                if (route.path === menu.pageId) {
                    component = route.component
                    break
                }
            }
        }
        if (component == null) {
            LoadableComponent = Page404
        }
        LoadableComponent = Loadable({
            loader: () => import(`../pages/${component}`),
            loading: Hold
        })
        return LoadableComponent
    }

    handleTabPage(menu) {
        const pages = this.state.pages;
        let geted = false;
        if (StringTool.isEmpty(menu) || StringTool.isEmpty(menu.pageId)) {
            this.setState({ activeKey: "tab-main-default" })
            return
        }
        for (var i = 0; i < pages.length; i++) {
            if (JSON.stringify(menu) === JSON.stringify(pages[i])) {
                geted = true;
                break;
            }
        }
        if (geted) {
            this.setState({ activeKey: "tab-main-" + menu.menuId });
            return;
        }
        pages.push(menu);
        this.setState({ pages, activeKey: "tab-main-" + menu.menuId });
    }

    onTabEdit = (targetKey, action) => {
        if (action !== "remove") {
            return;
        }
        const pages = this.state.pages;
        let newPages = [];
        pages.map((item, index) => {
            if (targetKey != ("tab-main-" + item.menuId)) {
                newPages.push(item);
            }
        });
        this.setState({ pages: newPages, activeKey: "tab-main-default" });
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
                            tabBarStyle={{ margin: 0 }}
                            className="tabs-page"
                        >
                            <TabPane tab="工作台" key="tab-main-default" closable={false} style={{ height: "100%", overflow: "auto" }}>
                                <Workbench handleTabPage={this.handleTabPage.bind(this)} />
                            </TabPane>
                            {this.renderTabPanes(this.state.pages)}
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        </Spin>)
    }
}