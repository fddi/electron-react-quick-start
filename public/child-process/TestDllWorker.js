// 获取命令行参数
// const arguments  = process.argv.splice(2)
// console.log(arguments[0])

const ffi = require('ffi-napi')
const path = require('path')
const ioPath = path.resolve('addon/test-ai32.dll')
const testDll = ffi.Library(ioPath, {
     'HelloWorld': ['void', []]
})
testDll.HelloWorld()
const result = { resultMsg: "ok" }
console.log(JSON.stringify(result))
//关闭子线程
setTimeout(() => { process.exit() }, 300)