const config = window.require('electron').remote.require('./config.json')
const host =config.host
const localApi={
     login:"./static-data/login.json"
}
const remoteApi={
     login: host + "/login"
}
export default {
     getApi:function(){
          if(config.localData==1){
               return localApi
          }
          return remoteApi
     }
}