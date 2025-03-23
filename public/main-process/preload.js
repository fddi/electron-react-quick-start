import { contextBridge, ipcRenderer } from 'electron';
import { resolve } from 'path';
import nconf from 'nconf';
import { callTestDll } from './modules/call-dll.js'

console.log("starting preload")
contextBridge.exposeInMainWorld('electron', {
    getAppConfig: (key) => {
        console.log("starting read config.json")
        const configPath = resolve('./resources/config.json');
        const config = nconf.file(configPath);
        return config.get(key);
    },
    callTestDll: (a, b) => {
        console.log("starting run dll")
        callTestDll(a, b)
    },
    openWindow: (url) => ipcRenderer.invoke("load-url", url)
})