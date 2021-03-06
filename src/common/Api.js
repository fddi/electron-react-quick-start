import Env from '../utils/Env'

let host = "http://localhost:9091/";
let localData = 1
if (Env.isElectron()) {
    const config = window.require('electron').remote.getGlobal('appConfig')
    host = config.get("host")
    localData = config.get("localData")
}
const localApi = {
    login: "static-data/login.json",
    menuTree: "static-data/menu.json"
}
const remoteApi = {
    login: host + "/login",
    menuTree: host + "/menu-tree"
}
export default {
    getApi: function() {
        if (localData == 1) {
            return localApi
        }
        return remoteApi
    },
    getAuthInfo: function() {
        let tokenInfo = sessionStorage.getItem("tokenInfo");
        if (tokenInfo == null || tokenInfo == "")
            return false;
        tokenInfo = JSON.parse(tokenInfo);
        return tokenInfo;
    }
}