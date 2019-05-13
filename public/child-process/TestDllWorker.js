const ffi = require('ffi-napi')
const ioPath = path.resolve('addon/test-ai32.dll')

process.on('message', (msg) => {
     console.log(`childProcess：${msg}`)
     const testDll = ffi.Library(ioPath, {
          'HelloWorld': ['void', []]
     })
     testDll.HelloWorld()
     process.send({ ioPath })
     setTimeout(() => { process.exit() }, 300)
})