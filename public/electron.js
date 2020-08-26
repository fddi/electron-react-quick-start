const { app, BrowserWindow, dialog } = require('electron')
const isDev = require('electron-is-dev')
const glob = require('glob')
const path = require('path')
const logger = require('./main-process/modules/logger.js')
const configPath = path.resolve('config.json')
const nconf = require('nconf').file(configPath)
global.appConfig = nconf

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    backgroundColor: '#2e2c29',
    webPreferences: {
      nodeIntegration: true
    }
  })

  const localFile = `file://${path.join(__dirname, '/index.html')}`
  logger.info(localFile)
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : localFile,
  )
  // 打开开发者工具
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

//拆分 用require 导入。
function loadApp() {
  const files = glob.sync(path.join(__dirname, 'main-process/app/**/*.js'))
  files.forEach((file) => { require(file) })
}

loadApp()
