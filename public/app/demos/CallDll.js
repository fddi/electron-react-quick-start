const { ipcMain } = require('electron')
const path = require('path')
const ffi = require('ffi-napi')
const isDev = require('electron-is-dev')

ipcMain.on('call-dll-test', (event, arg) => {
    let ioPath = ""
    if (isDev) {
        ioPath = path.join(process.cwd(), '/addon/test-ai32.dll');
    } else {
        ioPath = path.join(process.cwd(), 'resources/addon/test-ai32.dll');
    }
    const { dialog } = require('electron')
    dialog.showMessageBox({ title: "路径", message: ioPath, detail: ioPath })
    const testDll = ffi.Library(ioPath, {
        'HelloWorld': ['void', []]
    })
    testDll.HelloWorld()
    event.sender.send('call-dll-done', ioPath)
})
