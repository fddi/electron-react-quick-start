function sum(a, b) {
     const logger = require('./logger.js')
     const koffi = require('koffi');
     const path = require('path')
     // const ioPath = path.resolve('resources/dll-test-ai32.dll')
     const ioPath = path.resolve('resources/dll-test.dll')
     const lib = koffi.load(ioPath);
     const funcSum = lib.func('sum','int',['int','int']);
     const sum = funcSum(parseInt(a),parseInt(b));
     logger.info("dll-test.dll sum() result:" + sum);
     console.log("dll-test.dll sum() result:" + sum);
     return sum;
}

module.exports = {
     callTestDll: function (a, b) {
          return sum(a, b);
     }
}