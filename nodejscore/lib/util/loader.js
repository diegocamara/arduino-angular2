var fs = require('fs');

module.exports = function(directory, cb){
  fs.readdirSync(directory).filter(function(file){
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "databaseconfig.json") && (file !== "package.json");
  }).forEach(function(file){
    cb(file);
  })
}
