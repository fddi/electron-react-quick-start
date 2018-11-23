const { ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater')

// 检测更新
function updateHandle() {
     let message = {
          error: '检查更新出错',
          checking: '正在检查更新……',
          updateAva: '检测到新版本，正在下载……',
          updateNotAva: '当前版本已是最新版本',
     };
     const os = require('os');
     autoUpdater.setFeedURL('https://fddi.github.io/electron-react-quick-start/latest/');
     autoUpdater.on('error', function (error) {
          sendUpdateMessage(message.error)
     });
     autoUpdater.on('checking-for-update', function () {
          sendUpdateMessage(message.checking)
     });
     autoUpdater.on('update-available', function (info) {
          sendUpdateMessage(message.updateAva)
     });
     autoUpdater.on('update-not-available', function (info) {
          sendUpdateMessage(message.updateNotAva)
     });

     // 更新下载进度事件
     autoUpdater.on('topic-update-loading', function (progressObj) {
          mainWindow.webContents.send('topic-update-loading', progressObj)
     })
     autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
          autoUpdater.quitAndInstall();
     });

     //执行自动更新检查
     autoUpdater.checkForUpdates();
}

// 通过main进程发送事件给renderer进程，提示更新信息
// mainWindow = new BrowserWindow()
function sendUpdateMessage(msg) {
     mainWindow.webContents.send('topic-update-message', msg)
}

ipcMain.on('topic-update-check', (e, arg) => {
     //some code here to handle event
     updateHandle()
})