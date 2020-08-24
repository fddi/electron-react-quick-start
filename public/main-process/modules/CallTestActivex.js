const winax = require("winax")

module.exports = {
     call: function (filePath) {
          const fso = new winax.Object("Scripting.FileSystemObject");
          if (!fso) {
               return false;
          }
          const fs = fso.createtextfile(filePath,true); 
          if (!fs) {
               return false;
          }
          fs.close();
          return true;
     }
}