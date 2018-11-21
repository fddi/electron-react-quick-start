const { ipcMain } = require('electron')
const path = require('path')
const ffi = require('ffi-napi')

ipcMain.on('call-dll-test', (event, arg) => {
    iopath = path.join(process.cwd(), '/addon/test-ai32.dll');
    const {dialog} = require('electron')
    dialog.showMessageBox({title:"路径",message:iopath,detail:iopath})
    const testDll = ffi.Library(iopath, {
        'HelloWorld': ['void', []]
    })
    testDll.HelloWorld()
    event.sender.send('call-dll-done', iopath)
})
