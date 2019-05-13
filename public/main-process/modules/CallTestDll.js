const path = require('path')
const child_process = require('child_process')

const callTestDll = (sync) => {
     return new Promise((resolve, reject) => {
          const childPath = path.join(__dirname, '../../child-process/TestDllWorker.js')
          processChild = child_process.fork(childPath, {
               silent: false
          })
          //向子线程发送数据
          processChild.send({ param: "test" })
          //接收子线程数据
          processChild.on('message', (msg) => {
               resolve(msg)
          })
     })
}

module.exports = {
     call: function (sync, callback) {
          let anyscCall = async function (sync) {
               return await callTestDll(sync)
          }
          if (sync) {
               // const result = child_process.spawnSync("node", ["./child-process/TestDllSyncWorker.js"]);
               //  result = child_process.spawnSync("node", [childPath], { argv0: "test" });
               // return result
          } else {
               anyscCall(sync).then((v) => { callback(v) })
          }
     }
}