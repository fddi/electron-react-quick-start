// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const glob = require('glob')
const path = require('path')
const logger = require('./main-process/modules/logger.js')
const configPath = path.resolve('config.json')
const nconf = require('nconf').file(configPath)
global.appConfig = nconf

// 加载ppeper插件
// app.commandLine.appendSwitch('allow-all-activex')
// app.commandLine.appendSwitch('enable-npapi')
// const emrPath = path.resolve('addon/TestPpapi.dll')
// app.commandLine.appendSwitch('register-pepper-plugins', `${emrPath};application/x-hello`)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1440, height: 900,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      plugins: true,
      webSecurity: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '/index.html')}`,
  )

  mainWindow.maximize()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.on('close', function (e) {
    //窗口关闭前事件
    //如要取消，执行e.preventDefault()
  })

  mainWindow.on('responsive', () => {
    logger.info("窗口恢复响应：" + new Date().getTime())
  })

  mainWindow.on('unresponsive', () => {
    logger.info("窗口失去响应：" + new Date().getTime())
  })

  mainWindow.webContents.on('plugin-crashed', () => {
    logger.info("插件进程崩溃：" + new Date().getTime())
  })

  mainWindow.webContents.on("did-fail-load", (event, errorCode, validatedURL) => {
    logger.error(`加载url失败code[${errorCode}]：${mainWindow.webContents.getURL()}`)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Require each JS file in the app dir
function loadApp() {
  const files = glob.sync(path.join(__dirname, 'main-process/app/**/*.js'))
  files.forEach((file) => { require(file) })
}

loadApp()
