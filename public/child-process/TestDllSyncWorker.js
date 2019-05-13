const ffi = require('ffi-napi')
const path = require('path')
const ioPath = path.resolve('addon/test-ai32.dll')
const testDll = ffi.Library(ioPath, {
     'HelloWorld': ['void', []]
})
console.log("2222222222222222222222222222222222222222222")
console.log(process.argv0)
testDll.HelloWorld()
const result = { result: "ok" }
console.log(result)