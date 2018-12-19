const { app, ipcMain } = require('electron')
const path = require('path')
const ffi = require('ffi-napi')
const ioPath = path.resolve('addon/test-ai32.dll')

ipcMain.on('topic-call-dll', (event, arg) => {
    // const { dialog } = require('electron')
    // dialog.showMessageBox({ title: "调用路径", message: ioPath, detail: ioPath })
    const testDll = ffi.Library(ioPath, {
        'HelloWorld': ['void', []]
    })
    testDll.HelloWorld()
    event.sender.send('topic-call-dll-done', ioPath)
})
