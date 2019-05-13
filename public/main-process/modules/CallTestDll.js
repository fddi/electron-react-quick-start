const path = require('path')
const callTestDll = async function () {
     return new Promise((resolve, reject) => {
          const childPath = path.join(__dirname, '../../child-process/TestDllWorker.js')
          processChild = childProcess.fork(childPath, {
               silent: false
          })
          //向子线程发送数据
          processChild.send({ childPath })
          //接收子线程数据
          processChild.on('message', (msg) => {
               resolve(msg)
          })
     })
}

module.exports = {
     call: function () {
          const result = await callTestDll()
          return result
     }
}