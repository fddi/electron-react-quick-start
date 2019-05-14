const path = require('path')
const child_process = require('child_process')
const iconv = require('iconv-lite')

const callTestDll = (sync) => {
     const childPath = path.join(__dirname, '../../child-process/TestDllWorker.js')
     let result = null
     if (sync) {
          const spanw = child_process.spawnSync(process.argv[0], [childPath])
          const str = Buffer.from(spanw.stdout)
          result = iconv.decode(str, 'GBK')
          console.log(`stdout: ${result}`)
          return result
     }
     return new Promise((resolve, reject) => {
          const spanw = child_process.spawn(process.argv[0], [childPath])
          spanw.stdout.on('data', (data) => {
               const str = Buffer.from(data)
               const result = iconv.decode(str, 'GBK')
               console.log(`stdout: ${result}`);
               if (result.indexOf("result") >= 0) {
                    resolve(result)
               }
          });
     })
}

module.exports = {
     call: function (sync, callback) {
          if (sync) {
               return callTestDll(sync)
          } else {
               let anyscCall = async function (sync) {
                    return await callTestDll(sync)
               }
               anyscCall(sync).then((v) => { callback(v) })
          }
     }
}