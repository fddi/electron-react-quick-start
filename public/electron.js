// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const glob = require('glob')
const path = require('path')
let configPath = ""
if (isDev) {
  configPath = path.join(process.cwd(), '/addon/config.json');
} else {
  configPath = path.join(process.cwd(), 'resources/addon/config.json');
}
const nconf = require('nconf').file(configPath)
global.appConfig = {
  config: nconf
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ minWidth: 450, width: 450, height: 500 })

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '/index.html')}`,
  )

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  // const {dialog} = require('electron')
  // dialog.showMessageBox({title:"path",message:process.cwd(),detail:process.cwd()})
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
  const files = glob.sync(path.join(__dirname, 'app/**/*.js'))
  files.forEach((file) => { require(file) })
}

loadApp()
