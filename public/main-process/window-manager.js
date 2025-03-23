import { BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import { fileURLToPath } from 'url';
import { join, resolve, dirname } from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import nconf from 'nconf';
let app = null;
// 获取当前文件的 URL
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件的目录路径
const __dirname = dirname(__filename);
console.log(join(__dirname, 'preload.js'))
export function createMainWindow(settings) {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        backgroundColor: '#2e2c29',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: join(__dirname, 'preload.js')
        }
    })

    if (!isDev) {
        // win.loadFile(path.join(__dirname, '../../build/index.html'));
        if (app == null) {
            app = new Koa();
            // 设置静态文件目录
            const staticDir = join(__dirname, 'build');
            app.use(serve(staticDir));
            // 启动服务器

            const configPath = resolve('./resources/config.json');
            const config = nconf.file(configPath);
            const PORT = config.get("port");
            app.listen(PORT, () => {
                console.log(`Koa server is running on http://localhost:${PORT}`);
            });
        }
        win.loadURL('http://localhost:3210');
    } else {
        win.loadURL('http://localhost:3000');
    }
    return win;
}