import { ipcMain, BrowserWindow } from "electron";
import { fileURLToPath, } from 'url';
import { join, dirname, resolve } from 'path';
import nconf from 'nconf';
import { callTestDll } from './modules/call-dll.js'

// 获取当前文件的 URL
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件的目录路径
const __dirname = dirname(__filename);
const getAppConfig = (key) => {
    console.log("starting read config.json")
    const configPath = resolve('./resources/config.json');
    const config = nconf.file(configPath);
    return config.get(key);
}
const callDll = (a, b) => {
    return callTestDll(a, b)
}
const openWindow = (url) => {
    let win = new BrowserWindow({
        width: 1000, height: 800, webPreferences: {
            preload: join(__dirname, 'preload.js')
        }
    })
    win.on('closed', () => {
        win = null
    })
    win.loadURL(url)
    win.setMenu(null)
}

export function registerIPCHandlers(mainWindow) {

    ipcMain.handle('get-config', async (event, ...args) => {
        return getAppConfig(args[0]);
    })
    ipcMain.handle('call-dll', async (event, ...args) => {
        return callDll(args[0], args[1]);
    })
    ipcMain.handle('load-url', async (event, ...args) => {
        openWindow(args[0]);
        return true;
    })
}