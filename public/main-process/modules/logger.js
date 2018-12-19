const path = require('path')
const fs = require('fs')
const moment = require('moment')

const logfactory = function (str, tag) {
    const formatDate = moment().format('YYYYMMDD')
    const formatDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    const logPath = path.resolve('log')
    try {
        fs.accessSync(logPath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
        fs.mkdirSync(logPath)
    }
    const logFilePath = path.join(logPath, `${formatDate}.log`)
    try {
        fs.accessSync(logFilePath, fs.constants.R_OK | fs.constants.W_OK)
        fs.appendFile(logFilePath, `${formatDateTime}  ${tag} : ${str}\n`, function (err) {
            if (err) {
            }
        })
    } catch (err) {
        fs.writeFile(logFilePath, `${formatDateTime}  ${tag} : ${str}\n`, function (err) {
            if (err) {
            }
        })
    }
}

module.exports = {
    info: function (str) {
        logfactory(str, "[info]")
    },
    notice: function (str) {
        logfactory(str, "[notice]")
    },
    error: function (str) {
        logfactory(str, "[error]")
    }
}