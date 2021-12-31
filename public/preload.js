const { contextBridge, ipcRenderer } = require('electron');
const path = require('path')
contextBridge.exposeInMainWorld('electron', {
    getAppConfig: (key) => {
        const configPath = path.resolve('config.json');
        const config = require('nconf').file(configPath);
        return config.get(key);
    },
    callTestDll: (a, b) => {
        const callDll = require("./main-process/modules/call-dll.js")
        return callDll.callTestDll(a, b)
    },
    openWindow: (url) => ipcRenderer.invoke("load-url", url)
})