const { ipcMain, BrowserWindow } = require("electron");
const path = require('path')
const openWindow = (url) => {
    let win = new BrowserWindow({
        width: 1000, height: 800, webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.on('closed', () => {
        win = null
    })
    win.loadURL(url)
    win.setMenu(null)
}
ipcMain.handle('load-url', async (event, ...args) => {
    openWindow(args[0]);
    return true;
})