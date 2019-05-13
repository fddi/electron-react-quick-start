const ffi = require('ffi-napi')
const path = require('path')
const ioPath = path.resolve('addon/test-ai32.dll')

process.on('message', (msg) => {
     console.log(msg)
     const testDll = ffi.Library(ioPath, {
          'HelloWorld': ['void', []]
     })
     testDll.HelloWorld()
     process.send({ result: "ok" })
     setTimeout(() => { process.exit() }, 300)
})