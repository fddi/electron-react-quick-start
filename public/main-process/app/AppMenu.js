const { BrowserWindow, Menu, app, clipboard, dialog } = require('electron')

let zoomFactor = 1.0

let contextTemplate = [
     {
          label: '刷新页面',
          accelerator: "F5",
          click: (item, focusedWindow) => {
               if (focusedWindow) {
                    // on reload, start fresh and close any old
                    // open secondary windows
                    if (focusedWindow.id === 1) {
                         BrowserWindow.getAllWindows().forEach(win => {
                              if (win.id > 1) win.close()
                         })
                    }
                    focusedWindow.reload()
               }
          }
     }, {
          label: '全屏切换',
          accelerator: (() => {
               if (process.platform === 'darwin') {
                    return 'Ctrl+Command+F'
               } else {
                    return 'F11'
               }
          })(),
          click: (item, focusedWindow) => {
               if (focusedWindow) {
                    focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
               }
          }
     }, {
          label: '放大',
          accelerator: "Ctrl+=",
          click: (item, focusedWindow) => {
               if (focusedWindow) {
                    zoomFactor += 0.1
                    focusedWindow.webContents.setZoomFactor(zoomFactor)
               }
          }
     }, {
          label: '缩小',
          accelerator: "Ctrl+-",
          click: (item, focusedWindow) => {
               if (focusedWindow) {
                    zoomFactor -= 0.1
                    focusedWindow.webContents.setZoomFactor(zoomFactor)
               }
          }
     }, {
          label: '重置缩放比例',
          accelerator: "Ctrl+0",
          click: (item, focusedWindow) => {
               if (focusedWindow) {
                    zoomFactor = 1
                    focusedWindow.webContents.setZoomFactor(zoomFactor)
               }
          }
     }, {
          type: 'separator'
     }, {
          label: '前进',
          accelerator: "Ctrl+Right",
          click: (item, focusedWindow) => {
               if (focusedWindow && focusedWindow.webContents.canGoForward()) {
                    focusedWindow.webContents.goForward()
               }
          }
     }, {
          label: '后退',
          accelerator: "Ctrl+Left",
          click: (item, focusedWindow) => {
               if (focusedWindow && focusedWindow.webContents.canGoBack()) {
                    focusedWindow.webContents.goBack()
               }
          }
     }, {
          label: '开发者工具',
          accelerator: "F12",
          click: (item, focusedWindow) => {
               if (focusedWindow) {
                    focusedWindow.toggleDevTools()
               }
          }
     }]
let template = [
     {
          label: '窗口',
          submenu: [
               {
                    label: '立即退出',
                    click: (item, focusedWindow) => {
                         if (focusedWindow) {
                              focusedWindow.close()
                         }
                    }
               }]
     },
     {
          label: '编辑',
          submenu: [{
               label: '撤销',
               accelerator: 'CmdOrCtrl+Z',
               role: 'undo'
          }, {
               label: '重做',
               accelerator: 'Shift+CmdOrCtrl+Z',
               role: 'redo'
          }, {
               type: 'separator'
          }, {
               label: '剪切',
               accelerator: 'CmdOrCtrl+X',
               role: 'cut'
          }, {
               type: 'separator'
          }, {
               label: '复制',
               accelerator: 'CmdOrCtrl+C',
               role: 'copy'
          }, {
               label: '粘贴',
               accelerator: 'CmdOrCtrl+V',
               role: 'paste'
          }, {
               label: '全选',
               accelerator: 'CmdOrCtrl+A',
               role: 'selectall'
          }]
     },
     {
          label: '查看',
          submenu: contextTemplate
     }, {
          label: '帮助',
          submenu: [{
               label: 'v1.0.0',
               enabled: false
          }, {
               type: 'separator'
          }, {
               label: '项目主页：https://gitee.com/fddi/electron-react-quick-start.git',
               click: (item, focusedWindow) => {
                    if (focusedWindow) {
                         const { shell } = require('electron')
                         shell.openExternal("https://gitee.com/fddi/electron-react-quick-start.git")
                    }
               }
          }]
     }
]

app.on('ready', () => {
     //添加系统菜单
     const menu = Menu.buildFromTemplate(template)
     Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', (event, win) => {
     //添加上下文菜单
     const contextMenu = Menu.buildFromTemplate(contextTemplate)
     win.webContents.on('context-menu', (e, params) => {
          contextMenu.popup(win, params.x, params.y)
     })
})