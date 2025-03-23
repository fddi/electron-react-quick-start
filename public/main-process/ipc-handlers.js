import { ipcMain, BrowserWindow } from "electron";
import { fileURLToPath, } from 'url';
import { join, dirname } from 'path';
// 获取当前文件的 URL
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件的目录路径
const __dirname = dirname(__filename);
export function registerIPCHandlers(mainWindow) {
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
    ipcMain.handle('load-url', async (event, ...args) => {
        openWindow(args[0]);
        return true;
    })
}