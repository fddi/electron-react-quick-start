const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev')
const path = require('path');

exports.createMainWindow = (settings) => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        backgroundColor: '#2e2c29',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 加载页面或本地文件
    if (isDev) {
        win.loadURL('http://localhost:3000');
        // 打开开发者工具
        win.webContents.openDevTools();
    } else {
        win.loadFile(path.join(__dirname, '../../build/index.html'));
    }
    return win;
}