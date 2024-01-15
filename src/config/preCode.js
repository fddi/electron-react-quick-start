import { Highlight, themes } from "prism-react-renderer";

export function PreCode({ language, code }) {
    return (<Highlight
        theme={themes.dracula} language={language} code={code}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
                {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                        ))}
                    </div>
                ))}
            </pre>
        )}
    </Highlight>)
}

export const code = {
    codeGetConfig: `
    getAppConfig: (key) => {
        const configPath = path.resolve('config.json');
        const config = require('nconf').file(configPath);
        return config.get(key);
    }
    `,
    codeGetConfig1: `
    window.electron.getAppConfig("param-one");
    `,
    codeDll: `
    function sum(a, b) {
        const logger = require('./logger.js')
        const koffi = require('koffi');
        const path = require('path')
        // const ioPath = path.resolve('resource/dll-test-ai32.dll')
        const ioPath = path.resolve('resource/dll-test.dll')
        const lib = koffi.load(ioPath);
        const funcSum = lib.func('sum','int',['int','int']);
        const sum = funcSum(parseInt(a),parseInt(b));
        logger.info("dll-test.dll sum() result:" + sum);
        console.log("dll-test.dll sum() result:" + sum);
        return sum;
   }
   
   module.exports = {
        callTestDll: function (a, b) {
             return sum(a, b);
        }
   }`,
    codeDll1: `
    callTestDll: (a, b) => {
        const callDll = require("./main-process/modules/call-dll.js")
        callDll.callTestDll(a, b)
    }`,
    codeDll2: `
    window.electron.callTestDll(a, b);
    `,
    codeOpen:`
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
    `,
    codeOpen1:`
    openWindow: (url) => ipcRenderer.invoke("load-url", url)
    `,
    codeOpen2:`
    window.electron.openWindow(url);
    `

}