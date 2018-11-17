const { ipcMain } = require('electron')
const path = require('path')
const ffi = require('ffi')

ipcMain.on('call-dll-test', (event, arg) => {
    iopath = path.join(__dirname, '../../addon/test-ai32.dll');
    console.log(iopath)
    const testDll = ffi.Library(iopath, {
        'HelloWorld': ['void', []]
    })
    testDll.HelloWorld()
    event.sender.send('call-dll-done', iopath)
})
