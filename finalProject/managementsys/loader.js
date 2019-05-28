//----
//路由文件
//----

var fs = require('fs');
var globalConfig = require('./config');

// var controllerSet = [];
var pathMap = new Map();
var files = fs.readdirSync(globalConfig.web_path); //读取web下的所有文件路径

for (var i = 0; i < files.length; i++) {
    var temp = require('./' + globalConfig.web_path + '/' + files[i]);  //引入web文件夹下的所有文件
    if (temp.path) { //web文件夹下的文件导出了path，才能被认为是controller文件
        for (var [key, value] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value);
            } else {
                throw new Error('url path异常，url：' + key);
            }
        }
    }
}

module.exports.pathMap = pathMap;