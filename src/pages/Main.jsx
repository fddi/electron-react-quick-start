import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
import { Layout, Spin, Tabs } from 'antd';
import Loadable from 'react-loadable'
import Constant from '../common/Constant'
import StringTool from '../utils/StringTool'
import Fetch from '../utils/Fetch'
import Api from '../common/Api'
import MenuTree from '../components/MenuTree'
import MainHeader from '../components/MainHeader'
import Workbench from './Workbench'
import Hold from './Hold'
import Page404 from './404'
import Routes from '../routes/RouteIndex'
import logo from '../assets/electron256.png'
import '../styles/main.css'
import Env from '../utils/Env'
if (Env.isElectron()) {
    const electron = window.require('electron');
    const win = electron.remote.getCurrentWindow();
    win.maximize()
}
const TabPane = Tabs.TabPane;
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
            let TabPage = item.routeCom
            if (!TabPage) {
                TabPage = this.findRoute(item)
            }
            const pane = (<TabPane tab={item.menuName} key={"tab-main-" + item.menuId} closable={true} >
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
        menu.routeCom = LoadableComponent;
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
        let activeKey = this.state.activeKey == targetKey ? "tab-main-default" : this.state.activeKey
        this.setState({ pages: newPages, activeKey })
    }

    render() {
        if (this.state.linkToLogin) {
            return (<Redirect to="/login" />);
        }
        return (<Spin wrapperClassName="main-spin" spinning={this.state.loading} tip={Constant.message.pageLoading}>
            <Layout>
                <Sider
                    className="main-sider"
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={(collapsed) => { this.onCollapse(collapsed) }}
                    id="menu_sider"
                >
                    <div className="logo">
                        <img alt={'logo'} src={logo} />
                        <h1>
                            {Constant.APPNMAE}
                        </h1>
                    </div>
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
                            <TabPane tab="工作台" key="tab-main-default" closable={false} >
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