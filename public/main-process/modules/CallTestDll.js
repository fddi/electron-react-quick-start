const path = require('path')
const child_process = require('child_process')
const iconv = require('iconv-lite')
const { BrowserWindow } = require('electron')
const logger = require('./logger.js')
const callTestDll = () => {
     const childPath = path.join(__dirname, '../../child-process/TestDllWorker.js')
     logger.info(childPath);
     const child = child_process.fork(childPath);
     child.on('message', (m) => {
          logger.info(m)
          const result = iconv.decode(m, 'GBK')
          logger.info(result)
          const wins = BrowserWindow.getAllWindows();
          if (wins != null && wins.length > 0) {
               wins[0].webContents.send('dll-test', result)
          }
          child.kill();
     });
}

module.exports = {
     call: function () {
          callTestDll();
     }
}