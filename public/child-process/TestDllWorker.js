// 获取命令行参数
// const arguments  = process.argv.splice(2)
// console.log(arguments[0])
const logger = require('../main-process/modules/logger.js')
const ffi = require('ffi-napi')
const path = require('path')
const ioPath = path.resolve('addon/test-ai32.dll')
const testDll = ffi.Library(ioPath, {
     'HelloWorld': ['void', []]
})
console.log("process start ...... ")
logger.info("process start ...... ")
testDll.HelloWorld()
console.log("process end ...... ")
logger.info("process end ...... ")
process.send("success");