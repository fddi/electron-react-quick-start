/* 
*  静态路由配置表/index 路由下子路由
*  component相对于src/pages目录
*/
export default {
    routes: [
        { path: '/index/workbench', component: 'Workbench' },
        { path: '/index/404', component: '404' },
        { path: '/index/hold', component: 'Hold' },
        { path: '/index/dll', component: "DllTest" },
        { path: '/index/activex', component: "ActivexTest" },
    ]
}