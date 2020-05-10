import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
import { Layout, Spin, Tabs, } from 'antd';
import Loadable from 'react-loadable'
import Constant from '../common/Constant'
import StringUtils from '../utils/StringTool'
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
const authInfo = Api.getAuthInfo();

export default class MainTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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
        sessionStorage.clear();
    }

    onCollapse(collapsed) {
        this.setState({
            collapsed: collapsed,
            // mode: collapsed ? 'vertical' : 'inline',
        });
    }

    getMenus() {
        this.setState({ loading: true });
        Fetch.post(Api.getApi().menuTree, { token: authInfo.token, }, (result) => {
            if (result && 200 === result.resultCode) {
                const menuTops = result.resultData.children;
                let menuTree = [];
                if (!StringUtils.isEmpty(menuTops) && menuTops.length > 0) {
                    menuTree = menuTops[0].children;
                }
                this.setState({ menuTops: menuTops, menuTree: menuTree });
            }
            this.setState({ loading: false });
        });
    }

    handleMenuClick(e) {
        const menus = this.state.menuTops;
        let menuTree = this.state.menuTree;
        if (e.key.indexOf("menu-top-") >= 0) {
            for (let i = 0; i < menus.length; i++) {
                if (e.key === "menu-top-" + menus[i].key) {
                    menuTree = menus[i].children;
                    this.setState({ menuTree: menuTree });
                    break;
                }
            }
        }
        this.addTabPage(e.item.props.menu);
    }

    addTabPage(menu) {
        const pages = this.state.pages;
        let geted = false;
        if (StringUtils.isEmpty(menu) || StringUtils.isEmpty(menu.value)) {
            return
        }
        for (var i = 0; i < pages.length; i++) {
            if (menu.key === pages[i].key) {
                geted = true;
                break;
            }
        }
        if (geted) {
            this.setState({ activeKey: "tab-main-" + menu.key });
            return;
        }
        pages.push(menu);
        this.setState({ pages, activeKey: "tab-main-" + menu.key });
    }

    renderTabPanes(pages) {
        let items = [];
        pages.forEach(item => {
            let TabPage = item.routeCom
            if (!TabPage) {
                TabPage = this.findRoute(item)
            }
            const pane = (<TabPane tab={(<span style={{ userSelect: 'none', }}>{item.title}</span>)}
                key={"tab-main-" + item.key} closable={true} >
                <TabPage addTabPage={this.addTabPage.bind(this)} item={item} />
            </TabPane>);
            items.push(pane);
        });
        return items;
    }

    findRoute(menu) {
        let LoadableComponent = (null)
        let component = null
        if (!StringUtils.isEmpty(menu)) {
            for (let index = 0; index < Routes.routes.length; index++) {
                const route = Routes.routes[index]
                if (route.path === menu.value) {
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

    onTabEdit = (targetKey, action) => {
        if (action !== "remove") {
            return;
        }
        const pages = this.state.pages;
        let newPages = [];
        let preIndex = 0;
        pages.forEach((item, index) => {
            if (targetKey == ("tab-main-" + item.key)) {
                preIndex = index - 1;
            }
            else {
                newPages.push(item);
            }
        });
        const preActiveKey = preIndex > 0 ? `tab-main-${pages[preIndex].key}` : "tab-main-default";
        let activeKey = this.state.activeKey === targetKey ? preActiveKey : this.state.activeKey
        this.setState({ pages: newPages, activeKey })
    }

    render() {
        return (<Spin wrapperClassName="main-spin" spinning={this.state.loading}>
            <Layout>
                <Sider
                    className="main-sider"
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse.bind(this)}
                    id="menu_sider"
                >
                    <div className="logo">
                        <img alt={'logo'} src={logo} />
                        <h1>
                            {Constant.APPNMAE}
                        </h1>
                    </div>
                    <MenuTree menuClick={this.handleMenuClick.bind(this)} mode={this.state.mode}
                        menus={this.state.menuTree} collapsed={this.state.collapsed} />
                </Sider>
                <Layout>
                    <Header className="header">
                        <MainHeader nickName={authInfo.nickName}
                            menus={this.state.menuTops} menuClick={this.handleMenuClick.bind(this)} />
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
                            <TabPane tab={(<span style={{ userSelect: 'none', }}>工作台</span>)}
                                key="tab-main-default" closable={false} >
                                <Workbench addTabPage={this.addTabPage.bind(this)} />
                            </TabPane>
                            {this.renderTabPanes(this.state.pages)}
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        </Spin>)
    }
}