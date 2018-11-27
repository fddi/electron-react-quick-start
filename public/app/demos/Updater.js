const { ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater')
const updateUrl=global.appConfig.config.get("updateUrl")

// 检测更新
function updateHandle(event) {
     const os = require('os');
     autoUpdater.setFeedURL(updateUrl);
     autoUpdater.on('error', function (error) {
          sendUpdateMessage(event, 502)
     });
     autoUpdater.on('checking-for-update', function () {
          //sendUpdateMessage(event,0)
     });
     autoUpdater.on('update-available', function (info) {
          sendUpdateMessage(event, 1)
     });
     autoUpdater.on('update-not-available', function (info) {
          sendUpdateMessage(event, 0)
     });

     // 更新下载进度事件
     autoUpdater.on('download-progress', function (progressObj) {
          event.sender.send('topic-update-loading', progressObj)
     })
     autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
          autoUpdater.quitAndInstall();
     });

     //执行自动更新检查
     autoUpdater.checkForUpdates();
}

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(event, msg) {
     event.sender.send('topic-update-step', msg)
}

ipcMain.on('topic-update-check', (event, arg) => {
     //some code here to handle event
     updateHandle(event)
})