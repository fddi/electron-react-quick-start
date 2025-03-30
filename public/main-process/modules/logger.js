import { resolve, join } from 'path'
import { accessSync, constants, mkdirSync, appendFile, writeFile } from 'fs'
import dayjs from 'dayjs'

const logfactory = function (str, tag) {
    const formatDate = dayjs().format('YYYYMMDD')
    const formatDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const logPath = resolve('log')
    try {
        accessSync(logPath, constants.R_OK | constants.W_OK);
    } catch (err) {
        mkdirSync(logPath)
    }
    const logFilePath = join(logPath, `${formatDate}.log`)
    try {
        accessSync(logFilePath, constants.R_OK | constants.W_OK)
        appendFile(logFilePath, `${formatDateTime}  ${tag} : ${str}\n`, function (err) {
            if (err) {
            }
        })
    } catch (err) {
        writeFile(logFilePath, `${formatDateTime}  ${tag} : ${str}\n`, function (err) {
            if (err) {
            }
        })
    }
}

export default {
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