import logger from './logger.js'
import koffi from 'koffi'
import path from 'path'

function sum(a, b) {
     // const ioPath = path.resolve('resources/dll-test-ai32.dll')
     const ioPath = path.resolve('resources/dll-test.dll')
     const lib = koffi.load(ioPath);
     // const funcSum = lib.func('sum','int',['int','int']);
     const funcSum = lib.func('int __stdcall sum(int a, int b)');
     const sum = funcSum(parseInt(a),parseInt(b));
     logger.info("dll-test.dll sum() result:" + sum);
     console.log("dll-test.dll sum() result:" + sum);
     return sum;
}

export function callTestDll(a, b) {
     return sum(a, b);
}