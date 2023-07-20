function sum(a, b) {
     debugger
     const logger = require('./logger.js')
     const ffi = require('@lwahonen/ffi-napi')
     const ref = require('@lwahonen/ref-napi')
     const iconv = require('iconv-lite')
     const path = require('path')
     // const ioPath = path.resolve('addon/dll-test-ai32.dll')
     const ioPath = path.resolve('addon/dll-test.dll')
     // 定义引用值时使用
     // let typeInt = ref.refType('int')
     // let typeStr = ref.refType('string')
     const dllTest = ffi.Library(ioPath, {
          'sum': ['int', ['int', 'int']]
     })
     // 定义引用值时使用
     // let bufCode, bufMsg = null
     // bufCode = Buffer.alloc(10)
     // bufCode.type = ref.types.int
     // bufMsg = Buffer.alloc(200)
     // bufMsg.type = ref.types.char
     const sum = dllTest.sum(parseInt(a), parseInt(b));
     logger.info("dll-test.dll sum() result:" + sum);
     console.log("dll-test.dll sum() result:" + sum);
     return sum;
}

module.exports = {
     callTestDll: function (a, b) {
          return sum(a, b);
     }
}