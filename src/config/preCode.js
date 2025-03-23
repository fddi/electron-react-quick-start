import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export function PreCode({ language, code }) {
    return (
        <SyntaxHighlighter language={language || "javascript"}
            showLineNumbers style={darcula}>
            {code}
        </SyntaxHighlighter>
    );
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
        const koffi = require('koffi');
        const path = require('path')
        // const ioPath = path.resolve('resource/dll-test-ai32.dll')
        const ioPath = path.resolve('resource/dll-test.dll')
        const lib = koffi.load(ioPath);
        const funcSum = lib.func('sum','int',['int','int']);
        const sum = funcSum(parseInt(a),parseInt(b));
        return sum;
        // 指针类型示例
        // const funcTest = lib.func('int test(const char* code1, const char* code2,char* outMsg)');
        // let outMsg = Buffer.alloc(200);
        // const code1 = 'someStr';
        // const code2 = 'someStr';
        // const resultCode = funcTest(code1, code2, outMsg);
        // outMsg = iconv.decode(outMsg, "GBK");
        // return outMsg;
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
    codeOpen: `
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
    codeOpen1: `
    openWindow: (url) => ipcRenderer.invoke("load-url", url)
    `,
    codeOpen2: `
    window.electron.openWindow(url);
    `

}