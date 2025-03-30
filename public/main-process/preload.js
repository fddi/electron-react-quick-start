const { contextBridge, ipcRenderer } = require('electron');
console.log("starting preload")

contextBridge.exposeInMainWorld('electron', {
    getAppConfig: (key) => ipcRenderer.invoke("get-config", key),
    callTestDll: (a, b) => ipcRenderer.invoke("call-dll", a, b),
    openWindow: (url) => ipcRenderer.invoke("load-url", url)
})