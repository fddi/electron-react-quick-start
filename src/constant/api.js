const config = window.require('electron').remote.require('./config.json')
const host = config.host
const localApi = {
     login: "static-data/login.json",
     menuTree: "static-data/menu.json"
}
const remoteApi = {
     login: host + "/login",
     menuTree: host + "/menu-tree"
}
export default {
     getApi: function () {
          if (config.localData == 1) {
               return localApi
          }
          return remoteApi
     },
     getAuthInfo: function () {
          let tokenInfo = sessionStorage.getItem("tokenInfo");
          if (tokenInfo == null || tokenInfo == "")
               return false;
          tokenInfo = JSON.parse(tokenInfo);
          return tokenInfo;
     }
}