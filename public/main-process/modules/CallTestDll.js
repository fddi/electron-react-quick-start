const path = require('path')
const child_process = require('child_process')
const iconv = require('iconv-lite')
const { BrowserWindow } = require('electron')
const logger = require('./logger.js')
const callTestDll = () => {
     const childPath = path.join(__dirname, '../../child-process/TestDllWorker.js')
     const child = child_process.fork(childPath);
     child.on('message', (m) => {
          const result = iconv.decode(m, 'GBK')
          logger.info(result)
          BrowserWindow.getFocusedWindow().webContents.send('dll-test',result)
     });
}

module.exports = {
     call: function () {
          callTestDll();
     }
}